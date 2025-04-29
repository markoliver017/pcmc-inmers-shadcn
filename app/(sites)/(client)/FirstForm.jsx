"use client";
import FormLabel from "./FormLabel";
import { Calendar, Cross } from "lucide-react";
import { useFormContext } from "react-hook-form";

import { BiError, BiMaleFemale } from "react-icons/bi";
import { MdNextPlan } from "react-icons/md";
import notify from "@components/ui/notify";
import { GiCancel } from "react-icons/gi";
import { GrTooltip } from "react-icons/gr";
import clsx from "clsx";
import { useEffect } from "react";

const height_units = {
    cm: 1,
    m: 100,
    in: 0.393701,
    ft: 0.0328084,
}

export default function FirstForm({ setIsProceedForm, onNext }) {
    const {
        register,
        trigger,
        watch,
        setValue,
        formState: { errors },
    } = useFormContext({
        defaultValues: {
            height_unit: "cm",
            weight_unit: "kg"
        }
    });

    const onSubmitNext = async () => {
        const valid = await trigger([
            "report_date",
            "error_date",
            "patient_sex",
            "patient_weight",
            "patient_height",
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

    const height = watch('patient_height');
    const heightUnitKey = watch('height_unit');
    const heightUnit = height_units[heightUnitKey];

    let converted = 0;
    if (!isNaN(height) && Number(height) > 0 && heightUnitKey != "cm") {
        converted = (height * heightUnit);
    }
    const convertedHeightToolTip = converted != 0 ? `${converted} in cm` : "";

    useEffect(() => {
        setValue("converted_height", converted);
    }, [watch('patient_height'), watch('height_unit')])

    return (
        <section>
            <div className="card-actions justify-between mb-5">
                <button
                    onClick={() => setIsProceedForm(false)}
                    className="btn btn-default"
                    tabIndex={-1}
                >
                    <GiCancel /> Cancel
                </button>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={onSubmitNext}
                >
                    <MdNextPlan /> Next
                </button>
            </div>
            <div className="flex gap-5">
                <h2 className="card-title text-2xl">Patient Details</h2>
                <div className="text-orange-600 italic">* required fields</div>
            </div>

            <div className="mt-5 hidden">
                <FormLabel labelText="Report Date: <sup>default now</sup>" />
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
            <div className="mt-5 flex flex-wrap">
                <FormLabel labelText="Date of the medication error happened: *" />

                <label className="input validator mt-1 border w-full lg:w-96 border-gray-300 dark:text-white">
                    <Calendar className="h-3" />
                    <input
                        name="error_date"
                        {...register("error_date", {
                            required: "Medication error date is required.",
                        })}
                        defaultValue={new Date().toISOString().slice(0, 10)}
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
            <div className="mt-5 flex items-center flex-wrap">
                <FormLabel labelText="Sex of the patient: *" />
                <div className="w-full lg:w-96">
                    <label className="select border border-gray-300 w-full dark:text-white">
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
                    <p className="text-red-500 text-sm w-full flex-items-center">
                        <BiError />
                        {errors.patient_sex?.message}
                    </p>
                )}
            </div>
            <div className="mt-5 flex items-center flex-wrap">
                <FormLabel labelText="Weight of the patient: *" />
                <div className="w-full lg:w-96">
                    <label className="input w-full border border-gray-300 dark:text-white">
                        <input
                            type="number"
                            name="patient_weight"
                            {...register("patient_weight", {
                                required: "Patient weight is required.",
                            })}
                            placeholder=""
                        />
                        <select
                            {...register("weight_unit", {
                                required: "Weight unit measure is required.",
                            })}
                            name="height_unit"
                            className="dark:bg-inherit"
                        >
                            <option value="1">(KG)</option>
                            <option value="2.20462">(LB)</option>
                        </select>
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

            <div className={clsx(
                "mt-5 flex flex-wrap items-center",
                convertedHeightToolTip && "tooltip"
            )}
                data-tip={convertedHeightToolTip}
            >
                <div>
                    <FormLabel labelText="Height of the patient: " />
                    <sup></sup>
                </div>
                <label className="input border border-gray-300 w-full lg:w-96 dark:text-white">
                    <input
                        type="text"
                        name="patient_height"
                        {...register("patient_height", {
                            validate: (value) => {
                                console.log(value)
                                if (!value || value.trim() === "") {
                                    return "Please enter a height or type 'N/A'.";
                                }
                                if (value.trim().toLowerCase() === "n/a") {
                                    return true;
                                }
                                if (!isNaN(value) && Number(value) > 0) {
                                    return true;
                                }

                                // Optional: Add more complex validation for actual height values
                                return "Please enter a valid height or type 'N/A' if not applicable.";
                            }
                        })}
                        placeholder="Enter height or 'N/A' if not applicable."
                    />

                    <select
                        {...register("height_unit", {
                            required: "Height unit measure is required.",
                        })}
                        name="height_unit"
                        className="dark:bg-inherit"

                    >
                        {Object.keys(height_units).map((u, i) => (
                            <option key={i} value={u}>({u.toUpperCase()})</option>
                        ))}
                    </select>
                </label>
            </div>
            <input type="hidden" {...register("converted_height")} value={converted} />

            <div className="flex">
                <FormLabel labelText="" />
                {errors.patient_height && (
                    <p className="text-red-500 text-sm flex items-start gap-1">
                        <BiError />
                        {errors.patient_height?.message}
                    </p>
                )}
            </div>

        </section >
    );
}
