import { useEffect, useState } from 'react';
import './AdvancedSearch.css'

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Dropdown from 'react-bootstrap/Dropdown';

export default function AdvancedSearchEntry({word, idx, returnWordTag}) {
    
    const {attributes, listeners, setNodeRef, 
        transform, transition } = useSortable({idx});

    const [showOrdform, setShowOrdform] = useState(false);
    const [showGrundform, setShowGrundform] = useState(false);

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    function handleClick(word, e) {
        console.log("word is ", word);
        const targetText = e.target.text

        if (targetText === 'Grundform') {
            setShowGrundform(true);
            setShowOrdform(false);
        } else if (targetText === "Ord") {
            setShowOrdform(true);
            setShowGrundform(false);
        }
    }

    function generateEntry(word, idx) {
        console.log('word ', word)
        if (word !== "") {
            return (
                <div ref={setNodeRef} style={style} {...attributes} {...listeners} 
                    className='advanced__search__entry'>
                    <Dropdown key={idx}>
                        <Dropdown.Toggle className='advanced__search__word'>
                            {word}
                        </Dropdown.Toggle>
            
                        <Dropdown.Menu>
                        <Dropdown.Item onClick={(e) => {handleClick(word, e); returnWordTag('Grundform');}}>Grundform</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => {handleClick(word, e); returnWordTag('Ord');}}>Ord</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#/action-3">Substantiv</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Verb</Dropdown.Item>
                        </Dropdown.Menu>
                </Dropdown>
                {showOrdform && <p className='advanced__search__small__icon'>O</p>}
                {showGrundform && <p className='advanced__search__small__icon'>G</p>}
              </div>
            );        
        }
    
    }

    return generateEntry(word, idx);
}