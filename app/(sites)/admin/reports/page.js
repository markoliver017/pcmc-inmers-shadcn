import { Suspense } from "react";
import { DataTable } from "./DataTable";
import Loading from "./loading";
import { fetchErrorTypes } from "@/action/error_types";
import { fetchReports } from "./action";

export default async function Page({ searchParams }) {
    const { start_date, end_date } = await searchParams;

    const reports = fetchReports(start_date, end_date);
    const error_types = fetchErrorTypes();

    return (
        <Suspense fallback={<Loading />}>
            <div className="w-full min-h-[600px] overflow-x-auto">
                <DataTable
                    get_reports={reports}
                    get_error_types={error_types}
                />
            </div>
        </Suspense>
    );
}
