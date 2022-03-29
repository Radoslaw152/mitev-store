import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import {Button, Grid, List, Typography} from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

const styles = theme => ({
    text: {
        fontWeight: "bold"
    },
    bodyText: {
        fontSize: 43,
        fontWeight: "bold"
    },
    header: {
        backgroundColor: "salmon"
    },
    headerTitle: {
        fontWeight: "bold",
        fontSize: 20
    },
    button: {
        color: "white",
        fontWeight: "bold",
        margin: 120,
        boxShadow: "3px 3px darkred"
    }
});

class Cart extends React.Component {
    constructor() {
        super();
        this.state = {
            total: 0
        };
//         this.state = this.state.bind(this);


    }

    handleModalInput = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    handleSelectionChange = (event) => {
        const newCounts = {
            ...this.state.counts,
            [event.target.name]: event.target.value,
        };
        this.setState({counts: newCounts});
    };

    // orderProducts = () => {
    //   const url =`order`;
    //   const productsToOrder = this.props.products
    //       .map(pr => ({...pr, quantity: this.state.counts[pr.product_name] }));
    //   sendRequest(url, 'PUT', { products: productsToOrder }, (response) => {
    //       this.props.products.forEach(pr => this.props.removeProductFromCart(pr.product_id));
    //       this.forceUpdate();
    //       notify.show(response, 'success', 1500);
    //   });
    // }

    componentWillMount() {
        let sum = 0;
        if (this.props.products && this.props.products.length !== 0) {
            var products = this.props.products;
            sum = products.reduce((sum, product) => sum + (product.qty * product.price), 0);
        }
        this.setState({total: sum});
    }

    render() {
        const {classes} = this.props;
        return (
            <Grid container spacing={3} justify="center" className={classes.root}>
                <Grid item xs={8}>
                    <Typography className={classes.text} variant="h4">
                        Shopping Cart
                    </Typography>
                    <Typography className={classes.text} variant="h6">
                        Order detail
                    </Typography>
                </Grid>
                {this.props.products && this.props.products.length > 0 ?
                    <Grid item xs={8}>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                                <TableRow className={classes.header}>
                                    <TableCell className={classes.headerTitle}>Title</TableCell>
                                    <TableCell align="right" className={classes.headerTitle}></TableCell>
                                    <TableCell align="right" className={classes.headerTitle}>Quantity</TableCell>
                                    <TableCell align="right" className={classes.headerTitle}>Price</TableCell>
                                    <TableCell align="right" className={classes.headerTitle}>Total</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody className={classes.bodyText}>
                                {this.props.products.map(product => (
                                    <TableRow key={product.id}>
                                        <TableCell style={{fontWeight: "bold", fontSize: 22}} component="th"
                                                   scope="row">
                                            {product.modelType} {product.brandType} {product.model}
                                        </TableCell>
                                        <TableCell align="right"></TableCell>
                                        <TableCell style={{fontWeight: "bold", fontSize: 22}}
                                                   align="right">{product.qty}</TableCell>
                                        <TableCell style={{fontWeight: "bold", fontSize: 22}}
                                                   align="right">{product.price} $</TableCell>
                                        <TableCell style={{fontWeight: "bold", fontSize: 22}}
                                                   align="right">{product.qty * product.price} $</TableCell>
                                    </TableRow>
                                ))}
                                <TableRow className={classes.header}>
                                    <TableCell style={{fontWeight: "bold", fontSize: 20}} component="th" scope="row">
                                        Total
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell style={{fontWeight: "bold", fontSize: 20}}
                                               align="right">{this.state.total} $</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Grid>
                    :
                    <Grid item xs={8}>
                        <Typography variant="h4" style={{textAlign: "center"}}> Empty cart! </Typography>
                    </Grid>
                }
                <Grid item xs={8}>
                    <List>
                        <Button className={classes.button} style={{backgroundColor: "salmon", color: "white"}}>
                            <NavLink to="/" style={{textDecoration: "none", color: "white"}}>&lt;Continue
                                shopping</NavLink>
                        </Button>
                        <Button className={classes.button} style={{backgroundColor: "red"}}>Empty cart</Button>
                        <Button className={classes.button} style={{backgroundColor: "green"}}>Proceed to
                            checkout&gt;</Button>
                    </List>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
};


const mapDispatchToProps = dispatch => {
    return {
        removeProductFromCart: (id) => {
            dispatch({type: 'REMOVE_PRODUCT_FROM_CART', id})
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, {withTheme: true})(Cart));
