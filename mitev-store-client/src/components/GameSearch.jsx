import React, {useEffect} from 'react';
import sendRequest from '../Request.js';
import Grid from "@material-ui/core/Grid";
import GameCard from './GameCard.jsx';
import {MenuItem, MenuList, withStyles} from '@material-ui/core';
import {connect} from "react-redux";

const styles = theme => ({
    menu: {
        color: "darkred",
        fontWeight: "bold",
        fontSize: 25,
        borderRight: "3px solid darkred"
    },
    list: {
        marginBottom: 20
    }
});

class GameSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {products: [], pages: 0};
    }

    componentDidMount() {
        let type = document.URL.substring(document.URL.lastIndexOf('/') + 1);
        if (type !== "") {
            let uri = `/api/products/filter/model/${type}`;
            sendRequest(uri, 'GET', {}, (response) => {
                response.json().then((json) => {
                    this.setState({products: json});
                });
            });
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.componentDidMount()
        }
    }

    render() {
        const {classes} = this.props;
        if (this.state.products.length === 0) {
            return (
                <div className={classes.paper}>
                    <h1>No computers were found!</h1>
                </div>
            );
        }
        return (
            <div className={classes.root}>
                <Grid container justify="center">
                    <Grid item xs={6}>
                        <Grid container justify="flex-start" spacing={3}>
                            {this.state.products.map(product =>
                                <Grid item xs={4}>
                                    <GameCard key={product.id} product={product}/>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default connect()(withStyles(styles, {withTheme: true})(GameSearch));
