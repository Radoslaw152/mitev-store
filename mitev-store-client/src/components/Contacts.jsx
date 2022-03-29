import React from 'react';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PhoneIcon from '@material-ui/icons/Phone';

function Contacts() {
    return (
        <div style={{margin: 100, fontSize: 20, textAlign: "justify"}}>
            <h1>Contacts</h1>
            <h2><FacebookIcon fontSize="large"/> Facebook:</h2>
            <p><a href="https://www.facebook.com/Mitev-Store">https://www.facebook.com/Mitev-Store</a></p>
            <h2><TwitterIcon fontSize="large"/> Twitter:</h2>
            <p><a href="https://www.twitter.com/Mitev-Store">https://www.twitter.com/Mitev-Store</a></p>
            <h2><InstagramIcon fontSize="large"/> Instagram:</h2>
            <p><a href="https://www.instagram.com/Mitev-Store">https://www.instagram.com/Mitev-Store</a></p>
            <h2><MailOutlineIcon fontSize="large"/> Mail:</h2>
            <p><a href="https://www.gmail.com/Mitev-Store">https://www.gmail.com/Mitev-Store</a></p>
            <h2><PhoneIcon fontSize="large"/> Telephone:</h2>
            <p>+359 883 335 300</p>
        </div>
    )
}

export default Contacts;
