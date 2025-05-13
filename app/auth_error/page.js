import AuthErrorClient from "./AuthErrorClient";

export default function AuthErrorPage({ searchParams }) {
    const error = searchParams?.error || "Unknown";
    const message = searchParams?.message || "An unexpected error occurred.";

    return <AuthErrorClient error={error} message={message} />;
}
