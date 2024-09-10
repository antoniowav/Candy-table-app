/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DataTable.css';
import Loading from '../Loading/Loading';
import Button from '../atomic/Button/Button';
import Table from './Table/Table';
import TableHead from './TableHead/TableHead';
import TableBody from './TableBody/TableBody';

export interface DataItem {
    id: number;
    name: string;
    candy: string;
    eaten: number;
    date: string;
}

const DataTable: React.FC = () => {
    const [data, setData] = useState<DataItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 610);
    const [page, setPage] = useState(1);
    const [allData, setAllData] = useState<DataItem[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [sortConfig, setSortConfig] = useState<{ key: keyof DataItem, direction: 'asc' | 'desc' } | null>(null);


    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 610);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const fetchData = async (pageNum: number) => {
        if (process.env.REACT_APP_BACKEND_URL) {
            try {
                if (pageNum === 1) {
                    const response = await axios.get<DataItem[]>(
                        `${process.env.REACT_APP_BACKEND_URL?.toString() || ''}`
                    );
                    setAllData(response.data);
                    setData(response.data.slice(0, 50));
                    setHasMore(response.data.length > 50);
                } else {
                    const start = (pageNum - 1) * 50;
                    const end = start + 50;
                    setData(prevData => [...prevData, ...allData.slice(start, end)]);
                    setHasMore(allData.length > end);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data. Please try again later.');
                setLoading(false);
            }
        } else {
            setError('Failed to fetch data. Please try again later.');
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchData(1);

    }, []);


    const sortData = (key: keyof DataItem) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }

        const sortedData = [...data].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
            return 0;
        });

        setSortConfig({ key, direction });
        setData(sortedData);


    };


    const loadMore = () => {
        if (data.length < 2000) {
            setPage(prevPage => {
                const newPage = prevPage + 1;
                fetchData(newPage);
                return newPage;
            });
        } else {
            setHasMore(false);
        }
    };

    if (loading && page === 1) return (
        <Loading />
    );

    if (error) return <div className="error">{error}</div>;

    // Make mobile view responsive

    if (isMobile) {
        return (
            <div className="container">
                <h2 className="title">Candy Data</h2>
                {data.map((item, index) => (
                    <div key={index} className="card">
                        {Object.entries(item).map(([key, value]) => (
                            <p key={key}>
                                <strong className="strong">{key}:</strong> {value}
                            </p>
                        ))}
                    </div>
                ))}
                {hasMore && (
                    <Button onClick={loadMore} type="primary" title="Load More" />
                )}
            </div>
        );
    }

    return (
        <div className="data-table__container">
            <Table>
                <TableHead onSort={sortData} sortConfig={sortConfig} />
                <TableBody data={data} hoveredRow={hoveredRow} setHoveredRow={setHoveredRow} />
            </Table>
            {hasMore && (
                <Button onClick={loadMore} type="primary" title="Load More" />
            )}
        </div>
    );
};


export default DataTable;