import { useEffect, useState } from 'react';
import { horizontalListSortingStrategy, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import './AdvancedSearch.css'

import AdvancedSearchEntry from './AdvancedSearchEntry.jsx';

import Dropdown from 'react-bootstrap/Dropdown';
import { closestCorners, DndContext } from '@dnd-kit/core';

export default function AdvancedSearch({words, returnWordsDict}) {
    
    const [wordElements, setWordElements] = useState([{
        id: 1, wordEntry: ""
    }]);
    const [wordsDict, setWordsDict] = useState({});

    function handleClick(word, tag) {
        setWordsDict({...wordsDict, [word]: tag})
    }

    useEffect(() => {
        returnWordsDict(wordsDict);
    }, [wordsDict, returnWordsDict])
    
    const createComponent = (entryName) => {
        setWordElements([...wordElements, {id: wordElements.length+1, 
            wordEntry: entryName}])
    } 

    useEffect(() => {
        console.log('words are', words);
        let lastWord = words[words.length - 1]; 
        setWordElements((prev) => [...prev, {id: prev.length+1, 
            wordEntry: lastWord}]);
    }, [words]);

    const onDragStart = (e) => {
        console.log('onDragStart', e);
    }

    return(
        <div className='advanced__search__container'>
            <DndContext collisionDetection={closestCorners} onDragEnd={onDragStart}>
            <SortableContext items={wordElements} strategy={horizontalListSortingStrategy}>
            {wordElements.map((w) => {
                if (w.wordEntry) {
                    return <AdvancedSearchEntry key={w.id} word={w.wordEntry} idx={w.id} 
                        returnWordTag={(tag) => {handleClick(w.wordEntry, tag)}}/>
                }
            })}
            </SortableContext>
            </DndContext>
            <div>
                    <Dropdown key={99999}>
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