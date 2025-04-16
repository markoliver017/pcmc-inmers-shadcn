import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

import FormLabel from "./FormLabel";

import { IoArrowUndoCircle } from "react-icons/io5";
import { BiError } from "react-icons/bi";
import { MdDone } from "react-icons/md";
import notify from "@components/ui/notify";

const CreatableSelectNoSSR = dynamic(() => import("react-select/creatable"), {
    ssr: false,
});
import { getSingleStyle } from "@/styles/select-styles";

export default function SecondForm({
    errorTypeOptions,
    setIsSecondPage,
    setIsConfirmationPage,
}) {
    const { theme, resolvedTheme } = useTheme();
    const {
        register,
        watch,
        control,
        setValue,
        trigger,
        formState: { errors },
    } = useFormContext();

    const handleNext = async () => {
        const valid = await trigger([
            "error_type_id",
            "other_error_type",
            "exact_prescription",
            "incident_description",
            "workplace_environment",
            "patient_condition",
            "immediate_actions",
            "corrective_actions",
            "preventive_actions",
        ]);
        if (valid) {
            setIsConfirmationPage(true);
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

    const error_type_id = watch("error_type_id");

    useEffect(() => {
        if (error_type_id != 12) {
            setValue("other_error_type", "");
        }
    }, [error_type_id]);

    // console.log("watch:", watch());

    return (
        <section className="dark:text-white">
            <div className="flex gap-5">
                <h2 className="card-title text-2xl">
                    Medication Error Details
                </h2>

                <div className="text-orange-600 italic">* required fields</div>
            </div>
            <div className="mt-5">
                <FormLabel labelText="Type of medication error: *" />
                <fieldset className="fieldset w-full">
                    <Controller
                        control={control}
                        name="error_type_id"
                        rules={{
                            required: "Type of medication error is required.",
                        }}
                        render={({ field: { onChange, value, name, ref } }) => {
                            const selectedOption =
                                errorTypeOptions.find(
                                    (option) => option.id === value
                                ) || null;
                            return (
                                <CreatableSelectNoSSR
                                    id="error_type_id"
                                    name={name}
                                    ref={ref}
                                    placeholder="Type of medication error * (required)"
                                    value={selectedOption}
                                    onChange={(selectedOption) => {
                                        onChange(
                                            selectedOption
                                                ? selectedOption.id
                                                : null
                                        );
                                    }}
                                    isValidNewOption={() => false}
                                    options={errorTypeOptions}
                                    styles={getSingleStyle(resolvedTheme)}
                                    className="text-lg"
                                    isClearable
                                />
                            );
                        }}
                    />
                </fieldset>
                {errors.error_type_id && (
                    <p className="text-red-500 text-sm flex-items-center">
                        <BiError />
                        {errors.error_type_id?.message}
                    </p>
                )}
            </div>
            {error_type_id == "12" && (
                <div className="mt-5 ">
                    {/* <FormLabel labelText="Exact medication prescription as ordered for the patient:" /> */}
                    <label className="floating-label border border-gray-300 dark:text-white">
                        <input
                            type="text"
                            name="other_error_type"
                            {...register("other_error_type", {
                                required:
                                    error_type_id == "12"
                                        ? "Specify other medication error"
                                        : false,
                            })}
                            placeholder="Specify other medication error"
                            className="input input-md w-full"
                        />
                        <span>Other medication error</span>
                    </label>
                    {errors.other_error_type && (
                        <p className="text-red-500 text-sm flex-items-center">
                            <BiError />
                            {errors.other_error_type?.message}
                        </p>
                    )}
                </div>
            )}
            <div className="mt-5">
                <FormLabel labelText="Exact medication prescription as ordered for the patient: *" />
                <fieldset className="fieldset">
                    <textarea
                        className="textarea h-24 w-full border border-gray-300"
                        placeholder="Medication prescription"
                        {...register("exact_prescription", {
                            required: "Medication prescription is required.",
                            minLength: {
                                value: 3,
                                message:
                                    "Medication prescription must be at least 3 characters long.",
                            },
                        })}
                    ></textarea>
                </fieldset>
                {errors.exact_prescription && (
                    <p className="text-red-500 text-sm flex-items-center">
                        <BiError />
                        {errors.exact_prescription?.message}
                    </p>
                )}
            </div>
            <div className="mt-5">
                <FormLabel labelText="Narrative description of the medication error incident: *" />
                <fieldset className="fieldset">
                    <textarea
                        className="textarea h-24 w-full border border-gray-300"
                        placeholder="Your answer"
                        name="incident_description"
                        {...register("incident_description", {
                            required: "Incident description is required.",
                            minLength: {
                                value: 3,
                                message:
                                    "Incident description must be at least 3 characters long.",
                            },
                        })}
                    ></textarea>
                </fieldset>
                {errors.incident_description && (
                    <p className="text-red-500 text-sm flex-items-center">
                        <BiError />
                        {errors.incident_description?.message}
                    </p>
                )}
            </div>

            <div className="mt-5">
                <FormLabel labelText="Workplace environment description before, during, and after the medication error incident: *" />
                <fieldset className="fieldset">
                    <textarea
                        className="textarea h-24 w-full border border-gray-300"
                        placeholder="Your answer"
                        name="workplace_environment"
                        {...register("workplace_environment", {
                            required:
                                "Workplace environment description is required.",
                            minLength: {
                                value: 3,
                                message:
                                    "Workplace environment description must be at least 3 characters long.",
                            },
                        })}
                    ></textarea>
                </fieldset>
                {errors.workplace_environment && (
                    <p className="text-red-500 text-sm flex-items-center">
                        <BiError />
                        {errors.workplace_environment?.message}
                    </p>
                )}
            </div>

            <div className="mt-5">
                <FormLabel labelText="Patient’s condition before, during, and after the medication error incident: *" />
                <fieldset className="fieldset">
                    <textarea
                        className="textarea h-24 w-full border border-gray-300"
                        placeholder="Your answer"
                        name="patient_condition"
                        {...register("patient_condition", {
                            required: "Patient condition is required.",
                            minLength: {
                                value: 3,
                                message:
                                    "Patient condition must be at least 3 characters long.",
                            },
                        })}
                    ></textarea>
                </fieldset>
                {errors.patient_condition && (
                    <p className="text-red-500 text-sm flex-items-center">
                        <BiError />
                        {errors.patient_condition?.message}
                    </p>
                )}
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
                <FormLabel labelText="Description of the preventive action/s done after the medication error incident: *" />
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
            <div className="card-actions justify-between mt-5">
                <button
                    type="button"
                    onClick={() => setIsSecondPage(false)}
                    className="btn btn-primary"
                    tabIndex={-1}
                >
                    <IoArrowUndoCircle /> Back
                </button>
                <button
                    type="button"
                    onClick={handleNext}
                    className="btn btn-primary"
                >
                    <MdDone /> Proceed
                </button>
            </div>
        </section>
    );
}
