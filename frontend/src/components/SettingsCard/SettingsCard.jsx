import { Form, Button } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { Moon, Sun } from "react-bootstrap-icons";
import { Modal } from "react-bootstrap";

import "./SettingsCard.css";

import SettingsContext from "../../services/settingsContext.js";

export default function SettingsCard(props) {
    const {settings, setSettings} = useContext(SettingsContext);

    const [selectedView, setSelectedView] = useState("wide");
      
    const handleViewChange = (view) => {
        setSelectedView(view);
    };

    useEffect(() => {
        console.log("CHANGED SETTINGS");
        console.log(settings)
    }, [settings]);

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
                            onClick={console.log("resPerPage", settings.resultsPerPage)} 
                            onChange={(e) => {
                                setSettings({
                                    ...settings,
                                    resultsPerPage: e.target.value
                                })}}
                                value={settings.resultsPerPage} >
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
                                value={settings.sampleSize}
                                onClick={console.log("sampleSize", settings.sampleSize)}
                                onChange={(e) => setSettings({...settings, sampleSize : e.target.value})}
                            />
                        </div>
                    </Form.Group>

                    {/* Context size */}
                    <Form.Group className="mb-3">
                        <Form.Label>KONTEXT STORLEK:</Form.Label>
                        <Form.Control
                            type="number"
                            value={settings.contextSize}
                            onClick={console.log("contextSize", settings.contextSize)}
                            onChange={(e) => setSettings({...settings, contextSize : e.target.value})}
                        />
                    </Form.Group>

                    {/* Theme selection */}
                    <Form.Group className="mb-3 settings">
                        <Form.Label>TEMA:</Form.Label>
                        <div className="theme-toggle">
                            <button
                                className="light-mode-button"
                                onClick={() => 
                                    setSettings({
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
                                    setSettings({
                                        ...settings,
                                        theme: 'light'
                                    })
                                }
                                active={settings.theme === "dark" ? "true" : "false"}
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