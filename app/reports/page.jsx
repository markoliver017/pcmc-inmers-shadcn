"use client";

import { Calendar } from "lucide-react";
import { useState } from "react";
import { MdNextPlan } from "react-icons/md";
import FormLabel from "./FormLabel";
import { FaGenderless } from "react-icons/fa";

export default function Reports() {
    return (
        <div className="flex justify-center items-center sm:p-5">
            <div className="card bg-base-100 w-full sm:w-3/4 shadow-[5px_5px_0px_0px_rgba(0,_0,_0,_0.5),inset_0px_2px_4px_0px_rgba(0,_0,_0,_0.3)]">
                <div className="flex pt-2 justify-center items-center ">
                    <progress
                        className="m-5 progress h-4 progress-accent w-3/4"
                        value={50}
                        max="100"
                    ></progress>
                </div>
                <div className="card-body">
                    <h2 className="card-title text-2xl">
                        Medication Error Details
                    </h2>
                    <form className="px-5 bg-base-200 rounded-lg p-5">
                        <div className="flex ">
                            <FormLabel labelText="Report Date:" />
                            <label className="input validator mt-1 border border-gray-300">
                                <Calendar className="h-3" />
                                <input
                                    type="date"
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
                                <input type="date" />
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
                                <select>
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
                                <input type="number" placeholder="" />
                                <span className="label">KG</span>
                            </label>
                            <p className="validator-hint hidden">
                                This field is required.
                            </p>
                        </div>

                        <div className="mt-5 flex items-center">
                            <FormLabel labelText="Height:" />
                            <label className="input border border-gray-300">
                                <input type="number" placeholder="" />
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
                                ></textarea>
                            </fieldset>
                            <p className="validator-hint hidden">
                                This field is required.
                            </p>
                        </div>

                        <div className="mt-5 flex items-center">
                            <FormLabel labelText="Exact medication prescription as ordered for the patient:" />
                            <label className="floating-label">
                                <input
                                    type="text"
                                    placeholder="Medication Prescription"
                                    className="input input-md"
                                />
                                <span>Medication Prescription</span>
                            </label>
                            <p className="validator-hint hidden">
                                This field is required.
                            </p>
                        </div>
                    </form>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">
                            <MdNextPlan /> Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
