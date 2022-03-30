import React from 'react';
import {Button, Divider, Grid, InputBase, Typography} from '@material-ui/core';
import {withStyles} from "@material-ui/core/styles";
import sendRequest, {getCurrentUser} from '../Request';
import {connect} from 'react-redux';
import {notify} from 'react-notify-toast';
import {confirmAlert} from "react-confirm-alert";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";


const styles = theme => ({
    error: {
        height: 400,
        marginLeft: 330
    },
    media: {
        height: 300,
        maxWidth: 400
    },
    text: {
        fontWeight: "bold",
        marginBottom: 20
    },
    text1: {
        fontWeight: "bold"
    },
    button: {
        backgroundColor: "salmon",
        color: "black",
        fontWeight: "bold",
        marginLeft: 80,
        boxShadow: "3px 3px darkred"
    },
    buttonDelete: {
        backgroundColor: "black",
        color: "white",
        fontWeight: "bold",
        marginLeft: 80,
        boxShadow: "3px 3px darkred"
    },
    buttonEdit: {
        backgroundColor: "yellow",
        color: "black",
        fontWeight: "bold",
        marginLeft: 80,
        boxShadow: "3px 3px darkred"
    },
    input: {
        border: "1px solid black",
        width: 120,
        margin: 20,
        borderRadius: 10,
        backgroundColor: "white",
        padding: "0 10px"
    },
    textarea: {
        width: "100%",
        height: 100,
        border: "1px solid darkred"
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        borderRadius: 5,
        border: "none",
        padding: 5,
        fontSize: 18,
        backgroundColor: "salmon",
        color: "black",
        fontWeight: "bold",
        boxShadow: "3px 3px darkred"
    },
    buttonDeleteComment: {
        backgroundColor: "red",
        color: "white",
        fontWeight: "bold",
        marginLeft: 80,
        boxShadow: "3px 3px darkred"
    },
    buttonEditComment: {
        backgroundColor: "yellow",
        color: "black",
        fontWeight: "bold",
        marginLeft: 80,
        boxShadow: "3px 3px darkred"
    }
});

