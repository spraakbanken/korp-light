import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

import NavigationBar from "../../components/NavigationBar/NavigationBar.jsx";

export default function ResultsPage() {
    return(
        <>
            <NavigationBar />
            <h1>Results</h1>
            <p>Display Results on this page!</p>
            <Link to={"/"}>
                <Button className="simple-button" 
                    variant="danger" 
                    size="sm"
                    onClick={null}>
                    Take me back!
                </Button>
            </Link>
        </>
    );
}