import React from "react";

import "./SortIcon.css";

interface SortIconProps {
    direction?: 'asc' | 'desc';
}

const SortIcon: React.FC<SortIconProps> = ({ direction }) => {
    return (
        <div className="sortIcon__container">
            <svg className="sortIcon__svg" width="7" height="24" viewBox="0 0 7 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M1 11.5L3.5 9.5L6 11.5"
                    stroke="#929190"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    className={direction === 'asc' ? "asc" : "desc"}
                />
                <path
                    d="M6 15.5L3.5 17.5L1 15.5"
                    stroke="#929190"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    className={direction === 'desc' ? "asc" : "desc"}
                />
            </svg>
        </div>
    );
};

export default SortIcon;
