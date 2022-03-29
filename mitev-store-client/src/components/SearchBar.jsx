import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%'
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: "black"
    },
    inputRoot: {
        color: 'black',
        fontSize: 20
    },
    inputInput: {
        padding: theme.spacing(0, 0, 0, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 620,
        }
    },
    searchbar: {
        height: 60,
        backgroundColor: "white",
        borderRadius: 10,
        border: "2px solid darkred"
    }
});

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {input: ''};


        this.handleInputChange = this.handleInputChange.bind(this);
        this.keyPressed = this.keyPressed.bind(this);
    }

    handleInputChange(event) {
        this.setState({input: event.target.value});
    }

    keyPressed(event) {
        if (event.key === "Enter") {
            this.submit(event);
        }
    }

    submit = (event) => {
        event.preventDefault();
        window.location.href = `/search/${this.state.input}`;
    };

    render() {
        const {classes} = this.props;
        return (
            <AppBar position="static" className={classes.searchbar}>
                <Toolbar>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon/>
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput
                            }}
                            inputProps={{'aria-label': 'search'}}
                            onChange={this.handleInputChange}
                            onKeyPress={this.keyPressed}
                            value={this.state.input}
                            props={this.props}
                        />
                    </div>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(styles, {withTheme: true})(SearchBar);
