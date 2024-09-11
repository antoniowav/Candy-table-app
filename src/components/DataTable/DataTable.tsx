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
import SearchComponent from '../Search/Search';

export interface DataItem {
    id: number;
    name: string;
    candy: string;
    eaten: number;
    date: string;
}

interface DataTableProps {
    isListView: boolean;
    setIsListView: React.Dispatch<React.SetStateAction<boolean>>;
}

const DataTable: React.FC<DataTableProps> = ({ isListView, setIsListView }) => {
    const [data, setData] = useState<DataItem[]>([]);
    const [filteredData, setFilteredData] = useState<DataItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 990);
    const [page, setPage] = useState(1);
    const [allData, setAllData] = useState<DataItem[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [sortConfig, setSortConfig] = useState<{ key: keyof DataItem, direction: 'asc' | 'desc' } | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 990);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [window]);

    useEffect(() => {
        fetchData(1);
    }, []);

    useEffect(() => {
        filterData(searchQuery);
    }, [searchQuery, data]);

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
                    setFilteredData(newData.slice(0, 25));
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

    const sortData = (key: keyof DataItem) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }

        const sortedData = sortDataArray([...data], { key, direction });

        setSortConfig({ key, direction });
        setData(sortedData);
        setFilteredData(sortDataArray([...filteredData], { key, direction }));
    };

    const sortDataArray = (data: DataItem[], config: { key: keyof DataItem, direction: 'asc' | 'desc' }) => {
        const { key, direction } = config;
        return [...data].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
            return 0;
        });
    };

    const filterData = (query: string) => {
        const filtered = data.filter(item =>
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.candy.toLowerCase().includes(query.toLowerCase()) ||
            item.date.toLowerCase().includes(query.toLowerCase()) ||
            item.eaten.toString().toLowerCase().includes(query.toLowerCase())
        );
        setFilteredData(filtered);
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
                        filterData(searchQuery);
                    });
                return newPage;
            });
        } else {
            setHasMore(false);
        }
    };

    if (loading && page === 1) return <Loading />;

    if (error) return <div className="error">{error}</div>;

    // Mobile view
    if (isMobile) {
        return (
            <div style={{ marginTop: '20px' }}>
                <SearchComponent data={data} onSearch={setSearchQuery} />
                {filteredData.length === 0 ? (
                    <div className="no-results">No results found</div>
                ) :
                    <GridView data={filteredData} hasMore={hasMore} loadMore={loadMore} />
                }
            </div>
        );
    }

    // Grid view
    if (!isListView) {
        return (
            <>
                <div className='data-table__switches'>
                    <ViewSwitch isListView={isListView} setIsListView={setIsListView} />
                    <SearchComponent data={data} onSearch={setSearchQuery} />
                </div>
                {filteredData.length === 0 ? (
                    <div className="no-results">No results found</div>
                ) : (
                    <GridView data={filteredData} hasMore={hasMore} loadMore={loadMore} />

                )}
            </>
        );
    }

    // List view (default)
    return (
        <>
            <div className='data-table__switches'>
                <ViewSwitch isListView={isListView} setIsListView={setIsListView} />
                <SearchComponent data={data} onSearch={setSearchQuery} />
            </div>
            {
                filteredData.length === 0 ? (
                    <div className="no-results">No results found</div>
                ) : (


                    < div className="data-table__container fade-in">
                        <Table>
                            <TableHead onSort={sortData} sortConfig={sortConfig} />
                            <TableBody data={filteredData} hoveredRow={hoveredRow} setHoveredRow={setHoveredRow} />
                        </Table>
                        {hasMore && (
                            <Button onClick={loadMore} type="primary" title="Load more" />
                        )}
                    </div >
                )
            }
        </>
    );
};

export default DataTable;
