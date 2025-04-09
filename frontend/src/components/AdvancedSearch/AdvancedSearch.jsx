import './AdvancedSearch.css'

import Dropdown from 'react-bootstrap/Dropdown';

export default function AdvancedSearch({words}) {
    
    function generateEntry(word, idx) {
        if (word !== "") {
            
            return (
                <Dropdown>
                <Dropdown.Toggle className='advanced__search__word'>
                  {word}
                </Dropdown.Toggle>
          
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Grundform</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Ord</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Ordklass</Dropdown.Item>
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