import { useEffect, useState } from 'react';
import './AdvancedSearch.css'

import AdvancedSearchEntry from './AdvancedSearchEntry.jsx';

import Dropdown from 'react-bootstrap/Dropdown';

export default function AdvancedSearch({words, returnWordsDict}) {
    
    const [wordsDict, setWordsDict] = useState({});

    function handleClick(word, tag) {
        console.log('tag ', tag)
        setWordsDict({...wordsDict, [word]: tag})
    }

    useEffect(() => {
        console.log("wordsDict", wordsDict);
        returnWordsDict(wordsDict);
    }, [wordsDict, returnWordsDict])
    
    return(
        <div className='advanced__search__container'>
            {Object.values(words).map((word, idx) => {
               return <AdvancedSearchEntry word={word} idx={idx} returnWordTag={(tag) => {handleClick(word, tag)}}/>;
            })}
        </div>
    );
}