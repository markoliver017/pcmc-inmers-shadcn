"use client";

import { useEffect, useState } from "react";

import { useForm, FormProvider } from "react-hook-form";
import parse from "html-react-parser";
import FirstForm from "./FirstForm";

import SecondForm from "./SecondForm";
import { Pencil, Send } from "lucide-react";
import clsx from "clsx";
import SweetAlert from "@components/ui/SweetAlert";
import notify from "@components/ui/notify";

export default function ReportForm({ setIsProceedForm }) {
    const methods = useForm({ mode: "onChange" });
    const [isSecondPage, setIsSecondPage] = useState(false);
    const [isConfirmationPage, setIsConfirmationPage] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorTypeOptions, setErrorTypeOptions] = useState([]);

    useEffect(() => {
        const fetchErrorTypes = async () => {
            try {
                const res = await fetch("/api/error_types", {
                    method: "GET",
                    cache: "no-store",
                });

                if (!res.ok) throw new Error("Failed to fetch error types");

                const { error_types } = await res.json();

                setErrorTypeOptions(
                    error_types.map((type) => ({
                        value: type.name,
                        label: type.name,
                        id: type.id,
                    }))
                );
            } catch (error) {
                console.error("Error fetching error types:", error);
            }
        };

        fetchErrorTypes();
    }, []);

    const {
        watch,
        reset,
        formState: { errors },
    } = methods;

    // console.log("WatchAll WatchAll WatchAll WatchAll WatchAll", watch())

    const selected_error_type = errorTypeOptions.find(option => option.id === watch("error_type_id")) || null;

    const error_type = selected_error_type?.id == 12
        ? `${selected_error_type?.label} <i>(${watch("other_error_type")})</i>`
        : selected_error_type?.label;

    // console.log("error_typeerror_typeerror_typeerror_typeerror_type", error_type)

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
                                            errorTypeOptions={errorTypeOptions}
                                            setIsSecondPage={setIsSecondPage}
                                            setIsConfirmationPage={
                                                setIsConfirmationPage
                                            }
                                        />
                                    ) : (
                                        <>

                                            <div className="flex flex-col items-center space-y-5 text-center">
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

                                            </div>
                                            <div className="divider mt-10">
                                                <button
                                                    type="button"
                                                    className="flex gap-2 sm:w-1/4 text-blue-500 underline cursor-pointer hover:text-blue-900"
                                                    onClick={() =>
                                                        setIsConfirmationPage(false)
                                                    }
                                                >
                                                    <Pencil className="w-4" />EDIT FORM
                                                </button>
                                            </div>

                                            <div className="card shadow-md mt-2">
                                                <div className="card-body overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                                                    <table className="table table-zebra">
                                                        {/* head */}
                                                        <thead>
                                                            <tr>
                                                                <th>Fields</th>
                                                                <th>Inputs</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr className="hover:bg-base-300">
                                                                <th>Reported Date</th>
                                                                <td>{watch("report_date")}</td>
                                                            </tr>
                                                            <tr className="hover:bg-base-300">
                                                                <th>Medication Error Date</th>
                                                                <td>{watch("error_date")}</td>
                                                            </tr>
                                                            <tr className="hover:bg-base-300">
                                                                <th>Error Type</th>
                                                                <td>{parse(error_type)}</td>
                                                            </tr>
                                                            <tr className="hover:bg-base-300">
                                                                <th>Exact Prescription</th>
                                                                <td>{watch("exact_prescription")}</td>
                                                            </tr>
                                                            <tr className="hover:bg-base-300">
                                                                <th>Incident Description</th>
                                                                <td>{watch("incident_description")}</td>
                                                            </tr>
                                                            <tr className="hover:bg-base-300">
                                                                <th>Workplace Environment</th>
                                                                <td>{watch("workplace_environment")}</td>
                                                            </tr>
                                                            <tr className="hover:bg-base-300">
                                                                <th>Patient Condition</th>
                                                                <td>{watch("patient_condition")}</td>
                                                            </tr>
                                                            <tr className="hover:bg-base-300">
                                                                <th>Patient Height</th>
                                                                <td>{watch("patient_height")} cm</td>
                                                            </tr>
                                                            <tr className="hover:bg-base-300">
                                                                <th>Patient Weight</th>
                                                                <td>{watch("patient_weight")} kg</td>
                                                            </tr>
                                                            <tr className="hover:bg-base-300">
                                                                <th>Patient Sex</th>
                                                                <td>{watch("patient_sex")}</td>
                                                            </tr>
                                                            <tr className="hover:bg-base-300">
                                                                <th>Immediate Actions</th>
                                                                <td>{watch("immediate_actions")}</td>
                                                            </tr>
                                                            <tr className="hover:bg-base-300">
                                                                <th>Corrective Actions</th>
                                                                <td>{watch("corrective_actions")}</td>
                                                            </tr>
                                                            <tr className="hover:bg-base-300">
                                                                <th>Preventive Actions</th>
                                                                <td>{watch("preventive_actions")}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>

                                        </>
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
