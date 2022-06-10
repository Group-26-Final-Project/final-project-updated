import React, { useEffect, useState } from 'react'
import Modal from '../components/Modal'

export default function Profile() {
    const [info, setInfo] = useState(null); // item for open model or null for closed
    const [modalOn, setModalOn] = useState(false);

    const initialValues = {
        bio: "", profile: null, plans: ""
    };

    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);


    const isValidFileUploaded = (file) => {
        const validExtensions = ["png", "jpeg", "jpg"];
        const fileExtension = file.type.split("/")[1];
        return validExtensions.includes(fileExtension);
    };

    const picHandler = (event) => {
        setFormValues({ ...formValues, profile: event.target.files[0] });
        setIsFilePicked(true);
        setSelectedFile(event.target.files[0]);
    };

    const changeHandler = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        var errors = validate(formValues);
        if (Object.keys(errors).length === 0) {
            console.log("Submit", formValues)
            setInfo(formValues)
            setModalOn(true)
        } else {
            console.log(errors)
            setFormErrors(errors)
        }
    }

    const validate = (values) => {
        var errors = {}
        if (!values.bio) {
            errors.bio = "Bio is a Required Field";
        }
        if (!values.plans) {
            errors.plans = "Plans is a Required Field";
        }
        if (values.profile && !isValidFileUploaded(values.profile)) {
            errors.profile = "Invalid Image Type (only png, jpg, jpeg allowed)";
        } else if (values.profile && values.profile.size > 1024000) {
            errors.profile = "Image size should be less than 1MB";
        }
        return errors
    }

    return (
        <div class="flex flex-col items-center justify-center min-h-screen bg-[#2F313D]">
            <div class="px-12 py-8 mt-4 text-left bg-white shadow-lg w-[40vw]">
                <div class="w-[15vw]">
                    <h3 class="text-2xl font-bold text-left">Complete Profile</h3>
                    <div class="h-1 w-10 bg-[#00D05A] float-right"></div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div class="mt-4">
                        <div class="flex flex-wrap -mx-3 mb-3">
                            <div class="w-full md:w-full px-3 mb-6 md:mb-0">
                                <label
                                    class="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    for="grid-bio"
                                >
                                    Bio
                                </label>
                                <textarea
                                    class="appearance-none block w-full bg-white-200 text-sm text-gray-700 border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 resize-none"
                                    name="bio"
                                    id="grid-bio"
                                    value={formValues.bio}
                                    onChange={changeHandler}
                                    placeholder="Enter Candidate Bio upto 250 characters"
                                    rows="4"
                                />
                                <p class="text-red-500 text-xs italic">{formErrors.bio}</p>
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-3">
                            <div class="w-full md:w-full px-3 mb-6 md:mb-0">
                                <label
                                    class="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    for="grid-plans"
                                >
                                    Plans
                                </label>
                                <textarea
                                    class="appearance-none block w-full bg-white-200 text-sm text-gray-700 border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 resize-none"
                                    name="plans"
                                    id="grid-plans"
                                    value={formValues.plans}
                                    onChange={changeHandler}
                                    placeholder="Enter your plans"
                                    rows="8"
                                />
                                <p class="text-red-500 text-xs italic">{formErrors.plans}</p>
                            </div>
                        </div>
                        <div class="flex flex-wrap mb-3">
                            <div class="w-full md:w-full px-3 mb-6 md:mb-0">
                                <label
                                    class="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    for="grid-pic"
                                >
                                    Profile Picture
                                </label>
                            </div>
                            <input
                                class="appearance-none block w-full bg-white-200 text-sm text-gray-700 border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 resize-none"
                                name="profile"
                                id="grid-pic"
                                type="file"
                                onChange={picHandler}
                            />
                            <p class="text-red-500 text-xs italic">{formErrors.profile}</p>
                        </div>
                    </div>
                    <div class="flex items-baseline justify-center">
                        <button class="px-6 py-2 mt-4 text-white bg-[#00D05A] rounded-lg hover:bg-blue-900">Submit</button>
                    </div>
                </form>
                {modalOn && <Modal setModalOn={setModalOn} setInfo={setInfo} info={info} />}
            </div>
        </div>
    )
}