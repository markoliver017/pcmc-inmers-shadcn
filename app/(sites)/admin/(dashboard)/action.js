"use server";

export async function getErrorTypeReports(formData) {
    const year = formData.get("year");
    return { error: false, year };
}

export async function fetchMonthYearReports(year = new Date().getFullYear()) {
    const url = new URL(
        `/api/dashboard/month_year?year=${year}`,
        process.env.INTERNAL_API_URL
    );
    console.log("urlString", url);

    const response = await fetch(url, {
        method: "GET",
        cache: "no-store",
    });
    return response.json();
}
