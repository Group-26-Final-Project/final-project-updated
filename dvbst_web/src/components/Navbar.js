import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { Container, Grid, makeStyles } from '@material-ui/core';
import * as React from 'react';
import { Link } from 'react-router-dom';
import NavbarDropdown from './NavbarDropdown';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        color: "white",

    },
    appbar_styles: {

        backgroundColor: "#2F313D"
    },
    Navbar_styles: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",

    },
    left_bar: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        paddingTop: "20px",

    },
    right_bar: {
        display: "flex",
        justifyContent: "end",
        padding: "15px",
    }
}));

function Navbar() {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appbar_styles}>
                <Container>

                    <Grid container>
                        <Grid item xs={12} className={classes.Navbar_styles}>
                            <Grid item xs={11} sm={9} md={6} lg={6} className={classes.left_bar} >
                                <Grid item xs={4}  >
                                    <Link to="/" color='white'>
                                        <Typography variant="h6" className={classes.title}>
                                            Home
                                        </Typography>
                                    </Link>
                                </Grid>
                                <Grid item xs={4}>
                                    <Link to="/auth/ideas">
                                        <Typography variant="h6" className={classes.title}>
                                            Ideas
                                        </Typography>
                                    </Link>
                                </Grid>
                                <Grid item xs={4}>
                                    <Link data-cy="voting-button" to="/auth/PreVoting">
                                        <Typography variant="h6" className={classes.title}>
                                            Voting
                                        </Typography>
                                    </Link>
                                </Grid>
                                <Grid item xs={4}>
                                    <Link to="/auth/Result">
                                        <Typography variant="h6" className={classes.title}>
                                            Result
                                        </Typography>
                                    </Link>
                                </Grid>
                            </Grid>
                            <Grid item xs={1} sm={3} md={6} lg={6} className={classes.right_bar}
                            >
                                <NavbarDropdown/>
                            </Grid>

                        </Grid>
                    </Grid>
                </Container>
            </AppBar>
        </div >
    );
}

export default Navbar