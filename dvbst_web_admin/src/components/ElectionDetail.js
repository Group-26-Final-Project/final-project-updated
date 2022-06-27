import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { disqualifyCandidate } from "../features/candidatesSlice";
import { SpinnerCircularFixed } from "spinners-react";
import { useEffect } from "react";
import { getElectionByID } from "../features/electionsSlice";
import { endElection, extendElection, pauseElection, restartElection, startElection } from "../features/electionPhaseSlice";
import { useTimer } from 'react-timer-hook';
import { makeStyles } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
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
export default function ElectionDetail() {
  let location = useLocation();
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(false);
  const classes = useStyles();
  const [openChangeModal, setOpenChangeModal] = React.useState(false);
  const [openExtendModal, setOpenExtendModal] = React.useState(false);
  const [value, setValue] = React.useState(new Date());
  const electionsState = useSelector((state) => state.electionsState);
  const electionPhaseState = useSelector((state) => state.electionPhaseState);
  const election = electionsState.elections.filter(
    (el) => el._id === location.state
  )[0];
  // console.log(location);
  // console.log(election);
  const {
    seconds,
    minutes,
    hours,
    days,
  
  } = useTimer({ expiryTimestamp: election.endDate ? election.endDate : 10, onExpire: () => console.warn('onExpire called') });
  const handleOpen = (e) => {
    // console.log(e.target.value)
    if (e.target.value === "extend") {
      setOpenExtendModal(true);
    } else if (e.target.value === "restart") {
      setOpenChangeModal(true);
    }
  };
  const handleClose = () => {
    setOpenExtendModal(false);
    setOpenChangeModal(false);
  };
  const handleRestartElection = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const date1 = new Date(value);
    console.log("abt to convert date", date1);
    const timestamp = Math.floor(date1.getTime());
    console.log(timestamp);
    await dispatch(restartElection({id: location.state, duration: timestamp})).unwrap().then(async() => {
      navigate(-1);
      // await dispatch(getElectionByID(electionPhaseState.election._id));
      

          setIsLoading(false);
    });
    setOpenChangeModal(false);
  };

  const handleExtendElection = async (e) => {
    setIsLoading(true);

    e.preventDefault();
    // console.log("date changed",);
    //     var zvalue = value.split("-");
    // var newDate = new Date( zvalue[2], zvalue[1]-1, zvalue[0]);
    // newDate = Math.floor(newDate.getTime()/ 1000);
    // const range =  newDate - Math.floor(Date.now() / 1000);
    const date1 = new Date(value);
    console.log("abt to convert date", date1);
    const timestamp = Math.floor(date1.getTime());
    // console.log("date changed\n", timestamp);
    // e.preventDefault();
    dispatch(extendElection({id: location.state, duration:timestamp})).unwrap().then(() => {
      navigate(-1);

          setIsLoading(false);
    });
    setOpenExtendModal(false);
  };

  const onDateChange = (e) => {
    // console.log(value);

    setValue(e.target.value);
    console.log("date changed", value);
  };
  
  const deptTypes = [
    "Biomedical Engineering",
    "Chemical Engineering",
    "Civil Engineering",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Software Engineering",
  ];
  const status = ["PENDING", "ONGOING", "COMPLETED"];

  const onCancel = () => {
    navigate(-1);
  };

    const handleStartElection = async () => {
      setIsLoading(true);
      dispatch(startElection(location.state))
        .unwrap()

        .then(() => {
          // console.log("candidate added");
    dispatch(getElectionByID(location.state));

          setIsLoading(false);

          // setFormValues(initialValues)
        })
        .catch((err) => {
          setIsLoading(false);
        });
    };

    const handlePauseElection = async () => {
      setIsLoading(true);
      dispatch(pauseElection(location.state))
        .unwrap()

        .then(() => {
    dispatch(getElectionByID(location.state));

          // console.log("candidate added");
          setIsLoading(false);

          // setFormValues(initialValues)
        })
        .catch((err) => {
          setIsLoading(false);
        });
    };

    const handleEndElection = async () => {
      setIsLoading(true);
      dispatch(endElection(location.state))
        .unwrap()

        .then(() => {
    dispatch(getElectionByID(location.state));

          // console.log("candidate added");
          setIsLoading(false);

          // setFormValues(initialValues)
        })
        .catch((err) => {
          setIsLoading(false);
        });
    };

  useEffect(() => {
    dispatch(getElectionByID(location.state));
  }, []);

  // const getProfileUrl = () => {
  //   if (candidate) {
  //     console.log("am here in first");
  //     console.log(
  //       "candidate.id",
  //       candidate.studentId
  //     );
  //     const id = candidate.studentId.replaceAll(
  //       "/",
  //       "_"
  //     );
  //     console.log("id", id);
  //     console.log(
  //       "ppurl: ",
  //       candidate.candidateProfilePicture
  //     );
  //     if (id === candidate.studentId)
  //       return "https://randomuser.me/api/portraits/women/81.jpg";

  //     if (candidate.candidateProfilePicture.includes(id)) {
  //       console.log("am here in second");
  //       return `${process.env.REACT_APP_MORALIS_SERVER_URL}/files/${process.env.REACT_APP_MORALIS_APPID}/${candidate.candidateProfilePicture}`;
  //     }
  //   }
  //   return "https://randomuser.me/api/portraits/women/81.jpg";
  // };
  const formatTime = (time) => {
    return String(time).padStart(2, "0");
  };
  return (
    <div class="min-h-screen w-full bg-white-800 flex flex-col justify-center items-center py-4 px-4 lg:px-8">
      {(electionsState.getElectionByIDStatus === "pending" || isLoading) && (
        <div class="justify-center items-center">
          <SpinnerCircularFixed
            size={50}
            thickness={100}
            speed={100}
            color="#36ad47"
            secondaryColor="rgba(0, 0, 0, 0.44)"
          />
        </div>
      )}
      {electionsState.getElectionByIDStatus === "failed" && (
        <div>
          <h3>Ooops something went wrong</h3>
          <button
            className="bg-[#00D05A] text-white p-2"
            onClick={window.location.reload()}
          >
            Reload
          </button>
        </div>
      )}

      {electionsState.getElectionByIDStatus !== "pending" &&
        electionsState.getElectionByIDStatus !== "failed" &&
        electionsState.electionByID &&
        election && (
          <div class="flex flex-col justify-center items-center py-8 px-8 lg:px-16">
            {/* <div class="relative w-28 h-28">
              <img
                class="rounded-full border border-gray-100 shadow-sm object-cover"
                alt=""
                src={getProfileUrl()}
              />
            </div> */}
            <div>
              <h2 class="my-4 text-xl font-bold text-gray-900">
                {election.name}
              </h2>
            </div>
            <div class="w-[50vw] py-2 px-4 lg:px-8">
              <div class="flex flex-row justify-between items-center mb-6 md:mb-1">
                <label
                  class="w-full md:w-1/3 px-3 block tracking-wide text-gray-700 text-xs font-bold my-2 mx-4"
                  for="grid-name"
                >
                  Name
                </label>
                <input
                  class="appearance-none block w-full md:w-2/3 bg-white-200 text-sm text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  readOnly={true}
                  id="grid-name"
                  name="name"
                  type="text"
                  value={election.name}
                />
              </div>
              <div class="flex flex-row justify-between items-center mb-6 md:mb-1">
                <label
                  class="w-full md:w-1/3 px-3 block tracking-wide text-gray-700 text-xs font-bold my-2 mx-4"
                  for="grid-fname"
                >
                  Number Of Candidates
                </label>
                <input
                  class="appearance-none block w-full md:w-2/3 bg-white-200 text-sm text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  readOnly={true}
                  id="grid-fname"
                  name="fname"
                  type="text"
                  value={election.candidates.length}
                />
              </div>
              <div class="flex flex-row justify-between items-center mb-6 md:mb-1">
                <label
                  class="w-full md:w-1/3 px-3 block tracking-wide text-gray-700 text-xs font-bold my-2 mx-4"
                  for="grid-fname"
                >
                  Number Of Voters
                </label>
                <input
                  class="appearance-none block w-full md:w-2/3 bg-white-200 text-sm text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  readOnly={true}
                  id="grid-fname"
                  name="fname"
                  type="text"
                  value={electionsState.electionByID.voters.length}
                />
              </div>
              <div class="flex flex-row justify-between items-center mb-6 md:mb-1">
                <label
                  class="w-full md:w-1/3 px-3 block tracking-wide text-gray-700 text-xs font-bold my-2 mx-4"
                  for="grid-fname"
                >
                  Current Status
                </label>
                <input
                  class="appearance-none block w-full md:w-2/3 bg-white-200 text-sm text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  readOnly={true}
                  id="grid-fname"
                  name="fname"
                  type="text"
                  value={status[electionsState.electionByID.data.status]}
                />
              </div>
              <div class="flex flex-row justify-between items-center mb-6 md:mb-1">
                <label
                  class="w-full md:w-1/3 px-3 block tracking-wide text-gray-700 text-xs font-bold my-2 mx-4"
                  for="grid-fname"
                >
                  Remaining Time
                </label>
                <input
                  class="appearance-none block w-full md:w-2/3 bg-white-200 text-sm text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  readOnly={true}
                  id="grid-fname"
                  name="fname"
                  type="text"
                  value={
                    electionsState.electionByID.data.status !== 1 ? "--" :
                    `${formatTime(days)} d : ${formatTime(hours)} h : ${formatTime(minutes)} m : ${formatTime(seconds)} s`}
                />
              </div>
            </div>
          </div>
        )}

      {electionsState.getElectionByIDStatus !== "pending" &&
        electionsState.getElectionByIDStatus !== "failed" &&
        electionsState.electionByID &&
        election && (
          <>
            <div class="flex flex-row justify-between">
              

              <div class="bg-white float-right text-[#00D05A] border border-[#00D05A] ml-5 mr-2 text-center py-3 px-4 rounded-xl font-body font-light text-sm">
                <button disabled={electionsState.electionByID.data.status === 1} onClick={handleStartElection}>Start Election</button>
              </div>
              <div class="bg-white float-right text-[#00D05A] border border-[#00D05A] ml-2 mr-2 text-center py-3 px-4 rounded-xl font-body font-light text-sm">
                <button value="extend" onClick={handleOpen}>Extend Election</button>
              </div>
              <div class="bg-white float-right text-[#00D05A] border border-[#00D05A] ml-2 mr-2 text-center py-3 px-4 rounded-xl font-body font-light text-sm">
                <Link
                  data-cy="elections-details"
                  to="/resultsDetail"
                  state={location.state}
                >
                  Results
                </Link>
              </div>
              <div class="bg-white float-right text-[#00D05A] border border-[#00D05A] ml-2 mr-2 text-center py-3 px-4 rounded-xl font-body font-light text-sm">
                <button value="extend" onClick={()=>{navigate(-1)}}>Cancel</button>
              </div>
            </div>
            <div class="flex flex-row justify-beetween mt-5">
             
              <div class="bg-white float-right text-[#C70039] border border-[#C70039] ml-5 text-center py-3 mr-2 px-4 rounded-xl font-body font-light text-sm">
                <button disabled={electionsState.electionByID.data.status === 0} onClick={handlePauseElection}>Pause Election</button>
              </div>
              <div class="bg-white float-right text-[#C70039] border border-[#C70039] ml-2 text-center py-3 mr-2 px-4 rounded-xl font-body font-light text-sm">
                <button disabled={electionsState.electionByID.data.status === 2} onClick={handleEndElection}>End Election</button>
              </div>
              <div class="bg-white float-right text-[#C70039] border border-[#C70039] ml-2 text-center py-3 mr-2 px-4 rounded-xl font-body font-light text-sm">
                <button value="restart" onClick={handleOpen}>Restart Election</button>
              </div>

              <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={openExtendModal}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      timeout: 500,
                    }}
                  >
                    <Fade in={openExtendModal}>
                      <div class="p-2 rounded-xl " className={classes.paper}>
                        <h2>Enter an Extension Date</h2>
                        <input
                          //   ref={datePickerRef}
                          min="2022-06-28"
                          max="2022-07-10"
                          type={"date"}
                          value={value}
                          onChange={async (e) => {
                            await onDateChange(e);
                          }}
                        />
                        <button
                          class="bg-[#00D05A] text-white ml-10 mt-2 p-2 rounded-xl font-body font-light center text-center"
                          onClick={handleExtendElection}
                        >
                          Confirm
                        </button>
                      </div>
                    </Fade>
                  </Modal>
                  <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={openChangeModal}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      timeout: 500,
                    }}
                  >
                    <Fade in={openChangeModal}>
                      <div class="p-2 rounded-xl " className={classes.paper}>
                        <h2>Are you sure you would like to restart this election?</h2>
                        <h4 style={{marginTop:"5px", marginBottom:"5px",  fontStyle:"italic"}}>{election.name}</h4>
                        <h4>Select End Date</h4>
                        <input
                          //   ref={datePickerRef}
                          min="2022-06-28"
                          max="2022-07-10"
                          type={"date"}
                          value={value}
                          onChange={async (e) => {
                            await onDateChange(e);
                          }}
                        />
                        <button
                          class="bg-[#00D05A] text-white ml-10 mt-2 p-2 rounded-xl font-body font-light center text-center"
                          onClick={handleRestartElection}
                        >
                          Confirm
                        </button>
                      </div>
                    </Fade>
                  </Modal>
            </div>
          </>
        )}
    </div>
  );
}
