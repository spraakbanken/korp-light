import "./CorpusDropdown.css";
import Dropdown from "react-bootstrap/Dropdown";
import CircleButton from "../CircleButton/CircleButton";
import { useEffect, useState } from "react";
import { hello} from "../../services/api";

export default function CorpusDropDown({ colour, buttonLogo,  }) {
    const [selectedItems, setSelectedItems] = useState(new Set());
    const [expandedCategories, setExpandedCategories] = useState(new Set());


    const toggleSelection = (item) => {
        setSelectedItems((prev) => {
            const newSelection = new Set(prev);
            newSelection.has(item) ? newSelection.delete(item) : newSelection.add(item);
            return newSelection;
        });
    };

    const toggleCategory = (category) => {
        setExpandedCategories((prev) => {
            const newExpanded = new Set(prev);
            newExpanded.has(category) ? newExpanded.delete(category) : newExpanded.add(category);
            return newExpanded;
        });
    };


    const renderCorpusTree = (category) => {
        return (
            <div key={fullPath}>
                <div
                 className="dropdown-category"
                 onClick={() => isExpandable && toggleCategory(fullPath)}
                 // get title here 
             >
                 {isExpandable ? (expandedCategories.has(fullPath) ? "▼" : "▶") : "•"}{" "}
               { /* get title here*/}

             </div>
                {expandedCategories.has(fullPath) && (
                    <div className="category-items">
                    {/* Corpora radio-boxes */}
                    {data.corpora.map((corpus) => (
                    <Form.Check
                        key={corpus}
                        type="radio"
                        checked={selectedItems.has(corpus)}
                        onChange={() => toggleSelection(corpus)}
                    />
                ))}   
                    </div>
                )}
            </div>
        );
    };
    

    return (
        <Dropdown className="corpus_bar" drop="down-centered">
            <Dropdown.Toggle id="dropdown-basic">
                <CircleButton buttonColour={colour} buttonImage={buttonLogo} />
                {selectedItems.size > 0 && ` ${selectedItems.size} valda`}
            </Dropdown.Toggle>

            <Dropdown.Menu id="dropdown-menu">
                <div className="dropdown-header">
                    <button className="btn btn-sm btn-light" onClick={() => setSelectedItems(new Set())}>
                        Avmarkera alla
                    </button>
                </div>

            </Dropdown.Menu>
        </Dropdown>
    );
}
