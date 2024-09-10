import React from "react";

import "./Title.css";

interface TitleProps {
    title: string;
    type?: string;
}

const Title: React.FC<TitleProps> = ({ title, type }) => {
    if (type === "h1") return <h1 className="title__h1">{title}</h1>;
    if (type === "h2") return <h2 className="title__h2">{title}</h2>;
    if (type === "h3") return <h3 className="title__h3">{title}</h3>;
    if (type === "p") return <p className="title__p">{title}</p>;

    return <h4 className="title__h4">{title}</h4>;
};

export default Title;