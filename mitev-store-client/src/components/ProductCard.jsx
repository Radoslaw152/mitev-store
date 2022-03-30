import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import {Link} from 'react-router-dom';
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import {connect} from 'react-redux';

const styles = theme => ({
    card: {
        height: 510,
        maxWidth: 320,
        textAlign: "center",
        padding: 7,
        backgroundColor: "#fcf4e8"
    },
    title: {},
    platform: {
        backgroundColor: "pink",
        color: "red",
        fontWeight: "bold"
    },
    media: {
        height: 230,
        maxWidth: 290
    },
    button: {
        backgroundColor: "salmon",
        color: "black",
        fontWeight: "bold",
        marginLeft: 70,
        boxShadow: "3px 3px darkred",
        align: "centre"
    },
    priceText: {
        fontWeight: "bold",
        color: "black",
    }
});

class ProductCard extends React.Component {
    constructor() {
        super();
        this.state = {product: {}, qty: 0};
//         this.state = this.state.bind(this);


    }


    render() {
        const {classes} = this.props;
        let title = this.props.product.modelType + " " + this.props.product.brandType + " " + this.props.product.model;
        return (
            <React.Fragment>
                <Card className={classes.card} raised>
                    <Link to={'/product/' + this.props.product.id} style={{textDecoration: "none"}}>
                        <img src={this.props.product.imageUrl} className={classes.media} alt="product"/>
                        <CardHeader title={title} style={{
                            backgroundColor: "salmon", color: "darkred",
                            border: "2px solid darkred", height: 50
                        }}/>
                    </Link>
                    <CardContent>
                        {this.props.product.onSale ?
                            <div>
                                <Typography className={classes.priceText}
                                            style={{textDecoration: "line-through", display: "inline"}}
                                            variant="h6">${this.props.product.price}</Typography>
                                <Typography className={classes.priceText}
                                            variant="h6">${this.props.product.price * ((100 - this.props.product.percentOff) / 100)}</Typography>
                            </div> :
                            <div>
                                <Typography className={classes.priceText}
                                            variant="h6">${this.props.product.price}</Typography>
                                <Typography style={{color: "lightyellow"}} variant="h6">.</Typography>
                            </div>
                        }
                    </CardContent>
                    <CardActions disableSpacing>
                        <Link to={'/product/' + this.props.product.id}>
                            <Button className={classes.button} onClick={this.handleClick}>View computer</Button>
                        </Link>
                    </CardActions>
                </Card>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.userId
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addProductToCart: (product) => {
            dispatch({type: 'ADD_PRODUCT_TO_CART', product});
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, {withTheme: true})(ProductCard));
