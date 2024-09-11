import React from "react";
import { ReactComponent as Arrow } from "../../../assets/arrow.svg";

import "./Button.css";

interface ButtonProps {
    title: string;
    type?: string;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ title, type, onClick }) => {
    if (type === "primary") {
        return (
            <button className="button__primary" onClick={onClick}>
                {title}
                <svg className="button__arrow" xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="none">
                    <path fill="#fff" d="M12.625 8.651 8.602 4.628l1.06-1.06L15.497 9.4l-5.833 5.834-1.06-1.06 4.022-4.024H3.496v-1.5h9.13" />
                </svg>
            </button>
        );
    }
    // NOTE: not yet a style for secondary
    if (type === "secondary") {
        return <button className="button__secondary" onClick={onClick}>{title}</button>;
    }

    return <button className="button__primary" onClick={onClick}>{title}</button>;
};

export default Button;
