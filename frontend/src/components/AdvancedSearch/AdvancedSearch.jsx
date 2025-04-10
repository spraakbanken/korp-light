import { useActionState, useEffect, useState } from 'react';
import './AdvancedSearch.css'

import AdvancedSearchEntry from './AdvancedSearchEntry.jsx';

import Dropdown from 'react-bootstrap/Dropdown';

export default function AdvancedSearch({words, returnWordsDict}) {
    
    const [wordStates, setWordStates] = useState([]);
    const [wordsDict, setWordsDict] = useState({});

    function handleClick(word, tag) {
        console.log('tag ', tag)
        setWordsDict({...wordsDict, [word]: tag})
    }

    useEffect(() => {
        console.log("wordsDict", wordsDict);
        returnWordsDict(wordsDict);
    }, [wordsDict, returnWordsDict])
    
    const createComponent = (entryName) => {
        console.log('creating component ', entryName)
        setWordStates([...wordStates, <p className='advanced__search__word'>{entryName}</p>])
    } 


    return(
        <div className='advanced__search__container'>
            {Object.values(words).map((word, idx) => {
               return <AdvancedSearchEntry word={word} idx={idx} returnWordTag={(tag) => {handleClick(word, tag)}}/>
            })}

            {Object.values(wordStates).map((word, idx) => {
                return word;
            })}

            <div>
                    <Dropdown>
                        <Dropdown.Toggle className='advanced__search__append'>+</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => createComponent('Adverb')}>Adverb</Dropdown.Item>
                            <Dropdown.Item onClick={() => createComponent('Substantiv')}>Substantiv</Dropdown.Item>
                        </Dropdown.Menu>
                </Dropdown>
              </div>
        </div>
    );
}