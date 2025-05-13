import { Geist, Geist_Mono } from "next/font/google";
import "@/globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Inmerse Portal - Error",
    description: "Integrated National Medication Error Reporting System",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <div className="flex h-screen justify-center items-center">
                    <main className="flex-1 h-screen">{children}</main>
                </div>
            </body>
        </html>
    );
}
