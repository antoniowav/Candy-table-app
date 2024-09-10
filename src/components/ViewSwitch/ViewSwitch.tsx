import React from "react";
import "./ViewSwitch.css";

interface ViewSwitchProps {
    isListView: boolean;
    setIsListView: React.Dispatch<React.SetStateAction<boolean>>;
}

const ViewSwitch: React.FC<ViewSwitchProps> = ({ isListView, setIsListView }) => {
    return (
        <div className="viewSwitch__container" data-active={isListView ? "list" : "grid"}>
            <div className="viewSwitch__background" />
            <div
                className="viewSwitch__button"
                onClick={() => setIsListView(false)}
            >
                <div className="viewSwitch__icon grid-icon"></div>
            </div>
            <div
                className="viewSwitch__button"
                onClick={() => setIsListView(true)}
            >
                <div className="viewSwitch__icon list-icon"></div>
            </div>
        </div>
    );
};

export default ViewSwitch;