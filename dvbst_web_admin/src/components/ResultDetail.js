import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";

export default function ResultDetail() {
    let location = useLocation();
    let navigate = useNavigate();
    const electionsState = useSelector((state) => state.electionsState);
    const election = electionsState.elections.filter((el) => el._id === location.state)[0]

    const onCancel = () => {
        navigate(-1);
    }

    return (
        <div class="min-h-screen bg-white-800">
            {election && (
                <div class="flex flex-col justify-center items-center py-4 px-4 lg:px-8">
                    <div class="min-h-screen w-[50vw] bg - white - 800 flex flex - col justify - center py - 4 px - 4 lg: px - 8">
                        <div class="w-full py-4 px-4 lg:px-8 rounded-2xl bg-white-700" >
                            <div>
                                <h2 data-cy="result-election-name" class="my-4 text-xl text-center font-bold text-gray-900">{election.name}</h2>
                            </div>
                            {election.candidates.map((candidate, index) => (
                                <div class="flex flex-row justify-evenly items-center p-2 m-2">
                                    <div>
                                        <h2 data-cy="result-rank" class="my-4 text-l font-semibold text-gray-900">{index + 1}</h2>
                                    </div>
                                    <div class="relative w-28 h-28">
                                        <img data-cy="result-pp" src="https://randomuser.me/api/portraits/women/81.jpg" alt='' />

                                    </div>
                                    <div>
                                        <h2  data-cy="result-election-name" class="my-4 text-l font-semibold text-gray-900"><span>{candidate.name}</span> <span>{candidate.fname}</span></h2>
                                    </div>
                                    <div data-cy="result-count">{candidate.voteCount}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div class="w-[10vw] bg-white float-right text-[#00D05A] border border-[#00D05A] text-center py-2 mx-10 rounded-xl font-body font-light text-sm">
                        <button onClick={onCancel}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    )
}