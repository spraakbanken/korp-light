import "./SearchBar.css";
import Form from 'react-bootstrap/Form';


export default function SearchBar() {

    return (
        <>
            <Form.Control
                id="searchBar"
                className="searchBar"
                type="search"
                placeholder="Search"
            />
        </>
    )
}
