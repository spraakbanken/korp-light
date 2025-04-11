import { useEffect, useState } from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import './AdvancedSearch.css'

import AdvancedSearchEntry from './AdvancedSearchEntry.jsx';

import Dropdown from 'react-bootstrap/Dropdown';
import { DndContext } from '@dnd-kit/core';

export default function AdvancedSearch({words, returnWordsDict}) {
    
    const [wordStates, setWordStates] = useState([]);
    const [wordsDict, setWordsDict] = useState({});

    function handleClick(word, tag) {
        
        setWordsDict({...wordsDict, [word]: tag})
    }

    useEffect(() => {
        returnWordsDict(wordsDict);
    }, [wordsDict, returnWordsDict])
    
    const createComponent = (entryName) => {
        setWordStates([...wordStates, <p className='advanced__search__word'>{entryName}</p>])
    } 


    return(
        <>
        <DndContext>
        <div className='advanced__search__container'>
            <SortableContext items={words} strategy={verticalListSortingStrategy}>
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
        </SortableContext>
        </div>
        </DndContext>
        </>
    );
}