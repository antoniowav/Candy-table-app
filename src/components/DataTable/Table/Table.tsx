import React from "react";

import "./Table.css";

interface TableProps {
    children: React.ReactNode;
}


const Table: React.FC<TableProps> = ({ children }) => {
    return (
        <table className="data-table__table">
            {children}
        </table>
    );

};

export default Table;