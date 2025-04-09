import { useEffect, useState } from 'react';
import './AdvancedSearch.css'

import Dropdown from 'react-bootstrap/Dropdown';

export default function AdvancedSearch({words, returnWordsDict}) {
    
    const [wordsDict, setWordsDict] = useState({});
    const [showOrdform, setShowOrdform] = useState(false);
    const [showGrundform, setShowGrundform] = useState(false);

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

        setWordsDict({...wordsDict, [word]: targetText})
    }

    useEffect(() => {
        console.log("wordsDict", wordsDict);
        returnWordsDict(wordsDict);
    }, [wordsDict, returnWordsDict])

    function generateEntry(word, idx) {
        if (word !== "") {
            return (
                <div className='advanced__search__entry'>
                    <Dropdown key={idx}>
                        <Dropdown.Toggle className='advanced__search__word'>
                            {word}
                        </Dropdown.Toggle>
            
                        <Dropdown.Menu>
                        <Dropdown.Item onClick={(e) => handleClick(word, e)}>Grundform</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => handleClick(word, e)}>Ord</Dropdown.Item>
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
    
    return(
        <div className='advanced__search__container'>
            {Object.values(words).map((word, idx) => {
               return generateEntry(word, idx);
            })}
        </div>
    );
}