import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { disqualifyCandidate } from "../features/candidatesSlice";
import { SpinnerCircularFixed } from "spinners-react";
import { useEffect } from "react";
import { getElectionByID } from "../features/electionsSlice";
import { endElection, pauseElection, startElection } from "../features/electionPhaseSlice";

export default function ElectionDetail() {
  let location = useLocation();
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(false);
  const electionsState = useSelector((state) => state.electionsState);
  const election = electionsState.elections.filter(
    (el) => el._id === location.state
  )[0];
  console.log(location);
  console.log(election);

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
                <button onClick={onCancel}>Extend Election</button>
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
            </div>
            <div class="flex flex-row justify-beetween mt-5">
             
              <div class="bg-white float-right text-[#C70039] border border-[#C70039] ml-5 text-center py-3 mr-2 px-4 rounded-xl font-body font-light text-sm">
                <button disabled={electionsState.electionByID.data.status === 0} onClick={handlePauseElection}>Pause Election</button>
              </div>
              <div class="bg-white float-right text-[#C70039] border border-[#C70039] ml-2 text-center py-3 mr-2 px-4 rounded-xl font-body font-light text-sm">
                <button disabled={electionsState.electionByID.data.status === 2} onClick={handleEndElection}>End Election</button>
              </div>
              <div class="bg-white float-right text-[#C70039] border border-[#C70039] ml-2 text-center py-3 mr-2 px-4 rounded-xl font-body font-light text-sm">
                <button onClick={() => {}}>Restart Election</button>
              </div>
            </div>
          </>
        )}
    </div>
  );
}
