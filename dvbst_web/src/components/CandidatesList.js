import { Button } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import { Card } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBalance, voteCandidate } from "../features/votingSlice";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";
import { SpinnerCircularFixed } from "spinners-react";

const deptTypes = [
  "Biomedical Engineering",
  "Chemical Engineering",
  "Civil Engineering",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Software Engineering",
];
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #00D05A",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: "10px",
  },
}));
function CandidatesList(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.userState);
  const [isLoading, setIsLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const viewProfile = () => {
    console.log("Here");
    navigate("/candidateProfile", { state: props.id });
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const vote = async () => {
    setIsLoading(true);

    dispatch(
      voteCandidate({
        electionId: props.electionId,
        candidateId: props.id,
        voterId: userState.user._id,
      })
    )
      .unwrap()
      .then((response) => {
        dispatch(getBalance(userState.user._id))
          .unwrap()
          .then((response) => {
            if (props.voterBalance <= 0) {
              setIsLoading(false);
              setOpen(false);
              navigate("/auth/Result");
            }
          });
        setIsLoading(false);
        setOpen(false);

        // if()
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <Card>
      <Box display="flex" justifyContent="Space-between">
        <Box m={2} display="flex">
          <img
            alt=""
            src="https://randomuser.me/api/portraits/women/81.jpg"
          ></img>
          <Box
            ml={3}
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <Box display="flex">
              <Typography variant="h5">
                {props.name} {props.fname}
              </Typography>
              <Button
                variant="contained"
                style={{
                  paddingInline: "15px",
                  marginInline: "10px",
                  borderRadius: "10px",
                  fontSize: "12px",
                }}
                onClick={viewProfile}
              >
                View Profile
              </Button>
            </Box>
            <Box>
              <Typography style={{ fontSize: 12 }} variant="h6">
                {deptTypes[props.dept]}
              </Typography>
              <Typography style={{ fontSize: 12 }} variant="h6">
                Year {props.year}
              </Typography>
              <Typography style={{ fontSize: 12 }} variant="h6">
                Section {props.section}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          m={5}
          justifyContent="center"
        >
          <Button
            variant="outlined"
            style={{
              borderRadius: 5,
              color: "#00D05A",
            }}
            onClick={handleOpen}
          >
            Vote
          </Button>
        </Box>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div class="p-2 rounded-xl " className={classes.paper}>
              <Typography
                style={{ fontSize: 18, marginTop: "10px" }}
                variant="h3"
              >
                You are about to vote for:
              </Typography>
              <Typography
                style={{
                  fontSize: 20,
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
                variant="h6"
              >
                {props.name} {props.fname}
              </Typography>

              <Typography style={{ fontSize: 18 }} variant="h3">
                Are you sure you want to vote for this candidate?
              </Typography>
              {props.voterBalance === 1 ? (
                <Typography
                  style={{
                    fontSize: 12,
                    fontStyle: "italic",
                    color: "#C70039",
                    marginTop: "5px",
                  }}
                  variant="h6"
                >
                  Disclaimer: This is your last vote. You can not vote after
                  this!!
                </Typography>
              ) : (
                ""
              )}
              {isLoading && (
                <SpinnerCircularFixed
                  size={25}
                  thickness={100}
                  speed={100}
                  color="#36ad47"
                  secondaryColor="rgba(0, 0, 0, 0.44)"
                />
              )}

              <div class="bg-[#C70039] float-right text-white border border-white text- mt-7 py-3 ml-2 mr-2 px-4 rounded-xl font-body font-light text-sm">
                <button onClick={handleClose}>Cancel</button>
              </div>
              <div class="bg-[#00D05A] float-right text-white py-3 mt-7 ml-2 mr-2 px-4 rounded-xl font-body font-light center text-sm text-center">
                <button onClick={vote}>Confirm</button>
              </div>
            </div>
          </Fade>
        </Modal>
      </Box>
    </Card>
  );
}

export default CandidatesList;
