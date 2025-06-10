import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import NavigationBar from "../../components/NavigationBar/NavigationBar";

import './HelpPage.css'

export default function HelpPage() {
    return (
        <>
            <NavigationBar></NavigationBar>
            <h1>welcome to <span id="korpi-word">korpi</span></h1>
            <p>Korpi är en sökmotor för korpusar!</p>
            <Link to={"/"}>
                <Button className="simple-button" 
                    variant="danger" 
                    size="sm">
                    Hem
                </Button>
            </Link>
        </>
    );
}