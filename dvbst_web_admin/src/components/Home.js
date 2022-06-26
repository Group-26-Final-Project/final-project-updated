import React, { useCallback, useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import CustomAxios from "../Api/CustomAxios";
import CustomChart from "./CustomChart";
import HomeTable, { StatusPill } from "./HomeTable";

export default function Home() {
  const [reports, setReports] = useState({
    totalUsers: 0,
    totalCandidates: 0,
    totalVoters: 0,
    totalOngoingElections: 0,
    totalPendingRequests: 0,
    totalFinishedElections: 0,
    totalBlacklistedCandidates: 0,
  });
  // const { isInitialized, isWeb3Enabled, authenticate, isAuthenticated, Moralis, logout } = useMoralis();
  // useEffect(() => {
  //   const login = async () => {
  //       if (!isAuthenticated) {

  //         await authenticate()
  //           .then(function (user) {
  //           //   console.log(user!.get("ethAddress"));
  //           // console.log("authenticated user: ", user);
  //           })
  //           .catch(function (error) {
  //             console.log(error);
  //           });
  //       }
  //     }
  //     login();
  // }, [authenticate, isAuthenticated]);
  const columns = React.useMemo(
    () => [
      {
        Header: "No.",
        accessor: "number",
      },
      {
        Header: "Election Name",
        accessor: "name",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: StatusPill,
      },
    ],
    []
  );
  const rowdata = [
    {
      number: 1,
      name: "Software Engineering Year 1 Section 1 Election",
      status: "Finished",
    },
    {
      number: 2,
      name: "Software Engineering Year 1 Section 2 Election",
      status: "Ongoing",
    },
    {
      number: 3,
      name: "Software Engineering Year 1 Section 3 Election",
      status: "Pending",
    },
  ];

  const fetchReports = useCallback(async () => {
    const { data } = await CustomAxios.get("/reports");
    setReports(data.data);
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return (
    <div className="w-full bg-white-800 flex flex-col overflow-y-hidden justify-center items-center my-4 py-8 px-8 lg:px-16">
      <div className="w-full bg-[#2F313D] grid grid-cols-3 gap-y-10 py-8 px-4 lg:px-8 rounded-xl">
        <div className="px-1">
          <h3 className="text-md text-white font-body font-semibold">
            Total Voters
          </h3>
          <h2 className="text-3xl text-white font-body font-bold">
            {reports && reports.totalVoters}
          </h2>
          <p className="text-sm text-white font-body font-light">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
          </p>
        </div>
        <div className="px-1">
          <h3 className="text-md text-white font-body font-semibold">
            Total Candidate
          </h3>
          <h2 className="text-3xl text-white font-body font-bold">
            {reports && reports.totalCandidates}
          </h2>
          <p className="text-sm text-white font-body font-light">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
          </p>
        </div>
        <div className="px-1">
          <h3 className="text-md text-white font-body font-semibold">
            Total Blacklist Candidate
          </h3>
          <h2 className="text-3xl text-white font-body font-bold">
            {reports && reports.totalBlacklistedCandidates}
          </h2>
          <p className="text-sm text-white font-body font-light">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
          </p>
        </div>
        <div className="px-1">
          <h3 className="text-md text-white font-body font-semibold">
            Ongoing
          </h3>
          <h2 className="text-3xl text-white font-body font-bold">
            {reports && reports.totalOngoingElections}
          </h2>
          <p className="text-sm text-white font-body font-light">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
          </p>
        </div>
        <div className="px-1">
          <h3 className="text-md text-white font-body font-semibold">
            Finished
          </h3>
          <h2 className="text-3xl text-white font-body font-bold">
            {reports && reports.totalFinishedElections}
          </h2>
          <p className="text-sm text-white font-body font-light">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
          </p>
        </div>
        <div className="px-1">
          <h3 className="text-md text-white font-body font-semibold">
            Pending
          </h3>
          <h2 className="text-3xl text-white font-body font-bold">
            {reports && reports.totalPendingRequests}
          </h2>
          <p className="text-sm text-white font-body font-light">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
          </p>
        </div>
      </div>
      <div className="h-[400px] w-full flex px-4 lg:px-8 rounded-2xl bg-white-700">
        <CustomChart reports={reports} />
      </div>
    </div>
  );
}
