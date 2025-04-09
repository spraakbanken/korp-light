import { useEffect, useState } from 'react';
import './AdvancedSearch.css'

import Dropdown from 'react-bootstrap/Dropdown';

export default function AdvancedSearch({words, returnWordsDict}) {
    
    const [wordsDict, setWordsDict] = useState({});

    function handleClick(word, e) {
        console.log("word is ", word);
        const targetText = e.target.text

        if (targetText === 'Grundform') {
            console.log("selected ")
        } else if (targetText === "Ord") {
            console.log("");
        }

        setWordsDict({...wordsDict, [word]: targetText})
    }

    useEffect(() => {
        console.log("wordsDict", wordsDict);
        returnWordsDict(wordsDict);
    }, [wordsDict])

    function generateEntry(word, idx) {
        if (word !== "") {
            
            return (
                <Dropdown>
                <Dropdown.Toggle className='advanced__search__word'>
                  {word}
                </Dropdown.Toggle>
          
                <Dropdown.Menu>
                  <Dropdown.Item onClick={(e) => handleClick(word, e)}>Grundform</Dropdown.Item>
                  <Dropdown.Item onClick={(e) => handleClick(word, e)}>Ord</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="#/action-3" onClick={handleClick}>Substantiv</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Verb</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Substantiv</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>  
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