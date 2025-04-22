import { useEffect, useState } from 'react';
import './AdvancedSearch.css'

import AdvancedSearchEntry from './AdvancedSearchEntry.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';

import Dropdown from 'react-bootstrap/Dropdown';

import addbutton from '../../assets/addbutton.svg';
import AdvancedSearchPOSEntry from './AdvancedSearchPOSEntry.jsx';
import pos_list from '../../services/part-of-speech-list.js';

import Paragraph from '../Paragraph/Paragraph.jsx';

export default function AdvancedSearch({submitResult, returnWordsDict}) {
    
    const [wordElements, setWordElements] = useState([{
        id: -1, wordEntry: "", tag: "", pos: false,
    }]);
    const [wordsDict, setWordsDict] = useState({});
    const [counter, setCounter] = useState(0);

    function handleClick(id, tag) {
        setWordsDict({...wordsDict, [id]: tag});
        setWordElements(wordElements.map(w => {
            if (w.id === id) {
                return {...w, tag: tag};
            } else {
                return w;
            }
        }));
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
                    tag: 'Ordform',
                    pos: false,
                }]);
            setWordsDict({...wordsDict, [w] : 'Ordform'});
        }
        setCounter(counter+1);
    }

    function handleDelete(id) {
        setWordElements(wordElements.filter( w => w.id !== id));
    }


    useEffect(() => {
        returnWordsDict(wordElements);
    }, [wordElements])
    
    const createComponent = (entryName) => {
        setWordElements([...wordElements, {
            id: counter,
            tag: '', 
            wordEntry: entryName,
            pos: true,
            color: pos_list[entryName][1]
        }]);
        
        setCounter(counter+1);
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

    const generateInfoText = () => {
        if (wordElements.length > 1) {
            return <p>Klicka på orden för att ändra ordattribut. Tryck på plusset för att lägga till olika ordklasser!</p>
        } else {
            return <p>Skriv ord i sökrutan separerade med ett mellanslag för att göra utökade sökningar.</p>
        }
    }

     return(
        <>
            <SearchBar returnSearchInput={submitResult} returnWords={handleReturn}></SearchBar>
            <div className='advanced__search__container'>
                {/* <input id='advanced__search__input' type='text'
                    placeholder='Ord...'
                    onChange={null}
                    onKeyDown={(e) => handleEnterKey(e)}></input> */}

                <div className="advanced__info__text">
                    {generateInfoText()}    
                </div>
                {wordElements.map((w) => {
                    if (w.wordEntry) {
                        if (w.pos) {
                            return <AdvancedSearchPOSEntry key={w.id} word={w.wordEntry} idx={w.id} 
                            handleDelete={(word) => {handleDelete(word)}}
                            handleChevronClick={(id, dir) => {handleChevron(id, dir)}}
                            advButtonColour={w.color}/>
                        } else {
                        return <AdvancedSearchEntry key={w.id} word={w.wordEntry} idx={w.id} 
                            returnWordTag={(id, tag) => {handleClick(id, tag)}}
                            handleDelete={(word) => {handleDelete(word)}}
                            handleChevronClick={(id, dir) => {handleChevron(id, dir)}}/>
                    }}
                })}
                <div>
                        <Dropdown key={99999}>
                            <Dropdown.Toggle className='advanced__search__append'><img src={addbutton} alt='addbutton'></img></Dropdown.Toggle>
                            <Dropdown.Menu>
                                {
                                    Object.keys(pos_list).map(label => 
                                        <Dropdown.Item key={label} onClick={() => createComponent(`${label}`)}>{label}</Dropdown.Item>
                                    )
                                }
                            </Dropdown.Menu>
                    </Dropdown>
                </div>
            
            </div>
        </>
    );
}