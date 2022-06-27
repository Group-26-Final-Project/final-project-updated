import React, { useEffect, useRef, useState } from "react";
import { Avatar, Box, Button, Card, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import CandidatesList from "../components/CandidatesList";
import Countdown from "../components/countdown";
import { useSelector, useDispatch } from "react-redux";
import {
  getBalance,
  getCurrentPhase,
  getMyElection,
} from "../features/votingSlice";
import { SpinnerCircularFixed } from "spinners-react";
import { useNavigate } from "react-router-dom";

const isEqual = (...objects) =>
  objects.every((obj) => JSON.stringify(obj) === JSON.stringify(objects[0]));

function VotePage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userState);
  const votingState = useSelector((state) => state.votingState);
  const [remainingVote, setRemainingVote] = React.useState(0);
  const navigate = useNavigate();

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
  }, [dispatch]);
  useEffect(() => {
    dispatch(getBalance(userState.user._id))
      .unwrap()
      .then(() => {
        if (votingState.voterBalance) {
          if (Number(votingState.voterBalance.hex) >= 2) {
            setRemainingVote(2);
          } else {
            setRemainingVote(Number(votingState.voterBalance.hex));
          }
        }
        // console.log(votingState.currentPhase);
        // startTimer(Number(votingState.currentPhase[2].hex));
      })
      .catch(() => {});
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

                {votingState.election && (
                  <>
                    {votingState.election.status === 0 && (
                      <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        aligntItems="center"
                      >
                        <Typography
                          className={classes.my_typogrphy}
                          variant="h4"
                        >
                          This Election has been paused. Please wait patiently
                          until it resumes!!
                        </Typography>
                        <div class="bg-[#00D05A] float-right text-white py-3 mt-7 ml-2 mr-2 px-4 rounded-xl font-body font-light center text-sm text-center">
                          <button
                            onClick={() => {
                              navigate("/auth/Result");
                            }}
                          >
                            Go To Results
                          </button>
                        </div>
                      </Grid>
                    )}
                    {votingState.election.status === 2 && (
                      <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        aligntItems="center"
                      >
                        <Typography
                          className={classes.my_typogrphy}
                          variant="h4"
                        >
                          This Election has Ended.
                        </Typography>
                        <div class="bg-[#00D05A] float-right text-white py-3 mt-7 ml-2 mr-2 px-4 rounded-xl font-body font-light center text-sm text-center">
                          <button
                            onClick={() => {
                              navigate("/auth/Result");
                            }}
                          >
                            Go To Results
                          </button>
                        </div>
                      </Grid>
                    )}
                  </>
                )}

                {votingState.getCurrentPhaseStatus === "success" &&
                  votingState.currentPhase &&
                  votingState.voterBalance &&
                  votingState.getMyElectionStatus === "success" && (
                    <>
                      {votingState.election.status === 1 && (
                        <Grid container direction="row" justifyContent="center">
                          <Countdown
                            expiryTimestamp={votingState.election.endDate}
                            votesRemaining={
                              Number(votingState.voterBalance.hex) === 0
                                ? 2
                                : Number(votingState.voterBalance.hex) >= 2
                                ? 0
                                : 1
                            }
                          />
                        </Grid>
                      )}
                    </>
                  )}
                {votingState.getMyElectionStatus === "success" && votingState.election.status === 1 && (
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
                )}
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
              {/* {!(
                userState.getUserStatus === "pending" ||
                votingState.getMyElectionStatus === "pending"
              ) &&
                userState.user.role === "candidate" && (
                  <Grid container justifyContent="center">
                    <Typography>You are a candidate, you cant vote!</Typography>
                  </Grid>
                )} */}
              {!(
                userState.getUserStatus === "pending" ||
                votingState.getMyElectionStatus === "pending"
              ) &&
                // userState.user.role === "voter" &&
                votingState.election &&
                votingState.election.candidates &&
                votingState.voterBalance &&
                votingState.election.status === 1 && (
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
                        votesRemaining={
                          Number(votingState.voterBalance.hex) === 0
                            ? 2
                            : Number(votingState.voterBalance.hex) >= 2
                            ? 0
                            : 1
                        }
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
