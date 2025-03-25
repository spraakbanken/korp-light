import { useState } from "react";
import { Offcanvas, Button, Nav, NavDropdown, OverlayTrigger } from "react-bootstrap";
import Tooltip from 'react-bootstrap/Tooltip';
import { List } from "react-bootstrap-icons";
import "./SideMenu.css";

import { setHistory, getHistory } from "../../services/history";
import { Link, NavLink } from "react-router-dom";

export default function SideMenu() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const history = getHistory();

    const menu_tip = (
        <Tooltip id="menu_tooltip">
            <strong>Meny</strong>
        </Tooltip>
    );

    return (
        <>
            <OverlayTrigger placement="bottom" overlay={menu_tip}>
                <List size={48} className="menu-button" onClick={handleShow} />
            </OverlayTrigger>

            <Offcanvas show={show} onHide={handleClose} className="side-menu">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Meny</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="side-menu-body">
                    <Nav className="flex-column">
                        <Nav.Link className="first-row" href="/">Hem</Nav.Link>
                        {/* TODO link to help/tour */}
                       
                        <NavDropdown
                            title="Historik"
                            id={`offcanvasNavbarDropdown-expand-sm}`}
                            autoClose="inside"
                            className="second-row">
                            
                            { Object.keys(history ?? {}).map((item) => {
                                return <NavDropdown.Item key={item}>
                                <Link className="link" to={`/results?searchQueryTest=${encodeURIComponent(item)}`}>
                                  {item}
                                </Link>
                              </NavDropdown.Item>
                            })}

                        </NavDropdown>
                        
                        <Nav.Link to={"/"} className="first-row" href="/help" >Användarhandledning</Nav.Link>
                        
                        <Nav.Link className="second-row" href="https://spraakbanken.gu.se/om">Mer om Språkbanken</Nav.Link>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}
