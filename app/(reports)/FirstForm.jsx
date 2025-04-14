"use client";
import FormLabel from "./FormLabel";
import { Calendar, Cross } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

const CreatableSelectNoSSR = dynamic(() => import("react-select/creatable"), {
    ssr: false,
});
import { BiError, BiMaleFemale } from "react-icons/bi";
import { IoArrowUndoCircle } from "react-icons/io5";
import { MdNextPlan } from "react-icons/md";
import { getSingleStyle } from "@/styles/select-styles";
import notify from "@components/ui/notify";
import { GiCancel } from "react-icons/gi";

const error_type_options = [
    {
        value: "Incorrect prescription (medication order)",
        label: "Incorrect prescription (medication order)",
    },
    {
        value: "Incorrect transcription on patient chart / record",
        label: "Incorrect transcription on patient chart / record",
    },
    {
        value: "Incorrect Dispensing (Drop down option 3)",
        label: "Incorrect Dispensing (Drop down option 3)",
    },
    {
        value: "Incorrect Preparation - Compounding errors",
        label: "Incorrect Preparation - Compounding errors",
    },
    {
        value: "Incorrect Administration - Wrong patient",
        label: "Incorrect Administration - Wrong patient ",
    },
    {
        value: "Incorrect Administration - Wrong medication",
        label: "Incorrect Administration - Wrong medication",
    },
    {
        value: "Incorrect Administration - Wrong dose/ dosage",
        label: "Incorrect Administration - Wrong dose/ dosage",
    },
    {
        value: "Incorrect Administration - Wrong time",
        label: "Incorrect Administration - Wrong time",
    },
    {
        value: "Incorrect Administration - Wrong route",
        label: "Incorrect Administration - Wrong route",
    },
    {
        value: "Incorrect Administration - Wrong form of medication",
        label: "Incorrect Administration - Wrong form of medication",
    },
    {
        value: "Incorrect Administration - Omission (medication is not given)",
        label: "Incorrect Administration - Omission (medication is not given)",
    },
    { value: "Others", label: "Others" },
];

