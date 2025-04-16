import React from "react";

const Footer = () => {
    return (
        <footer className="py-4 shadow-[1px_-7px_5px_-2px_rgba(0,_0,_0,_0.1)]">
            <div className="container mx-auto text-center">
                <p>
                    &copy; {new Date().getFullYear()} Philippine Children's
                    Medical Center. All rights reserved.
                </p>
                <p className="text-sm">Follow us on social media</p>
                <div className="flex justify-center space-x-4 mt-2">
                    <a href="#" className="text-gray-400 hover:text-white">
                        Facebook
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white">
                        Twitter
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white">
                        Instagram
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
