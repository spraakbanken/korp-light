import "./CorpusDropdown.css";
import Dropdown from "react-bootstrap/Dropdown";
import CircleButton from "../CircleButton/CircleButton";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { getCorpusCollectionsList } from "../../services/api";

export default function CorpusDropDown({ colour, buttonLogo }) {
    const [collectionsList, setCollectionsList] = useState({});
    const [selectedItems, setSelectedItems] = useState(new Set());
    const [expandedCategories, setExpandedCategories] = useState(new Set());

    useEffect(() => {
        getCorpusCollectionsList().then((data) => {
            console.log("Final Dropdown Data:", data);
            setCollectionsList(data);
        });
    }, []);

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

    const hasSubcategories = (items) => {
        return Object.keys(items).length > 0; // Check if there are further subcategories
    };

    const renderCategory = (category, items) => {
        const hasChildren = hasSubcategories(items);

        return (
            <div key={category}>
                <div
                    className="dropdown-category"
                    onClick={() => hasChildren && toggleCategory(category)}
                >
                    {hasChildren ? (expandedCategories.has(category) ? "▼" : "▶") : "•"} {category}
                </div>

                {expandedCategories.has(category) && hasChildren && (
                    <div className="category-items">
                        {Object.keys(items).map((subItem) => renderCategory(subItem, items[subItem]))}
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

                {Object.keys(collectionsList).map((category) => renderCategory(category, collectionsList[category]))}
            </Dropdown.Menu>
        </Dropdown>
    );
}
