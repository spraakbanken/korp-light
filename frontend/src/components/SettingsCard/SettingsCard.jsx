import { Form, Button } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { Moon, Sun } from "react-bootstrap-icons";
import { Modal } from "react-bootstrap";
import SettingsContext from "../../services/SettingsContext.jsx";
import ToggleAPI from "../ToggleAPI/ToggleAPI.jsx"

import "./SettingsCard.css";

export default function SettingsCard(props) {
    const {settings, updateSettings} = useContext(SettingsContext);

    const [selectedView, setSelectedView] = useState("wide");
      
    const handleViewChange = (view) => {
        setSelectedView(view);
    };

    useEffect(() => {
        // We have to move this out somewhere else, maybe App?
        // Move when we store settings in 
        //  localStorage.setItem('settings', settings)
        document.querySelector('body').
            setAttribute('theme', settings.theme)
    }, [settings]);

    return (
       
            <Modal {...props}
                className="_settings-card" centered>
                <Modal.Header closeButton>
                    <Modal.Title className="inst" id="contained-modal-title-vcenter">Inställningar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Theme selection */}
                    <Form.Group className="mb-3 settings">
                        <Form.Label>TEMA:</Form.Label>
                        <div className="theme-toggle">
                            <button
                                className="light-mode-button"
                                onClick={() => 
                                    updateSettings({
                                        ...settings,
                                        theme: 'light'
                                    })
                                }
                                active={settings.theme === "light" ? "true" : "false"}
                            >
                                <Sun />
                            </button>
                            <button
                                className="dark-mode-button"
                                onClick={() => 
                                    updateSettings({
                                        ...settings,
                                        theme: 'dark'
                                    })
                                }
                                active={settings.theme === "dark" ? "true" : "false"}
                            >
                                <Moon />
                            </button>
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3">
                    <Form.Label>API:</Form.Label>
                        <div className=" d-flex align-items-center justify-content-center">
                            {/* Toggle API, logic in ToggleAPI.jsx */}
                            <ToggleAPI />   
                        </div>
                    </Form.Group>

                </Modal.Body>
                
                {/* Close button */}
                <Modal.Footer className="settingsFooter" onClick={props.onHide}>
                        <Button className="settingClose">Spara och stäng</Button>
                </Modal.Footer>
            </Modal>
    );
}