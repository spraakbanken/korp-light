// React Components
import HelloKorpi from "../../components/HelloKorpi/HelloKorpi.jsx";
import NavigationBar from "../../components/NavigationBar/NavigationBar.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";

//Bootstrap Components

// main style
import "./LandingPage.css"

export default function App() {
    return (
        <>
            <NavigationBar />
            <SearchBar />
            <HelloKorpi />
        </>
    );
}