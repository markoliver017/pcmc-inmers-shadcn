import { Suspense } from "react";
import Dashboard from "./Dashboard";
import Skeleton from "@components/ui/skeleton";

export const metadata = {
    title: "Inmerse Portal - Dashboard",
    description:
        "Integrated National Medication Error Reporting System - Administrator Dashboard",
};

async function fetchReports() {
    const url = new URL(`/api/dashboard/error_type_count`, process.env.host);
    const response = await fetch(url, {
        method: "GET",
        cache: "no-store",
    });
    return response.json();
}

export default function Page() {
    const data = fetchReports();

    return (
        <Suspense
            fallback={
                <div className="flex gap-5">
                    <Skeleton className="w-full" />
                    <Skeleton className="w-full" />
                </div>
            }
        >
            <Dashboard reports={data} />
        </Suspense>
    );
}
