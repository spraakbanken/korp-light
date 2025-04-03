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

//assets
import corpus_logo from '../../assets/book-open.svg';
import history_logo from '../../assets/rotate-ccw.svg';
import sliders_logo from '../../assets/sliders.svg';
import search_logo from '../../assets/search.svg';
import KorpLight from '../../assets/korp.svg';
import KorpDark from '../../assets/whiteKorp.svg';

// main style
import "./LandingPage.css"

// services
import { getCorpusCollectionsList } from "../../services/api.js";
import CorporaContext from "../../services/CorporaContext.jsx";

export default function LandingPage() {
    const [showHistory, setShowHistory] = useState(false);
    const { corporas } = useContext(CorporaContext);
    const navigate = useNavigate();
    const { settings } = useContext(SettingsContext);
    const [showModal, setShowModal] = useState(false);
    const { startTour } = useTour();

    const korpImage = settings.theme === "light" ? KorpLight : KorpDark;

    useEffect(() => {
        // Check if URL has startTour parameter and start tour if it does
        const searchParams = new URLSearchParams(location.search);
        if (searchParams.get('startTour') === 'true') {
            // Slight delay to ensure all elements are rendered
            setTimeout(() => {
                startTour();
                // Clean up URL without refreshing the page
                navigate('/', { replace: true });
            }, 500);
        }
    }, [location, startTour, navigate]);

    const toggleHistory = () => {
        setShowHistory((prev) => !prev);
    };

    const toggleModal = () => {
        setShowModal((prev) => !prev);
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

    const handleSubmit = (event) => {
        //VET EJ HUR VI BYGGER URL QUERYN FÖR FLERA CORPUSAR.
        navigate(`/results?searchQueryTest=${encodeURIComponent(event)}&corpus=${encodeURIComponent(corporas.corporas)}`);
    };



    return (
        <div className="landing-page">

            <NavigationBar />
            <div className="landing-content">
                <img className="korp-image" src={korpImage} alt="" />

                <SearchBar returnSearchInput={(e) => {
                    handleSubmit(e);
                }} />

                <div className="landingpage__button_group">

                    {/* <CircleButton
                    buttonColour='#FF9F79'
                    buttonImage={search_logo}
                    buttonOnClick={null} /> */}

                    <CircleButton
                        className="extended-search-button"
                        buttonColour='#FF9F79'
                        buttonImage={sliders_logo}
                        buttonOnClick={null}
                        buttonToolTip={advanced_tip} />

                    <CircleButton
                        className="corpus-button"
                        buttonColour='#FFB968'
                        buttonImage={corpus_logo}
                        buttonOnClick={toggleModal}
                        buttonToolTip={corpus_tip} />

                    <CorpusModal
                        show={showModal}
                        onHide={() => setShowModal(false)}
                        colour='#FFB968'
                        buttonLogo={corpus_logo} />

                    <CircleButton
                        className="history-button"
                        buttonColour='#FFCE6D'
                        buttonImage={history_logo}
                        buttonOnClick={toggleHistory}
                        buttonToolTip={history_tip} />


                </div>


                {showHistory && <HistoryPanel />}
                <InfoText className="info_text" />
            </div>
            <Footer className="landing-footer" />
        </div>
    );
}