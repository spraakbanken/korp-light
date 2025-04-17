import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChevronDown, ChevronRight } from 'lucide-react'


import { getStatisticsOverTime } from '../../services/api';
import './BarChart.css'


export default function BarChart({word}) {

    const [expandStat, setExpandStat] = useState(true);
    const [statData, setStatData] = useState({});

    const toggleStatExpand = () => {
        setExpandStat(prev => !prev);
    }

    const
    { data: statisticsData = [],
        isLoading: statisticsDataIsLoading,
        refetch: statisticsDataRefetch,
    } = useQuery({
        queryKey: [word],
        queryFn: () => getStatisticsOverTime(word, 'nn'),
        enabled: false,
    });

    const handleClick = () => {



        statisticsDataRefetch().then(
            e => setStatData(e.data.combined)
        ).catch(error => console.log('error barchart', error))
    }


    return(
        <>
            <div className='corpus-group'>
                <div className="corpus-header-statistics"
                    onClick={toggleStatExpand}>
                    {expandStat ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                    <span className="corpus-name">Statistik: {word}</span>
                </div>
                {expandStat && <div className='results-table'>
                    <div className="statistics-container">
                        <button onClick={handleClick}>Fetch Stats</button>
                        {console.log('statData', statData.absolute)}
                        {statData.absolute ? Object.entries(statData.absolute).map(([year, value]) => {
                            return <p key={year}>{year}:{value}</p>
                        }): <p>No Data Found</p>}
                    </div>
                </div>
                }

            </div>
        </>
    );
}