import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';

export default function CandidateDetail() {
  let location = useLocation();
  let navigate = useNavigate();
  const candidatesState = useSelector((state) => state.candidatesState)
  console.log(location)
  const candidate = candidatesState.candidates.filter((el) => el._id === location.state)[0]
  console.log(candidate)

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
      <div class="min-h-screen w-full bg-white-800">
        {candidate && (
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
                {candidate.fullName}
              </h2>
            </div>
            <div class="text-l text-center w-[50vw] font-regular text-gray-900">
              <p>{candidate.candidateBio}</p>
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
                  value={
                    candidate.fullName.split(
                      " "
                    )[0]
                  }
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
                  value={
                    candidate.fullName.split(
                      " "
                    )[1]
                  }
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
                  value={
                    candidate.fullName.split(
                      " "
                    )[2]
                  }
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
                  value={candidate.id}
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
                  value={candidate.email}
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
                  value={candidate.phone}
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
                  value={deptTypes[candidate.dept]}
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
                  value={candidate.year}
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
                    candidate.section
                  }
                />
              </div>
            </div>
          </div>
        )}
        <div class="flex flex-row justify-end">
          <div class="bg-white float-right text-[#C70039] border border-[#C70039] text-center py-3 mr-2 px-4 rounded-xl font-body font-light text-sm">
            <button>Add to Blacklist</button>
          </div>
          <div class="bg-[#C70039] float-right text-white border border-white text-center py-3 mr-2 px-4 rounded-xl font-body font-light text-sm">
            <button>Remove Candidate</button>
          </div>
          <div class="bg-white float-right text-[#00D05A] border border-[#00D05A] text-center py-3 px-4 mr-10 rounded-xl font-body font-light text-sm">
            <button onClick={onCancel}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}
