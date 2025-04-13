"use client";
import { toast, Bounce } from "react-toastify";
import parse from "html-react-parser"; // Import html-react-parser

export default function notify(res, type = null) {
    const { error, message } = res;

    // If the message is a string, parse it. Otherwise, render it as a component.
    const content = typeof message === "string" ? parse(message) : message;

    if (!type) {

        if (error) {
            toast.error(content, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        } else {
            toast.success(content);
        }

    } else {
        toast[type](content, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }
}
