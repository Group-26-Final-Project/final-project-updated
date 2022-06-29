import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../features/authSlice';
import { SpinnerCircularFixed } from "spinners-react";
import { CgDanger } from 'react-icons/cg'

export default function RegistrationPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const authState = useSelector((state) => state.authState)

    const initialValues = {
        name: "", fname: "", gname: "",
        dept: "", section: "", year: "",
        email: "", id: "", phone: "",
        password: "", confpass: "", role: "voter",
        bio: "", plans: ""

    };

    const [isCandidate, setIsCandidate] = useState(false);
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});

    const changeHandler = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const onCheckClicked = () => {
        setIsCandidate(!isCandidate)
        setFormValues({ ...formValues, role: !isCandidate ? "candidate" : "voter" })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        var errors = validate(formValues);
        if (Object.keys(errors).length === 0) {
            dispatch(register(formValues))
                .unwrap()
                .then((response) => {
                    navigate('/after')
                    setFormErrors({})
                })
        } else {
            setFormErrors(errors);
        }
    }

    const validate = (values) => {
        const errors = {};
        const nameRegex = new RegExp("^[a-zA-Z]{3,20}$");
        const idRegex = new RegExp("^[a-zA-Z]{3}/[0-9]{4}/[0-9]{2}$");
        const emailRegex = new RegExp("^[A-Za-z0-9]{1,64}@(.+)$");
        const phoneRegex = new RegExp("^09[0-9]{8}$");
        const passRegex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");

        if (!values.name) {
            errors.name = "Name is a Required Field";
        } else if (!nameRegex.test(values.name)) {
            errors.name =
                "Invalid Name (Only Upper/Lower Case alphabets 3-20 characters long)";
        }
        if (!values.fname) {
            errors.fname = "Father's Name is a Required Field";
        } else if (!nameRegex.test(values.fname)) {
            errors.fname =
                "Invalid Name (Only Upper/Lower Case alphabets  3-20 characters long)";
        }
        if (!values.gname) {
            errors.gname = "Grandfather's Name is a Required Field";
        } else if (!nameRegex.test(values.gname)) {
            errors.gname =
                "Invalid Name (Only Upper/Lower Case alphabets  3-20 characters long)";
        }
        if (!values.dept) {
            errors.dept = "Select School/Center from dropdown";
        }
        if (!values.section) {
            errors.section = "Select Section from dropdown";
        }
        if (!values.year) {
            errors.year = "Select Year from dropdown";
        }
        if (!values.id) {
            errors.id = "ID is a Required Field";
        } else if (!idRegex.test(values.id)) {
            errors.id = "Invalid ID Format (eg. ATR/1234/09)";
        }
        if (!values.email) {
            errors.email = "Email is a Required Field";
        } else if (!emailRegex.test(values.email)) {
            errors.email = "Invalid Email Address (eg. useremail@email.com)";
        }
        if (!values.phone) {
            errors.phone = "Phone is a Required Field";
        } else if (!phoneRegex.test(values.phone)) {
            errors.phone = "Invalid Phone Number (eg. 0911123456)";
        }
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
        if (isCandidate && !values.bio) {
            errors.bio = "Bio is a required field"
        }
        if (isCandidate && !values.plans) {
            errors.plans = "Plans is a required field"
        }
        return errors;
    };

    useEffect(() => {
        authState.token && navigate('/')
    }, [authState.token, navigate])

    console.log("Authstate", authState)
    return (
        <div class="flex flex-col items-center justify-center min-h-screen bg-[#2F313D]">
            {authState.registerStatus === "pending" && (
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
            {authState.registerStatus === 'failed' && authState.registerError && (
                <div className="w-[72vh] p-3 flex flex-row justify-center" style={{ backgroundColor: "#ff000033" }}>
                    <CgDanger className="mr-2 flex-2" size={24} color={"#fb1032"} />
                    <h2 className="flex-1" style={{ color: "#fb1032" }}>{authState.registerError}</h2>
                </div>
            )}
            {authState.registerStatus !== "pending" && (
                <div class="px-12 py-8 mt-4 text-left bg-white shadow-lg  w-[35vw]">
                    <div class="w-[7vw]">
                        <h3 class="text-2xl font-bold text-left">Register</h3>
                        <div class="h-1 w-10 bg-[#00D05A] float-right"></div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div class="mt-4">
                            <div>
                                <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="name">Name</label>
                                <input type="text" name="name" onChange={changeHandler} value={formValues.name}
                                    class="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                                <p class="mb-2 text-red-500 text-xs italic">{formErrors.name}</p>
                            </div>
                            <div>
                                <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="fname">Father's Name</label>
                                <input type="text" name="fname" onChange={changeHandler} value={formValues.fname}
                                    class="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                                <p class="mb-2 text-red-500 text-xs italic">{formErrors.fname}</p>
                            </div>
                            <div>
                                <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="gname">Grandfather's Name</label>
                                <input type="text" name="gname" onChange={changeHandler} value={formValues.gname}
                                    class="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                                <p class="mb-2 text-red-500 text-xs italic">{formErrors.gname}</p>
                            </div>
                            <div>
                                <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="id">ID</label>
                                <input type="text" name="id" onChange={changeHandler} value={formValues.id}
                                    class="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                                <p class="mb-2 text-red-500 text-xs italic">{formErrors.id}</p>
                            </div>
                            <div>
                                <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="email">Email</label>
                                <input type={'email'} name="email" onChange={changeHandler} value={formValues.email}
                                    class="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                                <p class="mb-2 text-red-500 text-xs italic">{formErrors.email}</p>
                            </div>
                            <div>
                                <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="phone">Phone Number</label>
                                <input type={'text'} name="phone" onChange={changeHandler} value={formValues.phone}
                                    class="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                                <p class="mb-2 text-red-500 text-xs italic">{formErrors.phone}</p>
                            </div>
                            <div class="flex flex-wrap -mx-3 mb-3">
                                <div class="w-full md:w-full px-3 mb-6 md:mb-0">
                                    <label
                                        class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-dept">
                                        School/Center
                                    </label>
                                    <div class="relative">
                                        <select
                                            class="block appearance-none w-full bg-white-200 text-sm text-gray-700 border border-gray-200 text-gray-700 py-2 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            name="dept"
                                            id="grid-dept"
                                            value={formValues.dept}
                                            onChange={changeHandler}
                                        >
                                            <option value="" selected disabled hidden >
                                                --Select--
                                            </option>
                                            <option value={0}>Center of Biomedical Engineering (CBME)</option>
                                            <option value={1}>School of Chemical and Bio Engineering (SCBE)</option>
                                            <option value={2}>School of Civil and Environmental Engineering (SCEE)</option>
                                            <option value={3}>School of Electrical and Computer Engineering (SECE)</option>
                                            <option value={4}>School of Mechanical and Industrial Engineering (SMiE)</option>
                                            <option value={5}>School of Information Technology Engineering (SITE)</option>
                                        </select>
                                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg
                                                class="fill-current h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <p class="text-red-500 text-xs italic">{formErrors.dept}</p>
                                </div>
                            </div>
                            <div class="flex flex-wrap -mx-3 mb-3">
                                <div class="w-full md:w-full px-3 mb-6 md:mb-0">
                                    <label
                                        class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-dept">
                                        Year
                                    </label>
                                    <div class="relative">
                                        <select
                                            class="block appearance-none w-full bg-white-200 text-sm text-gray-700 border border-gray-200 text-gray-700 py-2 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            name="year"
                                            id="grid-year"
                                            value={formValues.year}
                                            onChange={changeHandler}
                                        >
                                            <option value="" selected disabled hidden>
                                                --Select--
                                            </option>
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                            <option value={4}>4</option>
                                            <option value={5}>5</option>
                                        </select>
                                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg
                                                class="fill-current h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <p class="text-red-500 text-xs italic">{formErrors.year}</p>
                                </div>
                            </div>
                            <div class="flex flex-wrap -mx-3 mb-3">
                                <div class="w-full md:w-full px-3 mb-6 md:mb-0">
                                    <label
                                        class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-dept">
                                        Section
                                    </label>
                                    <div class="relative">
                                        <select
                                            class="block appearance-none w-full bg-white-200 text-sm text-gray-700 border border-gray-200 text-gray-700 py-2 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            name="section"
                                            id="grid-section"
                                            value={formValues.section}
                                            onChange={changeHandler}
                                        >
                                            <option value="" selected disabled hidden>
                                                --Select--
                                            </option>
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                        </select>
                                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg
                                                class="fill-current h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <p class="text-red-500 text-xs italic">{formErrors.section}</p>
                                </div>
                            </div>
                            <div>
                                <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="password">Password</label>
                                <input type={'password'} name="password" onChange={changeHandler} value={formValues.password}
                                    class="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                                <p class="mb-2 text-red-500 text-xs italic">{formErrors.password}</p>
                            </div>
                            <div>
                                <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="confpass">Confirm Password</label>
                                <input type={'password'} name="confpass" onChange={changeHandler} value={formValues.confpass}
                                    class="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                                <p class="mb-2 text-red-500 text-xs italic">{formErrors.confpass}</p>
                            </div>
                        </div>
                        <div class="form-check flex items-baseline justify-center">
                            <input class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" name="candidate" value={isCandidate} onClick={onCheckClicked} id="flexCheckDefault" />
                            <label class="block tracking-wide text-gray-700 text-xs font-semibold mb-2" for="flexCheckDefault">
                                I would like to be a candidate.
                            </label>
                        </div>
                        {isCandidate && (
                            <>
                                <div>
                                    <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="bio">Bio</label>
                                    <textarea draggable='false' type="text" name="bio" onChange={changeHandler} value={formValues.bio}
                                        class="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                                    <p class="mb-2 text-red-500 text-xs italic">{formErrors.bio}</p>
                                </div>
                                <div>
                                    <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="gname">Plans</label>
                                    <textarea draggable='false' type="text" name="plans" onChange={changeHandler} value={formValues.plans}
                                        class="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                                    <p class="mb-2 text-red-500 text-xs italic">{formErrors.plans}</p>
                                </div>
                            </>
                        )}
                        <div class="flex items-baseline justify-center">
                            <button class="px-6 py-2 mt-4 text-white bg-[#00D05A] rounded-lg hover:bg-blue-900">Register</button>
                        </div>
                    </form>
                    <div class="mt-4">
                        <p class="text-gray-700 text-sm text-center">Already have an account? <a class="text-[#00D05A]" href="/login">Sign In</a></p>
                    </div>
                </div >
            )}
        </div >
    )
}