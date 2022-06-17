import React, { useEffect } from 'react'
import ApprovalTable, { Detail } from './ApprovalTable';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../features/pendingSlice';
import { SpinnerCircularFixed } from "spinners-react";


export default function Approval() {
    const dispatch = useDispatch()
    const pendingState = useSelector((state) => state.pendingState)

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    const columns = React.useMemo(() =>
        [
            {
                Header: "Name",
                accessor: "fullName",
            },
            {
                Header: "Email",
                accessor: "email",
            },
            {
                Header: "User Type",
                accessor: "role",
            },
            {
                Header: "Date Added",
                accessor: "dateAdded",
            },
            {
                Header: "",
                accessor: "_id",
                Cell: Detail,
            },
        ],
        []);

    return (
        <div class="min-h-screen w-full bg-white-800 flex flex-col justify-center items-center py-4 px-4 lg:px-8">
            {pendingState.getUsersStatus === "pending" && (
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
            {pendingState.getUsersStatus === "failed" && (
                <div>
                    <h3>Ooops something went wrong</h3>
                    <button onClick={() => window.location.reload(false)}>Reload!</button>
                </div>
            )}
            {pendingState.getUsersStatus !== "pending" && pendingState.getUsersStatus !== "failed" && pendingState.pendingUsers && (

                <div class="w-full py-4 px-4 lg:px-8 rounded-2xl bg-white-700">
                    {pendingState.pendingUsers.length === 0 ? (
                        <div>
                            <p className='text-center text-lg'>No Pending Approvals</p>
                        </div>
                    ) :
                        <ApprovalTable columns={columns} data={pendingState.pendingUsers} />
                    }
                </div>
            )}
        </div>
    )
}