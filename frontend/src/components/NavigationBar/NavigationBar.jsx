import "./NavigationBar.css"

import help_logo from '../../assets/help-circle.svg';
import settings_logo from '../../assets/settings.svg';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';

export default function NavigationBar () {


    return(
        <Navbar className="main__navbar">
            <Container>
            <Navbar.Brand href="">Korpi</Navbar.Brand>
            <Nav className="me">
                <Nav.Link href="">
                    <Image src={help_logo}></Image>
                </Nav.Link>
                <Nav.Link href="">
                    <Image src={settings_logo}></Image>
                </Nav.Link>
            </Nav>
            </Container>
        </Navbar>
    );
}