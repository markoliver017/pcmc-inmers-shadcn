import {
    fetchErrorTypes,
    fetchGenericMedicines,
    fetchMedicineRoutes,
} from "@/(sites)/(client)/action";

import ReportForm from "./ReportForm";

export const metadata = {
    title: "Inmerse Portal - Edit Form Response",
    description:
        "Integrated National Medication Error Reporting System - Dashboard",
};

export default async function Page({ params }) {
    const error_types = await fetchErrorTypes();
    const generic_medicines = await fetchGenericMedicines();
    const medicine_routes = await fetchMedicineRoutes();

    const { id } = await params;
    const url = new URL(`/api/reports/${id}`, process.env.INTERNAL_API_URL);
    const response = await fetch(url, {
        method: "GET",
        cache: "no-store",
    });
    const { report } = await response.json();

    // console.log("report", report);

    return (
        <div className="h-full flex justify-center items-center relative p-2">
            <ReportForm
                report={report}
                error_types={error_types}
                generic_medicines={generic_medicines}
                medicine_routes={medicine_routes}
            />
        </div>
    );
}
