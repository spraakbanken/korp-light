// React Components
import HelloKorpi from "../../components/HelloKorpi/HelloKorpi.jsx";
import NavigationBar from "../../components/NavigationBar/NavigationBar.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import CorpusDropDown from "../../components/CorpusDropdown/CorpusDropdown.jsx";

//assets
import corpus_logo from '../../assets/book-open.svg';
import history_logo from '../../assets/rotate-ccw.svg';

// main style
import "./LandingPage.css"
import { getCorpusCollectionsList } from "../../services/api.js";
import { getHistory } from "../../services/history.js";


export default function LandingPage() {

    return (
        <>
            <NavigationBar />
            <HelloKorpi />
            <SearchBar returnSearchInput={null}/>

            <div className="landingpage__button_group">
                <CorpusDropDown
                    colour='lightblue'
                    buttonLogo={history_logo}
                    getListFunction={getHistory}/>
                <CorpusDropDown
                    colour='orange'
                    buttonLogo={corpus_logo}
                    getListFunction={getCorpusCollectionsList}/>
            </div>
        </>
    );
}