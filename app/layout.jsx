import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// import { Button } from "@components/ui/button";
import Sidebar from "@components/layout/Sidebar";
import Header from "@components/layout/Header";
import WrapperHead from "@components/layout/WrapperHead";
import Footer from "@components/layout/Footer";
import { ThemeProvider } from 'next-themes'
import { ToastContainer } from 'react-toastify';


const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Inmerse Portal",
    description: "Integrated National Medication Error Reporting System",
};

export default function RootLayout({ children }) {

    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <ToastContainer />
                <div className="flex">
                    <Sidebar />
                    <div className="flex flex-col flex-1 max-h-screen overflow-y-scroll
                    "
                    >
                        <Header />
                        <WrapperHead />
                        <main className="flex-1 p-4">
                            <ThemeProvider>
                                {children}
                            </ThemeProvider>
                        </main>
                        <Footer />
                    </div>
                </div>
            </body>
        </html>
    );
}
