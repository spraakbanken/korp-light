import { useState } from "react";
import { Offcanvas, Button, Nav, NavDropdown, OverlayTrigger } from "react-bootstrap";
import Tooltip from 'react-bootstrap/Tooltip';
import "./SideMenu.css";

import history from "../../services/history";

export default function SideMenu() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const menu_tip = (
        <Tooltip id="menu_tooltip">
            <strong>Meny</strong>
        </Tooltip>
    );

    return (
        <>
            <OverlayTrigger placement="bottom" overlay={menu_tip}>
                <Button variant="light" onClick={handleShow} className="menu-button">
                    ☰
                </Button>
            </OverlayTrigger>

            <Offcanvas show={show} onHide={handleClose} className="side-menu">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Meny</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="side-menu-body">
                    <Nav className="flex-column">
                        <Nav.Link className="gray-row" href="/">Hem</Nav.Link>
                        {/* TODO link to help/tour */}
                        <Nav.Link className="orange-row" href="#" >Användarhandledning</Nav.Link>
                        {/* TODO link to history page */}
                        <NavDropdown
                            title="Historik"
                            id={`offcanvasNavbarDropdown-expand-sm}`}>
                            
                            { Object.keys(history).map((item) => {
                                return <NavDropdown.Item key={item}href="#action3">{item}</NavDropdown.Item>
                            })}

                        </NavDropdown>
                        
                        {/* <Nav.Link className="gray-row" href="#">Historik</Nav.Link> */}
                        
                        
                        <Nav.Link className="orange-row" href="https://spraakbanken.gu.se/om">Mer om Språkbanken</Nav.Link>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}