export default function FirstForm({ setIsProceedForm, setIsSecondPage }) {
    // const url = new URL(`/api/error_types`, "http://localhost:3000");
    // const response = await fetch(url, {
    //     method: "GET",
    //     cache: "no-store",
    // });
    // const error_types = await response.json();
    // console.log(error_types);

    const [errorTypeOptions, setErrorTypeOptions] = useState([]);
    const { theme, resolvedTheme } = useTheme();

    const {
        register,
        watch,
        setValue,
        control,
        trigger,
        formState: { errors },
    } = useFormContext();

    useEffect(() => {
        const fetchErrorTypes = async () => {
            try {
                const res = await fetch("/api/error_types", {
                    method: "GET",
                    cache: "no-store",
                });

                if (!res.ok) throw new Error("Failed to fetch error types");

                const { error_types } = await res.json();
                console.log(">>>>>>>>>>>>>>>>>>>>>>", error_types);
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

    const handleNext = async () => {
        const valid = await trigger([
            "report_date",
            "error_date",
            "patient_sex",
            "patient_weight",
            "patient_height",
            "error_type_id",
            "other_error_type",
        ]);
        if (valid) {
            setIsSecondPage(true);
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

    console.log("watch:", watch());
    console.log("errorserrorserrorserrors:", errors);

    const error_type = watch("error_type");

    useEffect(() => {
        if (error_type !== "Others") {
            setValue("other_error_type", "");
        }
    }, [error_type]);

    return (
        <section>
            The current theme is: {theme} : {resolvedTheme}
            <h2 className="card-title text-2xl">Patient Details</h2>
            <div className="flex mt-5">
                <FormLabel labelText="Report Date:" />
                <label className="input mt-1 border border-gray-300 dark:text-white">
                    <Calendar className="h-3" />
                    <input
                        type="date"
                        name="report_date"
                        {...register("report_date", {
                            required: "Report date is required.",
                        })}
                        readOnly
                        value={new Date().toISOString().slice(0, 10)}
                    />
                </label>
                <p className="text-red-500 text-sm">
                    {errors.report_date && (
                        <span>{errors.report_date?.message}</span>
                    )}
                </p>
            </div>
            <div className="mt-5 flex">
                <FormLabel labelText="Date of the medication error happened:" />

                <label className="input validator mt-1 border border-gray-300 dark:text-white">
                    <Calendar className="h-3" />
                    <input
                        name="error_date"
                        {...register("error_date", {
                            required: "Medication error date is required.",
                        })}
                        type="date"
                    />
                </label>
            </div>
            <div className="flex">
                <FormLabel labelText="" />
                {errors.error_date && (
                    <p className="text-red-500 text-sm flex-items-center">
                        <BiError />
                        {errors.error_date?.message}
                    </p>
                )}
            </div>
            <div className="mt-5 flex items-center">
                <FormLabel labelText="Sex of the patient:" />
                <div className="w-full">
                    <label className="select border border-gray-300 dark:text-white">
                        <span className="label">
                            <BiMaleFemale />{" "}
                        </span>
                        <select
                            {...register("patient_sex", {
                                required: "Patient sex is required.",
                            })}
                            name="patient_sex"
                        >
                            <option value="">Select here</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="unknown">Unknown</option>
                        </select>
                    </label>
                </div>
            </div>
            <div className="flex">
                <FormLabel labelText="" />
                {errors.patient_sex && (
                    <p className="text-red-500 text-sm flex-items-center">
                        <BiError />
                        {errors.patient_sex?.message}
                    </p>
                )}
            </div>
            <div className="mt-5 flex items-center">
                <FormLabel labelText="Weight of the patient:" />
                <div className="w-full">
                    <label className="input border border-gray-300 dark:text-white">
                        <input
                            type="number"
                            name="patient_weight"
                            {...register("patient_weight", {
                                required: "Patient weight is required.",
                            })}
                            placeholder=""
                        />
                        <span className="label">KG</span>
                    </label>
                </div>
            </div>
            <div className="flex">
                <FormLabel labelText="" />

                {errors.patient_weight && (
                    <p className="text-red-500 text-sm flex-items-center">
                        <BiError />
                        {errors.patient_weight?.message}
                    </p>
                )}
            </div>
            <div className="mt-5 flex items-center">
                <FormLabel labelText="Height of the patient:" />
                <label className="input border border-gray-300 dark:text-white">
                    <input
                        type="number"
                        name="patient_height"
                        {...register("patient_height", {
                            required: "Patient height is required.",
                        })}
                        placeholder=""
                    />
                    <span className="label">CM</span>
                </label>
            </div>
            <div className="flex">
                <FormLabel labelText="" />

                {errors.patient_height && (
                    <p className="text-red-500 text-sm flex-items-center">
                        <BiError />
                        {errors.patient_height?.message}
                    </p>
                )}
            </div>
            <div className="mt-5">
                <FormLabel labelText="Type of medication error:" />
                <fieldset className="fieldset w-full">
                    <Controller
                        control={control}
                        name="error_type_id"
                        rules={{
                            required: "Type of medication error is required.",
                        }}
                        render={({ field: { onChange, value, name, ref } }) => (
                            <CreatableSelectNoSSR
                                id="error_type"
                                name={name}
                                ref={ref}
                                placeholder="Type of medication error * (required)"
                                value={errorTypeOptions.find(
                                    (option) => option.value === value
                                )}
                                onChange={(selectedOption) => {
                                    console.log(
                                        "selectedOptionselectedOption",
                                        selectedOption
                                    );
                                    onChange(selectedOption?.id);
                                }}
                                options={errorTypeOptions}
                                styles={getSingleStyle(resolvedTheme)}
                                isClearable
                            />
                        )}
                    />
                </fieldset>
                {errors.error_type_id && (
                    <p className="text-red-500 text-sm flex-items-center">
                        <BiError />
                        {errors.error_type_id?.message}
                    </p>
                )}
            </div>
            {error_type === "Others" && (
                <div className="mt-5 ">
                    {/* <FormLabel labelText="Exact medication prescription as ordered for the patient:" /> */}
                    <label className="floating-label border border-gray-300 dark:text-white">
                        <input
                            type="text"
                            name="other_error_type"
                            {...register("other_error_type", {
                                required:
                                    error_type === "other"
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
            <div className="card-actions justify-between mt-10">
                <button
                    onClick={() => setIsProceedForm(false)}
                    className="btn btn-default"
                >
                    <GiCancel /> Cancel
                </button>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleNext}
                >
                    <MdNextPlan /> Next
                </button>
            </div>
        </section>
    );
}
