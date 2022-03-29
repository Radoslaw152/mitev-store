import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import {Button, Grid, Typography} from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import sendRequest, {getCurrentUser} from '../Request';

const styles = theme => ({
    text: {
        fontWeight: "bold"
    },
    header: {
        backgroundColor: "salmon"
    },
    headerTitle: {
        fontWeight: "bold",
        fontSize: 20
    },
    buttonEdit: {
        backgroundColor: "yellow",
        color: "black",
        fontWeight: "bold",
        marginLeft: 80,
        boxShadow: "3px 3px darkred"
    },
    paper: {
        marginTop: theme.spacing(20),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: "lightyellow"
    }
});

class AdminPanel extends React.Component {
    constructor() {
        super();
        this.state = {users: [], user: null};
        this.handleEditProfile = this.handleEditProfile.bind(this);
    }

    componentDidMount() {
        getCurrentUser((user) => {
            this.setState({user: user});
            if (user !== null && user.role === 'ADMIN') {
                const uri = '/api/users';
                sendRequest(uri, 'GET', {}, (response) => {
                    response.json().then((json) => {
                        this.setState({users: json});
                    });
                });
            }
        });
    }

    handleEditProfile(id) {
        this.props.history.push('/editAccount/' + id);
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
        if (this.state.user.role !== 'ADMIN') {
            return (
                <div className={classes.paper}>
                    <h1>You are not admin!</h1>
                </div>
            );
        }
        return (
            <Grid style={{marginBottom: 150}} container spacing={3} justify="center" className={classes.root}>
                <Grid item xs={8}>
                    <Typography className={classes.text} variant="h4">
                        All users
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow className={classes.header}>
                                <TableCell align="left" className={classes.headerTitle}>Username</TableCell>
                                <TableCell align="right" className={classes.headerTitle}>First name</TableCell>
                                <TableCell align="right" className={classes.headerTitle}>Last name</TableCell>
                                <TableCell align="right" className={classes.headerTitle}>Created</TableCell>
                                <TableCell align="right" className={classes.headerTitle}>Options</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.users.map(user => (
                                <TableRow key={user.id}>
                                    <TableCell align="left">{user.username}</TableCell>
                                    <TableCell align="right">{user.firstName}</TableCell>
                                    <TableCell align="right">{user.lastName}</TableCell>
                                    <TableCell align="right">{user.updated}</TableCell>
                                    <TableCell align="right">
                                        <Grid item>
                                            <Button  onClick={(e) => this.handleEditProfile(user.id)} className={classes.buttonEdit}>
                                                Edit Profile
                                            </Button>
                                        </Grid>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Grid>
            </Grid>
        );
    }

}

export default withStyles(styles, {withTheme: true})(AdminPanel);

