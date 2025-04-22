export async function fetchReports(start, end) {
    let url = new URL(`/api/reports`, process.env.host);
    if (start && end) {
        url = new URL(
            `/api/reports?start_date=${start}&end_date=${end}`,
            process.env.host
        );
    }
    const response = await fetch(url, {
        method: "GET",
        cache: "no-store",
    });
    return response.json();
}
