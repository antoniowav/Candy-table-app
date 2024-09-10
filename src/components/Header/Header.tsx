import React from "react";
import './Header.css';
import { ReactComponent as Logo } from "../../assets/logo.svg";
import Title from "../atomic/Title/Title";
import ProfilePhoto from "../ProfilePhoto/ProfilePhoto";

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="header__left">
                <Logo />
                <div className="header__left_titles">
                    <Title type={"h4"} title="Code test" />
                    <Title type={"h1"} title="Candy Consumption Data" />
                </div>
            </div>
            <div className="header__right">
                <ProfilePhoto name="Antonio Piattelli" />
                <div className="header__right_titles">
                    <Title type={"h3"} title="Antonio Piattelli" />
                    <Title type={"p"} title="Fullstack Developer" />
                </div>
            </div>
        </header>
    );
};

export default Header;