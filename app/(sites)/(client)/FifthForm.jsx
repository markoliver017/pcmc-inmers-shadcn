import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import FormLabel from "./FormLabel";

import { IoArrowUndoCircle } from "react-icons/io5";
import { BiError } from "react-icons/bi";
import { MdDone } from "react-icons/md";
import notify from "@components/ui/notify";
import { checkDuplicateReports } from "./action";

export default function FifthForm({ onNext, setDuplicates }) {
    const {
        register,
        watch,
        setValue,
        trigger,
        handleSubmit,
        formState: { errors },
    } = useFormContext();

    const handleNext = async () => {
        const valid = await trigger([
            "immediate_actions",
            "corrective_actions",
            "preventive_actions",
        ]);
        if (valid) {
            handleSubmit((data) => {
                console.log("handleSubmit", data);

                (async function () {

                    const res = await checkDuplicateReports(data);
                    if (res && res.length) {
                        const duplicateReports = res.map((row) => ({
                            ...row,
                            error_type_name:
                                row.error_type?.name == "Others"
                                    ? `${row.error_type?.name} (${row.other_error_type})`
                                    : row.error_type?.name,
                        }));
                        setDuplicates(duplicateReports);
                    }
                })()

            })();
            onNext(1);
        } else {
            notify(
                {
                    error: true,
                    message: "Please provide the necessary information..",
                },
                "warning"
            );
        }
    };

    return (
        <section className="dark:text-white flex-1 flex flex-col h-full">
            <div className="flex-1">

                <div className="flex flex-wrap sm:gap-5">
                    <h2 className="card-title text-2xl">
                        Medication Error Details
                    </h2>

                    <div className="text-orange-600 italic">* required fields</div>
                </div>

                <div className="mt-5">
                    <FormLabel labelText="Immediate action/s done after the medication error incident: *" />
                    <fieldset className="fieldset">
                        <textarea
                            className="textarea h-24 w-full border border-gray-300"
                            placeholder="Your answer"
                            name="immediate_actions"
                            {...register("immediate_actions", {
                                required: "Immediate action/s done * is required.",
                                minLength: {
                                    value: 3,
                                    message:
                                        "Immediate action/s done * must be at least 3 characters long.",
                                },
                            })}
                        ></textarea>
                    </fieldset>
                    {errors.immediate_actions && (
                        <p className="text-red-500 text-sm flex-items-center">
                            <BiError />
                            {errors.immediate_actions?.message}
                        </p>
                    )}
                </div>

                <div className="mt-5">
                    <FormLabel labelText="Corrective action/s done after the medication error incident: *" />
                    <fieldset className="fieldset">
                        <textarea
                            className="textarea h-24 w-full border border-gray-300"
                            placeholder="Your answer"
                            name="corrective_actions"
                            {...register("corrective_actions", {
                                required: "Corrective action/s done * is required.",
                                minLength: {
                                    value: 3,
                                    message:
                                        "Corrective action/s done * must be at least 3 characters long.",
                                },
                            })}
                        ></textarea>
                    </fieldset>
                    {errors.corrective_actions && (
                        <p className="text-red-500 text-sm flex-items-center">
                            <BiError />
                            {errors.corrective_actions?.message}
                        </p>
                    )}
                </div>

                <div className="mt-5">
                    <FormLabel labelText="Preventive action/s done after the medication error incident: *" />
                    <fieldset className="fieldset">
                        <textarea
                            className="textarea h-24 w-full border border-gray-300"
                            placeholder="Your answer"
                            name="preventive_actions"
                            {...register("preventive_actions", {
                                required: "Corrective action/s done * is required.",
                                minLength: {
                                    value: 3,
                                    message:
                                        "Corrective action/s done * must be at least 3 characters long.",
                                },
                            })}
                        ></textarea>
                    </fieldset>
                    {errors.preventive_actions && (
                        <p className="text-red-500 text-sm flex-items-center">
                            <BiError />
                            {errors.preventive_actions?.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="card-actions justify-between mt-5">
                <button
                    type="button"
                    onClick={() => onNext(-1)}
                    className="btn btn-default"
                    tabIndex={-1}
                >
                    <IoArrowUndoCircle />{" "}
                    <span className="hidden sm:inline-block">Back</span>
                </button>
                <button
                    type="button"
                    onClick={handleNext}
                    className="btn btn-success"
                >
                    <MdDone />{" "}
                    <span className="hidden sm:inline-block">Proceed</span>
                </button>
            </div>
        </section>
    );
}
