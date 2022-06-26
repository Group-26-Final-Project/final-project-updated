import { Avatar, Box, Grid, makeStyles, Typography } from "@material-ui/core";
// import { lightBlue, lightGreen } from '@material-ui/core/colors';
import React from "react";
// import Navbar from '../Navbar'
import Logs from "../logs";
import { Link } from "react-router-dom";
import { MdAllOut } from "react-icons/md";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  body: {
    justifyContent: "center",
    padding: theme.spacing(4),
    backgroundColor: "#2F313D",
  },
  upper_part: {
    padding: theme.spacing(4),
    marginTop: theme.spacing(4),
  },
  lower_part: {
    display: "flex",
    backgroundColor: "#e5e5e",
  },
  inner_body: {},
  p_style: {
    textAlign: "center",
    padding: "0px 150px",
  },
  mybutton: {
    width: "25%",
  },
  avatar: {
    backgroundColor: "#00D05A33",
    color: "#00D05A",
  },
}));

function HomeScreen() {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid
        container
        xs={12}
        direction="row"
        justifyContent="center"
        className={classes.body}
      >
        <Grid xs={12} sm={12} md={10} lg={10} container>
          <Grid
            container
            item
            xs={7}
            direction="column"
            justifyContent="center"
            alignItems="center"
            alignContent="center"
          >
            <Box>
              <Typography
                style={{ fontSize: "48px", color: "white", fontWeight: "Bold" }}
              >
                <span
                  style={{
                    color: "#00D05A",
                    fontFamily: "Poppins",
                    fontWeight: "Bold",
                  }}
                >
                  Modern and Secure
                </span>
                <br /> AAiT Student <br /> Council Election
              </Typography>
              <Box
                component="button"
                type="submit"
                variant="contained"
                color="white"
                borderRadius="20px"
                px={4}
                py={1}
                mt={4}
                // borderColor="#00D05A"
                bgcolor="#00D05A"
              >
                <Link to="/auth/Voting_underway">Start Voting</Link>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={5}
            justifyContent="center"
            alignItems="center"
            direction="column"
          >
            <Logs />
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        xs={12}
        direction="row"
        justifyContent="center"
        className={classes.upper_part}
        alignItems="center"
      >
        <Grid
          container
          xs={12}
          sm={12}
          md={10}
          lg={10}
          justifyContent="space-around"
        >
          <Grid
            xs={3}
            container
            item
            // direction="column"
            // alignItems='center'
            // justifyContent="space-around"
            // spacing={3}
          >
            <Grid item container direction="column" alignItems="center">
              <Avatar className={classes.avatar}>
                <MdAllOut />
              </Avatar>
              <Typography variant="h6">Highly Secure</Typography>
              <Typography variant="body2" align="center">
                Blockchain-based election system means your vote is anonymous
                and the integrity of the election is maintained.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={3} container>
            <Grid item container direction="column" alignItems="center">
              <Avatar className={classes.avatar}>
                <MdAllOut />
              </Avatar>
              <Typography variant="h6">Opinionated</Typography>
              <Typography variant="body2" align="center">
                Your opinions are valued. You can vote for the ideas you want to
                see implemented in AAit. It doesn’t stop at voting. You can also
                suggest your own ideas.
              </Typography>
            </Grid>
          </Grid>
          <Grid container xs={3}>
            <Grid item container direction="column" alignItems="center">
              <Avatar className={classes.avatar}>
                <MdAllOut />
              </Avatar>
              <Typography variant="h6">Real-time Results</Typography>
              <Typography variant="body2" align="center">
                You can follow the status of the election and stay up-to-date
                with election information
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default HomeScreen;
