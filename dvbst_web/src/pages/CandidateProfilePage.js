import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import { Container } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import { Card } from "@material-ui/core";
import { Grid, Button } from "@material-ui/core";
import { useNavigate, useLocation } from "react-router-dom";
import { SpinnerCircularFixed } from "spinners-react";
import { getCandidate } from "../features/candidatesSlice";
import { useDispatch, useSelector } from "react-redux";

const deptTypes = [
  "Software Engineering",
  "Biomedical Engineering",
  "Chemical Engineering",
  "Civil Engineering",
  "Electrical Engineering",
  "Mechanical Engineering",
];

export default function CandidateProfilePage() {
  let location = useLocation();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const candidatesState = useSelector((state) => state.candidatesState);

  const userState = useSelector((state) => state.userState);
  const candidateId = location.state || userState.user._id;

  console.log("Candidate ID", userState.user._id);
  const onCancel = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getCandidate(candidateId));
  }, [candidateId, dispatch]);

  return (
    <Grid
      container
      spacing={3}
      direction="row"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh", minWidth: "80vw" }}
    >
      {candidatesState.getCandidateStatus === "pending" && (
        <>
          <SpinnerCircularFixed
            size={50}
            thickness={100}
            speed={100}
            color="#36ad47"
            secondaryColor="rgba(0, 0, 0, 0.44)"
          />
        </>
      )}
      {candidatesState.getCandidateStatus === "failed" && (
        <>
          <h3>Ooops something went wrong</h3>
          <h2>{candidatesState.getCandidateError}</h2>
        </>
      )}
      {candidatesState.getCandidateStatus === "success" &&
        candidatesState.candidate && (
          <>
            <Grid item xs={12} lg={3}>
              <Paper elevation={3}>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  spacing={3}
                  alignItems="center"
                  minHeight="46vh"
                  boxShadow="2"
                >
                  <Box item mb={2}>
                    <Avatar
                      className="profilePic"
                      src="https://randomuser.me/api/portraits/women/81.jpg"
                      style={{
                        width: "120px",
                        height: "120px",
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography className="fullName" variant="h5">
                      {candidatesState.candidate.name +
                        " " +
                        candidatesState.candidate.fname}
                    </Typography>
                  </Box>
                  <Box item paddingX={2}>
                    <Typography className="bio">
                      {candidatesState.candidate.bio}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} lg={5}>
              <Paper
                elevation={3}
                style={{
                  minHeight: "5vh",
                  minWidth: "40vw",
                  marginBottom: "10px",
                }}
              >
                <Grid item xs={12}>
                  <Grid container justifyContent="center">
                    <Typography variant="h5">Candidate Details</Typography>
                  </Grid>
                </Grid>
              </Paper>
              <Paper elevation={3} style={{ padding: "10px" }}>
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <Grid item xs={3}>
                    <Typography>First Name :</Typography>
                  </Grid>
                  <Grid item xs={9} style={{ marginBottom: "10px" }}>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      fullWidth
                      size="small"
                      value={candidatesState.candidate.name}
                    />
                  </Grid>

                  <Grid item xs={3}>
                    <Typography>Last Name :</Typography>
                  </Grid>
                  <Grid item xs={9} style={{ marginBottom: "10px" }}>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      fullWidth
                      size="small"
                      value={candidatesState.candidate.fname}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>Grandfather Name :</Typography>
                  </Grid>
                  <Grid item xs={9} style={{ marginBottom: "10px" }}>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      fullWidth
                      size="small"
                      value={candidatesState.candidate.gname}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>ID :</Typography>
                  </Grid>
                  <Grid item xs={9} style={{ marginBottom: "10px" }}>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      fullWidth
                      size="small"
                      value={candidatesState.candidate.id}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>Email :</Typography>
                  </Grid>
                  <Grid item xs={9} style={{ marginBottom: "10px" }}>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      fullWidth
                      size="small"
                      value={candidatesState.candidate.email}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>Department :</Typography>
                  </Grid>
                  <Grid item xs={9} style={{ marginBottom: "10px" }}>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      fullWidth
                      size="small"
                      value={deptTypes[candidatesState.candidate.dept]}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>Year :</Typography>
                  </Grid>
                  <Grid item xs={9} style={{ marginBottom: "10px" }}>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      fullWidth
                      size="small"
                      value={candidatesState.candidate.year}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>Section :</Typography>
                  </Grid>
                  <Grid item xs={9} style={{ marginBottom: "10px" }}>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      fullWidth
                      size="small"
                      value={candidatesState.candidate.section}
                    />
                  </Grid>
                </Grid>
              </Paper>
              <Grid>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#00D05A",
                    color: "white",
                    marginTop: "10px",
                  }}
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </>
        )}
    </Grid>
  );
}
