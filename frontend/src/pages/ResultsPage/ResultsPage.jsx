//React
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRef, useContext, useEffect, useState } from "react";
import { OverlayTrigger } from "react-bootstrap";
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
import CorpusModal from "../../components/CorpusModal/CorpusModal.jsx";
import CorpusButton from "../../components/CorpusButton/CorpusButton.jsx";
import AdvancedSearch from "../../components/AdvancedSearch/AdvancedSearch.jsx";
import FilterCard from "../../components/FilterCard/FilterCard.jsx";
//Services
import { getCorpusInfo, getCorpusQuery, setHistoryAPI } from "../../services/api.js";

//Assets
import advanced from '../../assets/advanced.svg';
import homeIconLight from '../../assets/homeIconLight.svg';
import homeIconDark from '../../assets/homeIconDark.svg';


//Corpus, history, advanced search
import CorpusDropDown from "../../components/CorpusDropdown/CorpusDropdown.jsx";
import corpus_logo from '../../assets/book-open.svg';
import history_logo from '../../assets/rotate-ccw.svg';
import sliders_logo from '../../assets/sliders.svg';
import CorporaContext from "../../services/CorporaContext.jsx";
import { buildQuery } from "../../services/api.js";
import HomeButton from "../../components/HomeButton/HomeButton.jsx";
import { getLastSearched } from "../../services/history.js";
//import CalenderButton from "../../components/CalenderButton/CalenderButton.jsx";

