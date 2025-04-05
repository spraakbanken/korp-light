import { useEffect, useState } from "react";
import "./SearchBar.css";
import Form from 'react-bootstrap/Form';
import { Search } from "react-bootstrap-icons";

export default function SearchBar({ returnSearchInput }) {
    const [searchInput, setSearchInput] = useState("");
    const [words, setWords] = useState([]);
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        setWords(searchInput.split(' '));
        console.log(words);
    }, [searchInput]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerWidth > 768) {
                setIsSticky(window.scrollY > 50);
            } else {
                setIsSticky(false); // Always non-sticky on mobile
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`searchBarContainer ${isSticky ? 'sticky' : ''}`}>
            <div className="searchBarWrapper">
                <Form.Control
                    id="searchBar"
                    className="searchBar"
                    type="search"
                    placeholder="Sök"
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