import { Suspense } from "react";
import { DataTable } from "./DataTable";
import Loading from "./loading";
import { fetchRequest } from "./action";

export default async function Page({ searchParams }) {
    const { start_date, end_date } = await searchParams;

    const requests = fetchRequest(start_date, end_date);

    return (
        <Suspense fallback={<Loading />}>
            <div className="w-full min-h-[600px] overflow-x-auto">
                <DataTable
                    get_requests={requests}
                />
            </div>
        </Suspense>
    );
}
