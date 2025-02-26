import { useState } from "react";
import "./SearchBar.css";
import Form from 'react-bootstrap/Form';
import { getSearchInput } from "../../services/api";
import Button from 'react-bootstrap/Button';


export default function SearchBar() {

    const [searchInput, setSearchInput] = useState("");

    return (
        <>
            <Form.Control
                id="searchBar"
                className="searchBar"
                type="search"
                placeholder="Search"
                onChange={(e) => setSearchInput(e.target.value)}
            />
            <Button type="submit" onClick={() => getSearchInput(searchInput)}>
                Search
            </Button>
        </>
    )
}
