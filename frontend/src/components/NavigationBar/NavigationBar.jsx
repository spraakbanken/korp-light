import "./NavigationBar.css"
import { Settings } from 'lucide-react';
import help_logo from '../../assets/help-circle.svg';
import settings_logo from '../../assets/settings.svg';
import { BadgeHelp } from 'lucide-react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import ToggleAPI from "../ToggleAPI/ToggleAPI";
import SideMenu from "../SideMenu/SideMenu";
import { useState } from "react";
import SettingsCard from "../SettingsCard/SettingsCard";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
export default function NavigationBar () {
    //Settings Modal
    const [settingsModal, setSettingsModal] = useState(false);
    
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

    
    return (
        <Navbar className="main__navbar">
          <Container fluid className="d-flex justify-content-between">
            <div><Link to={"/"}>
                 <img src="src\assets\korp.svg" alt="" />
            </Link>
      
            <SideMenu /></div>
            
      
            <Nav className="d-flex align-items-center">
              <ToggleAPI />
              <span className="vr border-start border-1 border-dark rounded-3"></span>
              
              <OverlayTrigger placement="bottom" overlay={help_tip}>
                <Nav.Link className="circle__button" href={null}>
                  <BadgeHelp size={28} className=" icon-hover text-dark hover:text-primary" />
                </Nav.Link>
              </OverlayTrigger>
      
              <OverlayTrigger placement="bottom" overlay={settings_tip}>
                <Nav.Link
                  className="circle__button"
                  href={null}
                  onClick={() => setSettingsModal(true)}
                >
                  <Settings size={28} className="icon-hover text-dark hover:text-primary" />
                </Nav.Link>
              </OverlayTrigger>
            </Nav>
          </Container>
      
          <SettingsCard
            show={settingsModal}
            onHide={() => setSettingsModal(false)}
          />
        </Navbar>
      );
      
}