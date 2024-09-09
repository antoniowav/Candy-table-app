import React from 'react';
import './Loading.css';

const Loading: React.FC = () => {
    return (
        <div className="fullscreen-loader">
            <div className="loader-content">
                <h1 className="title">Loading</h1>
                <div className="wave-container">
                    {[...Array(3)].map((_, index) => (
                        <div
                            key={index}
                            className="placeholder-box"
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
