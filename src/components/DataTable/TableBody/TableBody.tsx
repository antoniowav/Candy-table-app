import React from "react";

import "./TableBody.css";
import { DataItem } from "../DataTable";


interface TableBodyProps {
    data: DataItem[];
    hoveredRow: number | null;
    setHoveredRow: (row: number | null) => void;

}


const TableBody: React.FC<TableBodyProps> = ({ data, hoveredRow, setHoveredRow }) => {

    return (
        <tbody>
            {data.map((item, index) => (
                <tr
                    key={item.id}
                    className={`
                                data-table__tr 
                                ${hoveredRow === index ? 'tr-hover' : ''} 
                                ${index % 2 === 0 ? '' : 'uneven'}
                            `}
                    onMouseEnter={() => setHoveredRow(index)}
                    onMouseLeave={() => setHoveredRow(null)}
                >
                    <td className="data-table__td">{item.name}</td>
                    <td className="data-table__td">{item.candy}</td>
                    <td className="data-table__td">{item.eaten}</td>
                    <td className="data-table__td">{item.date}</td>
                </tr>
            ))}
        </tbody>
    );

};


export default TableBody;