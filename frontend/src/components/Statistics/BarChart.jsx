import { useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChevronDown, ChevronRight } from 'lucide-react'

import { Chart as ChartJS } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

import { getStatisticsOverTime } from '../../services/api';
import './BarChart.css'
import SettingsContext from '../../services/SettingsContext';


export default function BarChart({word}) {

    const [expandStat, setExpandStat] = useState(true);
    const [statData, setStatData] = useState({});
    const [wordClass, setWordClass] = useState('nn');
    const {settings} = useContext(SettingsContext);

    const [sbAPI, setSbAPI] = useState(settings.api === 1 ? true : false);

    useEffect(() => {
        if (settings.api === 1) {
            setSbAPI(true);
        } else {
            setSbAPI(false);
        }
    },[settings])

    const toggleStatExpand = () => {
        setExpandStat(prev => !prev);
    }

    const
    { data: statisticsData = [],
        isLoading: statisticsDataIsLoading,
        refetch: statisticsDataRefetch,
    } = useQuery({
        queryKey: [word],
        queryFn: () => getStatisticsOverTime(word, wordClass || 'nn'),
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
                        <button disabled={!sbAPI} onClick={handleClick}>Fetch Stats for {word}, {wordClass}</button>
                        <input type='text' placeholder='type ordklass... nn, vb' 
                            onChange={(e) => (setWordClass(e.target.value))} />
                        {statData.absolute ? <Bar
                            data={{
                                labels: Object.keys(statData.absolute).map(e => e),
                                datasets: [
                                    {
                                        label: "Occurances",
                                        data: Object.values(statData.absolute).map(e => e)
                                    }
                                ]
                            }}
                        /> : <p>Cannot Draw Graph, Check Log and API</p> }
                    </div>
                </div>
                }

            </div>
        </>
    );
}