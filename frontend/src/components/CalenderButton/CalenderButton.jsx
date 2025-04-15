import React from 'react';
import { Link } from 'react-router-dom';
import { useRef, useContext, useEffect, useState } from "react";
import calenderIconLight from '../../assets/calenderIconLight.svg';
import calenderIconDark from '../../assets/calenderIconDark.svg';
import SettingsContext from "../../services/SettingsContext.jsx";
import { useFloating, offset, flip, shift, autoUpdate } from '@floating-ui/react-dom';

export default function HomeButton() {
    const [showTooltip, setShowTooltip] = useState(false);
    const { settings, updateSettings } = useContext(SettingsContext);

    const calenderIcon = settings.theme === "light" ? calenderIconLight : calenderIconDark;

    const layout_tip = (
        
            <strong>Byt layout</strong>
        

    )

    const { x, y, refs, strategy } = useFloating({
            placement: 'bottom',
            middleware: [offset(8), flip(), shift()],
            whileElementsMounted: autoUpdate,
        });
<img className="calenderIconSVG" src={calenderIcon} alt="Calender icon" />

  return (
        <div className='calender-button-'>
      <Link className="calenderIconA" to="/">
        <img
        ref={refs.setReference}
        src={calenderIcon}
        alt="Calender icon"
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
            {layout_tip}
        </div>
    )}
    </div>
  );
}
