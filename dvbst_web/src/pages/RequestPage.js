import React, { useState } from "react";
import notify from "../utils/notify";
import * as Yup from "yup";
import clsx from "clsx";
import { Formik, Field, Form } from "formik";
import CustomAxios from "../Api/CustomAxios";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

function RequestPage() {
  const [isLoading, setIsLoading] = useState(false);
  const userState = useSelector((state) => state.userState);
  console.log(userState, " user state");
  const navigate = useNavigate();
  const RequestSchema = Yup.object().shape({
    description: Yup.string()
      .min(10, "Too Short!")
      .max(500, "Too Long!")
      .required("Please Enter description"),
  });

  return (
    <div className="w-full border flex justify-center h-full">
      <div className="w-5/6 h-full min-h-full ">
        <div className="my-3">
          <div
            role="alert"
            className="container mx-auto w-11/12 md:w-2/3 max-w-lg"
          >
            <Formik
              initialValues={{
                description: "",
                type: "COMPLAINT",
              }}
              validationSchema={RequestSchema}
              onSubmit={async (values) => {
                try {
                  setIsLoading(true);
                  await CustomAxios.post("/requests", {
                    ...values,
                    candidateId: userState.user._id,
                  });
                  notify.success("Request Sent Successfully");
                } catch (error) {
                  notify.error(error.toString());
                }
                setIsLoading(false);
              }}
            >
              {({ errors, touched, isValidating, setFieldValue, values }) => (
                <Form>
                  <div className="h-full relative py-8 px-5 md:px-10 shadow-md rounded">
                    <h1 className="text-4xl font-bold my-10">Add Request</h1>

                    <div className="my-2">
                      <label
                        htmlFor="type"
                        className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                      >
                        Type
                      </label>
                      <Field
                        as="select"
                        name="type"
                        id="type"
                        className="mb-5 form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        aria-label="type"
                      >
                        <option value="COMPLAINT">COMPLAINT</option>
                        <option value="WITHDRAWAL">WITHDRAWAL</option>
                      </Field>
                      {touched.type && errors.type && (
                        <div className="text-red-600">{errors.type}</div>
                      )}
                    </div>

                    <label
                      htmlFor="description"
                      className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                    >
                      Request Description
                    </label>
                    <Field
                      id="description"
                      component="textarea"
                      rows="4"
                      name="description"
                      className={clsx(
                        "mb-5 mt-2 p-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border",
                        touched.description && errors.description
                          ? "border-red-500"
                          : ""
                      )}
                      placeholder="Description"
                    />
                    {touched.description && errors.description && (
                      <div className="text-red-600">{errors.description}</div>
                    )}

                    <div className="flex items-center justify-start w-full my-5">
                      <button
                        type="submit"
                        data-test-id="add_event_button"
                        disabled={isLoading}
                        className={clsx(
                          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700 transition duration-150 ease-in-out hover:bg-green-600 bg-green-700 disabled:bg-green-400  disabled:cursor-not-allowed rounded text-white px-8 py-2 text-sm flex"
                        )}
                      >
                        {isLoading ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Loading...
                          </>
                        ) : (
                          "Submit"
                        )}
                      </button>
                      <button
                        onClick={() => {
                          navigate(-1);
                        }}
                        className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestPage;
