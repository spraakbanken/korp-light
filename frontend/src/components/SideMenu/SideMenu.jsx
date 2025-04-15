import { useState, useContext } from "react";
import { Offcanvas, Button, Nav, NavDropdown } from "react-bootstrap";
import { List } from "react-bootstrap-icons";
import { useFloating, offset, flip, shift, autoUpdate } from "@floating-ui/react-dom";
import "./SideMenu.css";
import closeDark from '../../assets/closeDark.svg';
import closeLight from '../../assets/closeLight.svg';
import SettingsContext from "../../services/SettingsContext";


import { setHistory, getHistory } from "../../services/history";
import { Link, NavLink } from "react-router-dom";

export default function SideMenu({ onTourStart, onResultTourStart }) {
    const [show, setShow] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    const { x, y, refs, strategy } = useFloating({
        placement: 'bottom',
        middleware: [offset(8), flip(), shift()],
        whileElementsMounted: autoUpdate,
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { settings } = useContext(SettingsContext);
    const closeImage = settings.theme === "light" ? closeLight : closeDark;

    const history = getHistory();

    const handleUserGuideClick = (e) => {
        e.preventDefault();
        handleClose();

        if (location.pathname === '/') {
            onTourStart();
        } else {
            onResultTourStart(); 
        }
    };

    return (
        <>
            <div ref={refs.setReference}>
                <List 
                    size={48} 
                    className="menu-button" 
                    onClick={handleShow}
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                />
            </div>

            {showTooltip && (
                <div
                    ref={refs.setFloating}
                    style={{
                        position: strategy,
                        top: y ?? 0,
                        left: x ?? 0,
                        background: "black",
                        color: "white",
                        padding: "6px 10px",
                        borderRadius: "4px",
                        fontSize: "0.875rem",
                        zIndex: 9999,
                        pointerEvents: "none",
                        whiteSpace: "nowrap",
                    }}
                >
                    <strong>Meny</strong>
                </div>
            )}

            <Offcanvas show={show} onHide={handleClose} className="side-menu">
                <Offcanvas.Header>
                    <Offcanvas.Title>Meny</Offcanvas.Title>
                    <img src={closeImage} onClick={handleClose} className="close_btn" alt="close" />
                </Offcanvas.Header>
                <Offcanvas.Body className="side-menu-body">
                    <Nav className="flex-column">
                        <Nav.Link className="first-row" href="/">Hem</Nav.Link>

                        <NavDropdown
                            title="Historik"
                            id={`offcanvasNavbarDropdown-expand-sm}`}
                            autoClose="inside"
                            className="second-row">

                            {Object.keys(history ?? {}).map((item) => {
                                return <NavDropdown.Item key={item}>
                                    <Link className="link" to={`/results?searchQueryTest=${encodeURIComponent(item)}`}>
                                        {item}
                                    </Link>
                                </NavDropdown.Item>
                            })}

                        </NavDropdown>

                        <Nav.Link
                            className="first-row"
                            href="#"
                            onClick={handleUserGuideClick}
                        >
                            Användarhandledning
                        </Nav.Link>

                        <Nav.Link className="second-row" href="https://spraakbanken.gu.se/om">Mer om Språkbanken</Nav.Link>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}