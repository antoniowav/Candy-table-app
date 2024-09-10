import React from "react";

import "./SortIcon.css";

interface SortIconProps {
    direction?: 'asc' | 'desc';
}

const SortIcon: React.FC<SortIconProps> = ({ direction }) => {
    return (
        <div className="sortIcon__container">
            <svg width="10" height="24" viewBox="0 0 10 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 11L4.75 7L8.5 11" stroke="#929190" stroke-width="1.7" stroke-linecap="round" />
                <path d="M8.5 15L4.75 19L0.999999 15" stroke="#929190" stroke-width="1.7" stroke-linecap="round" />
            </svg>
        </div>
    );
};

export default SortIcon;
