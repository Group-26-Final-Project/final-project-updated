import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentPhase } from "../features/votingSlice";
import { Box, Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { SpinnerCircularFixed } from "spinners-react";
import VotingUnderway from "./VotingUnderway";
import BeforeVoting from "./BeforeVoting";

function PreVoting() {
  const dispatch = useDispatch();

  const votingState = useSelector((state) => state.votingState);
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
      {votingState.getCurrentPhaseStatus === "success" && (
        <Grid>
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
            <VotingUnderway
              expiryTimestamp={Number(votingState.currentPhase[2].hex)}
            />
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
