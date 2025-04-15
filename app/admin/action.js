"use server";

export async function getErrorTypeReports(formData) {
    const year = formData.get("year");
    return { error: false, year };
}
