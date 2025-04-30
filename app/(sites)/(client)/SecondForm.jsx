import { useEffect, useState } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

import FormLabel from "./FormLabel";

import { IoArrowUndoCircle } from "react-icons/io5";
import { BiError } from "react-icons/bi";
import { MdDeleteForever, MdDone } from "react-icons/md";
import notify from "@components/ui/notify";

const CreatableSelectNoSSR = dynamic(() => import("react-select/creatable"), {
    ssr: false,
});
import { getSingleStyle } from "@/styles/select-styles";
import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@components/ui/card";
import { Delete, Plus, RemoveFormatting } from "lucide-react";

export default function SecondForm({
    errorTypeOptions,
    genericMedicineOptions,
    medicineRouteOptions,
    onNext,
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

    const { fields, append, remove } = useFieldArray({
        control,
        name: "medicines",
    });

    const handleNext = async () => {
        const valid = await trigger([
            "error_type_id",
            "other_error_type",
            "medicines",
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

    return (
        <section className="dark:text-white">
            <div className="card-actions justify-between mb-5">
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
                    className="btn btn-primary"
                >
                    <MdDone />{" "}
                    <span className="hidden sm:inline-block">Next</span>
                </button>
            </div>
            <div className="flex flex-wrap sm:gap-5">
                <h2 className="card-title text-2xl">
                    Medication Error Details
                </h2>

                <div className="text-orange-600 italic">* required fields</div>
            </div>
            <div className="mt-5">
                <FormLabel labelText="Type of Medication Error: *" />
                <fieldset className="fieldset w-full">
                    <Controller
                        control={control}
                        name="error_type_id"
                        rules={{
                            required: "Types of Medication Error is required.",
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
                                    className="sm:text-lg"
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

            {/****** Medicine Details  *********/}
            <Card className="mt-5">
                <CardTitle className="p-5 pb-2">Medicine Details</CardTitle>
                <CardDescription className="px-10 pb-2">
                    Select the generic name and routes. Click on “Add another
                    medicine” for each new medicine you need to describe.
                </CardDescription>
                <CardContent>
                    {fields.map((item, index) => (
                        <Card
                            key={item.id}
                            className="p-5 mb-2 border-l-2 border-l-blue-900 dark:border-l-blue-600"
                        >
                            <CardTitle>
                                <div className="flex justify-between">
                                    <p>Medicine {index + 1}</p>
                                    <div className="flex justify-end mt-2">
                                        <button
                                            type="button"
                                            disabled={index == 0}
                                            onClick={() => remove(index)}
                                            className="btn btn-error btn-sm btn-outline"
                                        >
                                            <MdDeleteForever />
                                        </button>
                                    </div>
                                </div>
                            </CardTitle>
                            <CardContent className="pb-0">
                                <div>
                                    <FormLabel labelText="Generic Name: *" />
                                    <fieldset className="fieldset w-full">
                                        <Controller
                                            control={control}
                                            name={`medicines.${index}.medicine_generic_id`}
                                            rules={{
                                                required:
                                                    "Generic name is required.",
                                            }}
                                            render={({
                                                field: {
                                                    onChange,
                                                    value,
                                                    name,
                                                    ref,
                                                },
                                            }) => {
                                                const selectedOption =
                                                    genericMedicineOptions.find(
                                                        (option) =>
                                                            option.id === value
                                                    ) || null;
                                                return (
                                                    <CreatableSelectNoSSR
                                                        name={name}
                                                        ref={ref}
                                                        placeholder="Generic name * (required)"
                                                        value={selectedOption}
                                                        onChange={(
                                                            selectedOption
                                                        ) => {
                                                            onChange(
                                                                selectedOption
                                                                    ? selectedOption.id
                                                                    : null
                                                            );
                                                        }}
                                                        isValidNewOption={() =>
                                                            false
                                                        }
                                                        options={
                                                            genericMedicineOptions
                                                        }
                                                        styles={getSingleStyle(
                                                            resolvedTheme
                                                        )}
                                                        className="sm:text-lg"
                                                        isClearable
                                                    />
                                                );
                                            }}
                                        />
                                    </fieldset>
                                    {errors?.medicines?.[index]
                                        ?.medicine_generic_id && (
                                        <p className="text-red-500 text-sm flex-items-center">
                                            <BiError />
                                            {
                                                errors.medicines[index]
                                                    .medicine_generic_id.message
                                            }
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <FormLabel labelText="Route: *" />
                                    <fieldset className="fieldset w-full">
                                        <Controller
                                            control={control}
                                            name={`medicines.${index}.medicine_route_id`}
                                            rules={{
                                                required: "Route is required.",
                                            }}
                                            render={({
                                                field: {
                                                    onChange,
                                                    value,
                                                    name,
                                                    ref,
                                                },
                                            }) => {
                                                const selectedOption =
                                                    medicineRouteOptions.find(
                                                        (option) =>
                                                            option.id === value
                                                    ) || null;
                                                return (
                                                    <CreatableSelectNoSSR
                                                        name={name}
                                                        ref={ref}
                                                        placeholder="Route * (required)"
                                                        value={selectedOption}
                                                        onChange={(
                                                            selectedOption
                                                        ) => {
                                                            onChange(
                                                                selectedOption
                                                                    ? selectedOption.id
                                                                    : null
                                                            );
                                                        }}
                                                        isValidNewOption={() =>
                                                            false
                                                        }
                                                        options={
                                                            medicineRouteOptions
                                                        }
                                                        styles={getSingleStyle(
                                                            resolvedTheme
                                                        )}
                                                        className="sm:text-lg"
                                                        isClearable
                                                    />
                                                );
                                            }}
                                        />
                                    </fieldset>
                                    {errors?.medicines?.[index]
                                        ?.medicine_route_id && (
                                        <p className="text-red-500 text-sm flex-items-center">
                                            <BiError />
                                            {
                                                errors.medicines[index]
                                                    .medicine_route_id.message
                                            }
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    <div className="flex justify-end mt-2">
                        <button
                            type="button"
                            onClick={() =>
                                append({
                                    medicine_generic_id: null,
                                    medicine_route_id: null,
                                })
                            }
                            className="btn btn-neutral btn-wide btn-outline dark:text-slate-200"
                        >
                            <Plus />{" "}
                            <span className="hidden sm:inline-block">
                                Add another medicine
                            </span>
                        </button>
                    </div>
                </CardContent>
            </Card>

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
