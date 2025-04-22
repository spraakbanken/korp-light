import { useEffect, useState } from "react";
import "./SearchBar.css";
import Form from 'react-bootstrap/Form';
import { Search } from "react-bootstrap-icons";

export default function SearchBar({ returnSearchInput, returnWords, disableBar}) {
    const [searchInput, setSearchInput] = useState("");
    const [words, setWords] = useState([]);


    useEffect(() => {
        setWords(searchInput.split(' '));
    }, [searchInput]);



    return (
        <div className={`searchBarContainer`}>
            <div className="searchBarWrapper">
                <Form.Control
                    id="searchBar"
                    className="searchBar"
                    type="search"
                    enterKeyHint="search"
                    placeholder="Sök"
                    disabled={disableBar}
                    onChange={(e) => {
                        setSearchInput(e.target.value);
                        if(e.nativeEvent.data === ' ') {
                            returnWords(words);
                        }
                    }}

                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            returnSearchInput(searchInput);
                        }
                    }}
                />
                <button 
                    className="searchBarButton" 
                    type="button" disabled={disableBar} 
                    onClick={() => returnSearchInput(searchInput)}>
                    <Search />
                </button>
            </div>
        </div>
    )
}