import { useState } from "react";
import "./SearchBar.css";
import Form from 'react-bootstrap/Form';
import { getCorpusQuery } from "../../services/api";
import Button from 'react-bootstrap/Button';
import { useQuery } from '@tanstack/react-query';


export default function SearchBar() {

    const [searchInput, setSearchInput] = useState("");
    const {data = [], isLoading, error, refetch} = useQuery({
        queryKey: [searchInput],
        queryFn: () => getCorpusQuery(searchInput),
        enabled: false,
    });

    return (
        <>
            <Form.Control
                id="searchBar"
                className="searchBar"
                type="search"
                placeholder="Search"
                onChange={(e) => setSearchInput(e.target.value)}
            />
            <Button type="submit" onClick={() => refetch()}>
                Search
            </Button>
            <div>
                {isLoading? <p>Loading...</p> : JSON.stringify(data)}
            </div>
        </>
    )
}
