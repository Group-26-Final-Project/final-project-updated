import { Box, Button } from "@material-ui/core";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import Voting_Svg from "../Voting_Svg";
// import Navbar from "../Navbar";
import { useTimer } from "react-timer-hook";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  body: {
    padding: theme.spacing(4),
    backgroundColor: "#2F313D",
    minHeight: "100vh",
  },
  my_typography: {
    color: "#fff",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    fontFamily: "Poppins",
  },
  mobile_typography: {
    color: "#fff",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
    fontFamily: "Poppins ",
  },
  mobile_layout: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  web_layout: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    color: "#fff",
  },
}));

function BeforeVoting({
  expiryTimestamp,
  primaryText,
  secondaryText,
  currentPhase,
}) {
  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });
  const navigate = useNavigate();

  const classes = useStyles();
  const formatTime = (time) => {
    return String(time).padStart(2, "0");
  };
  return (
    <Grid container className={classes.body}>
      {/* <Navbar /> */}
      <Grid container direction="row">
        <Grid
          xs={12}
          sm={9}
          md={7}
          lg={7}
          container
          justifyContent="center"
          alignContent="center"
        >
          <Typography
            className={classes.my_typography}
            color="white"
            variant="h2"
          >
            {primaryText ? primaryText : "Voting"}{" "}
            <span
              style={{
                color: "#00D05A",
                fontWeight: "SemiBold",
              }}
            >
              {secondaryText ? secondaryText : "opens"}
            </span>{" "}
            {primaryText ? "" : "in"} <br />
          </Typography>
          <Typography
            className={classes.mobile_typography}
            color="white"
            variant="h3"
          >
            {primaryText ? primaryText : "Voting"}{" "}
            <span
              style={{
                color: "#00D05A",
                fontWeight: "SemiBold",
              }}
            >
              {secondaryText ? secondaryText : "opens"}
            </span>{" "}
            {primaryText ? "" : "in"} <br />
            {/* {timerDays} : {timerHours} : {timerMinutes} : {timerSeconds} */}
          </Typography>
          {/* <Typography className={classes.mobile_typography} variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis,
            egestas vitae at nisl felis in libero, aliquet in.
          </Typography> */}
          {!primaryText && (
            <Grid item xs={9} className={classes.web_layout}>
              <Box
                display="flex"
                justifyContent="space-between"
                width="100%"
                mb={5}
                ml={6}
              >
                <Box display="flex" flexDirection="column">
                  <Typography className={classes.my_typograghy} variant="h3">
                    {formatTime(days)}
                  </Typography>
                  <Typography className={classes.my_typograghy} variant="h4">
                    Days
                  </Typography>
                </Box>
                <Box display="flex" flexDirection="column">
                  <Typography className={classes.my_typograghy} variant="h3">
                    {formatTime(hours)}
                  </Typography>
                  <Typography className={classes.my_typograghy} variant="h4">
                    Hours
                  </Typography>
                </Box>
                <Box display="flex" flexDirection="column">
                  <Typography className={classes.my_typograghy} variant="h3">
                    {formatTime(minutes)}
                  </Typography>
                  <Typography className={classes.my_typograghy} variant="h4">
                    Mintues
                  </Typography>
                </Box>
                <Box display="flex" flexDirection="column">
                  <Typography className={classes.my_typograghy} variant="h3">
                    {formatTime(seconds)}
                  </Typography>
                  <Typography className={classes.my_typograghy} variant="h4">
                    Seconds
                  </Typography>
                </Box>
              </Box>
              <Box
                display="flex"
                ml={15}
                style={{ width: "100%" }}
                className={classes.web_layout}
              >
                <Button
                  variant="outlined"
                  style={{
                    borderRadius: 5,
                    padding: "10px 36px",
                    fontSize: "14px",
                    borderColor: "#00D05A",
                    minWidth: "150px",
                  }}
                >
                  <Link
                    onClick={() => {
                      navigate("/auth/Result");
                    }}
                    underline="none"
                    color="#00D05A"
                  >
                    Go To Results
                  </Link>
                </Button>
              </Box>
            </Grid>
          )}
        </Grid>
        <Grid
          container
          xs={12}
          sm={12}
          md={5}
          lg={5}
          alignContent="center"
          justifyContent="center"
        >
          <Voting_Svg />
        </Grid>
        {!primaryText && (
          <Grid
            container
            xs={12}
            justifyContent="center"
            //  style={{ borderStyle: "dashed", width: "100%", borderColor: "black" }}
            className={classes.mobile_layout}
          >
            <Grid item xs={12} className={classes.mobile_layout}>
              <Box
                display="flex"
                // width="100%"
                justifyContent="space-between"
                // style={{ borderStyle: "dashed", width: "100%", borderColor: "black" }}
                mb={5}
              >
                <Box display="flex" flexDirection="column">
                  <Typography
                    className={classes.mobile_typography}
                    variant="h4"
                  >
                    {formatTime(days)}
                  </Typography>
                  <Typography
                    className={classes.mobile_typography}
                    variant="h6"
                  >
                    Days
                  </Typography>
                </Box>
                <Box display="flex" flexDirection="column">
                  <Typography
                    className={classes.mobile_typography}
                    variant="h4"
                  >
                    {formatTime(hours)}
                  </Typography>
                  <Typography
                    className={classes.mobile_typography}
                    variant="h6"
                  >
                    Hours
                  </Typography>
                </Box>
                <Box display="flex" flexDirection="column">
                  <Typography
                    className={classes.mobile_typography}
                    variant="h4"
                  >
                    {formatTime(minutes)}
                  </Typography>
                  <Typography
                    className={classes.mobile_typography}
                    variant="h6"
                  >
                    Mintues
                  </Typography>
                </Box>
                <Box display="flex" flexDirection="column">
                  <Typography
                    className={classes.mobile_typography}
                    variant="h4"
                  >
                    {formatTime(seconds)}
                  </Typography>
                  <Typography
                    className={classes.mobile_typography}
                    variant="h6"
                  >
                    Seconds
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

export default BeforeVoting;
