import { Form, Button } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import SettingsContext from "../../services/SettingsContext.jsx";
import ToggleAPI from "../ToggleAPI/ToggleAPI.jsx";
import "./FilterCard.css";

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
                    <Modal.Title id="contained-modal-title-vcenter">Inställningar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Results per page */}
                    <Form.Group className="mb-3">
                        <Form.Label>RESULTAT PER SIDA:</Form.Label>
                        <Form.Select 
                            
                            onChange={(e) => {
                                updateSettings({
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
                                
                                onChange={(e) => updateSettings({...settings, sampleSize : e.target.value})}
                            />
                        </div>
                    </Form.Group>
                    {/* Context size */}
                    <Form.Group className="mb-3">
                        <Form.Label>KONTEXT STORLEK:</Form.Label>
                        <Form.Control
                            type="number"
                            value={settings.contextSize}
                            
                            onChange={(e) => updateSettings({...settings, contextSize : e.target.value})}
                        />
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
                        <Button variant="danger" className="w-50 settingsCloseButton">STÄNG</Button>
                </Modal.Footer>
            </Modal>
    );
}