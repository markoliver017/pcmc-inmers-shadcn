import LoginDrawer from "@components/login/LoginDrawer";
import Image from "next/image";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { Button } from "@components/ui/button";
import { Command, Eye, LogOut, MoreHorizontal } from "lucide-react";

const Header = ({
    isLoggedIn = false,
    admin = {
        name: "Bonnie Green",
        email: "bonnie@example.com",
        avatar: "https://avatar.iran.liara.run/public/boy",
    },
}) => {
    return (
        <>
            <header className="flex gap-10 justify-between items-center border-b border-gray-200 p-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
                <Link
                    href="/"
                    className="flex-none flex gap-2 items-center hover:ring rounded-xl p-2"
                >
                    <Image
                        src="/pcmc_logo.png"
                        className="flex-none"
                        width={50}
                        height={50}
                        layout="intrinsic"
                        alt="Logo"
                    />
                    <h1 className="text-2xl font-bold">INMERS</h1>
                </Link>

                <div className="flex-1 flex justify-between items-center">
                    <nav>
                        <ul className="flex space-x-4">
                            <li>
                                <a
                                    href="/"
                                    className="p-3 hover:ring rounded-xl"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/about"
                                    className="p-3 hover:ring rounded-xl"
                                >
                                    About
                                </a>
                            </li>
                        </ul>
                    </nav>
                    {!isLoggedIn ? (
                        <LoginDrawer />
                    ) : (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <Image
                                        src={admin.avatar}
                                        className="flex-none"
                                        width={50}
                                        height={50}
                                        layout="intrinsic"
                                        alt="Logo"
                                    />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel className="flex items-center space-x-2">
                                    <Command className="w-3 h-3" />
                                    <div className="flex flex-col">
                                        <span>{admin.name}</span>
                                        <span className="text-xs font-light">
                                            {admin.email}
                                        </span>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />

                                <Link href={`/`}>
                                    <DropdownMenuItem className="flex items-center space-x-2">
                                        <LogOut className="w-4 h-4" />
                                        <span>Log Out</span>
                                    </DropdownMenuItem>
                                </Link>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </header>
        </>
    );
};

export default Header;
