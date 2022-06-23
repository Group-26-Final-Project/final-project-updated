import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBalance, getCurrentPhase } from "../features/votingSlice";
import { Box, Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { SpinnerCircularFixed } from "spinners-react";
import VotingUnderway from "./VotingUnderway";
import BeforeVoting from "./BeforeVoting";
import Link from "@mui/material/Link";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  body: {
    padding: theme.spacing(4),
    backgroundColor: "#2F313D",
    minHeight: "25vh",
  },
  my_typogrphy: {
    color: "white",
  },
}));

function PreVoting() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userState);
  const votingState = useSelector((state) => state.votingState);
  const classes = useStyles();

  useEffect(() => {
    dispatch(getBalance(userState.user._id))
      .unwrap()
      .then(() => {
        // console.log(votingState.currentPhase);
        // startTimer(Number(votingState.currentPhase[2].hex));
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    dispatch(getCurrentPhase())
      .unwrap()
      .then(() => {
        console.log(votingState.currentPhase);
        // startTimer(Number(votingState.currentPhase[2].hex));
      })
      .catch(() => {});
  }, []);

  return (
    <Grid container style={{ backgroundColor: "#2F313D", minHeight: "100vh" }}>
      {" "}
      {votingState.getCurrentPhaseStatus === "pending" && (
        <Grid container justifyContent="center" alignItems="center">
          <SpinnerCircularFixed
            size={50}
            thickness={100}
            speed={100}
            color="#36ad47"
            secondaryColor="rgba(0, 0, 0, 0.44)"
          />
        </Grid>
      )}
      {votingState.getCurrentPhaseStatus === "failed" && (
        <Typography>failed</Typography>
      )}
      {votingState.getCurrentPhaseStatus === "success" &&
        votingState.getVoterBalanceStatus === "success" && (
          <Grid container justifyContent="center">
            {votingState.currentPhase[0] === 0 && (
              <BeforeVoting
                expiryTimestamp={Number(votingState.currentPhase[2].hex)}
                primaryText={"Currently"}
                secondaryText={"Registering"}
              />
            )}
            {(votingState.currentPhase[0] === 1 ||
              votingState.currentPhase[0] === 3 ||
              votingState.currentPhase[0] === 5) && (
              // <BeforeVoting />
              <BeforeVoting
                expiryTimestamp={Number(votingState.currentPhase[2].hex)}
              />
            )}
            {(votingState.currentPhase[0] === 2 ||
              votingState.currentPhase[0] === 4 ||
              votingState.currentPhase[0] === 6) && (
              <Grid container
              direction="column"
              justifyContent="center"
              alignItems="center">
                {Number(votingState.voterBalance.hex) >= 2 ? (
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    style={{ marginTop: "-10vh" }}

                  >
                    <Typography variant="h3" className={classes.my_typogrphy}>
                      You have Already Voted!!
                    </Typography>
                    {/* <Typography variant="h3" className={classes.my_typogrphy}>
                      Please go to result page
                    </Typography>{" "} */}
                    <Box
                      display="flex"
                      // ml={20}
                      justifyContent="center"
                      alignItems="center"
                      style={{ width: "100%", marginTop: "20px" }}
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
                        <Link href="/auth/Result" underline="none" color="#00D05A">
                          Go To Results
                        </Link>
                      </Button>
                    </Box>
                  </Grid>
                ) : (
                  <VotingUnderway
                    expiryTimestamp={Number(votingState.currentPhase[2].hex)}
                  />
                )}
              </Grid>
            )}
            {votingState.currentPhase[0] === 7 && (
              <BeforeVoting
                expiryTimestamp={Number(votingState.currentPhase[2].hex)}
                primaryText="All Elections"
                secondaryText="Completed"
              />
            )}
          </Grid>
        )}
    </Grid>
  );
}

export default PreVoting;
