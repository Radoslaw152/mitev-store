import React from 'react';
import {NavLink} from 'react-router-dom';
import {List, ListItem, Typography} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import master_card from '../assets/images/master_card.svg';
import visa_card from '../assets/images/visa_card.svg';
import discovery_card from '../assets/images/discover_network_card.svg';
import paypal from '../assets/images/paypal.svg';
import LOGO from '../assets/images/bottom.png';

const useStyles = makeStyles(theme => ({
    footer: {
        backgroundColor: "red",
        bottom: 0,
        left: 0,
        right: 0,
        margin: 0
    },
    headings: {
        color: "darkred",
        fontWeight: "bold"
    },
    media: {
        height: 20,
        margin: 5
    },
    logo: {
        opacity: 0.4,
        marginTop: 20,
        width: 250
    }
}));

function Footer() {
    const classes = useStyles();

    return (
        <div className={classes.footer}>
            <Grid container justify="center">
                <Grid item xs={2}>
                    <List>
                        <ListItem>
                            <Typography className={classes.headings} component="h1" variant="h5">
                                HELPFUL LINKS
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <NavLink className="menu__link" to="/">Home Page</NavLink>
                        </ListItem>
                        <ListItem>
                            <NavLink className="menu__link" to="/catalogue">Our Catalogue</NavLink>
                        </ListItem>
                        <ListItem>
                            <NavLink className="menu__link" to="/">Site Map</NavLink>
                        </ListItem>
                        <ListItem>
                            <NavLink className="menu__link" to="/">Free Catalogue Updates</NavLink>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={2}>
                    <List>
                        <ListItem>
                            <Typography className={classes.headings} component="h1" variant="h5">
                                ACCOUNT
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <NavLink className="menu__link" to="/login">Login</NavLink>
                        </ListItem>
                        <ListItem>
                            <NavLink className="menu__link" to="/register">Register</NavLink>
                        </ListItem>
                        <ListItem>
                            <NavLink className="menu__link" to="/account">My Account</NavLink>
                        </ListItem>
                        <ListItem>
                            <NavLink className="menu__link" to="/cart">Shopping Cart</NavLink>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={2}>
                    <List>
                        <ListItem>
                            <Typography className={classes.headings} component="h1" variant="h5">
                                INFO
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <NavLink className="menu__link" to="/help">Help</NavLink>
                        </ListItem>
                        <ListItem>
                            <NavLink className="menu__link" to="/contacts">Contacts</NavLink>
                        </ListItem>
                        <ListItem>
                            <NavLink className="menu__link" to="/">Security and Privacy</NavLink>
                        </ListItem>
                        <ListItem>
                            <NavLink className="menu__link" to="/">Policies and Procedures</NavLink>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={2}>
                    <img src={LOGO} className={classes.logo} alt="iamge"/>
                </Grid>
                <Grid item xs={2}>
                    <List>
                        <ListItem>
                            <Typography className="headings" component="h1" variant="h5">
                                Follow us:
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <List>
                                <FacebookIcon fontSize="large"/>
                                <InstagramIcon fontSize="large"/>
                                <TwitterIcon fontSize="large"/>
                            </List>
                        </ListItem>
                        <ListItem>
                            <img className={classes.media} src={master_card} alt="Master card"/>
                            <img className={classes.media} src={visa_card} alt="Visa card"/>
                            <img className={classes.media} src={discovery_card} alt="Discover network card"/>
                            <img className={classes.media} src={paypal} alt="Paypal"/>
                        </ListItem>
                        <ListItem>
                            <Typography component="h1" variant="h6">
                                ©2022 Mitev Store, Inc.
                            </Typography>
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </div>
    );
}

export default Footer;
