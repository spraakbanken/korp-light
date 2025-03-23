import React, { useState } from "react";

// React Components
import HelloKorpi from "../../components/HelloKorpi/HelloKorpi.jsx";
import NavigationBar from "../../components/NavigationBar/NavigationBar.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import CorpusDropDown from "../../components/CorpusDropdown/CorpusDropdown.jsx";
import CircleButton from "../../components/CircleButton/CircleButton.jsx";
import InfoText from "../../components/InfoText/InfoText.jsx";
import HistoryPanel from "../../components/HistoryPanel/HistoryPanel.jsx";

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

    const toggleHistory = () => {
        setShowHistory((prev) => !prev);
    };

    return (
        <div>
            {/* We have to remove it for now <NavigationBar /> */}
            <NavigationBar/>
            <HelloKorpi />
            <SearchBar returnSearchInput={null}/>

            <div className="landingpage__button_group">
            
                <CircleButton 
                    buttonColour='lime'
                    buttonImage={search_logo}
                    buttonOnClick={null} />

                <CircleButton
                    buttonColour='lightblue'
                    buttonImage={history_logo}
                    buttonOnClick={toggleHistory} />

                <CorpusDropDown
                    colour='orange'
                    buttonLogo={corpus_logo}
                    getListFunction={getCorpusCollectionsList}/>

                <CircleButton 
                    buttonColour='hotpink'
                    buttonImage={sliders_logo}
                    buttonOnClick={null} />
            </div>
            {showHistory && <HistoryPanel />}
            <InfoText className="info_text"/>
        </div>
    );
}