export default function ResultsPage() {

    const [pendingRequests, setPendingRequests] = useState(0);
    const [isFetching, setIsFetching] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [hits, setHits] = useState();
    const location = useLocation(); //All this is first draft for routing.
    const queryParams = new URLSearchParams(location.search);
    const searchQueryTest = queryParams.get('cqp');
    const corpusQueryTest = queryParams.get('corpus');
    const navigate = useNavigate();
    const [showHistory, setShowHistory] = useState(false);
    const { corporas } = useContext(CorporaContext);
    const isInitialMount = useRef(true);

    const [perCorpusResults, setPerCorpusResults] = useState({});
    const [corpusHits, setCorpusHits] = useState({});

    const [queryCounter, setQueryCounter] = useState(0);
    
    const [words, setWords] = useState([]);
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [wordsDict, setWordsDict] = useState({});
    const { settings, updateSettings } = useContext(SettingsContext);
    const [corpus, setCorpus] = useState(corpusQueryTest);
    const [corpusInput, setCorpusInput] = useState(corpusQueryTest);
    const [searchWordInput, setSearchWordInput] = useState(searchQueryTest); // IDK if we use this

    const [showErrorCorpus, setShowErrorCorpus] = useState(false);
    
    const [rawSearchInput, setRawSearchInput] = useState("");

    const [queryData, setQueryData] = useState({});
    const [showModal, setShowModal] = useState(false);

    const {state} = useLocation();

    const [isSticky, setIsSticky] = useState(false);

    const toggleModal = () => {
        setShowModal((prev) => !prev);
    };

    const handleCorpusQuery = () => {
        let tempString = "";
        if (corporas.corporas) {
            const tempList = Object.keys(corporas.corporas);
            console.log(tempList);
            for (let val in tempList) {
                tempString += tempList[val]
                if (tempList.length - 1 > val) {
                    tempString += ","
                }
            }
            setCorpusInput(tempString);

        }
        else {
            console.log("error results page handleCorpusQuery");
        }
    };

    const toggleAdvancedSearch = () => {
        setShowAdvancedSearch((prev) => !prev);
    }

    const toggleFilterModal = () => {
        setShowFilterModal((prev) => !prev);
    };

    // const
    //     { data: searchCorpusData = [],
    //         isLoading: searchCorpusIsLoading,
    //         refetch: searchCorpusRefetch,
    //     } = useQuery({
    //         queryKey: [corpusInput], // Defaults to ROMI, we have to include corpus in routing.
    //         queryFn: () => getCorpusInfo(corpusInput),
    //         enabled: corpusInput !== "",

    //     });

    // const
    //     { data: searchQueryData = [],
    //         isLoading: searchQueryIsLoading,
    //         refetch: searchQueryRefetch,
    //         isRefetching: isSearchQueryRefetching
    //     } = useQuery({
    //         queryKey: [searchWordInput, corpusInput],
    //         queryFn: () => getCorpusQuery(searchWordInput, 0, 0, true, "sentence"),
    //         enabled: false,
    //     });

        const handleSubmit = (event) => {
            if (!corporas.corporas) {
                setShowErrorCorpus(true);
                return;
            }
        
            setShowErrorCorpus(false);
        
            let query;
            if (wordsDict && Object.keys(wordsDict).length > 1) {
                query = buildQuery(wordsDict);
            } else {
                query = `[word = "${event}"]`;
            }
        
            setSearchWordInput(query);        // Set CQP query
            setRawSearchInput(event);         // Set original user input
        
            try {
                window.localStorage.setItem("last_searched", 
                    JSON.stringify(event));
            } catch (e) {
                console.log("Error Localstorage: ", e);
            }

            // Set corpora input based on selected corpora
            const selectedCorpora = Object.keys(corporas.corporas);
            const corpusInputStr = selectedCorpora.join(",");
            setCorpusInput(corpusInputStr);
            
        
            // Navigate URL (for reload/bookmark)

            navigate(`/results?corpus=${encodeURIComponent(corpusInputStr)}&cqp=${encodeURIComponent(query)}`
                , {state: {wordFromLP : event}});
        };
        

        useEffect(() => {
            console.log('checking window state')
            if(location.state === null) {
                console.log('state is null....')
                navigate('/error')
        }}, [])

    const advanced_tip = (
        
        <strong>Utökad sökning</strong>
   
);

const filter_tip = (
    
        <strong>Anpassa sökning</strong>
  
);

const corpus_tip = (
   
        <strong>Korpusar</strong>
    
);

const history_tip = (
    
        <strong>Historik</strong>
    
);



    const toggleHistory = () => {
        setShowHistory((prev) => !prev);
    };

    const homeIcon = settings.theme === "light" ? homeIconLight : homeIconDark;




    function getCorpusData(data) {
        const langs = data.corpora
        let current_corpora = []
        for (const lang in langs) {
            //add error checking for corpora not existing?
            current_corpora = current_corpora + " " + (data.corpora[lang]['info']['Name'])
        }
        setCorpus(`[ ${current_corpora} ]`)
    }

    function buildStartEndMap(corpusOrder, corpusHits, pageSize) {
        const startEndMap = {};
        let currentStart = 0; 
    
        for (const corpus of corpusOrder) {
            const hits = Number(corpusHits[corpus]) || 0; 
            if (hits > 0) {
                startEndMap[corpus] = {
                    start: currentStart,
                    end: currentStart + Number(pageSize), 
                };
                currentStart += hits; 
            }
        }
    
        console.log('building map for ', corpusOrder, corpusHits, pageSize);
        return startEndMap;
    }
    

    useEffect(() => {
        if (searchWordInput && corpusInput) {
                setHits(0);
                setIsFetching(true);
                setQueryData({});
                setPerCorpusResults({});
                setPendingRequests(Object.keys(corporas.corporas).length);
                setIsLoading(true);
                setHistoryAPI(searchWordInput);
                console.log("corporas", corporas.corporas);
                Object.entries(corporas.corporas).forEach(([corpusName, val]) => {
                    console.log('fetching for', corpusName);
                    setQueryCounter(queryCounter+1);

                    fetchCorpusResults(corpusName, 0, 10, searchWordInput);
                });
                
                setIsFetching(false);
                            
        
        }
    }, [searchWordInput, corpusInput, settings.sampleSize]);

    useEffect(() => {
        console.log('queryCounter', queryCounter);
        console.log('corpushits', corpusHits);
    }, [queryCounter, corpusHits])

    const fetchCorpusResults = async (corpusName, start, end, query) => {
        try {

            
            const responseFromQuery = await getCorpusQuery(query, start, end, corpusName);
            let corpLower = corpusName.toLowerCase();


            setPerCorpusResults(prev => {
                const updatedResults = {
                    ...prev,
                    [corpLower]: responseFromQuery
                };

                const totalHits = Object.values(updatedResults).reduce((sum, corpusData) => {
                    return sum + (corpusData?.hits || 0);
                }, 0);
                
                setHits(totalHits); // Update total hits
                // Use the updated value immediately
                setQueryData(updatedResults);
                console.log('updatedResults', updatedResults);
                return updatedResults;
            });
        } catch (error) {
            console.error(`Failed to fetch results for ${corpusName}:`, error);
        } finally {
            // Decrement pending requests counter when done (success or error)
            setPendingRequests(prev => prev - 1);
        }
    };
    
    useEffect(() => {
        console.log("pending", pendingRequests);
        if (pendingRequests === 0) {
            setIsLoading(false); // All requests completed
            
        }
    }, [pendingRequests]);
    

    useEffect(() => {
        setSearchWordInput(searchQueryTest || '');
    }, [searchQueryTest]);



    useEffect(() => {
        console.log("Settings in Results: ", settings);
    }, [settings])


    useEffect(() => {
        const handleScroll = () => {
            if (window.innerWidth > 768) {
                setIsSticky(window.scrollY > 50);
            } else {
                setIsSticky(false); // Always non-sticky on mobile
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleAdvancedSearch = (e) => {
        setWordsDict(e);
        console.log('wordDict in results page', e);
    }

    useEffect(() => {
        const handleScroll = () => {
            const backToTopButton = document.querySelector('.results_page__back_to_top');
            if (window.scrollY > 300) { 
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div id="top" className="results-page">
            <NavigationBar />
            <div className="results-content">
                <div className="resultpage__search_container">
                    <HomeButton/>

                    <div className="resultpage__search_content">
                        <div className="resultpage__corpus_button">
                            <CorpusButton
                                buttonImage={corpus_logo}
                                buttonOnClick={toggleModal}
                                buttonToolTip={corpus_tip}
                                buttonLabel="    " 
                                inCorporas={corporas}/>
                            <CorpusModal
                                show={showModal}
                                onHide={() => setShowModal(false)}
                                colour='#FFB968'
                                buttonLogo={corpus_logo} />
                        </div>
                        <div className="resultpage__search_wrapper">
                            <div className={`resultpage__search_bar ${isSticky ? 'sticky' : ''}`}>
                                <SearchBar disableBar={showAdvancedSearch} returnSearchInput={(e) => {
                                    handleSubmit(e);
                                }} />
                            </div>
                        </div>
                        <div className="resultpage__button_container">
                        
                            <CircleButton
                                className="extended-search-button"
                                buttonColour='#FF9F79'
                                buttonImage={advanced}
                                buttonOnClick={toggleAdvancedSearch}
                                buttonToolTip={advanced_tip}
                                buttonLabel="Utökad sökning"
                            />

                            <CircleButton
                                className="filter-button"
                                buttonColour='#FFB968'
                                buttonImage={sliders_logo}
                                buttonOnClick={toggleFilterModal}
                                buttonToolTip={filter_tip}
                                buttonLabel="Anpassa sökning" />
                             <FilterCard
                                show={showFilterModal}
                                onHide={() => setShowFilterModal(false)}
                                colour='#FFB968'
                                buttonLogo={sliders_logo}
                                                    />

                            <CircleButton
                                className="history-button"
                                buttonColour='#FFCE6D'
                                buttonImage={history_logo}
                                buttonOnClick={toggleHistory}
                                buttonToolTip={history_tip}
                                buttonLabel="Historik" />
                        </div>
                    </div>
                    {//<CalenderButton/>//
}</div>
                {showErrorCorpus && 
                        <p className="landingpage__select__corpus__error">
                                Välj korpus innan du söker!
                        </p>}
                <div className="advanced_search_master_container">
                    <div className="resultpage_advanced_search_container">
                        {showAdvancedSearch && <AdvancedSearch 
                            returnWordsDict={(e) => handleAdvancedSearch(e)} 
                            submitResult={(e) => handleSubmit(wordsDict)} />}
                    </div>
                </div>
                {showHistory && <HistoryPanel />}
                
                <ProgressBar isLoading={isLoading} />

                <div className="mt-2">
                    {/*queryData.kwic == undefined ? <p>Loading...</p> : JSON.stringify(queryData) */}
                    {queryData === undefined ? <p>Laddar...</p> :
                        <ResultsPanel response={queryData} 
                            wordToDef={state?.wordFromLP} 
                            isFetching={null}
                            corpusHits={corpusHits}
                            hits={hits}/>}
                </div>
                <button className="results_page__back_to_top" onClick={scrollToTop}>Till toppen</button>
            </div>
            <Footer className="results-footer" />
        </div>
    );
}