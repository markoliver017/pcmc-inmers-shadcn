import { DataTable } from "./DataTable";

export default async function Page() {
    const url = new URL("/api/reports", "http://localhost:3000");
    const response = await fetch(url, {
        method: "GET",
        cache: "no-store",
    });
    const data = await response.json();
    // console.log("reports", data);

    return (
        <div>
            <DataTable data={data?.reports} />
        </div>
    );
}
