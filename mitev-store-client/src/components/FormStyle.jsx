const styles = theme => ({
    body: {
        backgroundColor: "lightyellow"
    },
    paper: {
        marginTop: theme.spacing(20),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: "lightyellow"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: "darkred"
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
        color: "black"
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: "darkred",
        color: "white"
    },
    input: {
        backgroundColor: "white"
    },
    upload: {
        margin: theme.spacing(3, 0, 2),
        fontSize: 22
    },
    media: {
        height: 200,
        borderRadius: 200,
        alignItems: "center",
        justifyContent: "center"
    }
});

export default styles;
