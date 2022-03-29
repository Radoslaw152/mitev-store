import React from 'react';
import {Button, Container, Grid, TextField, Typography, withStyles} from '@material-ui/core';
import GTA from "../assets/images/maleIcon.png";
import sendRequest, {deleteToken, getCurrentUser, sendRequestWithHeader, setCookie, tokenHeaderName} from '../Request';
import {notify} from 'react-notify-toast';
import {confirmAlert} from "react-confirm-alert";
import Alert from "react-popup-alert";


const styles = theme => ({
    media: {
        height: 200,
        borderRadius: 200
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: "darkred",
        color: "white"
    },
    form: {
        marginTop: 50,
        height: 400
    },
    upload: {
        margin: theme.spacing(3, 0, 2),
        fontSize: 22
    },
    paper: {
        marginTop: theme.spacing(20),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: "lightyellow"
    },
    buttonDelete: {
        // margin: theme.spacing(0, 0, 0),
        backgroundColor: "black",
        color: "white"
    }
});

class UserProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            password: '',
            username: '',
            id: null,
            user: null,
            errors: '',
            errorsInit: false,
        };


        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        getCurrentUser((user) => {
            if (user !== null) {
                let imagePreview = GTA;
                if (user.imageUrl !== '' && user.imageUrl !== null) {
                    imagePreview = user.imageUrl;
                }
                this.setState({
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username,
                    imagePreview: imagePreview,
                    image: null,
                    user: user
                });
            }
        })
    }

    validateData() {
        let message = '';
        if (this.state.password !== '' && this.state.password.length < 8) {
            message += "If password is set, it must be between 8 and 100 characters."
        }
        return message;
    }

    handleDelete() {
        confirmAlert({
            title: 'Confirm to delete account!',
            message: 'Are you sure you want to delete your account?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        const url = `/api/users/${this.state.id}`;
                        sendRequest(url, 'DELETE', {}, (callback) => {
                            notify.show('Successfully deleted account with username: ' + this.state.username, 'success', 1800);
                            deleteToken();
                            this.props.history.push('/');
                            window.location.reload();
                        });
                    }
                },
                {
                    label: 'No',
                    onClick: () => {

                    }
                }
            ]
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        console.log(target);
        console.log(value);
        console.log(name);

        if (name === 'image') {
            this.setState({
                imagePreview: URL.createObjectURL(target.files[0]),
                image: target.files[0]
            })
        } else {
            this.setState({
                [name]: value
            });

        }
    }

    handleSubmit(event) {
        event.preventDefault();
        let errors = this.validateData();
        if (errors !== '') {
            console.log(errors);
            this.setState({
                errors: errors
            });
            return;
        }
        getCurrentUser((user) => {
            if (user !== null) {
                let data = new FormData();
                let headers = new Headers({
                    'Accept-Type': 'application/json'
                });
                if (this.state.imagePreview !== GTA) {
                    data.append('file', this.state.image);
                }

                const putUri = '/api/users/' + user.id;

                user.firstName = this.state.firstName;
                user.lastName = this.state.lastName;
                user.password = this.state.password;
                data.append('user', JSON.stringify(user));

                sendRequestWithHeader(putUri, 'PUT', data, headers, (response) => {
                    notify.show("Successfully updated profile!", 'success', 7000);
                    const url = '/api/login';
                    let body = {username: this.state.username, password: this.state.password};
                    sendRequest(url, 'POST', JSON.stringify(body), (response) => {
                        let token = response.headers.get(tokenHeaderName);
                        setCookie(token);
                        window.location.reload();
                    });
                });
            }
        });
    }

    render() {
        const {classes} = this.props;
        if (this.state.id === null) {
            return (
                <div className={classes.paper}>
                    <h1>You are not logged in!</h1>
                </div>
            );
        }
        return (
            <Grid container spacing={3} justify="center">
                <Grid item xs={3}>
                    <img src={this.state.imagePreview} className={classes.media}/>
                    <input type='file' id='image' name='image' className={classes.upload}
                           onChange={this.handleInputChange}/>
                </Grid>
                <Grid item xs={3} style={{marginBottom: 100}}>
                    <Container component="main" maxWidth="xs">
                        {/*<CssBaseline/>*/}
                        <div className={classes.paper}>
                            <Typography variant="h4">Update your profile</Typography>
                            {this.state.errors !== '' ?
                                <Alert
                                    header={'ERROR'}
                                    btnText={'Close'}
                                    text={this.state.errors}
                                    type='error'
                                    show='true'
                                    onClosePress={() => {
                                        this.setState({errors: ''})
                                    }}
                                    pressCloseOnOutsideClick={true}
                                    showBorderBottom={true}
                                    alertStyles={{}}
                                    headerStyles={{}}
                                    textStyles={{}}
                                    buttonStyles={{}}
                                />
                                : null}
                            <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Typography>First Name</Typography>
                                        <TextField
                                            className={classes.input}
                                            // autoComplete="fname"
                                            name="firstName"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="firstName"
                                            autoFocus
                                            value={this.state.firstName}
                                            onChange={this.handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography>Last Name</Typography>
                                        <TextField
                                            className={classes.input}
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="lastName"
                                            name="lastName"
                                            autoComplete="lname"
                                            value={this.state.lastName}
                                            onChange={this.handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography>Username</Typography>
                                        <TextField
                                            className={classes.input}
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="username"
                                            name="username"
                                            value={this.state.username}
                                            readOnly
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography>Password</Typography>
                                        <TextField
                                            className={classes.input}
                                            variant="outlined"
                                            required
                                            fullWidth
                                            name="password"
                                            type="password"
                                            id="password"
                                            onChange={this.handleInputChange}
                                        />
                                    </Grid>
                                </Grid>

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    className={classes.submit}
                                    onSubmit={this.handleSubmit}
                                >
                                    Change
                                </Button>
                                {this.state.user.role !== 'ADMIN' &&
                                <Button
                                    // type="submit"
                                    fullWidth
                                    variant="contained"
                                    className={classes.buttonDelete}
                                    onClick={this.handleDelete}>
                                    Delete Account
                                </Button>
                                }
                            </form>
                        </div>
                    </Container>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles, {withTheme: true})(UserProfile);
