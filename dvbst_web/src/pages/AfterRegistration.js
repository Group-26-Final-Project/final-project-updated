import React from 'react'
import { useNavigate } from 'react-router-dom';
import { AiOutlineCheckCircle } from 'react-icons/ai'


export default function AfterRegistration() {
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        navigate('/login')
    };

    return (
        <div class="flex items-center justify-center min-h-screen bg-[#2F313D]">
            <div class="px-5 py-8 mt-4 text-left bg-white shadow-lg  w-[30vw]">
                <div class="flex justify-center">
                    <AiOutlineCheckCircle size={48} color={'#00D05A'} style={{borderWidth: '2px', borderRadius: '100%', borderColor: '#00D05A33'}}/>
                </div>
                <div class="flex items-baseline justify-center">
                    <h1 class="text-center text-2xl text-gray-700">Registration Completed</h1>
                </div>
                <div class="flex items-baseline justify-center pt-4">
                    <p class="text-center text-sm text-gray-700">You have registered successfully. Wait for approval from admin</p>
                </div>
                <div class="flex items-baseline justify-center">
                    <button class="px-6 py-2 mt-4 text-white bg-[#00D05A] rounded-lg hover:bg-blue-900" onClick={handleSubmit}>Okay</button>
                </div>
            </div >
        </div >
    )
}