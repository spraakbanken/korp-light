import { useState } from "react";
import { Offcanvas, Button, Nav } from "react-bootstrap";
import "./SideMenu.css";

export default function SideMenu() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="light" onClick={handleShow} className="menu-button">
                ☰
            </Button>

            <Offcanvas show={show} onHide={handleClose} className="side-menu">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="flex-column">
                        <Nav.Link href="/">Hem</Nav.Link>
                        {/* TODO link to help/tour */}
                        <Nav.Link href="#">Användarhandledning</Nav.Link>
                        {/* TODO link to history page */}
                        <Nav.Link href="#">Historik</Nav.Link>
                        <Nav.Link href="https://spraakbanken.gu.se/om">Mer om Språkbanken</Nav.Link>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}
