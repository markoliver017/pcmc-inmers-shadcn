"use client";

import { useState } from "react";

import { useForm, FormProvider } from "react-hook-form";
import FirstForm from "./FirstForm";

import SecondForm from "./SecondForm";
import { Send } from "lucide-react";
import clsx from "clsx";

export default function ReportForm() {
    const methods = useForm({ mode: "onChange" });
    const [isSecondPage, setIsSecondPage] = useState(false);
    const [isConfirmationPage, setIsConfirmationPage] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    // const [data, setData] = useState(null);

    // const onFirstSubmit = (formData) => {
    //     console.log("onFirstSubmit:", formData);
    //     setData(formData);
    //     setIsSecondPage(true);
    // };

    // const onSecondSubmit = (formData) => {
    //     console.log("onSecondSubmit:", formData);
    //     setData((prevData) => ({ ...prevData, ...formData }));
    //     console.log("onSecondSubmit:", data);
    // };

    const {
        watch,
        formState: { errors },
    } = methods;

    console.log("watchAll", watch());
    console.log("form errors", errors);

    const onFinalSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/reports", {
                method: "POST",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                // Handle HTTP error statuses
                const errorData = await response.json();
                throw new Error(errorData.message || "Something went wrong");
            }

            const result = await response.json();
            console.log("onFinalSubmit result:", result);
        } catch (error) {
            console.error("onFinalSubmit Fetch error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="card bg-base-100 w-full sm:w-3/4 shadow-[5px_5px_0px_0px_rgba(0,_0,_0,_0.5),inset_0px_2px_4px_0px_rgba(0,_0,_0,_0.3)]">
                <div className="flex pt-2 justify-center items-center ">
                    {/* <progress
                        className="m-5 progress h-4 progress-accent w-[90%]"
                        value={isSecondPage ? 100 : 50}
                        max="100"
                    ></progress> */}
                    <ul className="steps">
                        <li className="step step-primary">
                            <small>Patient Details</small>
                        </li>
                        <li
                            className={clsx(
                                "step",
                                isSecondPage && "step-primary"
                            )}
                        >
                            <small>Medication Error Details</small>
                        </li>
                        <li
                            className={clsx(
                                "step",
                                isConfirmationPage && "step-warning"
                            )}
                        >
                            <small>Confirm</small>
                        </li>
                    </ul>
                </div>
                <div className="card-body">
                    <FormProvider {...methods}>
                        <form
                            // onSubmit={methods.handleSubmit((data) =>
                            //     onFinalSubmit(data)
                            // )}
                            className="px-5 bg-base-200 rounded-lg p-5"
                        >
                            {!isSecondPage ? (
                                <FirstForm
                                    setIsSecondPage={setIsSecondPage}
                                    isSecondPage={isSecondPage}
                                />
                            ) : (
                                <>
                                    {!isConfirmationPage ? (
                                        <SecondForm
                                            setIsSecondPage={setIsSecondPage}
                                            setIsConfirmationPage={
                                                setIsConfirmationPage
                                            }
                                        />
                                    ) : (
                                        <div className="flex flex-col mt-10 space-y-5 text-center">
                                            <h1 className="text-xl font-bold text-warning">
                                                Are you sure you want to submit
                                                this medication error?
                                            </h1>

                                            <div className="form-control">
                                                <label className="cursor-pointer label justify-center gap-3">
                                                    <input
                                                        type="checkbox"
                                                        className="checkbox border border-gray-400 checkbox-warning"
                                                        checked={isConfirmed}
                                                        onChange={(e) =>
                                                            setIsConfirmed(
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                    <span className="label-text font-medium">
                                                        I confirm the
                                                        information provided is
                                                        accurate.
                                                    </span>
                                                </label>
                                            </div>

                                            <button
                                                type="button"
                                                className="btn btn-success w-full sm:w-1/2 mx-auto disabled:btn-disabled"
                                                disabled={
                                                    !isConfirmed || isLoading
                                                }
                                                onClick={methods.handleSubmit(
                                                    (data) =>
                                                        onFinalSubmit(data)
                                                )}
                                            >
                                                <Send />
                                                {isLoading
                                                    ? "Submitting..."
                                                    : "Submit Form"}
                                            </button>
                                            <button
                                                type="button"
                                                className="text-blue-500 underline"
                                                onClick={() =>
                                                    setIsConfirmationPage(false)
                                                }
                                            >
                                                Review Form
                                            </button>
                                        </div>
                                        // <div className="mt-10">
                                        //     <h1>
                                        //         Are you sure you want to submit
                                        //         this medication error?
                                        //     </h1>
                                        //     <button
                                        //         type="button"
                                        //         className="btn btn-success w-full"
                                        //         onClick={methods.handleSubmit(
                                        //             (data) =>
                                        //                 onFinalSubmit(data)
                                        //         )}
                                        //     >
                                        //         {isLoading
                                        //             ? "Submitting..."
                                        //             : "Submit Form"}
                                        //     </button>
                                        // </div>
                                    )}
                                </>
                            )}
                        </form>
                    </FormProvider>
                </div>
            </div>
        </>
    );
}
