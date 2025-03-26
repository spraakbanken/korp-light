// components/ToggleAPI/ToggleAPI.jsx
import React, { useContext } from "react";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import  CorporaContext  from "../../services/CorporaContext"; // Import the context
import './ToggleAPI.css';
import { toggleAPI } from "../../services/api.js";

export default function ToggleAPI() {
  const { corporas, updateCorporas } = useContext(CorporaContext);

  const handleChange = (value) => {
    toggleAPI(value)
    updateCorporas({
      ...corporas,
      api: value
    });
  };

  return (
    <>
      <ToggleButtonGroup
        type="radio"
        name="options"
        value={corporas.api}  
        onChange={handleChange} 
      >
        <ToggleButton className="toggle-button" id="api-toggle-button-1" value={1} >
          Språkbanken
        </ToggleButton>
        <ToggleButton className="toggle-button" id="api-toggle-button-2" value={0}>
          Peter-API
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
}