class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {product: {}, comments: [], text: '', qty: 1, user: null, openedCommentId: null};

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCommentDelete = this.handleCommentDelete.bind(this);
        this.handleCommentOpen = this.handleCommentOpen.bind(this);
        this.handleCommentClose = this.handleCommentClose.bind(this);
        this.handleCommentEdit = this.handleCommentEdit.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);
        this.isCurrentUser = this.isCurrentUser.bind(this);
        this.getIdentation = this.getIdentation.bind(this);
        this.handleEditProduct = this.handleEditProduct.bind(this);
    }

    componentDidMount() {
        console.log("ComonentDidMount from ProductDetail");
        var id = document.URL.substring(document.URL.lastIndexOf('/') + 1);
        const uri = '/api/products/' + id;
        sendRequest(uri, 'GET', {}, (response) => {
            response.json().then((json) => {
                this.setState({product: json});
            });
        });
        sendRequest(uri + '/comments', 'GET', {}, (response) => {
            response.json().then((json) => {
                this.setState({comments: json});
            });
        });
        getCurrentUser((user) => {
            this.setState({user: user})
        })
    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if (this.state.comments.length !== prevState.comments.length) {
    //         this.componentDidMount();
    //     }
    // }

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
        const url = `/api/products/${this.state.product.id}/comments`;
        var comment = {text: this.state.text};
        sendRequest(url, 'POST', JSON.stringify(comment), (response) => {
            notify.show('Your comment was added successfully', 'success', 1500);
            const url2 = `/api/products/${this.state.product.id}/comments`;
            sendRequest(url2, 'GET', {}, (response) => {
                response.json().then((json) => {
                    var id = document.URL.substring(document.URL.lastIndexOf('/') + 1);
                    const uri = '/api/products/' + id;
                    sendRequest(uri + '/comments', 'GET', {}, (response) => {
                        response.json().then((json) => {
                            this.setState({comments: json, text: ''});
                        });
                    });
                });
            });
        });
    };

    handleClick = () => {
        var prodQty = this.state.product;
        prodQty.qty = this.state.qty;
        this.setState({product: prodQty});
        this.props.addProductToCart(this.state.product);
        this.props.history.push('/cart');
    };

    handleEditProduct() {
        this.props.history.push('/editProduct/' + this.state.product.id);
    }

    handleDelete() {
        confirmAlert({
            title: 'Confirm to delete product',
            message: 'Are you sure you want to delete this product?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        const url = `/api/products/${this.state.product.id}`;
                        sendRequest(url, 'DELETE', {}, (callback) => {
                            notify.show('Successfully deleted the product!', 'success', 1800);
                            this.setState({product: null});
                            this.props.history.push('/');
                            // window.location.reload();
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

    handleCommentDelete(comment) {
        let text = comment.text;
        let productId = this.state.product.id;
        let commentId = comment.id;
        confirmAlert({
            title: 'Confirm to delete comment!',
            message: 'Are you sure you want to delete this comment: \'' + text + "\'?",
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        const url = `/api/products/${productId}/comments/${commentId}`;
                        sendRequest(url, 'DELETE', {}, (callback) => {
                            notify.show('Successfully deleted the comment!', 'success', 1800);
                            const url2 = `/api/products/${this.state.product.id}/comments`;
                            sendRequest(url2, 'GET', {}, (response) => {
                                response.json().then((json) => {
                                    var id = document.URL.substring(document.URL.lastIndexOf('/') + 1);
                                    const uri = '/api/products/' + id;
                                    sendRequest(uri + '/comments', 'GET', {}, (response) => {
                                        response.json().then((json) => {
                                            this.setState({comments: json, text: ''});
                                        });
                                    });
                                });
                            });
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

    handleCommentOpen(event, comment) {
        // event.preventDefault();
        this.setState({openedCommentId: comment.id});
    }

    handleCommentClose(event) {
        // event.preventDefault();
        this.setState({openedCommentId: null});
    }

    handleCommentChange(event, currentComment) {
        event.preventDefault();
        for (let comment of this.state.comments) {
            if (comment.id === currentComment.id) {
                comment.text = event.target.value;
            }
        }
        this.setState({comments: this.state.comments});
    }

    handleCommentEdit(event, comment) {
        let productId = this.state.product.id;
        let commentId = comment.id;
        const url = `/api/products/${productId}/comments/${commentId}`;
        console.log(url);
        console.log(JSON.stringify(comment));
        sendRequest(url, 'PUT', JSON.stringify(comment), (callback) => {
            notify.show('Successfully updated the comment!', 'success', 1800);
            this.componentDidMount();
        });
        this.handleCommentClose(event);
    }

    isCurrentUser(comment) {
        return this.state.user !== null && comment !== null && (this.state.user.id === comment.user.id || this.state.user.role === 'ADMIN');
    }

    getIdentation(comment) {
        return this.isCurrentUser(comment) === true ? 4 : 12;
    }

    render() {
        const {classes} = this.props;
        return (
            this.state.product === null ?
                <div>
                    <Typography className={classes.error} variant="h4">There is no product with this name!</Typography>
                </div>
                :
                <div className={classes.root}>
                    <Grid container spacing={2} justify="center" className={classes.paper}>
                        <Grid item xs={3}>
                            <img src={this.state.product.imageUrl} className={classes.media} alt="iamge"/>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="h3" className={classes.text}>
                                {this.state.product.modelType} {this.state.product.brandType} {this.state.product.model}
                            </Typography>
                            <Typography variant="h5" className={classes.text}>
                                Processor: {this.state.product.processorType}
                            </Typography>
                            <Typography variant="h5" className={classes.text}>
                                Graphics card: {this.state.product.graphicsCard}
                            </Typography>
                            <Typography variant="h5" className={classes.text}>
                                RAM: {this.state.product.ram} GB
                            </Typography>
                            <Typography variant="h5" className={classes.text}>
                                SSD: {this.state.product.storageInGB} GB
                            </Typography>
                            {this.state.product.onSale ?
                                <div>
                                    <Typography variant="h6" className={classes.text}
                                                style={{textDecoration: "line-through", display: "inline"}}>
                                        Price: ${this.state.product.price}
                                    </Typography>
                                    <Typography variant="h6" className={classes.text}>
                                        Price:
                                        ${this.state.product.price * ((100 - this.state.product.percentOff) / 100)}
                                    </Typography>
                                </div>

                                :
                                <Typography variant="h6" className={classes.text}>
                                    Price: ${this.state.product.price}
                                </Typography>
                            }
                        </Grid>
                        <Grid item xs={2}>
                            <Grid container justify="center" spacing={2}>
                                <Grid item xs={12} variant="h5" className={classes.text}>
                                    Quantity:
                                    <InputBase onChange={e => this.setState({qty: e.target.value})}
                                               className={classes.input}
                                               value={this.state.qty}/>
                                </Grid>
                                <Grid item xs={11}>
                                    <Button className={classes.button} onClick={this.handleClick}>Add to Cart</Button>
                                </Grid>
                                {this.state.user !== null && this.state.user.role !== 'CUSTOMER' &&
                                <Grid item xs={11}>
                                    <Button className={classes.buttonEdit} onClick={(e) => this.handleEditProduct()}>Edit
                                        Product</Button>
                                </Grid>
                                }
                                {this.state.user !== null && this.state.user.role !== 'CUSTOMER' &&
                                <Grid item xs={11}>
                                    <Button className={classes.buttonDelete} onClick={this.handleDelete}>Delete
                                        Product</Button>
                                </Grid>
                                }
                            </Grid>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="h5" className={classes.text1}>
                                Description
                            </Typography>
                            <Divider/>
                            <Typography component="paragraph">
                                <div style={{padding: "20px 0", fontSize: 20, textAlign: "justify"}}>
                                    {this.state.product.description}
                                </div>
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="h5" className={classes.text1}>
                                Comments
                            </Typography>
                            <Divider/>
                            {this.state.user !== null &&
                            <Grid>
                                <br/>
                                <Typography>{this.state.user.userId}</Typography>
                                <textarea className={classes.textarea}
                                          onChange={e => this.setState({text: e.target.value})}
                                          value={this.state.text}
                                          placeholder="Maximum 240 characters..."></textarea>
                                <input className={classes.submit} onClick={this.handleSubmit} type="submit"
                                       name="submit" value="Submit"/>
                            </Grid>
                            }
                            {this.state.comments && this.state.comments.length > 0 ?
                                <div>
                                    {this.state.comments.map(comment =>
                                        <Grid container justify="center">
                                            <Grid item xs={12} sm={this.getIdentation(comment)}>
                                                <Typography
                                                    variant="h6">{comment.user.firstName} {comment.user.lastName} | {comment.created}</Typography>
                                            </Grid>
                                            {this.isCurrentUser(comment) &&
                                            <Grid item xs={12} sm={this.getIdentation(comment)}>
                                                <Button onClick={(e) => this.handleCommentOpen(e, comment)}
                                                        className={classes.buttonEditComment}>Edit Comment</Button>
                                            </Grid>

                                            }
                                            {this.isCurrentUser(comment) &&
                                            <Grid item xs={12} sm={this.getIdentation(comment)}>
                                                <Button onClick={(e) => this.handleCommentDelete(comment)}
                                                        className={classes.buttonDeleteComment}>Delete Comment</Button>
                                            </Grid>
                                            }
                                            <Divider/>
                                            <Grid item xs={12}>
                                                <Typography>
                                                        <pre style={{fontFamily: 'inherit'}}>
                                                            {comment.text}
                                                        </pre>
                                                </Typography>
                                            </Grid>
                                            <br/>
                                            {this.state.openedCommentId !== null && this.state.openedCommentId === comment.id ?
                                                <Dialog open={true}
                                                        onClose={(e) => this.handleCommentClose(e)}>
                                                    <DialogTitle>Edit a comment</DialogTitle>
                                                    <DialogContent>
                                                        <DialogContentText>
                                                            Edit the following comment: '{comment.text}'. Created
                                                            by: {comment.user.firstName} {comment.user.lastName}
                                                        </DialogContentText>
                                                        <TextField
                                                            autoFocus
                                                            margin="dense"
                                                            id="commentInField"
                                                            label="Comment"
                                                            type="comment"
                                                            variant="standard"
                                                            value={comment.text}
                                                            fullWidth
                                                            multiline={true}
                                                            onChange={(event) => this.handleCommentChange(event, comment)}
                                                        />
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button
                                                            onClick={(e) => this.handleCommentClose(e)}>Cancel</Button>
                                                        <Button
                                                            onClick={(e) => this.handleCommentEdit(e, comment)}>Update</Button>
                                                    </DialogActions>
                                                </Dialog>
                                                : null}
                                        </Grid>
                                    )}
                                </div>
                                :
                                <Typography variant="h6">No comments yet!</Typography>
                            }
                        </Grid>
                    </Grid>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, {withTheme: true})(ProductDetail));
