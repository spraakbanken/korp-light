// React Components
import HelloKorpi from "../../components/HelloKorpi/HelloKorpi.jsx";
import NavigationBar from "../../components/NavigationBar/NavigationBar.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import CorpusDropDown from "../../components/CorpusDropdown/CorpusDropdown.jsx";

// main style
import "./LandingPage.css"

export default function LandingPage() {

    return (
        <>
            <NavigationBar />
            <HelloKorpi />
            <SearchBar returnSearchInput={null}/>

            <div className="landingpage__button_group">
                <CorpusDropDown />
            </div>
        </>
    );
}