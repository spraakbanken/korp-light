import { useState } from 'react';
import './AdvancedSearch.css'

import Dropdown from 'react-bootstrap/Dropdown';
import { Button } from 'react-bootstrap';

export default function AdvancedSearchEntry({word, idx, returnWordTag, handleDelete, handleChevronClick}) {

    const [showOrdform, setShowOrdform] = useState(true);
    const [showGrundform, setShowGrundform] = useState(false);

    function handleClick(e) {
        const targetText = e.target.text
        if (targetText === 'Grundform') {
            setShowGrundform(true);
            setShowOrdform(false);
        } else if (targetText === "Ordform") {
            setShowOrdform(true);
            setShowGrundform(false);
        }
    }

    function generateEntry(word, idx) {
        if (word !== undefined) {
            return (
                <div className='advanced__search__entry'>
                    <div className='advanced__search__entry__wrapper'>
                        <Dropdown key={idx} className='advanced__search__word'>
                                <Button onClick={(e) => handleChevronClick(idx, -1)} className='advanced__search__chevron'>{'<'}</Button>
                                    <Dropdown.Toggle className='advanced__search__word'>
                                        {word}
                                    </Dropdown.Toggle>
                                <Button onClick={(e) => handleChevronClick(idx, 1)} className='advanced__search__chevron'>{'>'}</Button>
                
                            <Dropdown.Menu>
                            <Dropdown.Item onClick={(e) => {handleClick(e); returnWordTag(idx, 'Grundform');}}>Grundform</Dropdown.Item>
                            <Dropdown.Item onClick={(e) => {handleClick(e); returnWordTag(idx, 'Ordform');}}>Ord</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={(e) => handleDelete(idx, e)}>Radera</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        {showOrdform && <p className='advanced__search__small__icon_O'>O</p>}
                        {showGrundform && <p className='advanced__search__small__icon_G'>G</p>}
                    </div>

              </div>
            );        
        }
    
    }

    return generateEntry(word, idx);
}