import "./HelloKorpi.css"

import Button from 'react-bootstrap/Button'

export default function HelloKorpi () {

    function handleClick () {
        alert("Hello!");
    }

    return(
        <div className="hello__korpi">
            <h1>Hello, Korpi!</h1>
            <Button className="simple-button" 
                variant="danger" 
                size="sm"
                onClick={handleClick}>
                Lets Go!
            </Button>
        </div>
    );
}