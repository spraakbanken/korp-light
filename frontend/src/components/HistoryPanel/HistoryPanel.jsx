import React, { useEffect, useState } from 'react';
import './HistoryPanel.css';
import crossLogo from '../../assets/x-circle.svg';
import { getHistory, removeHistoryItem } from '../../services/history';
import { Link } from 'react-router-dom';

export default function HistoryPanel() {
    const [history, setHistory] = useState(getHistory());

    const handleDelete = (item) => {
        const newHistory = {...history};
        delete newHistory[item];
        setHistory(newHistory);

        removeHistoryItem(item);
    }

    useEffect(() => {
        console.log('history is', history)
    }, [history])

    return (
        <div className="history-panel">
            <table className="history-table">
                <tbody>
                    {Object.keys(history ?? {}).map((item, index) => (
                        <tr key={item} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                            <td className='history-single-entry'>   
                                <Link className='history-single-entry-text' to={`/results${history[item].url}`}>
                                    {item}
                                </Link>
                                <p className='history-entry-time'>{history[item].time}</p>
                                <img onClick={() => handleDelete(item)} className='history-entry-delete-icon' src={crossLogo} alt="" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


