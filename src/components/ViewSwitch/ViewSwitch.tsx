import React from "react";
import "./ViewSwitch.css";


interface ViewSwitchProps {
    isListView: boolean;
    setIsListView: React.Dispatch<React.SetStateAction<boolean>>;
}

const ViewSwitch: React.FC<ViewSwitchProps> = ({ isListView, setIsListView }) => {


    return (
        <div className="viewSwitch__container">
            <div
                className={`viewSwitch__button ${!isListView ? 'active' : ''}`}
                onClick={() => setIsListView(false)}
            >
                <div className={`viewSwitch__icon grid-icon ${!isListView ? 'gridActive' : ''}`}></div>
            </div>
            <div
                className={`viewSwitch__button ${isListView ? 'active' : ''}`}
                onClick={() => setIsListView(true)}
            >
                <div className={`viewSwitch__icon list-icon ${isListView ? 'listActive' : ''}`}></div>
            </div>
        </div>
    );
};

export default ViewSwitch;
