"use server";

export async function fetchReports(start, end) {
    let url = new URL(`/api/reports`, process.env.INTERNAL_API_URL);
    if (start && end) {
        url = new URL(
            `/api/reports?start_date=${start}&end_date=${end}`,
            process.env.INTERNAL_API_URL
        );
    }
    const response = await fetch(url, {
        method: "GET",
        cache: "no-store",
    });

    return response.json();
}
