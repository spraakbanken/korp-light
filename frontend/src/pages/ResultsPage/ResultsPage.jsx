//React
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
//CSS
import "./ResultPage.css"
//Libs
import Tooltip from 'react-bootstrap/Tooltip';
import { useQuery } from "@tanstack/react-query";
//Components
import ResultsPanel from "../../components/ResultsPanel/ResultsPanel.jsx";
import NavigationBar from "../../components/NavigationBar/NavigationBar.jsx";
import SettingsContext from "../../services/SettingsContext.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import ProgressBar from "../../components/ProgressBar/ProgressBar.jsx";
import CircleButton from "../../components/CircleButton/CircleButton.jsx";
import HistoryPanel from "../../components/HistoryPanel/HistoryPanel.jsx";
//Services
import { getCorpusInfo, getCorpusQuery } from "../../services/api.js";
import { getCorpusCollectionsList } from "../../services/api.js";

//Corpus, history, advanced search
import CorpusDropDown from "../../components/CorpusDropdown/CorpusDropdown.jsx";
import corpus_logo from '../../assets/book-open.svg';
import history_logo from '../../assets/rotate-ccw.svg';
import sliders_logo from '../../assets/sliders.svg';

export default function ResultsPage() {

    const location = useLocation(); //All this is first draft for routing.
    const queryParams = new URLSearchParams(location.search);
    const searchQueryTest = queryParams.get('searchQueryTest');
    const corpusQueryTest = queryParams.get('corpus');
    const navigate = useNavigate();
    const [showHistory, setShowHistory] = useState(false);

    const { settings, updateSettings } = useContext(SettingsContext);
    const [corpus, setCorpus] = useState(corpusQueryTest);
    const [corpusInput, setCorpusInput] = useState(corpusQueryTest || 'romi');
    const [searchWordInput, setSearchWordInput] = useState(searchQueryTest); // IDK if we use this

    const [queryData, setQueryData] = useState({});



    const
        { data: searchCorpusData = [],
            isLoading: searchCorpusIsLoading,
            refetch: searchCorpusRefetch,
        } = useQuery({
            queryKey: [corpusInput], // Defaults to ROMI, we have to include corpus in routing.
            queryFn: () => getCorpusInfo(corpusInput),
            enabled: corpusInput !== "",

        });

    const
        { data: searchQueryData = [],
            isLoading: searchQueryIsLoading,
            refetch: searchQueryRefetch,
        } = useQuery({
            queryKey: [searchWordInput],
            queryFn: () => getCorpusQuery(searchWordInput),
            enabled: false,
        });


    const handleSubmit = (event) => {
        setSearchWordInput(event)
        navigate(`/results?searchQueryTest=${encodeURIComponent(event)}&corpus=${encodeURIComponent(corpusInput)}`);
    };

    const advanced_tip = (
        <Tooltip id="settings_tooltip">
            <strong>Utökad Sökning</strong>
        </Tooltip>
    );

    const corpus_tip = (
        <Tooltip id="corpus_tooltip">
            <strong>Samlingar</strong>
        </Tooltip>
    );

    const history_tip = (
        <Tooltip id="help_tooltip">
            <strong>Historik</strong>
        </Tooltip>
    );

    const toggleHistory = () => {
        setShowHistory((prev) => !prev);
    };



    function getCorpusData(data) {
        const langs = data.corpora
        let current_corpora = []
        for (const lang in langs) {
            //add error checking for corpora not existing?
            current_corpora = current_corpora + " " + (data.corpora[lang]['info']['Name'])
        }
        setCorpus(`[ ${current_corpora} ]`)
    }

    useEffect(() => {
        if (searchWordInput) {



            searchQueryRefetch().then((res) => {
                setQueryData(res.data);

            });



            console.log("CHANGED: ", searchWordInput)
        }

    }, [searchWordInput, searchQueryRefetch, searchCorpusData])

    useEffect(() => {
        setSearchWordInput(searchQueryTest || '');
    }, [searchQueryTest]);

    useEffect(() => {
        setCorpusInput(corpusQueryTest || 'romi');
    }, [corpusQueryTest]);

    useEffect(() => {
        console.log("Settings in Results: ", settings);
    }, [settings])

    useEffect(() => {
        if (searchCorpusData && corpusInput) {
            getCorpusData(searchCorpusData);
        }
    }, [searchCorpusData, corpusInput]);

    return (
        <div className="results-page">
            <NavigationBar />
            <div className="results-content">
                <SearchBar returnSearchInput={(e) => {
                    handleSubmit(e);
                }} />

                <div className="landingpage__button_group">
                
                                    <CircleButton
                                        buttonColour='#FF9F79'
                                        buttonImage={sliders_logo}
                                        buttonOnClick={null}
                                        buttonToolTip={advanced_tip} />
                
                                    <CorpusDropDown
                                        colour='#FFB968'
                                        buttonLogo={corpus_logo}
                                        getListFunction={getCorpusCollectionsList}
                                        buttonToolTip={corpus_tip} />
                
                                    <CircleButton
                                        buttonColour='#FFCE6D'
                                        buttonImage={history_logo}
                                        buttonOnClick={toggleHistory}
                                        buttonToolTip={history_tip} />
                
                
                </div>
                    {showHistory && <HistoryPanel />}
                <ProgressBar isLoading={searchQueryIsLoading} />

                <div className="mt-2">
                    {/*queryData.kwic == undefined ? <p>Loading...</p> : JSON.stringify(queryData) */}
                    {queryData.kwic === undefined ? <p>Laddar...</p> :
                        <ResultsPanel response={queryData} />}
                </div>
            </div>
            <Footer className="results-footer" />
        </div>
    );
}