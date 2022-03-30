import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import styles from './FormStyle.jsx';
import Container from '@material-ui/core/Container';
import sendRequest from "../Request.js";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputAdornment from "@material-ui/core/InputAdornment";
import {notify} from 'react-notify-toast';
import {getCurrentUser, sendRequestWithHeader} from "../Request";
import Alert from 'react-popup-alert'


class AddProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: '',
            imagePreview: '',
            brandTypes: [],
            modelTypes: [],
            processorTypes: [],
            graphicsCards: [],
            model: '',
            description: '',
            brandType: '',
            graphicsCard: '',
            modelType: '',
            processorType: '',
            ram: '',
            storageInGB: '',
            price: '',
            errors: '',
            errorsInit: false,
            user: null
        };
        console.log("Constructor" + this.state.errors);


        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        sendRequest('/api/products/filter/graphicscard/', 'GET', {}, (response) => {
            response.json().then((json) => {
                this.setState({graphicsCards: json.sort()});
            });
        });
        sendRequest('/api/products/filter/brandtype/', 'GET', {}, (response) => {
            response.json().then((json) => {
                this.setState({brandTypes: json.sort()});
            });
        });
        sendRequest('/api/products/filter/processortype/', 'GET', {}, (response) => {
            response.json().then((json) => {
                this.setState({processorTypes: json.sort()});
            });
        });
        sendRequest('/api/products/filter/modeltype/', 'GET', {}, (response) => {
            response.json().then((json) => {
                this.setState({modelTypes: json.sort()});
            });
        });
        getCurrentUser((user) => this.setState({user: user}))
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        console.log(target);
        console.log(value);
        console.log(name);

        if (name === 'image') {
            this.setState({
                imagePreview: URL.createObjectURL(target.files[0]),
                image: target.files[0]
            })
        } else {
            this.setState({
                [name]: value
            });

        }
    }

    handleSubmit(event) {
        event.preventDefault();
        let errors = this.validateData();
        if (errors !== '') {
            console.log(errors);
            this.setState({
                errors: errors
            });
            return;
        }
        const uri = '/api/products';
        var product = {
            model: this.state.model,
            description: this.state.description,
            brandType: this.state.brandType,
            graphicsCard: this.state.graphicsCard,
            modelType: this.state.modelType,
            processorType: this.state.processorType,
            ram: this.state.ram,
            storageInGB: this.state.storageInGB,
            price: this.state.price
        };
        let data = new FormData();
        data.append('product', JSON.stringify(product));
        data.append('file', this.state.image);

        let headers = new Headers({
            'Accept-Type': 'application/json'
        });


        sendRequestWithHeader(uri, 'POST', data, headers, (response) => {
            notify.show("Successfully added product!", 'success', 7000);
            response.json().then((json) => {
                let id = json.id;
                this.props.history.push('/product/' + id);
            });
        });
    }

    validateData() {
        let message = '';
        if (this.state.model === '') {
            message += "Model cannot be empty. "
        }
        if (this.state.description === '') {
            message += "Description cannot be empty. "
        }
        if (this.state.brandType === '') {
            message += "Brand cannot be empty. "
        }
        if (this.state.graphicsCard === '') {
            message += "Graphics Card cannot be empty. "
        }
        if (this.state.modelType === '') {
            message += "Model Type  cannot be empty. "
        }
        if (this.state.ram === '') {
            message += "RAM cannot be empty. "
        }
        if (this.state.storageInGB === '') {
            message += "Storage cannot be empty. "
        }
        if (this.state.price === '') {
            message += "Price cannot be empty. "
        }
        if (this.state.imagePreview === '') {
            message += "Image must be set. "
        }
        return message;
    }

    render() {
        const {classes} = this.props;
        if (this.state.user === null) {
            return (
                <div className={classes.paper}>
                    <h1>You are not logged in!</h1>
                </div>
            );
        }
        if (this.state.user.role === 'CUSTOMER') {
            return (
                <div className={classes.paper}>
                    <h1>You cannot add new products!</h1>
                </div>
            );
        }
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Typography variant="h5">
                        Add product
                    </Typography>
                    {this.state.errors !== '' ?
                        <Alert
                            header={'ERROR'}
                            btnText={'Close'}
                            text={this.state.errors}
                            type='error'
                            show='true'
                            onClosePress={() => {
                                this.setState({errors: ''})
                            }}
                            pressCloseOnOutsideClick={true}
                            showBorderBottom={true}
                            alertStyles={{}}
                            headerStyles={{}}
                            textStyles={{}}
                            buttonStyles={{}}
                        />
                        : null}
                    <form style={{marginBottom: 40}} className={classes.form} onSubmit={this.handleSubmit}>
                        <Grid container spacing={2} alignItems="center" justifyContent="center">
                            <Grid item xs={12}>
                                <img className={classes.media} src={this.state.imagePreview}/>
                            </Grid>
                            <Grid item xs={12}>
                                <input type='file' id='image' name='image' className={classes.upload}
                                       onChange={this.handleInputChange}/>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="filled" className={classes.input} autoFocus>
                                    <InputLabel id='modelType-label' className={classes.text}>Model Type</InputLabel>
                                    <Select
                                        value={this.state.modelType}
                                        onChange={this.handleInputChange}
                                        name='modelType'
                                        id='modelType'
                                        labelId='modelType-label'>
                                        {this.state.modelTypes.map(value => (
                                            <MenuItem value={value}>{value}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="filled" className={classes.input}>
                                    <InputLabel id='brandtype-label' className={classes.text}>Brand</InputLabel>
                                    <Select
                                        value={this.state.brandType}
                                        onChange={this.handleInputChange}
                                        name='brandType'
                                        id='brandType'
                                        labelId='brandtype-label'>
                                        {this.state.brandTypes.map(value => (
                                            <MenuItem value={value}>{value}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    className={classes.input}
                                    name="model"
                                    variant="filled"
                                    fullWidth
                                    id="model"
                                    label="Model"

                                    value={this.state.model}
                                    onChange={this.handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="filled" className={classes.input}>
                                    <InputLabel id='graphicscard-label' className={classes.text}>Graphics
                                        Card</InputLabel>
                                    <Select
                                        value={this.state.graphicsCard}
                                        onChange={this.handleInputChange}
                                        name='graphicsCard'
                                        id='graphicsCard'
                                        labelId='graphicscard-label'>
                                        {this.state.graphicsCards.map(value => (
                                            <MenuItem value={value}>{value}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="filled" className={classes.input}>
                                    <InputLabel id='processorType-label' className={classes.text}>Processor</InputLabel>
                                    <Select
                                        value={this.state.processorType}
                                        onChange={this.handleInputChange}
                                        name='processorType'
                                        id='processorType'
                                        labelId='processorType-label'>
                                        {this.state.processorTypes.map(value => (
                                            <MenuItem value={value}>{value}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    className={classes.input}
                                    name="ram"
                                    variant="filled"
                                    fullWidth
                                    type="number"
                                    id="ram"
                                    label="RAM"
                                    InputProps={{endAdornment: <InputAdornment position="end">GB</InputAdornment>}}

                                    value={this.state.ram}
                                    onChange={this.handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    className={classes.input}
                                    name="storageInGB"
                                    variant="filled"
                                    fullWidth
                                    id="storageInGB"
                                    label="Storage"
                                    type="number"
                                    InputProps={{endAdornment: <InputAdornment position="end">GB</InputAdornment>}}

                                    value={this.state.storageInGB}
                                    onChange={this.handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    className={classes.input}
                                    name="price"
                                    variant="filled"
                                    fullWidth
                                    id="price"
                                    label="Price"
                                    type="number"
                                    InputProps={{endAdornment: <InputAdornment position="end">$</InputAdornment>}}

                                    value={this.state.price}
                                    onChange={this.handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    className={classes.input}
                                    name="description"
                                    variant="filled"
                                    multiline
                                    fullWidth
                                    id="description"
                                    label="Description"
                                    // 
                                    value={this.state.description}
                                    onChange={this.handleInputChange}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.submit}
                            onClick={this.handleSubmit}>
                            Submit
                        </Button>
                    </form>
                </div>
            </Container>
        );
    }
}

export default withStyles(styles, {withTheme: true})(AddProduct);
