"use client";

import { Calendar } from "lucide-react";
import { useState } from "react";
import Select from 'react-select'
import dynamic from 'next/dynamic';

const CreatableSelectNoSSR = dynamic(
    () => import('react-select/creatable'),
    { ssr: false }
);
import { MdNextPlan } from "react-icons/md";
import { IoArrowUndoCircle } from "react-icons/io5";
import FormLabel from "./FormLabel";
import { FaGenderless } from "react-icons/fa";

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
];

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        borderColor: state.isFocused ? 'black' : provided.borderColor,
        boxShadow: state.isFocused ? '0 0 0 1px black' : provided.boxShadow,
        ':hover': {
            border: '1px solid gray',
        },
    }),
};

export default function Reports() {

    const [isSecondPage, setIsSecondPage] = useState(false);
    return (
        <div className="flex justify-center items-center sm:p-5">
            <div className="card bg-base-100 w-full sm:w-3/4 shadow-[5px_5px_0px_0px_rgba(0,_0,_0,_0.5),inset_0px_2px_4px_0px_rgba(0,_0,_0,_0.3)]">
                <div className="flex pt-2 justify-center items-center ">
                    <progress
                        className="m-5 progress h-4 progress-accent w-[90%]"
                        value={isSecondPage ? 100 : 50}
                        max="100"
                    ></progress>
                </div>
                <div className="card-body">
                    <h2 className="card-title text-2xl">
                        Medication Error Details
                    </h2>
                    <form className="px-5 bg-base-200 rounded-lg p-5">

                        {!isSecondPage && (
                            <section>
                                <div className="flex ">
                                    <FormLabel labelText="Report Date:" />
                                    <label className="input validator mt-1 border border-gray-300">
                                        <Calendar className="h-3" />
                                        <input
                                            type="date"
                                            name="report_date"
                                            readOnly
                                            value={new Date()
                                                .toISOString()
                                                .slice(0, 10)}
                                        />
                                    </label>
                                    <p className="validator-hint hidden">
                                        This field is required.
                                    </p>
                                </div>

                                <div className="mt-5 flex">
                                    <FormLabel labelText="Date of the medication error happened:" />
                                    <label className="input validator mt-1 border border-gray-300">
                                        <Calendar className="h-3" />
                                        <input name="error_date" type="date" />
                                    </label>
                                    <p className="validator-hint hidden">
                                        This field is required.
                                    </p>
                                </div>

                                <div className="mt-5 flex items-center">
                                    <FormLabel labelText="Sex:" />
                                    <label className="select border border-gray-300">
                                        <span className="label">
                                            <FaGenderless />{" "}
                                        </span>
                                        <select name="patient_sex">
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="unknown">Unknown</option>
                                        </select>
                                    </label>
                                    <p className="validator-hint hidden">
                                        This field is required.
                                    </p>
                                </div>

                                <div className="mt-5 flex items-center">
                                    <FormLabel labelText="Weight:" />
                                    <label className="input border border-gray-300">
                                        <input type="number" name="patient_weight" placeholder="" />
                                        <span className="label">KG</span>
                                    </label>
                                    <p className="validator-hint hidden">
                                        This field is required.
                                    </p>
                                </div>

                                <div className="mt-5 flex items-center">
                                    <FormLabel labelText="Height:" />
                                    <label className="input border border-gray-300">
                                        <input type="number" name="patient_height" placeholder="" />
                                        <span className="label">CM</span>
                                    </label>
                                    <p className="validator-hint hidden">
                                        This field is required.
                                    </p>
                                </div>

                                <div className="mt-5">
                                    <FormLabel labelText="Exact medication prescription as ordered for the patient:" />
                                    <fieldset className="fieldset">
                                        <textarea
                                            className="textarea h-24 w-full border border-gray-300"
                                            placeholder="Medication prescription"
                                            name="exact_prescription"
                                        ></textarea>
                                    </fieldset>
                                    <p className="validator-hint hidden">
                                        This field is required.
                                    </p>
                                </div>

                                <div className="mt-5">
                                    <FormLabel labelText="Type of medication error:" />
                                    <fieldset className="fieldset">
                                        <CreatableSelectNoSSR
                                            id="error_type"
                                            name="error_type"
                                            options={options}
                                            styles={customStyles}
                                        />
                                    </fieldset>
                                    <p className="validator-hint hidden">
                                        This field is required.
                                    </p>
                                </div>

                                <div className="mt-5 ">
                                    {/* <FormLabel labelText="Exact medication prescription as ordered for the patient:" /> */}
                                    <label className="floating-label">
                                        <input
                                            type="text"
                                            name="other_error_type"
                                            placeholder="Specify other medication error"
                                            className="input input-md w-full"
                                        />
                                        <span>Other medication error</span>
                                    </label>
                                    <p className="validator-hint hidden">
                                        This field is required.
                                    </p>
                                </div>
                            </section>
                        )}

                        {isSecondPage && (
                            <section>
                                <div className="mt-5">
                                    <FormLabel labelText="Narrative description of the medication error incident:" />
                                    <fieldset className="fieldset">
                                        <textarea
                                            className="textarea h-24 w-full border border-gray-300"
                                            name="incident_description"
                                            placeholder="Your answer"
                                        ></textarea>
                                    </fieldset>
                                    <p className="validator-hint hidden">
                                        This field is required.
                                    </p>
                                </div>

                                <div className="mt-5">
                                    <FormLabel labelText="Workplace environment description before, during, and after the medication error incident:" />
                                    <fieldset className="fieldset">
                                        <textarea
                                            className="textarea h-24 w-full border border-gray-300"
                                            placeholder="Your answer"
                                            name="workplace_environment"
                                        ></textarea>
                                    </fieldset>
                                    <p className="validator-hint hidden">
                                        This field is required.
                                    </p>
                                </div>

                                <div className="mt-5">
                                    <FormLabel labelText="Patient’s condition before, during, and after the medication error incident:" />
                                    <fieldset className="fieldset">
                                        <textarea
                                            className="textarea h-24 w-full border border-gray-300"
                                            placeholder="Your answer"
                                            name="patient_condition"
                                        ></textarea>
                                    </fieldset>
                                    <p className="validator-hint hidden">
                                        This field is required.
                                    </p>
                                </div>

                                <div className="mt-5">
                                    <FormLabel labelText="Immediate action/s done after the medication error incident:" />
                                    <fieldset className="fieldset">
                                        <textarea
                                            className="textarea h-24 w-full border border-gray-300"
                                            placeholder="Your answer"
                                            name="immediate_actions"
                                        ></textarea>
                                    </fieldset>
                                    <p className="validator-hint hidden">
                                        This field is required.
                                    </p>
                                </div>

                                <div className="mt-5">
                                    <FormLabel labelText="Corrective action/s done after the medication error incident: " />
                                    <fieldset className="fieldset">
                                        <textarea
                                            className="textarea h-24 w-full border border-gray-300"
                                            placeholder="Your answer"
                                            name="corrective_actions"
                                        ></textarea>
                                    </fieldset>
                                    <p className="validator-hint hidden">
                                        This field is required.
                                    </p>
                                </div>

                                <div className="mt-5">
                                    <FormLabel labelText="Narrative description of the preventive action/s done after the medication error incident: " />
                                    <fieldset className="fieldset">
                                        <textarea
                                            className="textarea h-24 w-full border border-gray-300"
                                            placeholder="Your answer"
                                            name="preventive_actions"
                                        ></textarea>
                                    </fieldset>
                                    <p className="validator-hint hidden">
                                        This field is required.
                                    </p>
                                </div>
                            </section>
                        )}

                    </form>
                    <div className="card-actions justify-between">
                        <button
                            onClick={() => setIsSecondPage(false)}
                            disabled={!isSecondPage}
                            className="btn btn-primary">
                            <IoArrowUndoCircle /> Back
                        </button>
                        <button
                            onClick={() => setIsSecondPage(true)}
                            disabled={isSecondPage}
                            className="btn btn-primary">
                            <MdNextPlan /> Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
