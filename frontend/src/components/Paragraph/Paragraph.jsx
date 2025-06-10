import { useState } from "react";

import chevronsRight from '../../assets/chevrons-right.svg'
import chevronsLeft from '../../assets/chevrons-left.svg'
import './Paragraph.css'

export default function Paragraph({paragraphText}) {

    const [pCounter, setPCounter] = useState(0);
    const numItems = paragraphText.length;

    function handleInc() {
        if (pCounter <= numItems){
            setPCounter(pCounter + 1)
        }
   }

    function handleDec() {
        if (pCounter > 0) {
            setPCounter(pCounter-1);
        }
    }

    function renderLine() {
        let currentLine = paragraphText[pCounter];
       
        let para = <p key={pCounter}
            className="contents__text">{currentLine}</p>


        let rightChevy = <img className="chevrons__img" 
            src={chevronsRight} alt='forward'
            onClick={handleInc}></img>  
        
        let leftChevy = <img className="chevrons__img" 
            src={chevronsLeft} alt='back'
            onClick={handleDec}></img>  

        if (pCounter == 0) {
            leftChevy = null;
        }

        if (pCounter == numItems-1) {
            rightChevy = null;
        }
        return [
            para, leftChevy, rightChevy
        ];
    }

    return(
        <div className="paragraph__container">
            {renderLine()}
        </div>
    );
}