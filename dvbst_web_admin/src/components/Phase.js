import React, { useEffect, useRef } from "react";
import ApprovalTable, { Detail } from "./ApprovalTable";
import { useDispatch, useSelector } from "react-redux";
import { getPhase, changePhase, extendPhase } from "../features/phaseSlice";
import { SpinnerCircularFixed } from "spinners-react";
import DatePicker from "react-multi-date-picker";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";

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
export default function Phase() {
  const dispatch = useDispatch();
  const phaseState = useSelector((state) => state.phaseState);
  const datePickerRef = useRef();
  const classes = useStyles();
  const [openChangeModal, setOpenChangeModal] = React.useState(false);
  const [openExtendModal, setOpenExtendModal] = React.useState(false);
  const [value, setValue] = React.useState(new Date());

  const handleOpen = (e) => {
    // console.log(e.target.value)
    if (e.target.value === "extend") {
      setOpenExtendModal(true);
    } else if (e.target.value === "change") {
      setOpenChangeModal(true);
    }
  };
  const handleClose = () => {
    setOpenExtendModal(false);
    setOpenChangeModal(false);
  };
  const PHASE_NAME = [
    "REGISTRATION",
    "REGISTRATION BREAK",
    "SECTION ELECTION",
    "SECTION ELECTION BREAK",
    "BATCH ELECTION",
    "BATCH ELECTION BREAK",
    "DEPARTMENT ELECTION",
    "COMPLETED",
  ];
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    console.log("dispatced get phase");
    dispatch(getPhase());
  }, [dispatch]);

  function convertDate(timestamp) {
    if (timestamp === 0) return "Not Set";
    var date = new Date(timestamp);
    var dayofweek = date.getDay();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    // var seconds = date.getSeconds();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return (
      weekday[dayofweek] + " " + day + "/" + month + "/" + year + " " + strTime
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const date1 = new Date(value);
    console.log("abt to convert date", date1);
    const timestamp = Math.floor(date1.getTime());
    console.log(timestamp);
    dispatch(changePhase(timestamp));
    setOpenChangeModal(false);
  };

  const handleOnDateChange = async (e) => {
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
    dispatch(extendPhase(timestamp));
    setOpenExtendModal(false);
  };

  const onDateChange = (e) => {
    // console.log(value);

    setValue(e.target.value);
    console.log("date changed", value);
  };
  //   const columns = React.useMemo(
  //     () => [
  //       {
  //         Header: "Name",
  //         accessor: "name",
  //       },
  //       {
  //         Header: "Email",
  //         accessor: "email",
  //       },
  //       // {
  //       //     Header: "User Type",
  //       //     accessor: "role",
  //       // },
  //       {
  //         Header: "Date Added",
  //         accessor: "dateAdded",
  //       },
  //       {
  //         Header: "",
  //         accessor: "_id",
  //         Cell: Detail,
  //       },
  //     ],
  //     []
  //   );

  return (
    <div class="min-h-screen w-full bg-white-800 flex flex-col justify-center items-center py-4 px-4 lg:px-8">
      {(phaseState.getPhaseStatus === "pending" ||
        phaseState.changePhaseStatus === "pending" ||
        phaseState.extendPhaseStatus === "pending") && (
        <div>
          <SpinnerCircularFixed
            size={50}
            thickness={100}
            speed={100}
            color="#36ad47"
            secondaryColor="rgba(0, 0, 0, 0.44)"
          />
        </div>
      )}
      {(phaseState.getPhaseStatus === "failed" ||
        phaseState.changePhaseStatus === "failed" ||
        phaseState.extendPhaseStatus === "failed") && (
        <div>
          <h3>Ooops something went wrong</h3>
          <button onClick={() => window.location.reload(false)}>Reload!</button>
        </div>
      )}
      {phaseState.getPhaseStatus !== "pending" &&
        phaseState.getPhaseStatus !== "failed" &&
        phaseState.phase && (
          <div class="w-full py-4 px-4 lg:px-8 rounded-2xl bg-white-700">
            {!phaseState.phase ? (
              <div>
                <p className="text-center text-lg">
                  Election Has Not Started!!
                </p>
              </div>
            ) : (
              // <ApprovalTable columns={columns} data={phaseState.pendingUsers} />
              <div>
                <div>
                  <p className="text-center mb-2 text-lg">{`Current Phase: ${
                    PHASE_NAME[phaseState.phase[0]]
                  }`}</p>
                </div>
                <div>
                  <p className="text-center mb-2 text-lg">{`Started At: ${convertDate(
                    Number(phaseState.phase[1].hex)
                  )}`}</p>
                </div>
                <div>
                  <p className="text-center mb-2 text-lg">{`Ending At: ${convertDate(
                    Number(phaseState.phase[2].hex)
                  )}`}</p>
                </div>
                <div class="flex items-baseline justify-center">
                  <button
                    class="bg-[#00D05A] text-white mt-5 p-5 rounded-xl font-body font-light center text-center"
                    onClick={handleOpen}
                    value="change"
                  >
                    Change Phase
                  </button>
                  <button
                    class="bg-[#00D05A] text-white ml-10 mt-5 p-5 rounded-xl font-body font-light center text-center"
                    onClick={handleOpen}
                    value="extend"
                  >
                    Extend Phase
                  </button>
                  {/* <button
                    class="bg-[#00D05A] text-white ml-10 mt-5 p-5 rounded-xl font-body font-light center text-center"
                    onClick={handleOpen}
                    value="change"
                  >
                    Revert Back To
                  </button> */}
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
                          min="2022-06-27"
                          max="2022-07-10"
                          type={"date"}
                          value={value}
                          onChange={async (e) => {
                            await onDateChange(e);
                          }}
                        />
                        <button
                          class="bg-[#00D05A] text-white ml-10 mt-2 p-2 rounded-xl font-body font-light center text-center"
                          onClick={handleOnDateChange}
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
                        <h2>Enter Phase End Date</h2>
                        <input
                          //   ref={datePickerRef}
                          min="2022-06-27"
                          max="2022-07-10"
                          type={"date"}
                          value={value}
                          onChange={async (e) => {
                            await onDateChange(e);
                          }}
                        />
                        <button
                          class="bg-[#00D05A] text-white ml-10 mt-2 p-2 rounded-xl font-body font-light center text-center"
                          onClick={handleSubmit}
                        >
                          Confirm
                        </button>
                      </div>
                    </Fade>
                  </Modal>
                </div>
              </div>
            )}
          </div>
        )}
    </div>
  );
}
