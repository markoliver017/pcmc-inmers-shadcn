"use client";

import { useState } from "react";
import ReportForm from "./ReportForm";
import Terms from "./Terms";

export default function Page() {
    const [isAccepted, setIsAccepted] = useState(false);
    const [isProceedForm, setIsProceedForm] = useState(false);

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
