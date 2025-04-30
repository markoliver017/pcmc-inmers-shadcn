"use client";

import { useEffect, useState } from "react";

import { useForm, FormProvider } from "react-hook-form";

import FirstForm from "./FirstForm";

import SecondForm from "./SecondForm";

import clsx from "clsx";

import notify from "@components/ui/notify";
import { Card } from "@components/ui/card";
import ConfirmationPage from "./ConfirmationPage";
import ThirdForm from "./ThirdForm";
import FourthForm from "./FourthForm";
import FifthForm from "./FifthForm";

const form_sections = [
    {
        title: "Patient Details",
        class: "step-primary",
    },
    {
        title: "Medication Error Details 1",
        class: "step-primary",
    },
    {
        title: "Medication Error Details 2",
        class: "step-primary",
    },
    {
        title: "Medication Error Details 3",
        class: "step-primary",
    },
    {
        title: "Medication Error Details 4",
        class: "step-primary",
    },
    {
        title: "Confirm",
        class: "step-warning",
    },
];

export default function ReportForm({
    error_types,
    generic_medicines,
    medicine_routes,
    setIsProceedForm,
}) {
    const methods = useForm({
        mode: "onChange",
        defaultValues: {
            exact_prescription:
                "The doctor prescribed Amoxicillin 500 mg tablets to be taken twice daily for 7 days to treat a bacterial infection.",
            incident_description:
                "During administration, the nurse mistakenly gave the patient 500 mg of Ibuprofen instead of the prescribed Amoxicillin 500 mg due to a labeling error in the medication storage area.",
            workplace_environment:
                "Before the incident, the workplace was moderately busy, with staff multitasking to handle patient check-ins and medication preparation. During the incident, there was a rush to meet patient schedules, and the storage area was poorly lit and disorganized.After the incident, the staff became aware of the error and immediately stopped further medication administration to other patients, reviewing all prescription records.",
            patient_condition:
                "Before: The patient was experiencing mild symptoms of bacterial infection, including a sore throat and mild fever.During: After receiving the incorrect medication (Ibuprofen), the patient reported dizziness and stomach upset.After: The patient's bacterial infection persisted, requiring additional medical intervention.",
            immediate_actions:
                "The nurse immediately informed the attending physician, documented the error in the patient record, and monitored the patient for adverse reactions to Ibuprofen. The correct medication was then administered promptly.",
            corrective_actions:
                "The storage area for medications was reorganized to ensure clear labeling of all drugs. Staff received additional training on medication verification processes to prevent future errors.",
            preventive_actions:
                "Introduced a barcode scanning system to verify medications before administration, ensuring the correct match between prescription and drug. Conducted regular audits of medication storage and administration procedures.",
            height_unit: "cm",
            weight_unit: "kg",
            patient_age: "",
            patient_weight: "",
            patient_height: "",
            converted_weight: "",
            converted_height: "",
            medicines: [
                {
                    medicine_generic_id: null,
                    medicine_route_id: null,
                },
            ],
        },
    });
    const { watch, reset } = methods;

    console.log(watch());

    const [errorTypeOptions, setErrorTypeOptions] = useState([]);
    const [genericMedicineOptions, setGenericMedicineOptions] = useState([]);
    const [medicineRouteOptions, setMedicineRouteOptions] = useState([]);
    const [sectionNo, setSectionNo] = useState(0);

    const handleNext = (n) => {
        setSectionNo((prev) => prev + n);
    };

    const handleReset = () => {
        setSectionNo(0);
        reset();
    };

    useEffect(() => {
        if (error_types && !error_types.error) {
            setErrorTypeOptions(
                error_types.map((type) => ({
                    value: type.name,
                    label: type.name,
                    id: type.id,
                    is_medicine_needed: type.is_medicine_needed,
                }))
            );
            return;
        }
        notify({ error: true, message: error_types.message }, "error");
        setIsProceedForm(false);
    }, [error_types]);

    useEffect(() => {
        if (generic_medicines && !generic_medicines.error) {
            setGenericMedicineOptions(
                generic_medicines.map((type) => ({
                    value: type.name,
                    label: type.name,
                    id: type.id,
                }))
            );
            return;
        }
        notify({ error: true, message: generic_medicines.message }, "error");
        setIsProceedForm(false);
    }, [generic_medicines]);

    useEffect(() => {
        if (medicine_routes && !medicine_routes.error) {
            setMedicineRouteOptions(
                medicine_routes.map((type) => ({
                    value: type.name,
                    label: type.name,
                    id: type.id,
                }))
            );
            return;
        }
        notify({ error: true, message: medicine_routes.message }, "error");
        setIsProceedForm(false);
    }, [medicine_routes]);

    /** labeling in report generation for error type ***/
    const selected_error_type =
        errorTypeOptions.find(
            (option) => option.id === watch("error_type_id")
        ) || null;

    const error_type =
        selected_error_type?.value == "Others"
            ? `${selected_error_type?.label} <i>(${watch(
                  "other_error_type"
              )})</i>`
            : selected_error_type?.label;

    return (
        <>
            <Card
                id="form-container"
                className="card w-full sm:w-3/4 shadow-[5px_5px_0px_0px_rgba(0,_0,_0,_0.5),inset_0px_2px_4px_0px_rgba(0,_0,_0,_0.3)]"
            >
                <div className="flex pt-2 justify-center items-center dark:bg-slate-800 ">
                    <ul className="steps ">
                        {form_sections.map((sec, i) => (
                            <li
                                key={i}
                                className={clsx(
                                    "step px-2",
                                    i <= sectionNo && sec.class
                                )}
                                // onClick={() => setSectionNo(i)}
                            >
                                <small className="italic">{sec.title}</small>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="card-body">
                    <FormProvider {...methods}>
                        <form className="sm:px-5 rounded-lg">
                            {sectionNo == 0 ? (
                                <FirstForm
                                    setIsProceedForm={setIsProceedForm}
                                    onNext={handleNext}
                                />
                            ) : (
                                ""
                            )}

                            {sectionNo == 1 ? (
                                <SecondForm
                                    errorTypeOptions={errorTypeOptions}
                                    genericMedicineOptions={
                                        genericMedicineOptions
                                    }
                                    medicineRouteOptions={medicineRouteOptions}
                                    onNext={handleNext}
                                />
                            ) : (
                                ""
                            )}

                            {sectionNo == 2 ? (
                                <ThirdForm onNext={handleNext} />
                            ) : (
                                ""
                            )}

                            {sectionNo == 3 ? (
                                <FourthForm onNext={handleNext} />
                            ) : (
                                ""
                            )}

                            {sectionNo == 4 ? (
                                <FifthForm onNext={handleNext} />
                            ) : (
                                ""
                            )}

                            {sectionNo == 5 ? (
                                <ConfirmationPage
                                    onNext={handleNext}
                                    resetForm={handleReset}
                                    methods={methods}
                                    error_type={error_type}
                                />
                            ) : (
                                ""
                            )}
                        </form>
                    </FormProvider>
                </div>
            </Card>
        </>
    );
}
