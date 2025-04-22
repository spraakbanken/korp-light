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
import { getCorpusInfo, getCorpusQuery } from "../../services/api.js";

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
import CalenderButton from "../../components/CalenderButton/CalenderButton.jsx";

export default function ResultsPage() {

    const location = useLocation(); //All this is first draft for routing.
    const queryParams = new URLSearchParams(location.search);
    const searchQueryTest = queryParams.get('cqp');
    const corpusQueryTest = queryParams.get('corpus');
    const navigate = useNavigate();
    const [showHistory, setShowHistory] = useState(false);
    const { corporas } = useContext(CorporaContext);
    const isInitialMount = useRef(true);
    
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
            queryKey: [searchWordInput, corpusInput],
            queryFn: () => getCorpusQuery(searchWordInput),
            enabled: false,
        });

    const handleSubmit = (event) => {
        if (corporas.corporas){
            setShowErrorCorpus(false);
        let res;
                console.log('wordsDict in results page', wordsDict);
                if(wordsDict && wordsDict.length > 0){
                    res = buildQuery(wordsDict);
                }else{
                    res = `[word = "${event}"]`;
                }
        setSearchWordInput(res);
        handleCorpusQuery();
        setRawSearchInput(event);
        navigate(`/results?corpus=${encodeURIComponent(Object.keys(corporas.corporas))}&cqp=${encodeURIComponent(res)}`);
        } else {
            setShowErrorCorpus(true);
        }
    };

    const advanced_tip = (
        
        <strong>Utökad sökning</strong>
   
);

const filter_tip = (
    
        <strong>Filtrera</strong>
  
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

    useEffect(() => {
        if (searchWordInput && corpusInput) {
            searchQueryRefetch().then((res) => {
                setQueryData(res.data);
            });
            console.log("Triggered new fetch for: ", searchWordInput, "in", corpusInput);
        }
    }, [searchWordInput, corpusInput]);
    

    useEffect(() => {
        setSearchWordInput(searchQueryTest || '');
    }, [searchQueryTest]);



    useEffect(() => {
        console.log("Settings in Results: ", settings);
    }, [settings])

    useEffect(() => {
        if (searchCorpusData && corpusInput) {
            getCorpusData(searchCorpusData);
        }
    }, [searchCorpusData]);

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
                                <SearchBar returnSearchInput={(e) => {
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
                    <CalenderButton/>
                </div>
                {showErrorCorpus && 
                        <p className="landingpage__select__corpus__error">
                                Välj korpus innan du söker!
                        </p>}
                
                {showAdvancedSearch && <AdvancedSearch 
                    returnWordsDict={(e) => handleAdvancedSearch(e)} 
                    submitResult={(e) => handleSubmit(wordsDict)} />}
                {showHistory && <HistoryPanel />}
                
                <ProgressBar isLoading={searchQueryIsLoading} />

                <div className="mt-2">
                    {/*queryData.kwic == undefined ? <p>Loading...</p> : JSON.stringify(queryData) */}
                    {queryData.kwic === undefined ? <p>Laddar...</p> :
                        <ResultsPanel response={queryData} wordToDef={rawSearchInput} />}
                </div>
                <button className="results_page__back_to_top" onClick={scrollToTop}>Till toppen</button>
            </div>
            <Footer className="results-footer" />
        </div>
    );
}