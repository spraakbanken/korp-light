import { useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChevronDown, ChevronRight } from 'lucide-react'

import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

import { Chart as ChartJS, plugins } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

import { getStatisticsOverTime } from '../../services/api';
import './BarChart.css'
import SettingsContext from '../../services/SettingsContext';
import { BorderBottom } from 'react-bootstrap-icons';


export default function BarChart({word, corporasForStats}) {

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
        queryFn: () => getStatisticsOverTime(word, corporasForStats, wordClass || 'nn'),
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
                data: Object.entries(statDataCombined.absolute).map(([k, v]) => {
                    return {x: k, y: v}
                }),
                backgroundColor: "#000000",
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


    const chartOptions = {
        plugins: {
            title: {
                display: true,
                text: `Användning av ordet i valda korpusar över tid`, //Detta var ${word.toUpperCase()} istället för ordet.
                font: {
                    size: 18,
                }
            },

            legend: {
                labels: {
                    font: {
                        size: 15,
                    }
                },
                position: 'right',
                align: 'center',
            },

        }
    }

    const generateGraph = (inData) => {
        if(Object.keys(inData).length !== 0) {
            return <Bar options={chartOptions} data={inData} />
        } else {
            return <p>Kan inte visa graf, klicka på knappen igen!</p>
        }
    }

    return(
        <>
            {sbAPI && <div className='corpus-group'>
                <div className="corpus-header-statistics"
                    onClick={toggleStatExpand}>
                    {expandStat ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                    <span className="corpus-name">Statistik: {word}</span>
                </div>
                {expandStat && <div className='results-table'>
                    <div className="statistics-container">
                        <button disabled={!sbAPI} onClick={handleClick} className='statistics-fetch-button'>Hämta statistik för {word}, {wordClass}</button>
                        <input type='text' placeholder='type ordklass... nn, vb' 
                            onChange={(e) => (setWordClass(e.target.value))} />
                        
                        <div className='statistics-main-content'>
                        {statisticsDataIsLoading ? <p>Laddar graf</p> : null}
                        {generateGraph(statData)}
                        </div>
                    </div>
                </div>
                }
            </div>}
        </>
    );
}