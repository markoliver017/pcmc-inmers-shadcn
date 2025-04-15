import { Suspense } from "react";
import { DataTable } from "./DataTable";
import Loading from "./loading";
import { fetchErrorTypes } from "@/action/error_types";

async function fetchReports() {
    const url = new URL(`/api/reports`, "http://localhost:3000");
    const response = await fetch(url, {
        method: "GET",
        cache: "no-store",
    });
    return response.json();
}

// async function fetchErrorTypes() {
//     const url = new URL(`/api/error_types`, "http://localhost:3000");
//     const response = await fetch(url, {
//         method: "GET",
//         cache: "no-store",
//     });
//     return response.json();
// }

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
            fallback={<Loading />}
        >
            <div className="w-full overflow-x-auto">
                <DataTable get_reports={reports} get_error_types={error_types} />
            </div>
        </Suspense>
    );
}
