import { ProgressBar } from 'react-bootstrap';
import { CheckAll } from 'react-bootstrap-icons';
import { useState, useEffect } from 'react';
import "./ProgressBar.css";


// TODO: Fix progressbar showing when reloading page
export default function LoadingProgressBar({ isLoading }) {
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (!isLoading) {
            setIsComplete(true);
            setTimeout(() => {
                setIsComplete(false);
            }, 1000);
        }
    }, [isLoading]);

    return (
        <>
            {isLoading && (
                <div className="progress-bar-container">
                    <div className="progress-bar">
                        <ProgressBar animated now={100} />
                    </div>
                </div>
            )}

            {/* Display CheckAll icon after progress bar completion */}
            {!isLoading && isComplete && (
                <div className='progress-finished'>
                    <div className="progress-bar">
                        <ProgressBar animated now={100} />
                    </div>
                    <div className="check-all-icon">
                        <CheckAll size={24} />
                    </div>
                </div>
            )}
        </>
    );
}