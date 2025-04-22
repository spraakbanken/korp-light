import { Form, Button } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import SettingsContext from "../../services/SettingsContext.jsx";
import ToggleAPI from "../ToggleAPI/ToggleAPI.jsx";
import "./FilterCard.css";

export default function SettingsCard(props) {
    const {settings, updateSettings} = useContext(SettingsContext);

    useEffect(() => {
        // We have to move this out somewhere else, maybe App?
        // Move when we store settings in 
        //  localStorage.setItem('settings', settings)
        document.querySelector('body').
            setAttribute('theme', settings.theme)
    }, [settings]);

    return (
       
            <Modal {...props}
                className="_filter_card" centered>
                <Modal.Header className="header" closeButton>
                    <Modal.Title className="title">Sökinställningar</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body">
                    {/* Corpora per page */}
                    <Form.Group className="filter_button">
                        <Form.Label>Antal Korpusar per sida: <span className="settings__description"></span></Form.Label>
                        <Form.Select 
                            onChange={(e) => {
                                updateSettings({
                                    ...settings,
                                    resultsPerPage: e.target.value
                                })}}
                                value={settings.resultsPerPage} >
                            {[1, 3, 5, 10].map((num) => (
                                <option key={num} value={num}>
                                    {num} {num === 1 ? "korpus" : "korpusar"}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    {/* Sample size */}
                    <Form.Group className="filter_button">
                        <Form.Label>Antal resultat per korpus: <span className="settings__description"></span></Form.Label>
                    <div className="d-flex gap-2">
                            <Form.Control
                                type="number"
                                value={settings.sampleSize}
                                onChange={(e) => updateSettings({...settings, sampleSize : e.target.value})}
                            />
                        </div>
                    </Form.Group>

                    {/* Context size */}
                    <Form.Group className="filter_button">
                        <Form.Label>Meningslängd (antal ord i varje resultat): <span className="settings__description"></span></Form.Label>
                        <Form.Control
                            type="number"
                            value={settings.contextSize}
                            onChange={(e) => updateSettings({...settings, contextSize : e.target.value})}
                        />
                    </Form.Group>
                </Modal.Body>
                
                {/* Close button */}
                <Modal.Footer className="filterFooter" onClick={props.onHide}>
                        <Button className="filterCloseButton">Stäng</Button>
                </Modal.Footer>
            </Modal>
    );
}