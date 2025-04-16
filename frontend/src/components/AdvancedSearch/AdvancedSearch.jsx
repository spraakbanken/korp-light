import { useEffect, useState } from 'react';
import { horizontalListSortingStrategy, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import './AdvancedSearch.css'

import AdvancedSearchEntry from './AdvancedSearchEntry.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';

import Dropdown from 'react-bootstrap/Dropdown';
import { closestCorners, DndContext } from '@dnd-kit/core';
import addbutton from '../../assets/addbutton.svg';

export default function AdvancedSearch({words, returnWordsDict}) {
    
    const [wordElements, setWordElements] = useState([{
        id: 1, wordEntry: ""
    }]);
    const [wordsDict, setWordsDict] = useState({});


    function handleClick(word, tag) {
        setWordsDict({...wordsDict, [word]: tag})
    }

    function handleEnterKey(e) {
        let w = e.target.value;
        if (e.key === 'Enter' && w) {
            setWordElements((prev) => [...prev, {id: prev.length+1, 
                wordEntry: w}]);
            setWordsDict({...wordsDict, [w] : 'Ordform'});
            e.target.value='';
        }
    }

    function handleDelete(word) {
        console.log('deleting', word);
    }

    useEffect(() => {
        returnWordsDict(wordsDict);
    }, [wordsDict, returnWordsDict])
    
    const createComponent = (entryName) => {
        setWordElements([...wordElements, {id: wordElements.length+1, 
            wordEntry: entryName}])
    } 

    const onDragStart = (e) => {
        console.log('onDragStart', e);
    }

    return(
        <>
            <SearchBar></SearchBar>
            <div className='advanced__search__container'>
                {/* <input id='advanced__search__input' type='text'
                    placeholder='Ord...'
                    onChange={null}
                    onKeyDown={(e) => handleEnterKey(e)}></input> */}
                <DndContext collisionDetection={closestCorners} onDragEnd={onDragStart}>
                <SortableContext items={wordElements} strategy={horizontalListSortingStrategy}>
                {wordElements.map((w) => {
                    if (w.wordEntry) {
                        return <AdvancedSearchEntry key={w.id} word={w.wordEntry} idx={w.id} 
                            returnWordTag={(tag) => {handleClick(w.wordEntry, tag)}}
                            handleDelete={(word) => {handleDelete(word)}}/>
                    }
                })}
                </SortableContext>
                </DndContext>
                <div>
                        <Dropdown key={99999}>
                            <Dropdown.Toggle className='advanced__search__append'><img src={addbutton} alt='addbutton'></img></Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => createComponent('Adverb')}>Adverb</Dropdown.Item>
                                <Dropdown.Item onClick={() => createComponent('Substantiv')}>Substantiv</Dropdown.Item>
                            </Dropdown.Menu>
                    </Dropdown>
                </div>
            
            </div>
        </>
    );
}