import React from 'react';
import sendRequest from '../Request.js';
import Grid from "@material-ui/core/Grid";
import ProductCard from './ProductCard.jsx';
import {MenuItem, MenuList, withStyles} from '@material-ui/core';

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

class ProductCatalogue extends React.Component {
    constructor() {
        super();
        this.state = {products: [], pages: 0, brandType: [], graphicsCard: [], processorType: [], modelType: []};
    }

    componentDidMount() {
        sendRequest('/api/products/filter/graphicscard/', 'GET', {}, (response) => {
            response.json().then((json) => {
                this.setState({graphicsCard: json.sort()});
            });
        });
        sendRequest('/api/products/filter/brandtype/', 'GET', {}, (response) => {
            response.json().then((json) => {
                this.setState({brandType: json.sort()});
            });
        });
        sendRequest('/api/products/filter/processortype/', 'GET', {}, (response) => {
            response.json().then((json) => {
                this.setState({processorType: json.sort()});
            });
        });
        sendRequest('/api/products/filter/modeltype/', 'GET', {}, (response) => {
            response.json().then((json) => {
                this.setState({modelType: json.sort()});
            });
        });

        let type = document.URL.substring(document.URL.lastIndexOf('/') + 1);
        let uri = '/api/products';
        if (type === 'onSale') {
            uri += '/onSale';
        } else if (type === 'new') {
            uri += '/new';
        } else if (type !== 'catalogue') {
            uri += `?modeltype=${type}`
        }

        console.log("URI: " + uri);
        sendRequest(uri, 'GET', {}, (response) => {
            response.json().then((json) => {
                this.setState({products: json});
            });
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.componentDidMount()
        }
    }

    handleClick(event, category, value) {
        event.preventDefault();
        let uri = `/api/products?${category}=${value}`;
        let type = document.URL.substring(document.URL.lastIndexOf('/') + 1);
        if (type === 'onSale') {
            uri = uri + "&onSale=true";
        } else if (type !== 'new' && type !== 'catalogue') {
            uri = uri + `&modeltype=${type}`
        }
        console.log("URI in handleClick: " + uri);
        sendRequest(uri, 'GET', {}, (response) => {
            response.json().then((json) => {
                console.log(json);
                this.setState({products: json});
            });
        });
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Grid container justify="center">
                    <Grid item xs={2} className={classes.menu}>
                        <MenuList> Brands
                            {this.state.brandType.map((brand) =>
                                <MenuItem
                                    onClick={event => this.handleClick(event, "brandtype", brand)}>{brand}</MenuItem>)}
                        </MenuList>
                        <MenuList> Processors
                            {this.state.processorType.map((processorType) =>
                                <MenuItem
                                    onClick={event => this.handleClick(event, "processortype", processorType)}>{processorType}</MenuItem>)}
                        </MenuList>
                        <MenuList> Graphic Cards
                            {this.state.graphicsCard.map((graphicsCard) =>
                                <MenuItem
                                    onClick={event => this.handleClick(event, "graphicscard", graphicsCard)}>{graphicsCard}</MenuItem>)}
                        </MenuList>
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={6}>
                        <Grid style={{marginBottom: 15}} container justify="flex-start" spacing={3}>
                            {this.state.products.map(product =>
                                <Grid item xs={4}>
                                    <ProductCard key={product.id} product={product}/>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(ProductCatalogue);
