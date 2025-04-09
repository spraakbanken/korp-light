import React, { useContext, useState, useEffect } from "react";
import Tooltip from 'react-bootstrap/Tooltip';
import { useNavigate } from "react-router-dom";
import SettingsContext from '../../services/SettingsContext';

// React Components
import HelloKorpi from "../../components/HelloKorpi/HelloKorpi.jsx";
import NavigationBar from "../../components/NavigationBar/NavigationBar.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import CorpusDropDown from "../../components/CorpusDropdown/CorpusDropdown.jsx";
import CircleButton from "../../components/CircleButton/CircleButton.jsx";
import InfoText from "../../components/InfoText/InfoText.jsx";
import HistoryPanel from "../../components/HistoryPanel/HistoryPanel.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import CorpusModal from "../../components/CorpusModal/CorpusModal.jsx";
import Button from 'react-bootstrap/Button';
import { useTour } from "../../services/Tour/tour.js";
import CorpusButton from "../../components/CorpusButton/CorpusButton.jsx";
import AdvancedSearch from "../../components/AdvancedSearch/AdvancedSearch.jsx";
import FilterCard from "../../components/FilterCard/FilterCard.jsx"
//assets
import corpus_logo from '../../assets/book-open.svg';
import history_logo from '../../assets/rotate-ccw.svg';
import sliders_logo from '../../assets/sliders.svg';
import advanced from '../../assets/advanced.svg';
import KorpLight from '../../assets/korp.svg';
import KorpDark from '../../assets/whiteKorp.svg';


// main style
import "./LandingPage.css"

// services
import { getCorpusCollectionsList } from "../../services/api.js";
import CorporaContext from "../../services/CorporaContext.jsx";

export default function LandingPage() {
    const [showHistory, setShowHistory] = useState(false);
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
    const [words, setWords] = useState([]);
    const { corporas } = useContext(CorporaContext);
    const navigate = useNavigate();
    const { settings } = useContext(SettingsContext);
    const [showModal, setShowModal] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const { startTour } = useTour();

    const korpImage = settings.theme === "light" ? KorpLight : KorpDark;

    useEffect(() => {
        // Check if URL has startTour parameter and start tour if it does
        const searchParams = new URLSearchParams(location.search);
        if (searchParams.get('startTour') === 'true') {
            // Slight delay to ensure all elements are rendered
            setTimeout(() => {
                startTour();
                // Clean up URL without
                //  refreshing the page
                navigate('/', { replace: true });
            }, 500);
        }
    }, [location, startTour, navigate]);

    const toggleHistory = () => {
        setShowHistory((prev) => !prev);
    };

    const toggleFilterModal = () => {
        setShowFilterModal((prev) => !prev);
    };


    const toggleAdvancedSearch = () => {
        setShowAdvancedSearch((prev) => !prev);
    }

    const toggleModal = () => {
        setShowModal((prev) => !prev);
    };

    const advanced_tip = (
        <Tooltip id="advanced_tooltip">
            <strong>Utökad sökning</strong>
        </Tooltip>
    );

    const filter_tip = (
        <Tooltip id="filter_tooltip">
            <strong>Filtrera</strong>
        </Tooltip>
    );

    const corpus_tip = (
        <Tooltip id="corpus_tooltip">
            <strong>Korpusar</strong>
        </Tooltip>
    );

    const history_tip = (
        <Tooltip id="help_tooltip">
            <strong>Historik</strong>
        </Tooltip>
    );

    const handleSubmit = (event) => {
        //VET EJ HUR VI BYGGER URL QUERYN FÖR FLERA CORPUSAR.
        navigate(`/results?searchQueryTest=${encodeURIComponent(event)}&corpus=${encodeURIComponent(Object.keys(corporas.corporas))}`);
    };

    const handleWords = (e) => {
        setWords(e)
    }

    return (
        <div className="landing-page">

            <NavigationBar />
            <div className="landing-content">
                <img className="korp-image" src={korpImage} alt="" />

                <SearchBar 
                returnSearchInput={(e) => {
                    handleSubmit(e);
                }} 
                returnWords={(e) => {
                    handleWords(e);
                }}
                />

                <div className="landingpage__button_group">
                    <div className="corpus-button-div">
                        <CorpusButton
                            buttonImage={corpus_logo}
                            buttonOnClick={toggleModal}
                            buttonToolTip={corpus_tip}
                            buttonLabel="Korpusar" />
                        <CorpusModal
                            show={showModal}
                            onHide={() => setShowModal(false)}
                            colour='#FFB968'
                            buttonLogo={corpus_logo} />
                    </div>
                    <div className="landingpage__button_container">
                        <CircleButton
                            className="extended-search-button"
                            buttonColour='#FF9F79'
                            buttonImage={advanced}
                            buttonOnClick={toggleAdvancedSearch} 
                            buttonToolTip={advanced_tip}
                            buttonLabel="Utökad sökning"/> 

                        <CircleButton
                            className="filter-button"
                            buttonColour='#FFB968'
                            buttonImage={sliders_logo}
                            buttonOnClick={toggleFilterModal}
                            buttonToolTip={filter_tip}   
                            buttonLabel="Filter"/>                  

                            <FilterCard 
                            show={showFilterModal}
                            onHide={() => setShowFilterModal(false)}
                            colour='#FFB968'
                            buttonLogo={sliders_logo} />
                                          

                        <CircleButton
                            className="history-button"
                            buttonColour='#FFCE6D'
                            buttonImage={history_logo}
                            buttonOnClick={toggleHistory}
                            buttonToolTip={history_tip} 
                            buttonLabel="Historik"/>
                    </div>
                </div>

                
                {showAdvancedSearch && <AdvancedSearch words={words}/>}
                {showHistory && <HistoryPanel />}
            
                
                <InfoText className="info_text" />
            </div>
            <Footer className="landing-footer" />
        </div>
    );
}