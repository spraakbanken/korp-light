import "./CorpusDropdown.css";
import Dropdown from "react-bootstrap/Dropdown";
import CircleButton from "../CircleButton/CircleButton";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { getCorpusCollectionsList,getCorpusInfo} from "../../services/api";

export default function CorpusDropDown({ colour, buttonLogo }) {
    const [collectionsList, setCollectionsList] = useState({});
    const [corpusDetails, setCorpusDetails] = useState({});
    const [selectedItems, setSelectedItems] = useState(new Set());
    const [expandedCategories, setExpandedCategories] = useState(new Set());

    useEffect(() => {
        getCorpusCollectionsList().then((data) => {
            setCollectionsList(data);
    
            const allCorpora = [];
            const extractCorpora = (obj) => {
                if (obj.corpora) allCorpora.push(...obj.corpora);
                if (obj.subfolders) {
                    Object.values(obj.subfolders).forEach(sub => extractCorpora(sub));
                }
            };
            Object.values(data).forEach((cat) => extractCorpora(cat));
    
            Promise.all(allCorpora.map(corpus => getCorpusInfo(corpus)))
                .then(results => {
                    const details = {};
                    results.forEach((info) => {
                        const corpusKey = Object.keys(info.corpora || {})[0];
                        if (corpusKey) {
                            const name = info.corpora[corpusKey].info?.Name;
                            details[corpusKey] = name;
                        }
                    });
                    setCorpusDetails(details);
                });
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

    function getTitle(data, category) {
        if (typeof data.title === "string") {
            return data.title;
        }
        if (typeof data.title === "object" && data.title.swe) {
            return data.title.swe;
        }
        return category;
    }
    

    const renderCategory = (category, data = {}, path = "") => {
        console.log("Rendering:", category, "data.title=", data.title);

        const corporaCount = data.corpora ? data.corpora.length : 0;
        const fullPath = path ? `${path}/${category}` : category;
        const hasSubfolders = data.subfolders && typeof data.subfolders === "object" && Object.keys(data.subfolders).length > 0;
        const hasCorpora = Array.isArray(data.corpora) && data.corpora.length > 0;
        const isExpandable = hasSubfolders || hasCorpora;
        const hasChildren = data.subfolders && Object.keys(data.subfolders).length > 0;
      
        return (
            <div key={fullPath}>
                <div
                 className="dropdown-category"
                 onClick={() => isExpandable && toggleCategory(fullPath)}
                 title={data.description?.swe || data.description || ''} // Tooltip!
             >
                 {isExpandable ? (expandedCategories.has(fullPath) ? "▼" : "▶") : "•"}{" "}
                 {getTitle(data, category)}

             </div>
                {expandedCategories.has(fullPath) && (
                    <div className="category-items">
                    {/* Corpora radio-boxes */}
                    {hasCorpora && data.corpora.map((corpus) => (
                    <Form.Check
                        key={corpus}
                        type="radio"
                        label={`${corpus}${corpusDetails[corpus]?.info?.Name ? ` - ${corpusDetails[corpus].info.Name}` : ""}`}
                        checked={selectedItems.has(corpus)}
                        onChange={() => toggleSelection(corpus)}
                    />
                ))}
                        {/* Only recurse if subfolders*/}
                        {hasSubfolders &&
                            Object.entries(data.subfolders).map(([subCat, subData]) =>
                                renderCategory(subCat, subData, fullPath)
                            )}
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
