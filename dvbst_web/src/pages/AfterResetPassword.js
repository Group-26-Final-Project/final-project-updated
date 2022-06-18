import React from 'react'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

export default function AfterResetPassword() {
    const navigate = useNavigate()
    return (
        <div class="flex items-center justify-center min-h-screen bg-[#F6FAFA]">
            <div class="px-5 py-8 mt-4 text-left bg-white shadow-lg  w-[30vw]">
                <div class="flex justify-center">
                    <AiOutlineCheckCircle size={48} color={'#00D05A'} style={{ borderWidth: '2px', borderRadius: '100%', borderColor: '#00D05A33' }} />
                </div>
                <div class="flex items-baseline justify-center">
                    <h1 class="text-center text-2xl text-gray-700">Reset Password Successful</h1>
                </div>
                <div class="flex flex-col justify-center pt-4">
                    <p class="text-center text-sm text-gray-700">Click the button to go to login page</p>
                    <button class="px-6 py-2 mt-4 text-white bg-[#00D05A] rounded-lg" onClick={()=>navigate('/')}>Go to Login</button>
                </div>
            </div >
        </div >
    )
}