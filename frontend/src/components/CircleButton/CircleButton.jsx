import { useState } from 'react';
import { useFloating, offset, flip, shift, autoUpdate } from '@floating-ui/react-dom';
import Image from 'react-bootstrap/Image';
import './CircleButton.css';

export default function CircleButton({
    buttonImage,
    buttonColour,
    buttonOnClick,
    buttonToolTip,
    buttonLabel,
    className = ""
}) {
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

    const style = {
        "--button-bgc": buttonColour,
        cursor: "pointer"
    };

    return (
        <div className="circle__button__container">
            <Image
                ref={refs.setReference}
                className={`circlebutton ${className}`}
                src={buttonImage}
                onClick={handleClick}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                style={style}
                alt="Circle button"
            />

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
                    {buttonToolTip}
                </div>
            )}

            {buttonLabel && <div className="button-label">{buttonLabel}</div>}
        </div>
    );
}