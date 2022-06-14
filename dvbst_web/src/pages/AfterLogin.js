import React from 'react'
import { CgDanger } from 'react-icons/cg'


export default function AfterRegistration() {
    return (
        <div class="flex items-center justify-center min-h-screen bg-[#F6FAFA]">
            <div class="px-5 py-8 mt-4 text-left bg-white shadow-lg  w-[30vw]">
                <div class="flex justify-center">
                    <CgDanger size={48} color={'#00D05A'}/>
                </div>
                <div class="flex items-baseline justify-center">
                    <h1 class="text-center text-2xl text-gray-700">Verification Required</h1>
                </div>
                <div class="flex items-baseline justify-center pt-4">
                    <p class="text-center text-sm text-gray-700">Verification link has been sent to your email!</p>
                </div>
            </div >
        </div >
    )
}