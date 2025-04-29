import { Suspense } from "react";
import { fetchErrorTypes } from "./action";
import Skeleton from "@components/ui/skeleton";
import Terms from "./Terms";
// import { useSession } from "next-auth/react";

export default function Page() {
    const fetch_error_types = fetchErrorTypes();
    // const { data: session, status } = useSession();
    // if (status === "loading") return <p>Loading...</p>;
    // if (!session) return <p>You are not signed in.</p>;

    return (
        <Suspense fallback={<Skeleton />}>
            <Terms fetch_error_types={fetch_error_types} />;
        </Suspense>
    );
}
