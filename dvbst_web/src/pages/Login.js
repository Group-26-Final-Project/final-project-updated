import React, { useState } from 'react'
import { SpinnerCircularFixed } from "spinners-react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { login } from '../features/authSlice';

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")
    const [isSubmit, setIsSubmit] = useState(false)

    const changeHandler = (event) => {
        setEmail(event.target.value)
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setEmailError(validate(email))
        if (!emailError){
            dispatch(login(email))
            setEmail("")
            navigate("/")
        }
    }

    const validate = (values) => {
        const errors = {}
        if (!values.email) {
            errors.email = "Email is a Required Field"
        }
        return errors
    }

    return (
        <div class="flex items-center justify-center min-h-screen bg-[#2F313D]">
            <div class="px-12 py-8 mt-4 text-left bg-white shadow-lg  w-[25vw]">
                <div class="w-[5vw]">
                    <h3 class="text-2xl font-bold text-left">Login</h3>
                    <div class="h-1 w-10 bg-[#00D05A] float-right"></div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div class="mt-4">
                        <div>
                            <label class="block" for="email">Email</label>
                            <input type="text" name="email" onChange={changeHandler}
                                class="w-full px-2 py-1 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                            <p class="text-red-500 text-xs italic">{emailError}</p>
                        </div>
                        <div class="flex items-baseline justify-center">
                            <button class="px-6 py-2 mt-4 text-white bg-[#00D05A] rounded-lg hover:bg-blue-900">Login</button>
                        </div>
                    </div>
                </form>
                <div class="mt-4">
                    <p class="text-gray-700 text-sm text-center">You don't have an account? <a class="text-[#00D05A]" href="/signup">Sign up</a></p>
                </div>
            </div>
        </div>
    )
}