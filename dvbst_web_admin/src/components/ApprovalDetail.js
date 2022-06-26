import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addUser, declineUser, getUser } from "../features/pendingSlice";
import { SpinnerCircularFixed } from "spinners-react";

export default function ApprovalDetail() {
  const dispatch = useDispatch()
  // let location = useLocation();
  let navigate = useNavigate();
  const pendingState = useSelector((state) => state.pendingState)
  const user = pendingState.pendingUser
  // const user = pendingState.pendingUsers.filter((el) => el._id === location.state)[0]
  // console.log("Pending", user)

  const deptTypes = [
    "Biomedical Engineering",
    "Chemical Engineering",
    "Civil Engineering",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Software Engineering",
  ];

  const onCancel = () => {
    navigate(-1);
  };

  const onApprove = () => {
    dispatch(addUser(user._id))
    navigate('/approval')
  };

  const onDecline = () => {
    dispatch(declineUser(user._id))
    navigate('/approval')
  };

  // const getProfileUrl = () => {
  //   if (user) {
  //     console.log("am here in first");
  //     console.log(
  //       "user.id",
  //       user.studentId
  //     );
  //     const id = user.studentId.replaceAll(
  //       "/",
  //       "_"
  //     );
  //     console.log("id", id);
  //     console.log(
  //       "ppurl: ",
  //       user.userProfilePicture
  //     );
  //     if (id === user.studentId)
  //       return "https://randomuser.me/api/portraits/women/81.jpg";

  //     if (user.userProfilePicture.includes(id)) {
  //       console.log("am here in second");
  //       return `${process.env.REACT_APP_MORALIS_SERVER_URL}/files/${process.env.REACT_APP_MORALIS_APPID}/${user.userProfilePicture}`;
  //     }
  //   }
  //   return "https://randomuser.me/api/portraits/women/81.jpg";
  // };

  return (
    <div class="min-h-screen w-full bg-white-800 flex flex-col justify-center items-center py-4 px-4 lg:px-8">
      <div class="min-h-screen w-full bg-white-800">
        {pendingState.getUserStatus === 'pending' && (
          <div class="min-h-screen w-full flex flex-col justify-center items-center">
            <SpinnerCircularFixed
              size={50}
              thickness={100}
              speed={100}
              color="#36ad47"
              secondaryColor="rgba(0, 0, 0, 0.44)"
            />
          </div>
        )}
        {pendingState.getUserStatus === 'failed' && (
          <div>
            <h3>Ooops something went wrong</h3>
            <button onClick={() => window.location.reload(false)}>Reload!</button>
          </div>
        )}
        {pendingState.getUserStatus === 'success' && (
          <>
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
                  {user.name + " " + user.fname + " " + user.gname}
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
                    value={user.name}
                  />
                </div>
                <div class="flex flex-row justify-between items-center mb-6 md:mb-1">
                  <label
                    class="w-full md:w-1/3 px-3 block tracking-wide text-gray-700 text-xs font-bold my-2 mx-4"
                    for="grid-fname"
                  >
                    Father's Name
                  </label>
                  <input
                    class="appearance-none block w-full md:w-2/3 bg-white-200 text-sm text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    readOnly={true}
                    id="grid-fname"
                    name="fname"
                    type="text"
                    value={user.fname}
                  />
                </div>
                <div class="flex flex-row justify-between items-center mb-6 md:mb-1">
                  <label
                    class="w-full md:w-1/3 px-3 block tracking-wide text-gray-700 text-xs font-bold my-2 mx-4"
                    for="grid-gname"
                  >
                    Grandfather's Name
                  </label>
                  <input
                    class="appearance-none block w-full md:w-2/3  bg-white-200 text-sm text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    readOnly={true}
                    id="grid-gname"
                    name="gname"
                    type="text"
                    value={user.gname}
                  />
                </div>
                <div class="flex flex-row justify-between items-center">
                  <label
                    class="w-full md:w-1/3 px-3  block tracking-wide text-gray-700 text-xs font-bold my-2 mx-4"
                    for="grid-id"
                  >
                    ID
                  </label>
                  <input
                    class="appearance-none block w-full md:w-2/3  bg-white-200 text-sm text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    readOnly={true}
                    id="grid-id"
                    name="id"
                    type="text"
                    value={user.id}
                  />
                </div>
                <div class="flex flex-row justify-between items-center">
                  <label
                    class="w-full md:w-1/3 px-3  block tracking-wide text-gray-700 text-xs font-bold my-2 mx-4"
                    for="grid-email"
                  >
                    Email
                  </label>
                  <input
                    class="appearance-none block w-full md:w-2/3  bg-white-200 text-sm text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    readOnly={true}
                    id="grid-email"
                    name="email"
                    type="text"
                    value={user.email}
                  />
                </div>
                <div class="flex flex-row justify-between items-center">
                  <label
                    class="w-full md:w-1/3 px-3  block tracking-wide text-gray-700 text-xs font-bold my-2 mx-4"
                    for="grid-phone"
                  >
                    Phone Number
                  </label>
                  <input
                    class="appearance-none block w-full md:w-2/3  bg-white-200 text-sm text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    readOnly={true}
                    id="grid-phone"
                    name="phone"
                    type="text"
                    value={user.phone}
                  />
                </div>
                <div class="flex flex-row justify-between items-center mb-6 md:mb-1">
                  <label
                    class="w-full md:w-1/3 px-3 block tracking-wide text-gray-700 text-xs font-bold my-2 mx-4"
                    for="grid-dept"
                  >
                    Department
                  </label>
                  <input
                    class="appearance-none block w-full md:w-2/3 bg-white-200 text-sm text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    readOnly={true}
                    id="grid-dept"
                    name="dept"
                    type="text"
                    value={deptTypes[user.dept]}
                  />
                </div>
                <div class="flex flex-row justify-between items-center mb-6 md:mb-1">
                  <label
                    class="w-full md:w-1/3 px-3 block tracking-wide text-gray-700 text-xs font-bold my-2 mx-4"
                    for="grid-year"
                  >
                    Year
                  </label>
                  <input
                    class="appearance-none block w-full md:w-2/3 bg-white-200 text-sm text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    readOnly={true}
                    id="grid-year"
                    name="year"
                    type="text"
                    value={user.year}
                  />
                </div>
                <div class="flex flex-row justify-between items-center">
                  <label
                    class="w-full md:w-1/3 px-3  block tracking-wide text-gray-700 text-xs font-bold my-2 mx-4"
                    for="grid-sect"
                  >
                    Section
                  </label>
                  <input
                    class="appearance-none block w-full md:w-2/3  bg-white-200 text-sm text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    readOnly={true}
                    id="grid-sect"
                    name="sect"
                    type="text"
                    value={
                      user.section
                    }
                  />
                </div>
              </div>
            </div>
            <div class="flex flex-row justify-end">
              <div class="bg-red-700 float-right text-white border border-white text-center py-3 px-4 mr-2 rounded-xl font-body font-light text-sm">
                <button onClick={onDecline}>Decline</button>
              </div>
              <div class="bg-[#00D05A] float-right text-white border border-white text-center py-3 px-4 mr-2 rounded-xl font-body font-light text-sm">
                <button onClick={onApprove}>Approve</button>
              </div>
              <div class="bg-white float-right text-[#00D05A] border border-[#00D05A] text-center py-3 px-4 mr-10 rounded-xl font-body font-light text-sm">
                <button onClick={onCancel}>Cancel</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
