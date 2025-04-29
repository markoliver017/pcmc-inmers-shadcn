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

export default function SecondForm({ errorTypeOptions, onNext }) {
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
            // "exact_prescription",
            // "incident_description",
            // "workplace_environment",
            // "patient_condition",
            // "immediate_actions",
            // "corrective_actions",
            // "preventive_actions",
        ]);
        if (valid) {
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

    const error_type_id = watch("error_type_id");

    const selected_error_type =
        errorTypeOptions.find((option) => option.id === error_type_id) || null;

    useEffect(() => {
        if (selected_error_type?.value == "Others") {
            setValue("other_error_type", "");
        }
    }, [error_type_id]);

    // console.log("watch:", watch());

    return (
        <section className="dark:text-white min-h-[300px]">
            <div className="flex gap-5">
                <h2 className="card-title text-2xl">
                    Medication Error Details
                </h2>

                <div className="text-orange-600 italic">* required fields</div>
            </div>
            <div className="card-actions justify-between mt-5">
                <button
                    type="button"
                    onClick={() => onNext(-1)}
                    className="btn btn-default"
                    tabIndex={-1}
                >
                    <IoArrowUndoCircle /> Back
                </button>
                <button
                    type="button"
                    onClick={handleNext}
                    className="btn btn-primary"
                >
                    <MdDone /> Next
                </button>
            </div>
            <div className="mt-5">
                <FormLabel labelText="Type of Medication Error: *" />
                <fieldset className="fieldset w-full">
                    <Controller
                        control={control}
                        name="error_type_id"
                        rules={{
                            required: "Type of Medication Error is required.",
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
            {selected_error_type?.value == "Others" && (
                <div className="mt-5 ">
                    {/* <FormLabel labelText="Exact medication prescription as ordered for the patient:" /> */}
                    <label className="floating-label border border-gray-300 dark:text-white">
                        <input
                            type="text"
                            name="other_error_type"
                            {...register("other_error_type", {
                                required:
                                    selected_error_type?.value == "Others"
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
        </section>
    );
}
