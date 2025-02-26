import "./NavigationBar.css"

import korp_logo from '../../assets/korp.svg';
import help_logo from '../../assets/help-circle.svg';
import settings_logo from '../../assets/settings.svg';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import ToggleAPI from "../ToggleAPI/ToggleAPI";

export default function NavigationBar () {

    const settings_tip = (
        <Tooltip id="settings_tooltip">
            <strong>Settings</strong>
        </Tooltip>
    );

    const help_tip = (
        <Tooltip id="help_tooltip">
            <strong>Help</strong>
        </Tooltip>
    );

    return(
        <Navbar className="main__navbar">
            <Container>
            <Navbar.Brand href="null">
                <Image src={korp_logo} alt="korpi logo" 
                    width="100"/>
            </Navbar.Brand>
            <Nav className="me">
                <ToggleAPI />
                <OverlayTrigger placement="bottom" overlay={help_tip}>
                    <Nav.Link className="circle__button" href={null}>
                        <Image src={help_logo}></Image>
                    </Nav.Link>
                </OverlayTrigger>
                <OverlayTrigger placement="bottom" overlay={settings_tip}>
                    <Nav.Link className="circle__button" href={null}>
                        <Image src={settings_logo}></Image>
                    </Nav.Link>
                </OverlayTrigger>
            </Nav>
            </Container>
        </Navbar>
    );
}