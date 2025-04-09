import Image from "next/image";
import Link from "next/link";

const Header = () => {
    return (
        <header className="flex gap-10 justify-between items-center border-b border-gray-200 p-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
            <Link href="/" className="flex-none flex gap-2 items-center hover:ring rounded-xl p-2">
                <Image
                    src="/pcmc_logo.png"
                    className="flex-none"
                    width={50}
                    height={50}
                    layout="intrinsic"
                    alt="Logo"
                />
                <h1 className="text-2xl font-bold">Inmerse</h1>
            </Link>

            <div className="flex-1 flex justify-between items-center">

                <nav>
                    <ul className="flex space-x-4">
                        <li><a href="/" className="p-3 hover:ring rounded-xl">Home</a></li>
                        <li><a href="/about" className="p-3 hover:ring rounded-xl">About</a></li>
                    </ul>
                </nav>
                <Link href="/login" className="bg-gradient-to-r from-purple-400 to-pink-500 text-white font-bold px-4 py-2 rounded-md shadow-[7px_10px_2px_0px_rgba(0,_0,_0,_0.1)] hover:from-pink-500 hover:to-purple-400 hover:ring transition duration-300">
                    Sign In
                </Link>
            </div>
        </header>
    );
};

export default Header;