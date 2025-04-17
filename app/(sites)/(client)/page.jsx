"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import ReportForm from "./ReportForm";
import Terms from "./Terms";

export default function Page() {
    const { data: session, status } = useSession();
    const [isAccepted, setIsAccepted] = useState(false);
    const [isProceedForm, setIsProceedForm] = useState(false);
    console.log(session);
    console.log(status);
    if (status === "loading") return <p>Loading...</p>;
    if (!session) return <p>You are not signed in.</p>;

    return (
        <div className="flex justify-center items-center">
            {isProceedForm === false ? (
                <Terms
                    isAccepted={isAccepted}
                    setIsAccepted={setIsAccepted}
                    setIsProceedForm={setIsProceedForm}
                />
            ) : (
                <ReportForm setIsProceedForm={setIsProceedForm} />
            )}
        </div>
    );
}
