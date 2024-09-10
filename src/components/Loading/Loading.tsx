import React from 'react';
import './Loading.css';

const Loading: React.FC = () => {
    return (
        <div className="loading__container">
            <div className="loading__content">
                <h1 className="loading__title">Loading</h1>
                <div className="loading__boxes">
                    {[...Array(3)].map((_, index) => (
                        <div
                            key={index}
                            className="loading__box"
                            style={{
                                animation: `waveAnimation 0.5s ease-out ${index * 0.1}s infinite alternate`
                            }}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default Loading;
