import { Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Moon, Sun } from "react-bootstrap-icons";
import { Modal } from "react-bootstrap";

import "./SettingsCard.css";


export default function SettingsCard(props) {
    const [settingsObject, setSettingsObject] = useState({});
    const [selectedView, setSelectedView] = useState("wide");

    let _settings = {
    "resultsPerPage": 20,
    "sampleSize": 1,
    "contextSize": 10,
    "theme": "light",
    "selectedView": "wide"
    }
      
    const handleViewChange = (view) => {
        setSelectedView(view);
    };

    useEffect(() => {
        console.log("CHANGED SETTINGS");
        props.returnSettingsObject(settingsObject)
    }, [settingsObject]);

    return (
       
            <Modal {...props}
                className="_settings-card" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Inställningar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Results per page */}
                    <Form.Group className="mb-3">
                        <Form.Label>RESULTAT PER SIDA:</Form.Label>
                        <Form.Select 
                            onClick={console.log("resPerPage", _settings.resultsPerPage)} 
                            onChange={(e) => {

                                _settings.resultsPerPage = e.target.value; 
                                console.log('settings', _settings)
                                setSettingsObject(_settings)
                                }}
                                value={settingsObject.resultsPerPage} >
                            {[10, 20, 50, 100].map((num) => (
                                <option key={num} value={num}>{num} Resultat</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    {/* Sample size */}
                    <Form.Group className="mb-3">
                        <Form.Label>PROV STORLEK:</Form.Label>
                        <div className="d-flex gap-2">
                            <Form.Select defaultValue="Procent">
                                <option>Procent</option>
                                <option>Antal</option>
                            </Form.Select>
                            <Form.Control
                                type="number"
                                value={_settings.sampleSize}
                                onClick={console.log("sampleSize", _settings.sampleSize)}
                                onChange={(e) => setSettingsObject(_settings.sampleSize = e.target.value)}
                            />
                        </div>
                    </Form.Group>

                    {/* Context size */}
                    <Form.Group className="mb-3">
                        <Form.Label>KONTEXT STORLEK:</Form.Label>
                        <Form.Control
                            type="number"
                            value={_settings.contextSize}
                            onClick={console.log("contextSize", _settings.contextSize)}
                            onChange={(e) => setSettingsObject(_settings.contextSize = e.target.value)}
                        />
                    </Form.Group>

                    {/* Theme selection */}
                    <Form.Group className="mb-3 settings">
                        <Form.Label>TEMA:</Form.Label>
                        <div className="theme-toggle">
                            <button
                                className="light-mode-button"
                                onClick={() => 
                                    setSettingsObject("theme", _settings.theme = "light")
                                }
                                active={_settings.theme === "light" ? "true" : "false"}
                            >
                                <Sun />
                            </button>
                            <button
                                className="dark-mode-button"
                                onClick={() => 
                                    setSettingsObject("theme", _settings.theme = "dark")
                                }
                                active={_settings.theme === "dark" ? "true" : "false"}
                            >
                                <Moon />
                            </button>
                        </div>
                    </Form.Group>

                    {/* View selection */}
                    <Form.Group className="mb-3 d-flex justify-content-between">
                        <Form.Check
                            type="checkbox"
                            label="Wide View"
                            checked={selectedView === "wide"}
                            onChange={() => handleViewChange("wide")
                            }
                        />
                        <Form.Check
                            type="checkbox"
                            label="Grid View"
                            checked={selectedView === "grid"}
                            onChange={() => handleViewChange("grid")
                            }
                        />
                        <Form.Check
                            type="checkbox"
                            label="Zen View"
                            checked={selectedView === "zen"}
                            onChange={() => handleViewChange("zen")
                            }
                        />
                    </Form.Group>

                </Modal.Body>
                
                {/* Close button */}
                <Modal.Footer onClick={props.onHide}>
                        <Button variant="danger" className="w-50">STÄNG</Button>
                </Modal.Footer>
            </Modal>
    );
}