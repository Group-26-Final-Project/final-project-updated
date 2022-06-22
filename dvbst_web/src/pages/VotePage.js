import React, { useEffect, useRef, useState } from "react";
import { Avatar, Box, Button, Card, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import CandidatesList from "../components/CandidatesList";
import Countdown from "../components/countdown";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentPhase, getMyElection } from "../features/votingSlice";
import { SpinnerCircularFixed } from "spinners-react";

const isEqual = (...objects) =>
  objects.every((obj) => JSON.stringify(obj) === JSON.stringify(objects[0]));

function VotePage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userState);
  const votingState = useSelector((state) => state.votingState);

  useEffect(() => {
    dispatch(getMyElection());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCurrentPhase())
      .unwrap()
      .then(() => {
        console.log(votingState.currentPhase);
        // startTimer(Number(votingState.currentPhase[2].hex));
      })
      .catch(() => {});
    // const extractCurrentPhase = async () => {
    //   try {
    //     const response = await CustomAxios.get("/phase");
    //     // console.log(response.data.data);
    //     // return response.data.data;
    //     setzCountdownDate(Number(response.data.data.currentPhase[2].hex))

    //     // startTimer();
    //   } catch (err) {
    //     setphaseError(err.message)
    //   }
    // }
    // extractCurrentPhase();
    // return () => {
    //   clearInterval(interval.current);
    // };
  }, [dispatch]);
  return (
    <div>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        spacing={5}
        style={{ height: "100vh" }}
      >
        <Grid item xs={12} className={classes.body}>
          <Grid container justifyContent="center">
            <Grid item xs={9}>
              <Grid container direction="row" justifyContent="center">
                {/* <Typography variant='h4' className={classes.my_typogrphy}>Time Remaining </Typography> */}
                {/* <Typography variant='h4' className={classes.my_typogrphy}>{timerDays} : {timerHours} : {timerMinutes} : {timerSeconds}</Typography> */}
                {votingState.getCurrentPhaseStatus === "success" && votingState.currentPhase && (
                <Countdown expiryTimestamp={Number(votingState.currentPhase[2].hex)} />

                )}
                <Grid
                  item
                  xs={8}
                  sm={8}
                  justifyContent="center"
                  alignContent="center"
                >
                  <Typography className={classes.my_typogrphy} variant="h4">
                    {votingState.election ? votingState.election.name : ""}{" "}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={11} md={9} style={{ height: "75vh" }}>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            spacing={5}
          >
            <Grid item xs={12}>
              {(userState.getUserStatus === "pending" ||
                votingState.getMyElectionStatus === "pending") && (
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
              {(userState.getUserStatus === "failed" ||
                votingState.getMyElectionStatus === "failed") && (
                <Grid container justifyContent="center">
                  <h3>Ooops something went wrong</h3>
                </Grid>
              )}
              {!(
                userState.getUserStatus === "pending" ||
                votingState.getMyElectionStatus === "pending"
              ) &&
                userState.user.role === "candidate" && (
                  <Grid container justifyContent="center">
                    <Typography>You are a candidate, you cant vote!</Typography>
                  </Grid>
                )}
              {!(
                userState.getUserStatus === "pending" ||
                votingState.getMyElectionStatus === "pending"
              ) &&
                userState.user.role === "voter" &&
                votingState.election &&
                votingState.election.candidates && (
                  <>
                    {votingState.election.candidates.map((candidate) => (
                      <CandidatesList
                        key={candidate._id}
                        id={candidate._id}
                        name={candidate.name}
                        fname={candidate.fname}
                        dept={candidate.dept}
                        year={candidate.year}
                        section={candidate.section}
                        electionId={votingState.election._id}
                      />
                    ))}
                  </>
                )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
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
export default VotePage;
