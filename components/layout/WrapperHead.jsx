"use client";
import React from "react";
import Breadcrumbs from "./Breadcrumbs";
import { usePagesStore } from "@/store/pagesStore";
import { usePathname } from "next/navigation";

export default function WrapperHead({ isLoggedIn = false }) {
    const pages = usePagesStore((state) => state.pages);
    const pathname = usePathname();
    const currentPage = pages.find((page) => pathname == page.path);
    const pageTitle = currentPage ? currentPage.title : "INMERS Form";

    return (
        <div className="flex justify-between items-center p-4 shadow">
            <h1
                className="text-3xl font-bold"
                style={{ fontFamily: "var(--font-geist-sans)" }}
            >
                {!isLoggedIn ? "Medication Error Reporting Form" : pageTitle}
            </h1>
            <Breadcrumbs pageData={currentPage} />
        </div>
    );
}
