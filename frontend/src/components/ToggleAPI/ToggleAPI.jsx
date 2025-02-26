import { useState } from "react";

import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

import './ToggleAPI.css';

import { toggleAPI } from "../../services/api.js";

export default function ToggleAPI() {

    const [value, setValue] = useState(0);

    const radios = [
        {id: 0, value: 'Språkbanken'},
        {id: 1, value: 'Peter-Local'},
    ];

    return (
        <>
            <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
                <ToggleButton className="toggle-button" 
                        id="api-toggle-button-1" 
                        value={1}
                        onChange={(e) => toggleAPI(1)}>
                    Språkbanken
                </ToggleButton>
                <ToggleButton className="toggle-button" 
                        id="api-toggle-button-2" 
                        value={2}
                        onChange={(e) => toggleAPI(0)}>
                    Peter-Local
                </ToggleButton>
            </ToggleButtonGroup>
        </>
    );
}