"use client";
import FormLabel from "./FormLabel";
import { Calendar, Cross } from "lucide-react";
import { useFormContext } from "react-hook-form";

import { BiError, BiMaleFemale } from "react-icons/bi";
import { MdNextPlan } from "react-icons/md";
import notify from "@components/ui/notify";
import { GiCancel } from "react-icons/gi";

export default function FirstForm({ setIsProceedForm, setIsSecondPage }) {
    const {
        register,
        trigger,
        formState: { errors },
    } = useFormContext();

    const handleNext = async () => {
        const valid = await trigger([
            "report_date",
            "error_date",
            "patient_sex",
            "patient_weight",
            "patient_height",
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

    return (
        <section>
            <div className="flex gap-5">
                <h2 className="card-title text-2xl">Patient Details</h2>
                <div className="text-orange-600 italic">* required fields</div>
            </div>
            <div className="flex mt-5">
                <FormLabel labelText="Report Date: *" />
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
                <FormLabel labelText="Date of the medication error happened: *" />

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
                <FormLabel labelText="Sex of the patient: *" />
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
                <FormLabel labelText="Weight of the patient: *" />
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
                <FormLabel labelText="Height of the patient: *" />
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

            <div className="card-actions justify-between mt-10">
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
                    onClick={handleNext}
                >
                    <MdNextPlan /> Next
                </button>
            </div>
        </section>
    );
}
