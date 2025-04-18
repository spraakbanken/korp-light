import { useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChevronDown, ChevronRight } from 'lucide-react'

import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

import { Chart as ChartJS } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

import { getStatisticsOverTime } from '../../services/api';
import './BarChart.css'
import SettingsContext from '../../services/SettingsContext';


export default function BarChart({word}) {

    const [expandStat, setExpandStat] = useState(true);
    const [statDataCombined, setStatDataCombined] = useState({});
    const [statDataCorporas, setStatDataCorporas] = useState({});
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

        statisticsDataRefetch().then(e => {

            setStatDataCombined(e.data.combined);
            setStatDataCorporas(e.data.corpora);

            const labels = Object.keys(e.data.combined.absolute);

            const allDataSets = []
            Object.entries(e.data.corpora).map(([corpusLabel, values]) => {
                allDataSets.push({
                    label: corpusLabel,
                    data: Object.entries(values.absolute).map(([k, v]) => {
                        return {x: k, y: v}
                    }),
                    backgroundColor: "#" + Math.floor(Math.random()*16777215).toString(16),
                });
            });

            let combinedData = {
                label: "Alla",
                data: Object.values(statDataCombined.absolute).map(e => e),
                backgroundColor: "#FFA500",
            }

            allDataSets.push(combinedData);

            const allData = {
                labels: labels,
                datasets: allDataSets,
                spanGaps: true,
            }
            console.log('allData', allData);

            setStatData(allData);
        }
        ).catch(error => console.log('error barchart', error))
    }

    const handleCorpusSelect = (e) => {
        console.log(' corpus selected statistics', e);
    }

    const generateSelectCorpus = () => {

        if (statDataCorporas) {
            return (
                <ToggleButtonGroup className='statistics-corpus-selector' onChange={handleCorpusSelect} 
                    type='checkbox' vertical> 
                {
                     Object.keys(statDataCorporas).map((label) => {
                         return <ToggleButton key={label} className='statistics-corpus-button' value={label} 
                            id={`tog-btn-${label}` }>{label}</ToggleButton>
                     })
                }
                </ToggleButtonGroup>

            );
        } else {
            return (<p>No Corporas Found for Statistics!</p>);
        }
    }

    const generateGraph = (inData) => {
        console.log('inData', inData);
        if(Object.keys(inData).length !== 0) {
            return <Bar data={inData} />
        } else {
            return <p>Cannot Draw Graph, Check Log and API</p>
        }
    }

/*
data={{
                labels: Object.keys(statDataCombined.absolute).map(e => e),
                datasets: [
                    {
                        label: "Occurances",
                        data: allData
                    }
                ]
            }}

*/
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
                        
                        <div className='statistics-main-content'>
                        {generateGraph(statData)}
                        {generateSelectCorpus()}
                        </div>

                    </div>
                </div>
                }

            </div>
        </>
    );
}