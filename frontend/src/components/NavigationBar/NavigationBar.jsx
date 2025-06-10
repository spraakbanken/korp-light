import "./NavigationBar.css"
import { Settings } from 'lucide-react';
import { BadgeHelp } from 'lucide-react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useFloating, offset, flip, shift, autoUpdate } from "@floating-ui/react-dom";
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
import HomeButton from "../../components/HomeButton/HomeButton.jsx";


export default function NavigationBar() {
  //Settings Modal
  const [settingsModal, setSettingsModal] = useState(false);
  const [showSettingsTooltip, setShowSettingsTooltip] = useState(false);
  const [showHelpTooltip, setShowHelpTooltip] = useState(false);
  const { settings } = useContext(SettingsContext);
  const location = useLocation();
  const isOnLandingPage = location.pathname === "/";
    const {startTour} = useTour();
  const {startResultTour} = useResultTour(); // Import the startResultTour function from the useResultTour hook

  const iconColor = settings.theme === "light" ? "black" : "white";

  // Floating UI for settings tooltip
  const { x: settingsX, y: settingsY, refs: settingsRefs, strategy: settingsStrategy } = useFloating({
    placement: 'bottom',
    middleware: [offset(8), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  // Floating UI for help tooltip
  const { x: helpX, y: helpY, refs: helpRefs, strategy: helpStrategy } = useFloating({
    placement: 'bottom',
    middleware: [offset(8), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

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
      { isOnLandingPage ? <SideMenu onTourStart={startTour} onResultTourStart={startResultTour}/> : <HomeButton /> }
        <Nav className="d-flex align-items-center">
          <div ref={helpRefs.setReference}>
            <Nav.Link 
              className="circle__button" 
              href="#" 
              onClick={handleHelpClick}
              onMouseEnter={() => setShowHelpTooltip(true)}
              onMouseLeave={() => setShowHelpTooltip(false)}
            >
              <BadgeHelp size={28} className="icon-hover text-dark hover:text-primary" color={iconColor} />
            </Nav.Link>
          </div>

          {showHelpTooltip && (
            <div
              ref={helpRefs.setFloating}
              style={{
                position: helpStrategy,
                top: helpY ?? 0,
                left: helpX ?? 0,
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
              <strong>Hjälp</strong>
            </div>
          )}

          <div ref={settingsRefs.setReference}>
            <Nav.Link
              className="circle__button"
              href={null}
              onClick={() => setSettingsModal(true)}
              onMouseEnter={() => setShowSettingsTooltip(true)}
              onMouseLeave={() => setShowSettingsTooltip(false)}
            >
              <Settings size={28} className="icon icon-hover text-dark hover:text-primary" color={iconColor} />
            </Nav.Link>
          </div>
          
          {showSettingsTooltip && (
            <div
              ref={settingsRefs.setFloating}
              style={{
                position: settingsStrategy,
                top: settingsY ?? 0,
                left: settingsX ?? 0,
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
              <strong>Inställningar</strong>
            </div>
          )}
        </Nav>
      </Container>

      <SettingsCard
        show={settingsModal}
        onHide={() => setSettingsModal(false)}
      />
    </Navbar>
  );
}