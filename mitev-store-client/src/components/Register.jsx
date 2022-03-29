import React from 'react';
import {NavLink} from 'react-router-dom';
import {withStyles} from "@material-ui/core/styles";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import styles from './FormStyle.jsx';
import Container from '@material-ui/core/Container';
import sendRequest from "../Request.js";
import {notify} from 'react-notify-toast';
import {getCurrentUser, getToken} from "../Request";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {firstName: '', lastName: '', username: '', password: '', currentUser: null};
//         this.state = this.state.bind(this);


        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        getCurrentUser((user) => this.setState({user: user}))
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const uri = '/api/register';
        var user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            username: this.state.username,
            password: this.state.password
        };
        sendRequest(uri, 'POST',
            JSON.stringify(user),
            (response) => {
                notify.show('You registered successfully', 'success', 1500);
                this.props.history.push('/login');
            });
    }

    render() {
        const {classes} = this.props;
        if (this.state.user !== null) {
            return (
                <div className={classes.paper}>
                    <h1>You are already logged in!</h1>
                </div>
            );
        }
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>
                    <form className={classes.form} onSubmit={this.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    className={classes.input}
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    value={this.state.firstName}
                                    onChange={this.handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    className={classes.input}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
                                    value={this.state.lastName}
                                    onChange={this.handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    className={classes.input}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    value={this.state.username}
                                    onChange={this.handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    className={classes.input}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={this.state.password}
                                    onChange={this.handleInputChange}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.submit}
                            onClick={this.handleSubmit}
                        >
                            Register
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <NavLink className="menu__link" to="/login" variant="body2">Already have an account? Log
                                    in.</NavLink>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );
    }
}

export default withStyles(styles, {withTheme: true})(Register);
