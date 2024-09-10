import React from "react";
import { ReactComponent as Arrow } from "../../../assets/arrow.svg";

import "./Button.css";

interface ButtonProps {
    title: string;
    type?: string;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ title, type, onClick }) => {
    if (type === "primary") return <button className="button__primary" onClick={onClick}>{title}<Arrow className="button__arrow" /></button>;
    //NOTE: not yet a style for secondary
    if (type === "secondary") return <button className="button__secondary" onClick={onClick}>{title}</button>;

    return <button className="button__primary" onClick={onClick}>{title}</button>;
};

export default Button;