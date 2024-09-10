import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./TableBody.css";
import { DataItem } from "../DataTable";

interface TableBodyProps {
    data: DataItem[];
    hoveredRow: number | null;
    setHoveredRow: (row: number | null) => void;
}

const TableBody: React.FC<TableBodyProps> = ({ data, hoveredRow, setHoveredRow }) => {
    const [, setCopiedRow] = useState<number | null>(null);

    const handleCopy = (item: DataItem, index: number) => {
        const itemInfo = `Name: ${item.name}, Candy: ${item.candy}, Eaten: ${item.eaten}, Date: ${item.date}`;
        navigator.clipboard.writeText(itemInfo).then(() => {
            setCopiedRow(index);
            toast.success(`Copied ${item.name} to clipboard`, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: 0,
                className: "success-toast",

            });
        }).catch(err => {
            console.error('Failed to copy: ', err);
            setCopiedRow(null);
        });
    };

    return (
        <>
            <ToastContainer />
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
                        onClick={() => handleCopy(item, index)}
                    >
                        <td className="data-table__td">{item.name}</td>
                        <td className="data-table__td">{item.candy}</td>
                        <td className="data-table__td">{item.eaten}</td>
                        <td className="data-table__td">{item.date}</td>
                    </tr>
                ))}
            </tbody>
        </>
    );
};

export default TableBody;

