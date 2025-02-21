import "./HelloKorpi.css"

import Button from 'react-bootstrap/Button'

export default function HelloKorpi () {

    function handleClick () {
        alert("Hello!");
    }

    return(
        <>
            <h1>Hello, Korpi!</h1>
            <Button className="simple-button rounded" 
                variant="danger" 
                size="sm"
                onClick={handleClick}>
                Lets Go!</Button>
        </>
    );
}