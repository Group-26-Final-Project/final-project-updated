import React, { useState } from 'react'
import { SpinnerCircularFixed } from "spinners-react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import { confirmCode } from '../features/resetPassSlice';
import { CgDanger } from 'react-icons/cg'

export default function ConfirmCodePage() {
    const navigate = useNavigate();
    const {state} = useLocation()
    const { email } = state
    console.log("Email", email)
    const dispatch = useDispatch()
    const resetPasswordState = useSelector((state) => state.resetPasswordState)

    const initialValues = { code: "" };


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
            var otp = formValues.code
            dispatch(confirmCode({email: email, code: otp}))
                .unwrap()
                .then((response) => {
                    navigate('/reset');
                    setFormValues(initialValues)
                })
        } else {
            setFormErrors(errors);
        }
    }

    const validate = (values) => {
        const errors = {}
        if (values.code < 6) {
            errors.code = "OTP is 6 digits long"
        }
        return errors
    }

    return (
        <div class="flex flex-col items-center justify-center min-h-screen bg-[#2F313D]">
            {resetPasswordState.confirmCodeStatus === "pending" && (
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
            {resetPasswordState.confirmCodeStatus === "failed" && (
                <div className="w-[52vh] p-3 flex flex-row justify-center" style={{ backgroundColor: "#ff000033" }}>
                    <CgDanger className="mr-2 flex-2" size={24} color={"#fb1032"} />
                    <h2 className="flex-1" style={{ color: "#fb1032" }}>{resetPasswordState.confirmCodeError.message}</h2>
                </div>
            )}
            {resetPasswordState.confirmCodeStatus !== "pending" && (
                <div class="px-12 py-8 mt-4 text-left bg-white shadow-lg  w-[25vw]">
                    <div class="w-[13vw]">
                        <h3 class="text-2xl font-bold text-left">Confirm Code</h3>
                        <div class="h-1 w-8 bg-[#00D05A] mr-3 float-right"></div>
                    </div>
                    <div class="text-lg mt-4 font-regular text-left">
                        <h3 class="text-sm font-regular text-left">Enter the 6-digit OTP you received in your email</h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div class="mt-4">
                            <div>
                                <label class="block" for="code">Code</label>
                                <input type="text" name="code" onChange={changeHandler}
                                    class="w-full px-2 py-1 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                                <p class="text-red-500 text-xs italic">{formErrors.code}</p>
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