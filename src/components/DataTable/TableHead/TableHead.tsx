import React from "react";
import SortIcon from "../../atomic/SortIcon/SortIcon";

import "./TableHead.css";
import { DataItem } from "../DataTable";

interface TableHeadProps {
    onSort: (key: keyof DataItem) => void;
    sortConfig: { key: keyof DataItem, direction: 'asc' | 'desc' } | null;
}

const TableHead: React.FC<TableHeadProps> = ({ onSort, sortConfig }) => {
    const getSortDirection = (key: keyof DataItem) => {
        if (!sortConfig) return undefined;
        return sortConfig.key === key ? sortConfig.direction : undefined;
    };


    return (
        <thead className="data-table__thead">
            <tr className="data-table__tr">
                <th className="data-table__th" onClick={() => onSort('name')}>
                    Name
                    <SortIcon direction={getSortDirection('name')} />
                </th>
                <th className="data-table__th" onClick={() => onSort('candy')}>
                    Candy
                    <SortIcon direction={getSortDirection('candy')} />
                </th>
                <th className="data-table__th" onClick={() => onSort('eaten')}>
                    Eaten
                    <SortIcon direction={getSortDirection('eaten')} />
                </th>
                <th className="data-table__th" onClick={() => onSort('date')}>
                    Date
                    <SortIcon direction={getSortDirection('date')} />
                </th>
            </tr>
        </thead>
    );
};

export default TableHead;
