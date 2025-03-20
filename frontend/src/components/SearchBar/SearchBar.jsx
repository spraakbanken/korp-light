import { useEffect, useState } from "react";
import "./SearchBar.css";
import Form from 'react-bootstrap/Form';
import { Search } from "react-bootstrap-icons";

//this gives type error for some reason! 
export default function SearchBar({ returnSearchInput }) {

    const [searchInput, setSearchInput] = useState("");
    // const [words, setWords] = useState([]);

    // useEffect(() => {
    //     setWords(searchInput.split(' '));
    //     console.log(words);

    // }, [searchInput]);

    return (
        <div className="searchBarContainer">
            <div className="searchBarWrapper">
                <Form.Control
                    id="searchBar"
                    className="searchBar"
                    type="search"
                    placeholder="Search"
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            returnSearchInput(searchInput);
                        }
                    }}
                />
                <button className="searchBarButton" type="button" onClick={() => returnSearchInput(searchInput)}>
                    <Search />
                </button>
            </div>
        </div>
    )
}
