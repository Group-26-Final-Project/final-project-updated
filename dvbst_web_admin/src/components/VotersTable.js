import React from 'react'
import { useTable, useSortBy, usePagination } from "react-table";
// import { ChevronDoubleLeftIcon, ChevronLeftIcon, ChevronRightIcon, ChevronDoubleRightIcon } from '@heroicons/react/solid'
// import { Button, PageButton } from '../shared/Buttons'
// import { classNames } from '../shared/Utils';
// import { useNavigate } from "react-router-dom";

const VotersTable = ({ columns, data }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        
    } = useTable({
        columns,
        data,
        initialState: { pageIndex: 0, pageSize: 10 }
    },
        useSortBy,
        usePagination
    );

    // let navigate = useNavigate();
    // const routeChange = () => {
    //     let path = window.location.pathname + '/newuser';
    //     navigate(path);
    // }

    return (
        <div className="h-full w-full">
            <div className="mt-2 flex flex-col">
                <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-4 lg:px-4">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50 shadow divide-x divide-gray-200">
                                    {headerGroups.map(headerGroup => (
                                        <tr {...headerGroup.getHeaderGroupProps()}>
                                            {headerGroup.headers.map(column => (
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-black-500 font-body font-semibold text-sm"
                                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                                >
                                                    {column.render('Header')}
                                                    <span>
                                                        {column.isSorted
                                                            ? column.isSortedDesc
                                                                ? ' ▼'
                                                                : ' ▲'
                                                            : ''}
                                                    </span>
                                                </th>
                                            ))}
                                        </tr>
                                    ))}
                                </thead>
                                <tbody
                                    {...getTableBodyProps()}
                                    className="bg-white text-[#595959] font-body font-medium text-sm"
                                >
                                    {page.map((row, i) => {
                                        prepareRow(row)
                                        return (
                                            <tr {...row.getRowProps()}>
                                                {row.cells.map(cell => {
                                                    return (
                                                        <td
                                                            {...cell.getCellProps()}
                                                            className="px-6 py-4 whitespace-nowrap"
                                                        >
                                                            {cell.render('Cell')}
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default VotersTable

// export function Detail({ value }) {
//     // const result = (value === 1) ? <ImLock /> : <ImUnlocked />;
//     const result = <a href="?" class="text-blue-600 dark:text-blue-500 hover:underline">Details</a>

//     return (
//         <span>
//             {result}
//         </span>
//     )
// }