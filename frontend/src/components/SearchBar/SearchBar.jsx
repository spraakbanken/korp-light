import { useEffect, useState } from "react";
import "./SearchBar.css";
import Form from 'react-bootstrap/Form';
import { Search } from "react-bootstrap-icons";

export default function SearchBar({ returnSearchInput, returnWords }) {
    const [searchInput, setSearchInput] = useState("");
    const [words, setWords] = useState([]);


    useEffect(() => {
        setWords(searchInput.split(' '));
        console.log(words);
    }, [searchInput]);



    return (
        <div className={`searchBarContainer`}>
            <div className="searchBarWrapper">
                <Form.Control
                    id="searchBar"
                    className="searchBar"
                    type="search"
                    placeholder="Sök"
                    onChange={(e) => {
                        setSearchInput(e.target.value);
                        if(e.nativeEvent.data === ' ') {
                            returnWords(words);
                        }
                    }}

                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            console.log("searchinput", searchInput);
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