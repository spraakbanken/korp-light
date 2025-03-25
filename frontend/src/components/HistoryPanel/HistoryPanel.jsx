import React from 'react';
import './HistoryPanel.css';
import { getHistory } from '../../services/history';
import { Link } from 'react-router-dom';

export default function HistoryPanel() {
    const history = getHistory();

    return (
        <div className="history-panel">
            <table className="history-table">
                <tbody>
                    {Object.keys(history ?? {}).map((item, index) => (
                        <tr key={item} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                            <td>
                                <Link to={`/results?searchQueryTest=${encodeURIComponent(item)}`}>
                                    {item}
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


