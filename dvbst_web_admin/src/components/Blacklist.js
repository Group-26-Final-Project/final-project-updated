import React, { useEffect } from 'react'
import BlacklistTable, { Detail } from './BlacklistTable'
import { useDispatch, useSelector } from 'react-redux';
import { SpinnerCircularFixed } from "spinners-react";
import { getCandidates } from '../features/blacklistSlice';


export default function Blacklist() {
    const dispatch = useDispatch()
    const blacklistState = useSelector((state) => state.blacklistState)

    useEffect(() => {
        dispatch(getCandidates())
    }, [dispatch])

    const columns = React.useMemo(() =>
        [

            {
                Header: "Candidate's Name",
                accessor: "fullName",
            },
            {
                Header: "Date Added",
                accessor: "dateAdded",
            },
            {
                Header: "",
                accessor: "details",
                Cell: Detail,
            },
        ],
        []);

    return (
        <div class="min-h-screen w-full bg-white-800 flex flex-col justify-center items-center py-4 px-4 lg:px-8">
            {blacklistState.getCandidatesStatus === "pending" && (
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
            {blacklistState.getCandidatesStatus === "failed" && (
                <div>
                    <h3>Ooops something went wrong</h3>
                    <button onClick={() => window.location.reload(false)}>Reload!</button>
                </div>
            )}
            {blacklistState.getCandidatesStatus !== "pending" && blacklistState.getCandidatesStatus !== "failed" && blacklistState.candidates && (
                <div class="w-full py-4 px-4 lg:px-8 rounded-2xl bg-white-700">
                    <BlacklistTable columns={columns} data={blacklistState.candidates} />
                </div>
            )}
        </div>
    )
}