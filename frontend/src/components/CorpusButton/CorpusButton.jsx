import { OverlayTrigger } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useState } from "react";
import "./CorpusButton.css";

export default function CorpusButton({ buttonImage, buttonOnClick, buttonToolTip, buttonLabel, inCorporas}) {
    const [selected, setSelected] = useState(false);
    
    function handleClick() {
        setSelected((prev) => !prev);
        buttonOnClick();
    }
    
    return (
        <div className="corpus-button-container">
            <OverlayTrigger placement="bottom" overlay={buttonToolTip}>
                <div 
                    className="corpus-button" 
                    onClick={handleClick}
                    style={{ 
                        cursor: 'pointer' 
                    }}
                >
                    <span className="corpus-button-text">Välj Korpus</span>
                    <Image
                        className="corpus-button-icon"
                        src={buttonImage}
                        alt="Corpus icon"
                    />
                </div>
            </OverlayTrigger>

            {buttonLabel && (
                <div className="button-label">{buttonLabel}</div>
            )}
            {inCorporas.corporas ? <p>{Object.keys(inCorporas.corporas).length}</p>: null}
        </div>
    );
}