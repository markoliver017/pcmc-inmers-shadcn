"use server";

export const fetchErrorTypes = async () => {
    const url = new URL(`/api/error_types`, process.env.INTERNAL_API_URL);
    const response = await fetch(url, {
        method: "GET",
        cache: "no-store",
    });
    return response.json();
};
