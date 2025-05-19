"use client";
import React from "react";
import Breadcrumbs from "./Breadcrumbs";
import { usePagesStore, useSitesStore } from "@/store/pagesStore";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { GrDashboard } from "react-icons/gr";

function pathMatchesPattern(pathname, pattern) {
    // Escape RegExp special characters except for *
    const escapedPattern = pattern.replace(/[-[\]{}()+?.,\\^$|#\s]/g, "\\$&");
    // Replace wildcard * with regex pattern [^/]+
    const regexPattern = "^" + escapedPattern.replace(/\*/g, "[^/]+") + "$";
    const regex = new RegExp(regexPattern);
    return regex.test(pathname);
}

function findCurrentPage(pathname, pages) {
    let matchedPage = null;
    let longestMatchLength = 0;

    function checkAndUpdateMatch(page, path) {
        if (pathMatchesPattern(pathname, path)) {
            if (path.length > longestMatchLength) {
                matchedPage = page;
                longestMatchLength = path.length;
            }
        }
    }

    for (const page of pages) {
        checkAndUpdateMatch(page, page.path);

        if (page.has_child && page.child?.length) {
            for (const child of page.child) {
                checkAndUpdateMatch(child, child.path);
            }
        }
    }

    return matchedPage;
}

export default function WrapperHead() {
    const { status } = useSession();
    const isLoggedIn = status == "authenticated";

    const pages = useSitesStore((state) => state.pages);
    const pathname = usePathname();
    const currentPage = findCurrentPage(pathname, pages) || {
        title: "INMERS Form",
        icon: <GrDashboard />,
    };
    const pageTitle = currentPage ? currentPage.title : "INMERS Form";
    // const currentPage = pages.find((page) => pathname == page.path);
    // const pageTitle = currentPage ? currentPage.title : "INMERS Form";

    return (
        <div className="flex-none flex flex-wrap justify-between items-center p-4 shadow">
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
