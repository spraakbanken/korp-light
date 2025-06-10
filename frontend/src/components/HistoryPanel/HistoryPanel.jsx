import React, { useEffect, useState } from 'react';
import './HistoryPanel.css';
import crossLogo from '../../assets/x-circle.svg';
import { getHistory, removeHistoryItem } from '../../services/history';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function HistoryPanel() {
    const [history, setHistory] = useState(getHistory());

    const historyItems = Object.keys(history ?? {});
    const hasHistory = historyItems.length > 0;

    const navigate = useNavigate();

    const handleDelete = (item) => {
        const newHistory = { ...history };
        delete newHistory[item];
        setHistory(newHistory);

        removeHistoryItem(item);
    }

    function historyNavigate(url, event) {
        navigate(`/results?${url}` , {state: {wordFromLP : event}});
    }

    if (!hasHistory) {
        return null;
    }

    return (
        <div className="history-panel">
            <table className="history-table">
                <tbody>
                    {Object.keys(history ?? {}).slice().reverse().map((item, index) => (
                        <tr key={item} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                            <td className='history-single-entry'>
                                <div className='history-info-container'>
                                    <Button className='history-single-entry-text' 
                                        onClick={() => historyNavigate(history[item].url, history[item].event)}>
                                        {item}
                                    </Button>
                                    {/* <Link  
                                        to={{
                                            pathname: '/results',
                                            search: `${history[item].url}`,
                                            }} 
                                        state={{ wordFromLP: history[item].event}}>
                                        {item}
                                    </Link> */}
                                    <p className='history-entry-time'>{history[item].time}</p>
                                </div>

                                <img onClick={() => handleDelete(item)} className='history-entry-delete-icon' src={crossLogo} alt="" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


