"use client";

import { useEffect, useState } from "react";
import { downloadReport } from "./action";
import { FormInputIcon, Pencil, Send } from "lucide-react";
import parse from "html-react-parser";
import SweetAlert from "@components/ui/SweetAlert";
import clsx from "clsx";
import Preloader2 from "@components/layout/Preloader2";

export default function ConfirmationPage({
    onNext,
    resetForm,
    methods,
    error_type,
}) {
    const { watch, handleSubmit } = methods;
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isDownLoading, setIsDownLoading] = useState(false);

    const onFinalSubmit = () => {
        SweetAlert({
            title: "Confirmation",
            text: "You are about to submit a report.",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Submit",
            cancelButtonText: "Cancel",
            onConfirm: () => {
                handleSubmit((data) => {
                    setIsLoading(true);

                    (async function () {
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

                            SweetAlert({
                                title: "Submission Successful",
                                text: "Medication error report submitted successfully.",
                                icon: "success",
                                showCancelButton: true,
                                cancelButtonText: "No, thanks",
                                confirmButtonText: "Download Report",
                                onConfirm: async () => {
                                    setIsDownLoading(true);
                                    const res = await downloadReport(
                                        data,
                                        error_type
                                    );
                                    setIsDownLoading(false);
                                    resetForm();
                                },
                                onCancel: () => resetForm(),
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
                                                    {details.map(
                                                        (err, index) => (
                                                            <li key={index}>
                                                                {err}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    ),
                                });
                            }
                        } finally {
                            setIsLoading(false);
                        }
                    })();
                })();
            },
        });
    };

    return (
        <div>
            <Preloader2
                caption="Downloading report ..."
                isLoading={isDownLoading}
            />

            <div className="divider font-semibold italic text-2xl">
                Review Your Report
                {/* <button
                    type="button"
                    className="flex gap-2 sm:w-1/4 text-blue-500 underline cursor-pointer hover:text-blue-900"
                    onClick={() => setIsToggleReview(!isToggleReview)}
                >
                    <FormInputIcon className="w-4" />
                    {isToggleReview ? "Hide Response" : "View Response"}
                </button> */}
            </div>
            <div className="card shadow-md mt-2">
                <div className="card-body overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                    <table className="table">
                        <tbody>
                            <tr className="bg-gray-200 dark:bg-gray-900 border-b border-gray-300">
                                <th colSpan={2}>Patient Details</th>
                            </tr>

                            <tr className="hover:bg-base-300">
                                <th>Patient Sex</th>
                                <td>{watch("patient_sex").toUpperCase()}</td>
                            </tr>
                            <tr className="hover:bg-base-300">
                                <th>Patient Weight</th>
                                <td>{watch("patient_weight")} kg</td>
                            </tr>
                            <tr className="hover:bg-base-300">
                                <th>Patient Height</th>
                                <td>{watch("patient_height")} cm</td>
                            </tr>
                            <tr className="bg-gray-200 dark:bg-gray-900 border-b border-gray-300">
                                <th colSpan={2}>Medication Error Details</th>
                            </tr>
                            <tr className="hover:bg-base-300">
                                <th>Reported Date</th>
                                <td>{watch("report_date")}</td>
                            </tr>
                            <tr className="hover:bg-base-300">
                                <th>Medication Report Date</th>
                                <td>{watch("error_date")}</td>
                            </tr>
                            <tr className="hover:bg-base-300">
                                <th>Medication error Type</th>
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
            <div className="flex flex-col items-center space-y-5 mt-10">
                {/* <h1 className="text-xl font-bold text-warning">
                    Are you sure you want to submit this medication error?
                </h1> */}

                <div className="form-control w-full">
                    <label className="cursor-pointer label gap-3">
                        <input
                            type="checkbox"
                            className="checkbox border border-gray-400 checkbox-warning"
                            checked={isConfirmed}
                            onChange={(e) => setIsConfirmed(e.target.checked)}
                        />
                        <span className="label-text font-medium">
                            I confirm the information provided is accurate.
                        </span>
                    </label>
                </div>

                <div className="flex flex-wrap w-full gap-2">
                    <button
                        type="button"
                        tabIndex={-1}
                        className="btn btn-neutral btn-circle flex-1 flex gap-2 text-warning-500"
                        onClick={() => onNext(-5)}
                    >
                        <Pencil className="w-4" />
                        Edit Report
                    </button>
                    <button
                        type="button"
                        className={clsx(
                            "btn flex-1 w-full mx-auto btn-circle",
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
                            onFinalSubmit();
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
            </div>
            <div className="text-center mt-5">
                <a href="#top">Back to top</a>
            </div>
        </div>
    );
}
