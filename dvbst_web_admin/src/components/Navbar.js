import React, { useState } from "react";
import Notifications from "./Notification";
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../features/authSlice';

export default function Navbar() {
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const dispatch = useDispatch()
  
  const handleLogout = () => {
    dispatch(logoutUser())
    window.location.navigate('/')
}

  return (
    <div className="h-[56px]">
      <nav
        className="h-[56px] flex justify-end w-full mb-5 px-20"
        style={{ padding: "10px 50px" }}
      >
        <button
          onClick={() => {
            setShowNotificationModal((prev) => !prev);
          }}
          className="font-normal pr-4 text-sm leading-3 text-white focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-700 duration-150 justify-center items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-bell"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="#718096"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
            <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
          </svg>
        </button>
        <button onClick={handleLogout} className="bg-red-500 rounded-xl w-24 px-2">
          Logout
        </button>
      </nav>
      <div className="">
        {showNotificationModal && (
          <Notifications setShowNotificationModal={setShowNotificationModal} />
        )}
      </div>
    </div>
  );
}
