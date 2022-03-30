import React from 'react';
import {NavLink} from 'react-router-dom';
import {AppBar, Button, Grid, Paper, Tab, Tabs, Toolbar} from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {withStyles} from "@material-ui/core/styles";
import LOGO1 from '../assets/images/white_logo_transparent_background.png';
import Searchbar from './SearchBar.jsx';
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import sendRequest, {deleteToken, getCurrentUser} from "../Request";
import {notify} from 'react-notify-toast';


const styles = theme => ({
    root: {
        height: 250,
        backgroundColor: "red"
    },
    appbar: {
        backgroundColor: "salmon",
        color: "darkred"
    },
    logo: {
        textAlign: "right"
    },
    searchbar: {
        textAlign: "center",
        marginTop: 30,
        marginLeft: 130
    },
    navmenu: {
        backgroundColor: "darkred",
        color: "white"
    },
    tab: {
        width: 350,
        fontSize: 22,
        // textSizeAdjust: ,
        fontWeight: "bold"
    }
});

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {input: '', user: null};
        this.submit = this.submit.bind(this);
    }

    // componentDidMount() {
    //     this.state.isLoggedIn = getToken() !== '';
    // }
    //
    // componentDidUpdate(prevProps, prevState) {
    //     console.log(prevProps);
    //     console.log(prevState);
    //     // if (this.props.location.pathname !== prevProps.location.pathname) {
    //     //     this.componentDidMount()
    //     // }
    // }

    componentDidMount() {
        getCurrentUser((user) => this.setState({user: user}))
    }


    submit(event) {
        event.preventDefault();
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        sendRequest("/api/logout", 'POST', {}, (callback) => {
                            notify.show('Successfully logged out!', 'success', 1800);
                            deleteToken();
                            this.setState({user: null});
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
    };

    isLoggedIn() {
        return this.state.user !== null;
    }

    isAdminOrModerator() {
        if (!this.isLoggedIn()) {
            return false;
        }
        return this.state.user.role === 'ADMIN' || this.state.user.role === 'PROD_SUPPLIER';
    }

    isAdmin() {
        if (!this.isLoggedIn()) {
            return false;
        }
        return this.state.user.role === 'ADMIN';
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <AppBar position="static" className={classes.appbar}>
                            <Grid container spacing={2} justify="flex-end">
                                <Grid item xs={6} sm={4}>
                                    <Toolbar className={classes.toolbar}>
                                        {this.isAdmin() ?
                                            <Button>
                                                <NavLink to="/adminPanel">Admin Panel</NavLink>
                                            </Button> : null}
                                        {this.isAdminOrModerator() ?
                                            <Button>
                                                <NavLink to="/addProduct">Add Product</NavLink>
                                            </Button> : null}
                                        {this.isLoggedIn() ?
                                            <Button>
                                                <NavLink to="/account">My Account</NavLink>
                                            </Button> : null}
                                        {!this.isLoggedIn() ?
                                            <Button>
                                                <NavLink to="/login">Login</NavLink>
                                            </Button> : null}
                                        {!this.isLoggedIn() ?
                                            <Button>
                                                <NavLink to="/register">Register</NavLink>
                                            </Button> : null}
                                        {this.isLoggedIn() ?
                                            <Button loggedIn={true} onClick={this.submit}>LogOut
                                            </Button> : null}

                                        <Button>
                                            <NavLink to="/cart">Cart</NavLink>
                                            <ShoppingCartIcon/>
                                        </Button>
                                    </Toolbar>
                                </Grid>
                            </Grid>
                        </AppBar>
                    </Grid>
                    <Grid item xs={4}>
                        <NavLink to="/">
                            <img src={LOGO1} alt="logo" style={{width: 250, float: "right", marginTop: -30}}/>
                        </NavLink>
                    </Grid>
                    <Grid item xs={5} className={classes.searchbar}>
                        <Searchbar history={this.props.history}/>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <AppBar position="static">
                        <Paper className={classes.navmenu}>
                            <Tabs centered>
                                <Tab className={classes.tab} label="Notebooks" to='/catalogue/Notebook'
                                     component={NavLink}/>
                                <Tab className={classes.tab} label="Ultrabooks" to='/catalogue/Ultrabook'
                                     component={NavLink}/>
                                <Tab className={classes.tab} label="Gaming Laptops" to='/catalogue/Gaming Laptop'
                                     component={NavLink}/>
                                <Tab className={classes.tab} label="Desktop Computers" to='/catalogue/Desktop Computer'
                                     component={NavLink}/>
                                <Tab className={classes.tab} label="On Sale" to='/catalogue/onSale'
                                     component={NavLink}/>
                            </Tabs>
                        </Paper>
                    </AppBar>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(Header);

