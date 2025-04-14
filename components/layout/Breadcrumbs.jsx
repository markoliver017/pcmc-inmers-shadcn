import React from "react";
import { GiFiles } from "react-icons/gi";

const Breadcrumbs = ({ title = "INMERS Form" }) => {
    return (
        <nav className="breadcrumbs text-sm">
            <ul>
                <li>
                    <a>
                        <GiFiles />
                        {title}
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Breadcrumbs;
