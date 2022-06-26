import React, { useEffect, useState } from 'react'
import { SpinnerCircularFixed } from "spinners-react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { loadUser, login } from '../features/authSlice';
import { CgDanger } from 'react-icons/cg'

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const authState = useSelector((state) => state.authState)

    const initialValues = { email: "", password: "" }

    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({})

    const changeHandler = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validate(formValues);
        if (Object.keys(formErrors).length === 0) {
            dispatch(login(formValues))
                .unwrap()
                .then((response) => {
                    navigate('/')
                    window.location.reload()
                    setFormValues(initialValues)
                })
        } else {
            setFormErrors(errors);
        }
    }

    const validate = (values) => {
        const errors = {}

        if (!values.email) {
            errors.email = "Email is a Required Field"
        }
        if (!values.password) {
            errors.password = "Password is a Required Field"
        }
        return errors
    }

    useEffect(() => {
        loadUser() && navigate('/')
    }, [navigate])

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
                                <p class="text-red-500 text-xs italic">{formErrors.email}</p>
                            </div>
                            <div class="mt-4">
                                <label class="block" for="password">Password</label>
                                <input type="password" name="password" onChange={changeHandler}
                                    class="w-full px-2 py-1 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                                <p class="text-red-500 text-xs italic">{formErrors.password}</p>
                            </div>
                            <div class="mt-4">
                                <p class="text-[#00D05A] text-sm text-center"><a class="text-[#00D05A]" href="/forgot">Forgot Password?</a></p>
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