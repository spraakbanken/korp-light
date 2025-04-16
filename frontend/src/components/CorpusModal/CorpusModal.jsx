import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { CircleArrowRight, CircleArrowDown, X, Check } from "lucide-react";
import "./CorpusModal.css";
import peterCorpra from '../../services/peterCorpora.json';
import sbCorpra from '../../services/testdata.json';
import CorporaContext from "../../services/CorporaContext.jsx";
import { Search } from 'lucide-react';
import SettingsContext from "../../services/SettingsContext.jsx";
import Form from 'react-bootstrap/Form';


export default function CorpusModal({ colour, buttonLogo, show, onHide }) {
    const { corporas, updateCorporas } = useContext(CorporaContext);
    const [selectedCorpora, setSelectedCorpora] = useState(corporas.corporas || {});
    const [expanded, setExpanded] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [subcorporaIds, setSubcorporaIds] = useState({}); // Store UUIDs for subcorpora
    
    const {settings, _ } = useContext(SettingsContext);
    const testdata = settings.api === 1 ? sbCorpra : peterCorpra;

    // Generate random UUIDs for all subcorpora on first render
    //!IMPORTANT: Probably need to overlook these keys, they could break, if 2 subcorporas has the same name (I think).
    useEffect(() => {
        const ids = {};
        Object.values(testdata).forEach(category => {
            if (category[3]?.subcorpora) {
                Object.values(category[3].subcorpora).forEach(subcategory => {
                    const subTitle = subcategory[0];
                    ids[subTitle] = crypto.randomUUID();
                });
            }
        });
        setSubcorporaIds(ids);
        setSelectedCorpora(corporas.corporas || {});
        setSearchQuery('');
    }, [settings.api]);
    

    //Trying to expand categories when searching, kinda hard
    useEffect(() => {
        if (searchQuery) {
            const newExpanded = {};
            
            Object.values(testdata).forEach(category => {
                const title = category[0];
                let shouldExpand = false;
    
                // Check if main category title matches
                if (matchesSearch(title)) {
                    shouldExpand = true;
                }
    
                // Check main corpora in category[2]
                if (category[2]) {
                    shouldExpand = shouldExpand || Object.values(category[2]).some(value => {
                        const label = Array.isArray(value) ? value[0] : value;
                        return matchesSearch(label);
                    });
                }
    
                // Check subcorpora
                if (category[3]?.subcorpora) {
                    shouldExpand = shouldExpand || Object.values(category[3].subcorpora).some(subcategory => {
                        const subTitle = subcategory[0];
                        if (matchesSearch(subTitle)) return true;
                        
                        if (subcategory[2]) {
                            return Object.values(subcategory[2]).some(value => {
                                const label = Array.isArray(value) ? value[0] : value;
                                return matchesSearch(label);
                            });
                        }
                        return false;
                    });
                }
    
                if (shouldExpand) {
                    newExpanded[title] = true;
                    // Also expand all subcorpora when searching (using their UUIDs)
                    if (category[3]?.subcorpora) {
                        Object.values(category[3].subcorpora).forEach(subcategory => {
                            const subTitle = subcategory[0];
                            newExpanded[subcorporaIds[subTitle]] = true;
                        });
                    }
                }
            });
    
            setExpanded(prev => ({ ...prev, ...newExpanded }));
        }else{
            
            let initialExpanded = {}
            if(corporas.corporas){
                initialExpanded = findAndExpandSections(testdata, corporas.corporas);
            }

            setExpanded(initialExpanded);
            
        }
    }, [searchQuery]);


    const findAndSetExpanded = (testdata, initialCorpora) => {
        let initialExpanded = {}

        initialExpanded = findAndExpandSections(testdata, initialCorpora);

        

        setExpanded(prev => ({ ...prev, ...initialExpanded}));
    
    }

    const findAndExpandSections = (data, selected) => {
                // Expand sections containing selected corpora
// Function to recursively find and expand sections containing selected corpora, category[0] = title, 1 = Description 2 = main corporas, 3 = subcorporas
                const initialExpanded = {};
                Object.values(data).forEach(category => {
                    const title = category[0];
                    ("title:", title);
                    
                    // Check "main corpora" or first corporas in "folders" in category[2]
        
                    if (category[2]) {
                        
                        const hasSelected = Object.keys(selected).some(corpusId =>
                            Object.keys(category[2]).includes(corpusId.toString())
                          );
                          (hasSelected);
                        if (hasSelected) {
                            (title);
                            initialExpanded[title] = true;
                        }
                    }
                    
                    // Check subcorpora in category[3]?.subcorpora (using UUIDs now)
                    if (category[3]?.subcorpora) {
                        Object.values(category[3].subcorpora).forEach(subcategory => {
                            const subTitle = subcategory[0];
                            const subId = subcorporaIds[subTitle]; // Get UUID for this subcorpora
                            if (subcategory[2]) {

                                const hasSelected = Object.keys(selected).some(corpusId =>
                                    Object.keys(subcategory[2]).includes(corpusId.toString())
                                  );
                                if (hasSelected) {
                                    initialExpanded[title] = true; // Expand parent
                                    initialExpanded[subId] = true; // Expand subcategory using UUID
                                }
                            }
                        });
                    }
                });
                (initialExpanded);
                return initialExpanded;
            };


    useEffect(() => {
        if (show) {
            
            // Handle both array and object formats from context, could be a string when only one selected, which is a list :)
            if (corporas.corporas){
            findAndSetExpanded(testdata, corporas.corporas)
            }
        }
        
    }, [show]);

    const matchesSearch = (text) => {
        if (!searchQuery) return true;
        return text.toLowerCase().includes(searchQuery.toLowerCase());
    };

    const toggleExpanded = (id) => {
        setExpanded(prev => ({ //Basically copies the existing states and then toggles the specified title.
            ...prev,
            [id]: !prev[id], // Now works with either title or UUID
        }));
    };

    const handleCorpusClick = (corpusId, corpusLabel) => {
        let newSelection;
        if(corpusId in selectedCorpora){
            const {[corpusId]: _ , ...newState} = selectedCorpora;
            newSelection = newState;
        } else {       
            newSelection = {...selectedCorpora, [corpusId]: corpusLabel};
        }

        setSelectedCorpora(newSelection);

        updateCorporas({
            ...corporas,
            corporas: newSelection //If only one corpus, store as single value, otherwise array
        });
        console.log(corporas.corporas);

    };

    const handleSelectAllCorpora = (e, sectionTitle) => {
        e.stopPropagation(); // Prevent toggle on header click
    
        const category = Object.values(testdata).find(cat => cat[0] === sectionTitle);
        if (!category) return;
    
        const sectionCorpora = {};
    
    //Here we retrieve all main corporas    
        if (category[2]) {
            Object.entries(category[2]).forEach(([id, value]) => {
                const label = Array.isArray(value) ? value[0] : value;
                sectionCorpora[id] = label;
            });
        }
        

        // This is for subcorporas, we currently dont have this in the structure but it should (hopefully) work if we add it.
        if (category[3]?.subcorpora) {
            Object.values(category[3].subcorpora).forEach(sub => {
                if (sub[2]) {
                    Object.entries(sub[2]).forEach(([id, value]) => {
                        const label = Array.isArray(value) ? value[0] : value;
                        sectionCorpora[id] = label;
                    });
                }
            });
        }

        // We check if all are selected within the category/title, so it works like a toggle button.
        const allSelected = Object.keys(sectionCorpora).every(id => id in selectedCorpora);
    
        let newSelection;
        //This is the "toggle statement" so you can also unselect all within a category/title.
        if (allSelected) {
            newSelection = { ...selectedCorpora };
            Object.keys(sectionCorpora).forEach(id => {
                delete newSelection[id];
            });
        } else {
            newSelection = {
                ...selectedCorpora,
                ...sectionCorpora
            };
        }
    
        setSelectedCorpora(newSelection);
        updateCorporas({
            ...corporas,
            corporas: newSelection
        });
    };
    
    

    const renderCorpusSection = (e) => {
        const title = e[0];
        const desc = e[1]?.swe || e[1] || ''; //In some corporas there swedish text with .swe
        const testDict = {};
        const hasSubcorpora = e[3]?.subcorpora;
    
        if (e[2]) { //e[2] is corporas that are placed in the folder/main corpora
            Object.entries(e[2]).forEach(([key, value]) => {
                const label = Array.isArray(value) ? value[0] : value;
                if (matchesSearch(label) || matchesSearch(title)) {
                    testDict[key] = label;
                }
            });
        }
    
        // Check if section should be visible
        const hasVisibleContent = 
            Object.keys(testDict).length > 0 || 
            (hasSubcorpora && hasVisibleSubcorpora(e[3].subcorpora));
    
        if (!hasVisibleContent && searchQuery) return null;
    
        // Force expand if searching and has visible content
        const shouldForceExpand = searchQuery && hasVisibleContent;
        const isExpanded = shouldForceExpand || expanded[title];


        //All below is so the toggle button(Form.check) relies on state rather than clicking.
        const allCorporaIdsInSection = [];

        //All main corpora ids
        if (e[2]) {
            for (const id in e[2]) {
                allCorporaIdsInSection.push(id);
            }
        }

        // All subcorpora ids, if there is any
        if (e[3] && e[3].subcorpora) {
            const subcorpora = Object.values(e[3].subcorpora); // array of subcorpora (this is the subcategory, a collection of corporas if u will)

            for (const sub of subcorpora) {
                if (sub[2]) { // sub[2] is the list of corporas in the subcorpora.
                    for (const id in sub[2]) {
                        allCorporaIdsInSection.push(id); // push each subcorpora in to the list.
                    }
                }
            }
        }

        // Check if all are selected
        const allSelected = allCorporaIdsInSection.length > 0 &&
            allCorporaIdsInSection.every(id => id in selectedCorpora);

    
        {/*Each main corpora*/}
        return (
            <div key={title} className="corpus-section">
                <div className="section-header" onClick={() => toggleExpanded(title)}>
                    <Form.Check 
                    className="section-checkbox"
                    checked={allSelected}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleSelectAllCorpora(e, title)}
                    />

                    {isExpanded ? <CircleArrowDown size={16} /> : <CircleArrowRight size={16} />}
                    <h5>{highlightSearchMatch(title)}</h5>
                </div>
                {/*If we expand we should show description if there is one, as well as all subcorps*/}
                {isExpanded && (
                    <div className="section-content">
                        {desc !== "No description" && <p className="section-description">{desc}</p>}
                        
                        {Object.keys(testDict).length > 0 && (
                            <div className="corpus-grid">
                                {Object.entries(testDict).map(([id, label]) => (
                                    <div
                                        key={id}
                                        className={`corpus-item ${id in selectedCorpora ? "selected" : ""}`}
                                        onClick={() => handleCorpusClick(id, label)}
                                    >
                                        <span>{highlightSearchMatch(label)}</span>
                                        {id in selectedCorpora && <span className="checkmark">✓</span>}
                                    </div>
                                ))}
                            </div>
                        )}
                        {/*Send all subcorporas for mapping*/}
                        {hasSubcorpora && renderSubcorpora(e[3].subcorpora)}
                    </div>
                )}
            </div>
        );
    };

    // Checks for visible subcorpora
    const hasVisibleSubcorpora = (subcorporaData) => {
        return Object.values(subcorporaData).some(subcorpora => {
            const subTitle = subcorpora[0];
            const subDict = {};
            
            if (subcorpora[2]) {
                Object.entries(subcorpora[2]).forEach(([key, value]) => {
                    const label = Array.isArray(value) ? value[0] : value;
                    if (matchesSearch(label) || matchesSearch(subTitle)) {
                        subDict[key] = label;
                    }
                });
            }
            
            return Object.keys(subDict).length > 0;
        });
    };

    //Maps out all subcorporas (now using UUIDs)
    const renderSubcorpora = (subcorporaData) => {
        return Object.entries(subcorporaData).map(([subcorporaName, subcorpora]) => {
            const subTitle = subcorpora[0];
            const subDesc = subcorpora[1]?.swe || subcorpora[1] || ''; //In some corporas there swedish text with .swe and english with .eng
            const subId = subcorporaIds[subTitle]; // Get UUID for this subcorpora
            const subCorporaDict = {};
            
            if (subcorpora[2]) {//corporas in subcorporas
                
                Object.entries(subcorpora[2]).forEach(([key, value]) => {
                    const label = Array.isArray(value) ? value[0] : value;
                    if (matchesSearch(label) || matchesSearch(subTitle)) {
                        subCorporaDict[key] = label;
                    }
                });
            }
    
            if (Object.keys(subCorporaDict).length === 0 && searchQuery) return null;
    
            // Expand if searching and has content
            const shouldForceExpand = searchQuery && Object.keys(subCorporaDict).length > 0;
            const isExpanded = shouldForceExpand || expanded[subId]; // Use UUID for expansion tracking
    
            return (
                <div key={subId} className="subcorpus-section"> {/* Use UUID as key */}
                    <div 
                        className="section-header subcorpus-header"
                        onClick={() => toggleExpanded(subId)} 
                    >
                        {isExpanded ? <CircleArrowDown size={16} /> : <CircleArrowRight size={16} />}
                        <h6>{highlightSearchMatch(subTitle)}</h6>
                    </div>
                    
                    {isExpanded && (
                        <div className="subcorpus-content">
                            {subDesc !== "No description" && <p className="section-description">{subDesc}</p>}
                            <div className="corpus-grid">
                                {Object.entries(subCorporaDict).map(([id, label]) => (
                                    <div
                                        key={id}
                                        className={`corpus-item ${id in selectedCorpora ? "selected" : ""}`}
                                        onClick={() => handleCorpusClick(id, label)}
                                    >
                                        <span>{highlightSearchMatch(label)}</span>
                                        {id in selectedCorpora && <span className="checkmark">✓</span>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            );
        });
    };

    // Highlights search matches
    const highlightSearchMatch = (text) => {
        if (!searchQuery) return text;
        
        const index = text.toLowerCase().indexOf(searchQuery.toLowerCase());
        if (index === -1) return text;
        
        const before = text.substring(0, index);
        const match = text.substring(index, index + searchQuery.length); // Cuts only to the end of the matching word.
        const after = text.substring(index + searchQuery.length);
        
        return (
            <>
                {before}
                <span className="search-highlight">{match}</span> {/*This class is highlighted in the css*/}
                {after}
            </>
        );
    };

    return (
        <Modal show={show} onHide={onHide} centered size="lg">

            <Modal.Header>
                <Modal.Title>Välj korpus</Modal.Title>
                <div className="ms-auto">
                    <Button 
                    variant="success" 
                    onClick={onHide}
                    className="p-0"
                    >
                    <Check size={24} />
                    </Button>
                </div>
                </Modal.Header>

            
            <Modal.Body>
                <div className="search-bar">
                    <div className="search-input-container">
                        <Search size={18} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Sök korpus..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                        {searchQuery && (
                            <button 
                                className="clear-search" 
                                onClick={() => setSearchQuery('')}
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>
                </div>

                {selectedCorpora ? (Object.keys(selectedCorpora).length > 0 ? (
                    <div>
                        <span className="selected-count">
                        {Object.keys(selectedCorpora).length} {Object.keys(selectedCorpora).length === 1 ? "vald" : "valda"}
                        </span>
                        <div className="selected-values-container">
                            {Object.values(selectedCorpora).map(corpus => <p className="selected-values">{corpus} |</p>)}
                        </div>
                        <Button 
                            variant="link" 
                            onClick={() => {
                                setSelectedCorpora([]);
                                setExpanded({});
                                updateCorporas({ ...corporas, corporas: null });
                            }}
                            size="sm"
                        >
                            Avmarkera alla
                        </Button>
                    </div>
                ) : (
                    <div className="empty-selection">Ingen vald korpus</div>
                )): (<div className="empty-selection">Ingen vald korpus</div>)}
                
                <div className="corpus-container">
                    {Object.values(testdata).map(renderCorpusSection)}
                    {searchQuery && Object.values(testdata).filter(e => {
                        const title = e[0];
                        const hasContent = renderCorpusSection(e) !== null;
                        return hasContent || matchesSearch(title);
                    }).length === 0 && (
                        <div className="no-results">Ingen korpus hittad</div>
                    )}
                </div>
            </Modal.Body>
        </Modal>
    );
}