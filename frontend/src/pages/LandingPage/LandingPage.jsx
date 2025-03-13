// React Components
import HelloKorpi from "../../components/HelloKorpi/HelloKorpi.jsx";
import NavigationBar from "../../components/NavigationBar/NavigationBar.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import CorpusDropDown from "../../components/CorpusDropdown/CorpusDropdown.jsx";
import CircleButton from "../../components/CircleButton/CircleButton.jsx";

import help_logo from '../../assets/help-circle.svg';

// main style
import "./LandingPage.css"

export default function App() {
    return (
        <>
            <NavigationBar />
            <HelloKorpi />
            <SearchBar />

            <CircleButton 
                buttonColour='yellow'
                buttonImage={help_logo}
                buttonOnClick={null} />
            <CircleButton 
                buttonColour='red'
                buttonImage={help_logo}
                buttonOnClick={null} /> 
            <CircleButton 
                buttonColour='blue'
                buttonImage={help_logo}
                buttonOnClick={null} /> 

            <CorpusDropDown />
        </>
    );
}