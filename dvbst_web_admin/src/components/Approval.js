import React from 'react'
import ApprovalTable from './ApprovalTable';
import BlacklistTable, { Detail } from './BlacklistTable'

export default function Approval() {
    const columns = React.useMemo(() =>
        [
            {
                Header: "Name",
                accessor: "name",
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
                accessor: "date",
            },
            {
                Header: "",
                accessor: "details",
                Cell: Detail,
            },
        ],
        []);
    const rowdata = [
        {
            name: "Candidate #1",
            email: "Email #1",
            role: "candidate",
            date: "01/01/2022",
            details: 1,
        },
        {
            name: "Voter #1",
            email: "Email #2",
            role: "voter",
            date: "01/01/2022",
            details: 2,
        }
    ]
    return (
        <div class="min-h-screen w-full bg-white-800 flex flex-col justify-center items-center py-4 px-4 lg:px-8">
            <div class="w-full py-4 px-4 lg:px-8 rounded-2xl bg-white-700">
                {rowdata.length === 0 ? (
                    <div>
                        <p className='text-center text-lg'>No Pending Approvals</p>
                    </div>
                ) :
                    <ApprovalTable columns={columns} data={rowdata} />
                }
            </div>
        </div>
    )
}