import { Key, Mail } from "lucide-react";
import Image from "next/image";
import React from "react";
import { IoMdLogIn } from "react-icons/io";

export default function LoginForm() {
    return (
        <fieldset className="fieldset w-full bg-base-200 border border-base-300 p-4 rounded-box">
            <legend className="fieldset-legend">INMERS Portal</legend>
            <div className="flex flex-col items-center justify-center mb-4">
                <Image
                    src="/pcmc_logo.png"
                    className="flex-none"
                    width={75}
                    height={75}
                    layout="intrinsic"
                    alt="Logo"
                />
                <h2 className="text-center font-geist-sans font-semibold text-xl mt-2 leading-tight text-shadow-[_1px_1px_8px_#8b8eee]">
                    Integrated National Medication Error Reporting System
                </h2>
            </div>
            <div>
                <label className="fieldset-label">Email</label>
                <label className="input validator mt-1">
                    <Mail className="h-3" />
                    <input type="email" placeholder="mail@site.com" required />
                </label>
                <div className="validator-hint hidden">
                    Enter valid email address
                </div>
            </div>

            <div className="mt-2">
                <label className="fieldset-label">Password</label>
                <label className="input validator mt-1">
                    <Key className="h-3" />
                    <input
                        type="password"
                        required
                        placeholder="Password"
                        minLength="8"
                        pattern=".{8,}"
                        title="Must be more than 8 characters"
                    />
                </label>
                <p className="validator-hint hidden">
                    Must be more than 8 characters
                </p>
            </div>

            <button className="btn btn-neutral mt-4 hover:bg-neutral-800 hover:text-green-300">
                <IoMdLogIn />
                Login
            </button>
        </fieldset>
    );
}
