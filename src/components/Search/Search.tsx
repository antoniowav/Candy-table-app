import React from 'react';
import { DataItem } from '../DataTable/DataTable';
import './Search.css';

interface SearchComponentProps {
    onSearch: (query: string) => void;
    data: DataItem[];
}

const SearchComponent: React.FC<SearchComponentProps> = ({ onSearch }) => {
    return (
        <div className="search__container">
            <div className="search__icon" />
            <input
                type="text"
                className="search__input"
                placeholder="Search..."
                onChange={(e) => onSearch(e.target.value)}
            />
        </div>
    );
};

export default SearchComponent;
