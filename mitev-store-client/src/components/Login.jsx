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
import Container from '@material-ui/core/Container';
import styles from "./FormStyle.jsx";
import {sendRequest, setCookie} from "../Request.js";
import {connect} from 'react-redux';
import {notify} from 'react-notify-toast';
import {getCurrentUser, getToken, tokenHeaderName} from "../Request";


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: '', user: null};
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
        const url = '/api/login';
        let body = {username: this.state.username, password: this.state.password};
        sendRequest(url, 'POST', JSON.stringify(body), (response) => {
            notify.show('Successful login!', 'success', 1500);
            let token = response.headers.get(tokenHeaderName);
            setCookie(token);
            getCurrentUser((user) => this.setState({user: user}));
            this.props.history.push('/');
            window.location.reload();
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
            <Container component="main" maxWidth="xs" className={classes.root}>
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Log in
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            className={classes.input}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={this.state.username}
                            onChange={this.handleInputChange}
                        />
                        <TextField
                            className={classes.input}
                            variant="outlined"
                            margin="normal"
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
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.submit}
                        >
                            Log in
                        </Button>
                        <Grid container>
                            <Grid item>
                                <NavLink className="menu__link" to="/register" variant="body2">Don't have an
                                    account? Register.</NavLink>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );

    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.userId,
        toke: state.token
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setUserIdAndToken: (userId, token) => {
            dispatch({type: 'LOGIN', userId, token})
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, {withTheme: true})(Login));
