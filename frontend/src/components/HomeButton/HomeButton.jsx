import React from 'react';
import { Link } from 'react-router-dom';
import { useRef, useContext, useEffect, useState } from "react";
import homeIconLight from '../../assets/homeIconLight.svg';
import homeIconDark from '../../assets/homeIconDark.svg';
import SettingsContext from "../../services/SettingsContext.jsx";
import { useFloating, offset, flip, shift, autoUpdate } from '@floating-ui/react-dom';

export default function HomeButton() {
    const [showTooltip, setShowTooltip] = useState(false);
    const { settings, updateSettings } = useContext(SettingsContext);

    const homeIcon = settings.theme === "light" ? homeIconLight : homeIconDark;

    const home_tip= (

            <strong>Hem</strong>
        
    )

    const { x, y, refs, strategy } = useFloating({
            placement: 'bottom',
            middleware: [offset(8), flip(), shift()],
            whileElementsMounted: autoUpdate,
        });


  return (
        <div className='home-button-'>
      <Link className="homeIconA" to="/">
        <img
        ref={refs.setReference}
        src={homeIcon}
        alt="Home icon"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        />
      </Link>

     

    {showTooltip && (
        <div
            ref={refs.setFloating}
            style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                background: "black",
                color: "white",
                padding: "6px 10px",
                borderRadius: "4px",
                fontSize: "0.875rem",
                zIndex: 9999,
                pointerEvents: "none",
                whiteSpace: "nowrap"
            }}
        >
            {home_tip}
        </div>
    )}
    </div>
  );
}
