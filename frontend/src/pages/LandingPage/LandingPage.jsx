import React, { useState } from "react";
import Tooltip from 'react-bootstrap/Tooltip';
import { useNavigate } from "react-router-dom";
// React Components
import HelloKorpi from "../../components/HelloKorpi/HelloKorpi.jsx";
import NavigationBar from "../../components/NavigationBar/NavigationBar.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import CorpusDropDown from "../../components/CorpusDropdown/CorpusDropdown.jsx";
import CircleButton from "../../components/CircleButton/CircleButton.jsx";
import InfoText from "../../components/InfoText/InfoText.jsx";
import HistoryPanel from "../../components/HistoryPanel/HistoryPanel.jsx";
import Footer from "../../components/Footer/Footer.jsx";

//assets
import corpus_logo from '../../assets/book-open.svg';
import history_logo from '../../assets/rotate-ccw.svg';
import sliders_logo from '../../assets/sliders.svg';
import search_logo from '../../assets/search.svg';

// main style
import "./LandingPage.css"

// services
import { getCorpusCollectionsList } from "../../services/api.js";


export default function LandingPage() {
    const [showHistory, setShowHistory] = useState(false);
    const navigate = useNavigate();

    const toggleHistory = () => {
        setShowHistory((prev) => !prev);
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
        navigate(`/results?searchQueryTest=${encodeURIComponent(event)}&corpus=${encodeURIComponent("romi")}`);
      };



    return (
        <div>
            {/* We have to remove it for now <NavigationBar /> */}
            <NavigationBar />
            <HelloKorpi />
            <SearchBar returnSearchInput={(e) => {
                            handleSubmit(e);
                        }}/>

            <div className="landingpage__button_group">

                {/* <CircleButton
                    buttonColour='#FF9F79'
                    buttonImage={search_logo}
                    buttonOnClick={null} /> */}

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
            <InfoText className="info_text"/>
            <Footer className="footer"/>
        </div>
    );
}