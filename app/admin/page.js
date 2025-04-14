import BarChart from "./BarChart";

export const metadata = {
    title: "Inmerse Portal - Dashboard",
    description:
        "Integrated National Medication Error Reporting System - Administrator Dashboard",
};

export default async function Page() {
    const url = new URL(`/api/dashboard`, "http://localhost:3000");
    const response = await fetch(url, {
        method: "GET",
        cache: "no-store",
    });
    const { data } = await response.json();
    console.log(data);

    return (
        <div className="flex">
            {/* Dashboard Page */}
            <BarChart data={data} />
        </div>
    );
}
