import React, { useState } from 'react'
import { SpinnerCircularFixed } from "spinners-react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { resetPassword } from '../features/resetPassSlice';
import { CgDanger } from 'react-icons/cg'

export default function ResetPasswordPage(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const resetPasswordState = useSelector((state) => state.resetPasswordState)

    const initialValues = { password: "", confpass: "" };


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
            dispatch(resetPassword({
                resetToken: resetPasswordState.resetToken,
                password: formValues.password
            }))
                .unwrap()
                .then((response) => {
                    navigate('/reset/success');
                    setFormValues(initialValues)
                })
        } else {
            setFormErrors(errors);
        }
    }

    const validate = (values) => {
        const errors = {}
        const passRegex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");

        if (!values.password) {
            errors.password = "Password is a Required Field";
        } else if (!passRegex.test(values.password)) {
            errors.password = "Password must have at least eight characters and contain at least one uppercase letter, one lowercase letter, one number and one special character"
        }
        if (!values.confpass) {
            errors.confpass = "Confirm Password is a Required Field";
        } else if (values.confpass !== values.password) {
            errors.confpass = "Passwords should match"
        }
        return errors
    }

    return (
        <div class="flex flex-col items-center justify-center min-h-screen bg-[#2F313D]">
            {resetPasswordState.resetPasswordStatus === "pending" && (
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
            {resetPasswordState.resetPasswordStatus === "failed" && (
                <div className="w-[52vh] p-3 flex flex-row justify-center" style={{ backgroundColor: "#ff000033" }}>
                    <CgDanger className="mr-2 flex-2" size={24} color={"#fb1032"} />
                    <h2 className="flex-1" style={{ color: "#fb1032" }}>{resetPasswordState.resetPasswordError.message}</h2>
                </div>
            )}
            {resetPasswordState.resetPasswordStatus !== "pending" && (
                <div class="px-12 py-8 mt-4 text-left bg-white shadow-lg  w-[35vw]">
                    <div class="w-[19vw]">
                        <h3 class="text-2xl font-bold text-left">Create New Password</h3>
                        <div class="h-1 w-10 bg-[#00D05A] float-right"></div>
                    </div>
                    <div>
                        <h3 class="text-sm font-regular text-left">The password must be at least 8 characters long and contains at least one Uppercase, one Lowercase, one special character and one number</h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div class="mt-4">
                            <div>
                                <label class="block" for="password">Password</label>
                                <input type='password' name="password" onChange={changeHandler}
                                    class="w-full px-2 py-1 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                                <p class="text-red-500 text-xs italic">{formErrors.password}</p>
                            </div>
                            <div>
                                <label class="block" for="confpass">Confirm Password</label>
                                <input type='password' name="confpass" onChange={changeHandler}
                                    class="w-full px-2 py-1 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                                <p class="text-red-500 text-xs italic">{formErrors.confpass}</p>
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