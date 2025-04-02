import { useEffect, useState } from 'react';
import './CircleButton.css'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

import Image from 'react-bootstrap/Image';

export default function CircleButton({ buttonImage, buttonColour, buttonOnClick, buttonToolTip, className = "" }) {

    const [selected, setSelected] = useState(false);

    // // this might be overengineered
    // let selectedClass = () => {
    //     if (selected){
    //         return 'circlebutton__selected';
    //     } else {
    //         return '';
    //     }
    // };

    function handleClick() {
        setSelected((prev) => !prev); // Toggle state
        buttonOnClick(); // Call the function immediately
    }


    // //handle clicks outside of element!
    // useEffect( () => {
    //     if (selected) {
    //         document.addEventListener('mousedown', handleClick)
    //     }

    //     return () => {
    //         document.removeEventListener('mousedown', handleClick);
    //     }
    // }, [selected]);

    const style = {
        "--button-bgc": buttonColour
    };

    return (
        <div className="circle__buton__container">
            <OverlayTrigger placement="bottom" overlay={buttonToolTip}>
                <Image
                    className={`circlebutton ${className}`} 
                    src={buttonImage}
                    onClick={handleClick}
                    style={style}
                />
            </OverlayTrigger>

        </div>
    );
}