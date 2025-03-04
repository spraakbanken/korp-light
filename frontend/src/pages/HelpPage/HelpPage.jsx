import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import NavigationBar from "../../components/NavigationBar/NavigationBar";

import './HelpPage.css'

export default function HelpPage() {
    return (
        <>
            <NavigationBar></NavigationBar>
            <h1>welcome to <span id="korpi-word">korpi</span></h1>
            <p>Korpi is a search engine for coropora.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime cumque eveniet quisquam libero nemo, natus voluptatibus ea tenetur ipsam adipisci, voluptates obcaecati temporibus, a voluptatem soluta nobis maiores facere ut?</p>
            <Link to={"/"}>
                <Button className="simple-button" 
                    variant="danger" 
                    size="sm">
                    Take me Home!
                </Button>
            </Link>
        </>
    );
}