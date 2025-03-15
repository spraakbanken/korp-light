// React Components
import HelloKorpi from "../../components/HelloKorpi/HelloKorpi.jsx";
import NavigationBar from "../../components/NavigationBar/NavigationBar.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import CorpusDropDown from "../../components/CorpusDropdown/CorpusDropdown.jsx";
import CircleButton from "../../components/CircleButton/CircleButton.jsx";
import InfoText from "../../components/InfoText/InfoText.jsx";

//assets
import corpus_logo from '../../assets/book-open.svg';
import history_logo from '../../assets/rotate-ccw.svg';
import sliders_logo from '../../assets/sliders.svg';
import search_logo from '../../assets/search.svg';

// main style
import "./LandingPage.css"

// services
import { getCorpusCollectionsList } from "../../services/api.js";
import { getHistory } from "../../services/history.js";


export default function LandingPage() {

    return (
        <>
            <NavigationBar />
            <HelloKorpi />
            <SearchBar returnSearchInput={null}/>

            <div className="landingpage__button_group">
            
                <CircleButton 
                    buttonColour='lime'
                    buttonImage={search_logo}
                    buttonOnClick={null} />

                <CorpusDropDown
                    colour='lightblue'
                    buttonLogo={history_logo}
                    getListFunction={getHistory}/>

                <CorpusDropDown
                    colour='orange'
                    buttonLogo={corpus_logo}
                    getListFunction={getCorpusCollectionsList}/>

                <CircleButton 
                    buttonColour='hotpink'
                    buttonImage={sliders_logo}
                    buttonOnClick={null} />
            </div>
            <InfoText className="info_text"/>
        </>
    );
}