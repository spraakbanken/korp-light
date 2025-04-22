import { ProgressBar } from 'react-bootstrap';
import { CheckAll } from 'react-bootstrap-icons';
import { useState, useEffect, use } from 'react';
import "./ProgressBar.css";

export default function LoadingProgressBar({ isLoading, percentLoaded}) {
    const [isComplete, setIsComplete] = useState(false);
    const [hasSearched, setHasSearched] = useState(false); 

    useEffect(() => {
        if (isLoading) {
            setHasSearched(true); 
        }

        if (!isLoading && hasSearched) {
            setIsComplete(true);
            setTimeout(() => {
                setIsComplete(false);
            }, 1000);
        }
    }, [isLoading, hasSearched]);

    return (
        <>
            {isLoading && hasSearched && (
                <div className="progress-bar-container">
                    <div className="progress-bar">
                        <ProgressBar animated now={percentLoaded} />
                    </div>
                </div>
            )}

            {!isLoading && isComplete && (
                <div className='progress-finished'>
                    <div className="progress-bar">
                        <ProgressBar animated now={percentLoaded} />
                    </div>
                    <div className="check-all-icon">
                        <CheckAll size={24} />
                    </div>
                </div>
            )}
        </>
    );
}