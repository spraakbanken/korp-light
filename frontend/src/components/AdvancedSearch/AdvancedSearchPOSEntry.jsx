import './AdvancedSearch.css'

import Dropdown from 'react-bootstrap/Dropdown';
import { Button } from 'react-bootstrap';

import pos_list from '../../services/part-of-speech-list'

export default function AdvancedSearchPOSEntry({word, idx, handleDelete, handleChevronClick}) {




    return (
    <div className='advanced__search__entry'>
        <div className='advanced__search__entry__wrapper'>
            <Dropdown key={idx} className='advanced__search__word'>
                    <Button onClick={(e) => handleChevronClick(idx, -1)} className='advanced__search__chevron'>{'<'}</Button>
                        <Dropdown.Toggle className='advanced__search__word'>
                            {word}
                        </Dropdown.Toggle>
                    <Button onClick={(e) => handleChevronClick(idx, 1)} className='advanced__search__chevron'>{'>'}</Button>
    
                <Dropdown.Menu>
                <Dropdown.Divider />
                <Dropdown.Item onClick={(e) => handleDelete(idx, e)}>Radera</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    </div>
    );        
}