import { useEffect, useState } from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import './AdvancedSearch.css'

import AdvancedSearchEntry from './AdvancedSearchEntry.jsx';

import Dropdown from 'react-bootstrap/Dropdown';
import { DndContext } from '@dnd-kit/core';

export default function AdvancedSearch({words, returnWordsDict}) {
    
    const [wordElements, setWordElements] = useState([]);
    const [wordsDict, setWordsDict] = useState({});

    function handleClick(word, tag) {
        
        setWordsDict({...wordsDict, [word]: tag})
    }

    useEffect(() => {
        returnWordsDict(wordsDict);
    }, [wordsDict, returnWordsDict])
    
    const createComponent = (entryName) => {
        setWordElements([...wordElements, <p className='advanced__search__word'>{entryName}</p>])
    } 

    useEffect(() => {
            setWordElements(
                Object.values(words).map((word, idx) => {
                   return <AdvancedSearchEntry word={word} idx={idx} returnWordTag={(tag) => {handleClick(word, tag)}}/>
                })
            )
    }, [words, setWordElements])

    useEffect(() => {
        console.log('wordsElements are', wordElements);
    }, [wordElements]);

    return(
        <>
        <DndContext>
        <div className='advanced__search__container'>
            <SortableContext items={wordElements} strategy={verticalListSortingStrategy}>
            {wordElements.map(w => w)}
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