import React from "react";

import "./Title.css";

interface TitleProps {
    title: string;
    type?: string;
    color?: string;
    className?: string;
}

const Title: React.FC<TitleProps> = ({ title, type, color, className }) => {
    const classes = [className]
    if (color) classes.push(color);

    if (type === "h1") return <h1 className={classes.join(" ")}>{title}</h1>;
    if (type === "h2") return <h2 className={classes.join(" ")}>{title}</h2>;
    if (type === "h3") return <h3 className={classes.join(" ")}>{title}</h3>;
    if (type === "p") return <p className={classes.join(" ")}>{title}</p>;
    if (type === 'bold') return <strong className={classes.join(" ")}>{title}</strong>;

    return <h4 className={classes.join(" ")}>{title}</h4>;
};


export default Title;