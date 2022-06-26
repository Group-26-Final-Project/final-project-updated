import React, { useState } from "react";
import Notifications from "./Notification";

export default function Navbar() {
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  return (
    <div className="h-[56px] bg-white p-5">
      <nav
        className="h-[56px] flex justify-end w-full mb-5 px-20"
        style={{ padding: "0 100px" }}
      >
        <button
          onClick={() => {
            setShowNotificationModal((prev) => !prev);
          }}
          className=" px-10 font-normal text-sm leading-3 text-white bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-700 focus:bg-indigo-600 hover:bg-indigo-600 duration-150 justify-center items-center"
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
      </nav>
      <div className="">
        {showNotificationModal && (
          <Notifications setShowNotificationModal={setShowNotificationModal} />
        )}
      </div>
    </div>
  );
}
