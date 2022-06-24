import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ElectionTable, { Detail, EndDate } from './ElectionsTable'
import { SpinnerCircularFixed } from "spinners-react";
import { getElections } from '../features/electionsSlice';

export default function Result() {
    const dispatch = useDispatch();
    const electionState = useSelector((state) => state.electionsState)

    useEffect(() => {
        dispatch(getElections())
    }, [dispatch]);

    console.log("Elections", electionState.elections)
    const columns = React.useMemo(() =>
        [
            {
                Header: "Election Name",
                accessor: "name",
            },
            {
                Header: "Time Remaining",
                accessor: "endDate",
                Cell: EndDate,
            },
            {
                Header: "",
                accessor: "_id",
                Cell: Detail,
            }
        ],
        []);

    return (
        <div class="min-h-screen w-full bg-white-800 flex flex-col justify-center items-center py-4 px-4 lg:px-8">
            {electionState.getElectionsStatus === "pending" && (
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
            {electionState.getElectionsStatus === "failed" && (
                <div>
                    <h3>Ooops something went wrong</h3>
                    <button className="bg-[#00D05A] text-white p-2" onClick={window.location.reload()}>Reload</button>
                </div>
            )}
            {electionState.getElectionsStatus !== "pending" && electionState.getElectionsStatus !== "failed" && electionState.elections && (
                < div class="w-full py-4 px-4 lg:px-8 rounded-2xl bg-white-700">
                    {electionState.elections.length === 0 ? (
                        <div>
                            <p className='text-center text-lg'>No Elections</p>
                        </div>
                    ) :
                        <ElectionTable columns={columns} data={electionState.elections} />
                    }
                </div>
            )}
        </div>
    )
}