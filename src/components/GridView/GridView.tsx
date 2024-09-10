import React from "react";

import "./GridView.css";
import { DataItem } from "../DataTable/DataTable";
import Button from "../atomic/Button/Button";
import Title from "../atomic/Title/Title";

interface GridViewProps {
    data: DataItem[];
    hasMore: boolean;
    loadMore: () => void;
}

const GridView: React.FC<GridViewProps> = ({ data, hasMore, loadMore }) => {
    return (
        <div className="grid-view">
            <div className="grid-container">
                {data.map((item, index) => (
                    <div key={index} className="grid-item">
                        <div className="grid-item-col">
                            <Title title="Name" type="bold" color="gray" className="hover-text" />
                            <Title title={item.name} type="h2" color="white" className="hover-text" />
                        </div>
                        <div className="grid-item-col">
                            <div className="grid-item-row">
                                <Title title="Candy" type="bold" color="gray" className="hover-text" />
                                <Title title={item.candy} type="p" color="white" className="hover-text" />
                            </div>
                            <div className="grid-item-row">
                                <Title title="Eaten" type="bold" color="gray" className="hover-text" />
                                <Title title={item.eaten.toString()} type="p" color="white" className="hover-text" />
                            </div>
                        </div>
                        <Title title={item.date} type="p" color="gray" className="hover-text" />
                    </div>
                ))}
            </div>
            {hasMore && <Button onClick={loadMore} type="primary" title="Load More" />}
        </div>
    );
};

export default GridView;