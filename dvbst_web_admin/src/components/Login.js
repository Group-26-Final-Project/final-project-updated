import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SpinnerCircularFixed } from "spinners-react";
import { useNavigate } from 'react-router';
import { CgDanger } from 'react-icons/cg'
import { login } from '../features/authSlice';

export default function Login() {
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.authState)
    const navigate = useNavigate();

    const initialValues = { email: "", password: "" }

    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const changeHandler = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const errors = validate(formValues);
        if (Object.keys(formErrors).length === 0) {
            dispatch(login(formValues))
                .unwrap()
                .then((response) => {
                    navigate('/')
                    window.location.reload()
                    setFormValues(initialValues)
                })
                .catch((err) => {
                    setError(err)
                    setIsLoading(false)
                })
        } else {
            setFormErrors(errors);
            setIsLoading(false)
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

    console.log(error)
    return (
        <div class="flex flex-col items-center justify-center min-h-screen bg-[#2F313D]">
            {authState.loginStatus === 'pending' && (
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
            {authState.loginStatus === 'failed' && authState.loginError && (
                <div className="w-[52vh] p-3 flex flex-row justify-center" style={{ backgroundColor: "#ff000033" }}>
                    <CgDanger className="mr-2 flex-2" size={24} color={"#fb1032"} />
                    <h2 className="flex-1" style={{ color: "#fb1032" }}>{authState.loginError}</h2>
                </div>
            )}
            {authState.loginStatus !== 'pending' && (
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
                                <label class="block">Password</label>
                                <input type="password" name="password" onChange={changeHandler}
                                    class="w-full px-2 py-1 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                                <p class="text-red-500 text-xs italic">{formErrors.password}</p>
                            </div>
                            {isLoading ? (
                                <span className="spinner-border spinner-border-sm"></span>
                            ) :
                                <div class="flex items-baseline justify-center">
                                    <button class="px-6 py-2 mt-4 text-white bg-[#00D05A] rounded-lg hover:bg-blue-900">Login</button>
                                </div>
                            }
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}