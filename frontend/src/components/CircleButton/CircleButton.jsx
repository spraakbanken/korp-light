import './CircleButton.css'

import Image from 'react-bootstrap/Image';

export default function CircleButton({buttonImage, buttonColour, buttonOnClick}) {

    const style = {
        "--button-bgc" : buttonColour
    };

    return (
        <div className="circle__buton__container">
            <Image className="circlebutton" 
                src={buttonImage} 
                onClick={buttonOnClick}
                style={style} />
        </div>
    );
}