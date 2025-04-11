import FormLabel from "./FormLabel";
import { Calendar } from "lucide-react";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import dynamic from "next/dynamic";

const CreatableSelectNoSSR = dynamic(() => import("react-select/creatable"), {
    ssr: false,
});
import { BiError, BiMaleFemale } from "react-icons/bi";
import { IoArrowUndoCircle } from "react-icons/io5";
import { MdNextPlan } from "react-icons/md";

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
    { value: "other", label: "Others" },
];

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        borderColor: state.isFocused ? "black" : provided.borderColor,
        boxShadow: state.isFocused ? "0 0 0 1px black" : provided.boxShadow,
        ":hover": {
            border: "1px solid gray",
        },
    }),
};

export default function FirstForm({ setIsSecondPage }) {
    const {
        register,
        watch,
        setValue,
        control,
        trigger,
        formState: { errors },
    } = useFormContext();

    useEffect(() => {
        console.log("errors:", errors);
    }, [errors]);

    const handleNext = async () => {
        const valid = await trigger([
            "report_date",
            "error_date",
            "patient_sex",
            "patient_weight",
            "patient_height",
            "error_type",
            "other_error_type",
        ]);
        if (valid) setIsSecondPage(true);
    };

    console.log("watch:", watch());

    const error_type = watch("error_type");

    useEffect(() => {
        if (error_type !== "others") {
            setValue("other_error_type", "");
        }
    }, [error_type]);

    return (
        <section>
            <h2 className="card-title text-2xl">Patient Details</h2>
            <div className="flex mt-5">
                <FormLabel labelText="Report Date:" />
                <label className="input validator mt-1 border border-gray-300">
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

                <label className="input validator mt-1 border border-gray-300">
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
                    <label className="select border border-gray-300">
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
                    <label className="input border border-gray-300">
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
                <label className="input border border-gray-300">
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

            <div className="mt-5 flex">
                <FormLabel labelText="Type of medication error:" />
                <fieldset className="fieldset w-full">
                    <Controller
                        control={control}
                        name="error_type"
                        rules={{
                            required: "Type of medication error is required.",
                        }}
                        render={({ field: { onChange, value, name, ref } }) => (
                            <CreatableSelectNoSSR
                                id="error_type"
                                name={name}
                                ref={ref}
                                value={error_type_options.find(
                                    (option) => option.value === value
                                )}
                                onChange={(selectedOption) =>
                                    onChange(selectedOption.value)
                                }
                                options={error_type_options}
                                styles={customStyles}
                            />
                        )}
                    />
                </fieldset>
            </div>

            {errors.error_type && (
                <div className="flex">
                    <FormLabel labelText="" />

                    <p className="text-red-500 text-sm flex-items-center">
                        <BiError />
                        {errors.error_type?.message}
                    </p>
                </div>
            )}
            {error_type === "other" && (
                <div className="mt-5 ">
                    {/* <FormLabel labelText="Exact medication prescription as ordered for the patient:" /> */}
                    <label className="floating-label">
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
                <button disabled={true} className="btn btn-primary">
                    <IoArrowUndoCircle /> Back
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
