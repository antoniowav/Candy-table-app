/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DataTable.css';
import Loading from '../Loading/Loading';
import Button from '../atomic/Button/Button';
import Table from './Table/Table';
import TableHead from './TableHead/TableHead';
import TableBody from './TableBody/TableBody';
import GridView from '../GridView/GridView';
import ViewSwitch from '../ViewSwitch/ViewSwitch';

export interface DataItem {
    id: number;
    name: string;
    candy: string;
    eaten: number;
    date: string;
    isListView: boolean;
}

interface DataTableProps {
    isListView: boolean;
    setIsListView: React.Dispatch<React.SetStateAction<boolean>>;
}

const DataTable: React.FC<DataTableProps> = ({ isListView, setIsListView }) => {
    const [data, setData] = useState<DataItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 990);
    const [page, setPage] = useState(1);
    const [allData, setAllData] = useState<DataItem[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [sortConfig, setSortConfig] = useState<{ key: keyof DataItem, direction: 'asc' | 'desc' } | null>(null);


    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 990);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [window]);

    const fetchData = async (pageNum: number) => {
        if (process.env.REACT_APP_BACKEND_URL) {
            try {
                let newData: DataItem[] = [];
                if (pageNum === 1) {
                    const response = await axios.get<DataItem[]>(
                        `${process.env.REACT_APP_BACKEND_URL?.toString() || ''}`
                    );
                    newData = response.data;
                    setAllData(newData);
                    setData(newData.slice(0, 25));
                    setHasMore(newData.length > 25);
                } else {
                    const start = (pageNum - 1) * 50;
                    const end = start + 50;
                    newData = allData.slice(start, end);
                }
                setLoading(false);
                return newData;
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data. Please try again later.');
                setLoading(false);
                return [];
            }
        } else {
            setError('Failed to fetch data. Please try again later.');
            setLoading(false);
            return [];
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

        const sortedData = sortDataArray([...data], { key, direction });

        setSortConfig({ key, direction });
        setData(sortedData);
    };


    const sortDataArray = (data: DataItem[], config: { key: keyof DataItem, direction: 'asc' | 'desc' }) => {
        const { key, direction } = config;
        return [...data].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
            return 0;
        });
    };


    const loadMore = () => {
        if (data.length < 2000) {
            setPage(prevPage => {
                const newPage = prevPage + 1;
                fetchData(newPage)
                    .then((newData) => {
                        const mergedData = [...data, ...newData];
                        const sortedData = sortConfig ? sortDataArray(mergedData, sortConfig) : mergedData;
                        setData(sortedData);
                    });
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

    // Mobile view
    if (isMobile) {
        return (
            <div style={{ marginTop: '20px' }}>
                <GridView data={data} hasMore={hasMore} loadMore={loadMore} />
            </div>
        );
    }

    // Grid view
    if (!isListView) {
        return (
            <>
                <ViewSwitch isListView={isListView} setIsListView={setIsListView} />
                <GridView data={data} hasMore={hasMore} loadMore={loadMore} />
            </>
        )
    }

    // List view (default)
    return (
        <>
            <ViewSwitch isListView={isListView} setIsListView={setIsListView} />
            <div className="data-table__container fade-in">
                <Table>
                    <TableHead onSort={sortData} sortConfig={sortConfig} />
                    <TableBody data={data} hoveredRow={hoveredRow} setHoveredRow={setHoveredRow} />
                </Table>
                {hasMore && (
                    <Button onClick={loadMore} type="primary" title="Load More" />
                )}
            </div>
        </>
    );
};

export default DataTable;