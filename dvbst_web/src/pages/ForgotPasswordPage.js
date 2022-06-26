import React, { useState } from 'react'
import { SpinnerCircularFixed } from "spinners-react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { forgotPassword } from '../features/resetPassSlice';
import { CgDanger } from 'react-icons/cg'

export default function ForgotPasswordPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const resetPasswordState = useSelector((state) => state.resetPasswordState)

    const initialValues = { email: "" }

    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({})

    const changeHandler = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validate(formValues);
        if (Object.keys(errors).length === 0) {
            console.log("Dispatch", formValues.email)
            dispatch(forgotPassword(formValues))
                .unwrap()
                .then((response) => {
                    navigate('/confirm', {
                        state: {
                            email: formValues.email,
                        }
                    });
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
        return errors
    }

    return (
        <div class="flex flex-col items-center justify-center min-h-screen bg-[#2F313D]">
            {resetPasswordState.forgotPasswordStatus === "pending" && (
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
            {resetPasswordState.forgotPasswordStatus === "failed" && (
                <div className="w-[52vh] p-3 flex flex-row justify-center" style={{ backgroundColor: "#ff000033" }}>
                    <CgDanger className="mr-2 flex-2" size={24} color={"#fb1032"} />
                    <h2 className="flex-1" style={{ color: "#fb1032" }}>{resetPasswordState.forgotPasswordError.message}</h2>
                </div>
            )}
            {resetPasswordState.forgotPasswordStatus !== "pending" && resetPasswordState.forgotPasswordStatus !== "failed" && (
                <div class="px-12 py-8 mt-4 text-left bg-white shadow-lg  w-[30vw]">
                    <div class="w-[15vw]">
                        <h3 class="text-2xl font-bold text-left">Forgot Password</h3>
                        <div class="h-1 w-10 bg-[#00D05A] float-right"></div>
                    </div>
                    <div class="text-lg mt-4 text-justify font-regular">
                        <h3 class="text-sm font-regular text-left">Enter the email associated with your account and we'll send an email with instructions to reset your password</h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div class="mt-4">
                            <div>
                                <label class="block" for="email">Email</label>
                                <input type="text" name="email" onChange={changeHandler}
                                    class="w-full px-2 py-1 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                                <p class="text-red-500 text-xs italic">{formErrors.email}</p>
                            </div>
                            <div class="flex items-baseline justify-center">
                                <button class="px-6 py-2 mt-4 text-white bg-[#00D05A] rounded-lg hover:bg-blue-900">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}