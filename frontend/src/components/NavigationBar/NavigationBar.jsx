import "./NavigationBar.css"
import { Settings } from 'lucide-react';
import { BadgeHelp } from 'lucide-react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import ToggleAPI from "../ToggleAPI/ToggleAPI";
import SideMenu from "../SideMenu/SideMenu";
import { useState } from "react";
import SettingsCard from "../SettingsCard/SettingsCard";
import { Link } from "react-router-dom";
import { useContext } from 'react';
import SettingsContext from '../../services/SettingsContext';
import KorpLight from '../../assets/korp.svg';
import KorpDark from '../../assets/whiteKorp.svg';
import { useLocation } from "react-router-dom";
import { useTour } from "../../services/Tour/tour";
import { useResultTour } from "../../services/Tour/resultTour";


export default function NavigationBar() {
  //Settings Modal
  const [settingsModal, setSettingsModal] = useState(false);
  const { settings } = useContext(SettingsContext);
  const location = useLocation();
  const {startTour} = useTour()
  const {startResultTour} = useResultTour() // Import the startResultTour function from the useResultTour hook
  ;

  const iconColor = settings.theme === "light" ? "black" : "white";
  const korpImage = settings.theme === "light" ? KorpLight : KorpDark;


  const settings_tip = (
    <Tooltip id="settings_tooltip">
      <strong>Inställningar</strong>
    </Tooltip>
  );

  const help_tip = (
    <Tooltip id="help_tooltip">
      <strong>Hjälp</strong>
    </Tooltip>
  );

  const handleHelpClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      startTour();
    } else {
      startResultTour(); 
    }
  };

  return (
    <Navbar className="main__navbar">
      <Container fluid className="d-flex justify-content-between">
        <SideMenu onTourStart={startTour} onResultTourStart={startResultTour}/>
        <Nav className="d-flex align-items-center">
          
          <span className="vr border-start border-1 border-dark rounded-3"></span>

          <OverlayTrigger placement="bottom" overlay={help_tip}>
            <Nav.Link className="circle__button" href="#" onClick={handleHelpClick}>
              <BadgeHelp size={28} className=" icon-hover text-dark hover:text-primary" color={iconColor} />
            </Nav.Link>
          </OverlayTrigger>

          <OverlayTrigger placement="bottom" overlay={settings_tip}>
            <Nav.Link
              className="circle__button"
              href={null}
              onClick={() => setSettingsModal(true)}
            >
              <Settings size={28} className="icon icon-hover text-dark hover:text-primary" color={iconColor} />
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