import { Suspense } from "react";
import { DataTable } from "./DataTable";
import Skeleton from "@components/ui/skeleton";

async function fetchReports() {
    const url = new URL(`/api/reports`, "http://localhost:3000");
    const response = await fetch(url, {
        method: "GET",
        cache: "no-store",
    });
    return response.json();
}

async function fetchErrorTypes() {
    const url = new URL(`/api/error_types`, "http://localhost:3000");
    const response = await fetch(url, {
        method: "GET",
        cache: "no-store",
    });
    return response.json();
}

export default async function Page() {
    // const url = new URL("/api/reports", "http://localhost:3000");
    // const response = await fetch(url, {
    //     method: "GET",
    //     cache: "no-store",
    // });
    // const data = await response.json();
    // console.log("reports", data);
    const reports = fetchReports();
    const error_types = fetchErrorTypes();

    return (
        <Suspense
            fallback={
                <div>
                    <Skeleton className="w-full" />
                </div>
            }
        >
            <DataTable reports={reports} error_types={error_types} />
        </Suspense>
    );
}
