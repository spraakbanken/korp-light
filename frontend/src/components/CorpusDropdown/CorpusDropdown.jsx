import "./CorpusDropdown.css";
import Dropdown from "react-bootstrap/Dropdown";
import CircleButton from "../CircleButton/CircleButton";
import testdata from '../../services/testdata.json';
import { useEffect, useState } from "react";

export default function CorpusDropDown({ colour, buttonLogo }) {
    const [selectedCorpora, setSelectedCorpora] = useState([]);

    const handleCorpusClick = (corpusId) => {
        if (selectedCorpora.includes(corpusId)) {
            setSelectedCorpora(selectedCorpora.filter(c => c !== corpusId));
        } else {
            setSelectedCorpora([...selectedCorpora, corpusId]);
        }
    };

    const renderCorpusSelector = (e) => {
        const title = e[0];
        const desc = e[1]?.swe || e[1] || '';
        const corpora = [];
        const subcorporaList = [];

        const testDict = {};

        if (e[2]) {
            Object.entries(e[2]).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    corpora.push(value[0]);
                    testDict[key] = value[0];
                } else {
                    corpora.push(value);
                    testDict[key] = value;
                }
            });
        }

        if (e[3]) {
            Object.values(e[3]).forEach((nested) => {
                Object.values(nested).forEach((sub) => {
                    const subId = crypto.randomUUID();
                    subcorporaList.push({
                        id: subId,
                        content: renderCorpusSelector(sub)
                    });
                });
            });
        }

        return (
            <div key={title}>
                <Dropdown.Header>{title}</Dropdown.Header>
                {desc && <div className="corpdesc px-3">{desc}</div>}

                {Object.entries(testDict).map(([id, label]) => (
                    <Dropdown.Item
                        key={id}
                        onClick={() => handleCorpusClick(id)}
                        className="corpus__labels"
                        active={selectedCorpora.includes(id)}
                    >
                        {label}
                    </Dropdown.Item>
                ))}

                {subcorporaList.map((sub) => (
                    <div key={sub.id}>{sub.content}</div>
                ))}
            </div>
        );
    };

    useEffect(() => {
        console.log("Selected corpora: ", selectedCorpora);
    }, [selectedCorpora]);

    return (
        <Dropdown className="corpus_bar" drop="down-centered">
            <Dropdown.Toggle id="dropdown-basic">
                <CircleButton buttonColour={colour} buttonImage={buttonLogo} />
                {selectedCorpora.length > 0 && ` ${selectedCorpora.length} valda`}
            </Dropdown.Toggle>

            <Dropdown.Menu id="dropdown-menu">
                <div className="dropdown-header">
                    <button
                        className="btn btn-sm btn-light"
                        onClick={() => setSelectedCorpora([])}
                    >
                        Avmarkera alla
                    </button>
                </div>

                {Object.values(testdata).map((e, index) => renderCorpusSelector(e))}
            </Dropdown.Menu>
        </Dropdown>
    );
}
