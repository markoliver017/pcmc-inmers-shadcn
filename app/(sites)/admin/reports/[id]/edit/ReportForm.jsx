"use client";

import { useEffect, useState } from "react";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createReportsSchema } from "@lib/zod/reportSchema";

import FirstForm from "./FirstForm";
import SecondForm from "./SecondForm";
import ThirdForm from "./ThirdForm";
import FourthForm from "./FourthForm";
import FifthForm from "./FifthForm";
import ConfirmationPage from "./ConfirmationPage";

import clsx from "clsx";
import { Card } from "@components/ui/card";
import { useRouter } from "next/navigation";

const form_sections = [
    {
        title: "Patient Details",
        class: "progress-info",
        percent: 10,
        bg: "/bg-3.jpg",
    },
    {
        title: "Medication Error Details 1",
        class: "progress-info",
        percent: 30,
        bg: "/bg-4.jpg",
    },
    {
        title: "Medication Error Details 2",
        class: "progress-info",
        percent: 50,
        bg: "/bg-5.jpg",
    },
    {
        title: "Medication Error Details 3",
        class: "progress-info",
        percent: 70,
        bg: "/bg-6.jpg",
    },
    {
        title: "Medication Error Details 4",
        class: "progress-info",
        percent: 90,
        bg: "/bg-1.jpg",
    },
    {
        title: "Confirm",
        class: "progress-success",
        percent: 100,
        bg: "/bg-2.jpg",
    },
];

export default function ReportForm({
    report,
    error_types,
    generic_medicines,
    medicine_routes,
}) {
    // useEffect(() => {
    //     console.log("report>>>>>>>>", report);
    //     console.log("error_types>>>>>>>>", error_types);
    //     console.log("generic_medicines>>>>>>>>", generic_medicines);
    //     console.log("medicine_routes>>>>>>>>", medicine_routes);
    // }, []);
    const router = useRouter();

    const defaultValues = {
        ...report,
        converted_weight: "",
        converted_height: "",
        //ReportMedicineRoutes
        // medicines: [
        //     {
        //         medicine_generic_id: null, //GenericMedicine.id
        //         medicine_route_id: null, //RouteMedicine.id
        //     },
        // ],
        medicines: report?.ReportMedicineRoutes.map((med) => ({
            medicine_generic_id: med.GenericMedicine.id,
            medicine_route_id: med.RouteMedicine.id,
        })),
    };

    const methods = useForm({
        mode: "onChange",
        resolver: zodResolver(createReportsSchema),
        defaultValues: defaultValues,
    });

    const {
        watch,
        reset,
        setValue,
        formState: { errors },
    } = methods;

    useEffect(() => {
        if (!errors) return;
        // console.log("form errors", errors);
    }, [errors]);

    const errorTypeOptions = error_types.map((type) => ({
        value: type.name,
        label: type.name,
        id: type.id,
        is_medicine_needed: type.is_medicine_needed,
    }));
    const genericMedicineOptions = generic_medicines.map((type) => ({
        value: type.name,
        label: type.name,
        id: type.id,
    }));
    const medicineRouteOptions = medicine_routes.map((type) => ({
        value: type.name,
        label: type.name,
        id: type.id,
    }));

    const [selectedErrorType, setSelectedErrorType] = useState(() => {
        return (
            errorTypeOptions.find(
                (option) => option.id === report.error_type_id
            ) || null
        );
    });

    useEffect(() => {
        setValue("selected_error_type", selectedErrorType);
    }, [selectedErrorType]);

    // useEffect(() => {
    //     console.log("watchAll", watch());
    // }, [watch()]);

    const [sectionNo, setSectionNo] = useState(0);

    const handleNext = (n) => {
        setSectionNo((prev) => prev + n);
    };

    const handleReset = () => {
        setSectionNo(0);
        router.refresh();
    };

    return (
        <>
            <div
                className={`absolute inset-0 bg-no-repeat bg-center bg-cover opacity-50 pointer-events-none z-0 shadow-2xl rounded`}
                style={{
                    backgroundImage: `url('${form_sections[sectionNo].bg}')`,
                }}
                aria-hidden="true"
            />
            <Card className="static card w-full h-full sm:w-3/4 shadow-[5px_5px_0px_0px_rgba(0,_0,_0,_0.5),inset_0px_2px_4px_0px_rgba(0,_0,_0,_0.3)] opacity-85">
                <div className="relative p-5 pb-0 w-3/4 mx-auto">
                    <progress
                        className={clsx(
                            "progress h-5",
                            form_sections[sectionNo].class
                        )}
                        value={form_sections[sectionNo].percent}
                        max="100"
                    ></progress>
                </div>

                <div className="card-body">
                    <FormProvider {...methods}>
                        <form className="sm:px-5 rounded-lg h-full">
                            {sectionNo == 0 ? (
                                <FirstForm onNext={handleNext} />
                            ) : (
                                ""
                            )}

                            {sectionNo == 1 ? (
                                <SecondForm
                                    errorTypeOptions={errorTypeOptions}
                                    selectedErrorType={selectedErrorType}
                                    setSelectedErrorType={setSelectedErrorType}
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
                                    reportId={report.id}
                                    onNext={handleNext}
                                    resetForm={handleReset}
                                    methods={methods}
                                    genericMedicineOptions={
                                        genericMedicineOptions
                                    }
                                    medicineRouteOptions={medicineRouteOptions}
                                    selectedErrorType={selectedErrorType}
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
