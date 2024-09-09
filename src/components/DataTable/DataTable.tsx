import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DataTable.css';
import Loading from '../Loading/Loading';

interface DataItem {
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

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 610);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const fetchData = async (pageNum: number) => {
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
    };


    useEffect(() => {
        fetchData(1);
    }, []);

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
                    <button onClick={loadMore} className="load-more-button">
                        {loading ? 'Loading...' : 'Load More'}
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className="container">
            <h1 className="title">Candy Consumption Data</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th className="th">Name</th>
                        <th className="th">Candy</th>
                        <th className="th">Eaten</th>
                        <th className="th">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr
                            key={item.id}
                            className={`table-row ${hoveredRow === index ? 'tr-hover' : ''}`}
                            onMouseEnter={() => setHoveredRow(index)}
                            onMouseLeave={() => setHoveredRow(null)}
                        >
                            <td className="td">{item.name}</td>
                            <td className="td">{item.candy}</td>
                            <td className="td">{item.eaten}</td>
                            <td className="td">{item.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {hasMore && (
                <button onClick={loadMore} className="load-more-button">
                    {loading ? 'Loading...' : 'Load More'}
                </button>
            )}
        </div>
    );
};


export default DataTable;