"use server";

export const fetchErrorTypes = async () => {
    const url = new URL(`/api/error_types`, "http://localhost:3000");
    const response = await fetch(url, {
        method: "GET",
        cache: "no-store",
    });
    return response.json();
}