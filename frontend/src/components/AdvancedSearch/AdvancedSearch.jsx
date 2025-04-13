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
        setWordElements([...wordElements, <AdvancedSearchEntry word={entryName} idx={0} returnWordTag={(tag) => {handleClick(entryName, tag)}}/>])
    } 

    useEffect(() => {
        let lastWord = words[words.length - 1]; 
        console.log('lastWord', lastWord);
        
        setWordElements([...wordElements, 
            <AdvancedSearchEntry word={lastWord} idx={0} returnWordTag={(tag) => {handleClick(lastWord, tag)}}/>]);

    }, [words]);

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