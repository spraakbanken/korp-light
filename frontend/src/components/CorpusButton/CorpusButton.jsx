import { useState } from "react";
import { useFloating, offset, flip, shift, autoUpdate } from "@floating-ui/react-dom";
import Image from "react-bootstrap/Image";
import "./CorpusButton.css";

export default function CorpusButton({ buttonImage, buttonOnClick, buttonToolTip, buttonLabel, inCorporas }) {
    const [selected, setSelected] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    const { x, y, refs, strategy } = useFloating({
        placement: 'bottom',
        middleware: [offset(8), flip(), shift()],
        whileElementsMounted: autoUpdate,
    });

    function handleClick() {
        setSelected((prev) => !prev);
        buttonOnClick();
    }

    let numCorporas = inCorporas.corporas ? Object.keys(inCorporas.corporas).length : 0;

    return (
        <div className="corpus-button-container">
            <div
                ref={refs.setReference}
                className="corpus-button"
                onClick={handleClick}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                style={{ cursor: "pointer" }}
            >
                <span className="corpus-button-text">
                    Välj korpus
                </span>
                <Image
                    className="corpus-button-icon"
                    src={buttonImage}
                    alt="Corpus icon"
                />
                <p className="corpus-number">{numCorporas}</p>
            </div>

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
                        whiteSpace: "nowrap",
                    }}
                >
                    {buttonToolTip}
                </div>
            )}

            {buttonLabel && <div className="button-label">{buttonLabel}</div>}
        </div>
    );
}