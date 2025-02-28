import "./CorpusDropdown.css";
import Dropdown from 'react-bootstrap/Dropdown';
import book from '../../assets/book-open.svg';

export default function CorpusDropDown () {;
 
  return (
    <Dropdown className="corpus_bar">
      <Dropdown.Toggle id="dropdown-basic">
        Corpus Choice
      </Dropdown.Toggle>

      <Dropdown.Menu id="corpus_menu">
        <Dropdown.Item href="#/action-1">Corpus1</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Corpus2</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Corpus3</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

}
