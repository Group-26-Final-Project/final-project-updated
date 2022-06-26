import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRequests, updateRequests } from "../features/requestSlice";
import { formatDistanceToNow } from "date-fns";
import clsx from "clsx";
const Notifications = ({ setShowNotificationModal }) => {
  const { requests: notifications, isLoading } = useSelector(
    (state) => state.requestsState
  );
  console.log(notifications, " is requests");
  const [refetch, setRefetch] = useState(true);
  const dispatch = useDispatch();

  const fetchNotifications = useCallback(async () => {
    await dispatch(getRequests({}));
    console.log("refetching!");
  }, []);

  useEffect(() => {
    let interval = setInterval(() => {
      setRefetch((prev) => !prev);
    }, 5000);

    fetchNotifications();

    return () => clearInterval(interval);
  }, [refetch]);

  const handleApprove = async (id) => {
    console.log("approve clicked!");
    await dispatch(updateRequests({ action: "approve", id }));
    console.log("refetching!");
  };

  const handleDecline = async (id) => {
    console.log("decline clicked!");
    await dispatch(updateRequests({ action: "reject", id }));
  };

  return (
    <div
      style={{
        scrollbarWidth: "0px",
      }}
      className="bg-gray-900 bg-opacity-75 w-full absolute z-10 right-0 top-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700 "
      id="notification"
    >
      <div className="drop-shadow-2xl w-full md:w-3/4 lg:w-1/2 2xl:w-4/12  bg-gray-50 h-screen overflow-y-auto p-8 absolute right-0">
        <div className="flex items-center justify-between">
          <p className="text-2xl font-semi-bold leading-6 text-gray-800">
            Notifications
          </p>
          <div
            className="cursor-pointer"
            onClick={() => {
              console.log("hhhh");
              setShowNotificationModal(false);
            }}
          >
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18"
                stroke="#4B5563"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 6L18 18"
                stroke="#4B5563"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <div className="flex flex-col">
          {notifications.map((notif, index) => {
            return (
              <div
                key={index}
                className={clsx(
                  "w-full p-3 mt-8 rounded flex",
                  notif.read ? "bg-gray-100" : "bg-white"
                )}
              >
                <div className="pl-3 w-full">
                  <p className="w-full text-sm leading-none flex justify-between items-center">
                    <div className="text-indigo-700 font-bold text-lg">
                      {notif.candidateId.name}
                    </div>
                    <div
                      className={`font-bold border-2 px-3 py-2 rounded-lg ${
                        notif.type === "WITHDRAWAL"
                          ? " text-red-700 border-red-700 "
                          : " text-indigo-700  border-indigo-700"
                      }`}
                    >
                      {notif.type}
                    </div>
                  </p>
                  <p className="text-xs leading-3 pt-1 text-gray-500">
                    {formatDistanceToNow(new Date(notif.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                  <div className="mt-2 w-full">
                    <p className="text-sm leading-5 text-gray-500">
                      {notif.description}
                    </p>
                  </div>
                  <div className="mt-2 w-full flex gap-x-5">
                    {notif.read ? (
                      <>
                        <p>
                          {notif.isApproved ? (
                            <p className="px-5 py-1 text-sm text-blue-400 font-bold rounded-md text-white ">
                              Approved
                            </p>
                          ) : (
                            <p className="px-5 py-1 text-sm text-red-400 font-bold rounded-md text-white ">
                              Rejected
                            </p>
                          )}
                        </p>
                      </>
                    ) : (
                      <>
                        <button
                          disabled={notif.read}
                          onClick={() => handleApprove(notif._id)}
                          className="px-5 py-1 text-sm bg-blue-400 rounded-md text-white "
                        >
                          Approve
                        </button>
                        <button
                          disabled={notif.read}
                          onClick={() => handleDecline(notif._id)}
                          className="px-5 py-1 text-sm bg-red-400 rounded-md text-white "
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

  
      <div className="flex items-center justify-between">
          <p className="text-sm flex flex-shrink-0 leading-normal px-3 py-16 text-gray-500">
            Thats it for now :)
          </p>
          <hr className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default Notifications;
