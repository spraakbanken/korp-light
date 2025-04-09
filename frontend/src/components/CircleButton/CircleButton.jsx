import { useEffect, useState } from 'react';
import './CircleButton.css'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

import Image from 'react-bootstrap/Image';

export default function CircleButton({ buttonImage, buttonColour, buttonOnClick, buttonToolTip, buttonLabel, className = "" }) {

    const [selected, setSelected] = useState(false);

    function handleClick() {
        setSelected((prev) => !prev); // Toggle state
        buttonOnClick(); // Call the function immediately
    }

    const style = {
        "--button-bgc": buttonColour
    };

    return (
        <div className="circle__button__container">
            <OverlayTrigger placement="bottom" overlay={buttonToolTip}>
                <Image
                    className={`circlebutton ${className}`}
                    src={buttonImage}
                    onClick={handleClick}
                    style={style}
                />
            </OverlayTrigger>

            {buttonLabel && (
                <div className="button-label">{buttonLabel}</div>
            )}
        </div>
    );
}