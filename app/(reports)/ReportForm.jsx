"use client";

import { useState } from "react";

import { useForm, FormProvider } from "react-hook-form";
import FirstForm from "./FirstForm";

import SecondForm from "./SecondForm";
import { Send } from "lucide-react";
import clsx from "clsx";
import SweetAlert from "@components/ui/SweetAlert";
import notify from "@components/ui/notify";

export default function ReportForm({ setIsProceedForm }) {
    const methods = useForm({ mode: "onChange" });
    const [isSecondPage, setIsSecondPage] = useState(false);
    const [isConfirmationPage, setIsConfirmationPage] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {
        watch,
        reset,
        formState: { errors },
    } = methods;

    console.log("watchAll", watch());
    // console.log("form errors", errors);

    const onFinalSubmit = async (data) => {
        setIsLoading(true);

        try {
            const response = await fetch("/api/reports", {
                method: "POST",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            });

            const result = await response.json();

            if (!response.ok) {
                throw result;
            }

            reset({});
            setIsSecondPage(false);
            setIsConfirmationPage(false);
            setIsConfirmed(false);
            setIsProceedForm(false);
            notify({
                message: "Report submitted.",
                error: false,
            });
            SweetAlert({
                title: "Submission Successful",
                text: "Medication error report submitted successfully.",
                icon: "success",
                confirmButtonText: "OK",
            });
        } catch (data) {
            if (
                data?.message == "Validation failed" &&
                Array.isArray(data.details)
            ) {
                const { error, details, message } = data;
                notify({
                    error,
                    message: (
                        <div tabIndex={0} className="collapse">
                            <div className="collapse-title font-semibold">
                                {message}
                                <br />
                                <small className="link link-warning">
                                    See details
                                </small>
                            </div>
                            <div className="collapse-content text-sm">
                                <ul className="list-disc list-inside">
                                    {details.map((err, index) => (
                                        <li key={index}>{err}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ),
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="card w-full sm:w-3/4 shadow-[5px_5px_0px_0px_rgba(0,_0,_0,_0.5),inset_0px_2px_4px_0px_rgba(0,_0,_0,_0.3)]">
                <div className="flex pt-2 justify-center items-center ">
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
                        <form className="px-5 rounded-lg p-5">
                            {!isSecondPage ? (
                                <FirstForm
                                    setIsProceedForm={setIsProceedForm}
                                    setIsSecondPage={setIsSecondPage}
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
                                        <div className="flex flex-col items-center mt-10 space-y-5 text-center">
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
                                                // className="btn  w-full sm:w-1/2 mx-auto disabled:btn-disabled"
                                                className={clsx(
                                                    "btn w-full sm:w-1/2 mx-auto",
                                                    isConfirmed
                                                        ? "btn-success"
                                                        : "btn-gray text-gray-500 cursor-not-allowed"
                                                )}
                                                disabled={isLoading}
                                                onClick={() => {
                                                    if (!isConfirmed) {
                                                        SweetAlert({
                                                            title: "Confirmation",
                                                            text: "Please confirm the information provided is accurate.",
                                                            icon: "warning",
                                                        });
                                                        return;
                                                    }
                                                    methods.handleSubmit(
                                                        (data) =>
                                                            onFinalSubmit(data)
                                                    )();
                                                }}
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <span className="loading loading-bars loading-xs"></span>
                                                        Submitting...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send />
                                                        Submit Form
                                                    </>
                                                )}
                                            </button>
                                            <button
                                                type="button"
                                                className="sm:w-1/4 text-blue-500 underline cursor-pointer hover:text-blue-900"
                                                onClick={() =>
                                                    setIsConfirmationPage(false)
                                                }
                                            >
                                                Review Form
                                            </button>
                                        </div>
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
