import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SpinnerCircularFixed } from "spinners-react";
import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AccordionLayout from '../components/AccordionLayout';
import { getCandidates } from '../features/candidatesSlice';

export default function CandidatesPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const candidatesState = useSelector((state) => state.candidatesState)

    const deptTypes = [
        "Center of Biomedical Engineering (CBME)",
        "School of Chemical and Bio Engineering (SCBE)",
        "School of Civil & Environmental Engineering (SCEE)",
        "School of Electrical & Computer Engineering (SECE)",
        "School of Mechanical and Industrial Engineering (SMiE)",
        "School of Information Technology Engineering (SITE)"
        // "Biomedical Engineering",
        // "Chemical Engineering",
        // "Civil Engineering",
        // "Electrical Engineering",
        // "Mechanical Engineering",
        // "Software Engineering",
    ];

    useEffect(() => {
        dispatch(getCandidates(""))
    }, [dispatch, candidatesState.disqualifyCandidatesStatus])

    return (
        <div class="min-h-screen w-full bg-white-800 flex flex-col items-center py-4 px-8 lg:px-16">
            {candidatesState.getCandidatesStatus === "pending" && (
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
            {candidatesState.getCandidatesStatus === "failed" && (
                <div>
                    <h3>Ooops something went wrong</h3>
                    <button onClick={() => window.location.reload(false)}>Reload!</button>
                </div>
            )}
            {candidatesState.getCandidatesStatus === "success" && candidatesState.candidates && (
                < div class="w-full py-4 px-4 lg:px-8 rounded-2xl bg-white-700">
                    {candidatesState.candidates.length === 0 ? (
                        <div>
                            <p className='text-center text-lg'>No Candidates Available</p>
                        </div>
                    ) :
                        candidatesState.candidates.map((candidate) => (
                            <div class="relative w-full overflow-hidden items-center justify-center border border-solid border-gray-200 rounded shadow-xl">
                                <input type='checkbox' class="peer absolute top-3 inset-x-0 w-full h-24 opacity-0 z-10 cursor-pointer" />
                                <div class="flex flex-row">
                                    <div class="flex flex-col flex-initial w-32 items-center justify-center p-4">
                                        <img class="rounded-xl" src="https://upo0pf2qzrb5.usemoralis.com:2053/server/files/l2iSil7CMHrhypcuog84VP1RgOkpDJ7QJC93VX5d/e45cf65395b140d256287c00e2117a85_photo_2022-06-26_14-57-53.jpg" alt="" />
                                    </div>
                                    <div class="flex flex-col h-40 w-full pl-5 justify-center">
                                        <div class='flex flex-col justify-center items-start'>
                                            <div>
                                                <h2 class="text-body text-xl font-bold text-black">{candidate.fullName}</h2>
                                            </div>
                                            <div>
                                                {deptTypes[candidate.dept]}
                                            </div>
                                            <div>
                                                Year: {candidate.year}
                                            </div>
                                            <div>
                                                Section: {candidate.section}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex flex-col justify-center text-black transition-transform duration-500 rotate-0 peer-checked:rotate-180 p-8">
                                        <FaChevronDown size={24} />
                                    </div>
                                </div>
                                <div class="bg-white overflow-hidden transition-all duration-500 max-h-0 peer-checked:max-h-max">
                                    <div class="p-8">
                                        <div class=" mb-2">
                                            <label class="text-body font-bold text-xl">Bio</label>
                                            <p>
                                                {candidate.bio}
                                            </p>
                                        </div>
                                        <div>
                                            <label class="text-body font-bold text-xl">Plans</label>
                                            <p>
                                                {candidate.plans}
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            )}
        </div >
    )
}