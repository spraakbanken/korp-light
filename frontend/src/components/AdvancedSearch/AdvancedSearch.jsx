import './AdvancedSearch.css'

import Accordion from 'react-bootstrap/Accordion';

export default function AdvancedSearch({words}) {
    
    function generateEntry(word, idx) {
        if (word !== "") {
            
            return (
            <Accordion>
                <Accordion.Item eventKey={idx}>    
                    <Accordion.Header key={idx}>
                        {word}
                    </Accordion.Header>
                    <Accordion.Body>
                        Grundform
                    </Accordion.Body>
                    <Accordion.Body>
                        Ord
                    </Accordion.Body>
                    <Accordion.Body>
                        <Accordion>
                            <Accordion.Header>
                            Ordklass
                            </Accordion.Header>
                            <Accordion.Body>
                                Adjektiv
                            </Accordion.Body>
                            <Accordion.Body>
                                Substantiv
                            </Accordion.Body>
                            <Accordion.Body>
                                Verb
                            </Accordion.Body>
                        </Accordion>
                    </Accordion.Body>
                </Accordion.Item>     
            </Accordion>  
            );        
        }
    
    }
    
    return(
        <div className='advanced__search__container'>
            
            {Object.values(words).map((word, idx) => {
                return generateEntry(word, idx);
            })}
        </div>
    );
}