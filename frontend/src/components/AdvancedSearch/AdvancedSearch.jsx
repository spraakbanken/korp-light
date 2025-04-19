import { useEffect, useState } from 'react';
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import './AdvancedSearch.css'

import AdvancedSearchEntry from './AdvancedSearchEntry.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';

import Dropdown from 'react-bootstrap/Dropdown';
import { closestCorners, DndContext } from '@dnd-kit/core';
import addbutton from '../../assets/addbutton.svg';

export default function AdvancedSearch({words, returnWordsDict}) {
    
    const [wordElements, setWordElements] = useState([{
        id: -1, wordEntry: "", tag: ""
    }]);
    const [wordsDict, setWordsDict] = useState({});
    const [counter, setCounter] = useState(0);

    function handleClick(word, tag) {
        setWordsDict({...wordsDict, [word]: tag})
    }

    /* function handleEnterKey(e) {
        let w = e.target.value;
        if (e.key === 'Enter' && w) {
            setWordElements((prev) => [...prev, 
            {
                id: prev.length+1, 
                wordEntry: w,
                tag: 'Ordform'
            }]);
            setWordsDict({...wordsDict, [w] : 'Ordform'});
            e.target.value='';
        }

        console.log('Dictionary', wordElements);
    } */

    function handleReturn(word) {
        let w = word[word.length - 1];
        
        if(w){
            setWordElements((prev) => [...prev, 
                {
                    id: counter,
                    wordEntry: w,
                    tag: 'Ordform'
                }]);
            setWordsDict({...wordsDict, [w] : 'Ordform'});
        }
        setCounter(counter+1);
    }

    useEffect(() => {
        console.log('wordsDict in adv search', wordsDict);
        console.log('wordElements in adv search', wordElements);
    }, [wordsDict, wordElements])

    function handleDelete(id) {
        console.log('handling id', id);
        setWordElements(wordElements.filter( w => w.id !== id));
        //const _old = wordElements;
        //const temp = _old.find((w) => w.id === id);
        //console.log('entry', temp); 
    }

    useEffect(() => {
        returnWordsDict(wordsDict);
    }, [wordsDict, returnWordsDict])
    
    const createComponent = (entryName) => {
        setWordElements([...wordElements, {
            id: counter,
            tag: '', 
            wordEntry: entryName}]);
        
        setCounter(counter+1);
    } 

    const onDragStart = (e) => {
        console.log('onDragStart', e);
    }

    const handleChevron = (id, dir) => {

        let _old = wordElements;
        let elemIdx = wordElements.findIndex((w) => w.id === id);
        
        let currElem =_old[elemIdx];
        let prevElem = _old[elemIdx-1];
        let nextElem = _old[elemIdx+1];

        if (dir === 1) {
            if (nextElem) {
                const temp = currElem;
                _old[elemIdx] = _old[elemIdx+1];
                _old[elemIdx+1] = temp; 
            }
        } else if (dir === -1) {
            if (prevElem) {
                const temp = currElem;
                _old[elemIdx] = _old[elemIdx-1];
                _old[elemIdx-1] = temp;
            }
        }
        

        setWordElements([..._old]);
        /* setWordElements(wordElements.map((w,i) => {
            if (w.id === id) {
                const nextPos = w.pos+dir;
                console.log('nextelement', i);
                return {...w, pos: nextPos};
            } else {
                return w;
            }
        })) */
    }

    return(
        <>
            <SearchBar returnSearchInput={null} returnWords={handleReturn}></SearchBar>
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
                            handleDelete={(word) => {handleDelete(word)}}
                            handleChevronClick={(id, dir) => {handleChevron(id, dir)}}/>
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