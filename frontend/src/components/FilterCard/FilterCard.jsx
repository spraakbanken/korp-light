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
                    <Modal.Title className="title">Filter</Modal.Title>
                </Modal.Header>
                <Modal.Body classname="modal-body">
                    {/* Results per page */}
                    <Form.Group className="filter_button">
                        <Form.Label>Resultat per sida:</Form.Label>
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
                    <Form.Group className="filter_button">
                        <Form.Label>Provstorlek:</Form.Label>
                        <div className="d-flex gap-2">
                            <Form.Select defaultValue="Procent">
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
                    <Form.Group className="filter_button">
                        <Form.Label>Meningsstorlek:</Form.Label>
                        <Form.Control
                            type="number"
                            value={settings.contextSize}
                            
                            onChange={(e) => updateSettings({...settings, contextSize : e.target.value})}
                        />
                    </Form.Group>

                    <Form.Group className="filter_button">
                    <Form.Label>API (*gjort för utvecklare):</Form.Label>
                        <div className=" d-flex align-items-center justify-content-center">
                            {/* Toggle API, logic in ToggleAPI.jsx */}
                            <ToggleAPI />   
                        </div>
                    </Form.Group>

                </Modal.Body>
                
                {/* Close button */}
                <Modal.Footer className="filterFooter" onClick={props.onHide}>
                        <Button className="filterCloseButton">Stäng</Button>
                </Modal.Footer>
            </Modal>
    );
}