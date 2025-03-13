import { useState } from "react";
import "./SearchBar.css";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

//this gives type error for some reason! 
export default function SearchBar({returnSearchInput}) {

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
            <Button type="submit" onClick={
                () => returnSearchInput(searchInput)}>
            Search
            </Button>
        </>
    )
}
