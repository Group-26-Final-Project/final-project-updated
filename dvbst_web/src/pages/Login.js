import React, { useEffect, useState } from 'react'
import { SpinnerCircularFixed } from "spinners-react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { login, loadUser } from '../features/authSlice';
import { CgDanger } from 'react-icons/cg'

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")
    const [isSubmit, setIsSubmit] = useState(false)
    const authState = useSelector((state) => state.authState)

    const changeHandler = (event) => {
        setEmail(event.target.value)
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        var error = validate(email);
        if (!error) {
            dispatch(login({ email }))
                .unwrap()
                .then((response) => {
                    navigate('/verify')
                })
                .catch((err) => {
                    setEmail(email)
                })
        } else {
            setEmailError(error);
        }
    }

    const validate = (values) => {
        var error = ""
        if (!values) {
            error = "Email is a Required Field"
        }
        return error
    }

    return (
        <div class="flex flex-col items-center justify-center min-h-screen bg-[#2F313D]">
            {authState.loginStatus === "pending" && (
                <div class="flex items-center justify-center">
                    <SpinnerCircularFixed
                        size={50}
                        thickness={100}
                        speed={100}
                        color="#36ad47"
                        secondaryColor="rgba(0, 0, 0, 0.44)"
                    />
                </div>
            )}
            {authState.loginStatus === 'failed' && authState.loginError && (
                <div className="w-[52vh] p-3 flex flex-row justify-center" style={{ backgroundColor: "#ff000033" }}>
                    <CgDanger className="mr-2 flex-2" size={24} color={"#fb1032"} />
                    <h2 className="flex-1" style={{ color: "#fb1032" }}>{authState.loginError}</h2>
                </div>
            )}
            {authState.loginStatus !== "pending" && (
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
            )}
        </div>
    )
}