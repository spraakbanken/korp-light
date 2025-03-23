import { Accordion } from "react-bootstrap";
import testdata from '../../services/testdata.json'

import './CorpusSelector.css'

function populateCorpus(e, onClickHandler) {
    let title = null;
    let desc = null;
    let corpora = [];
    let subcorporaList = [];
      
    let testDict = []

    title = e[0]
    desc = e[1].swe || e[1] || ''

    if (e[2] !== undefined) {
        let arr = Object.keys(e[2])   
        if (arr.length === 1) {
            corpora.push(arr.title)
        } else {
            Object.entries(e[2]).forEach((entry) => {
                const [key, value] = entry;

                testDict[key] = value
                //console.log('CORPUS ID ', key, 'NAME ', value)
            if (Array.isArray(value) ) {
                corpora.push(value[0])   
            } else {
                corpora.push(value)
            }
            })
        }
    }
    
    if (e[3] !== undefined) {
        Object.values(e[3]).forEach((el) => {
            Object.values(el).forEach((el2) => {
                subcorporaList.push(populateCorpus(el2));
            })
        });
    }

    return (
        <Accordion.Item eventKey={Math.random()}>
                <Accordion.Header>{title}</Accordion.Header>
                {desc ? <Accordion.Body className="corpus__desc">{desc}</Accordion.Body> : null}
                {corpora.map((corpus) => 
                    <Accordion.Body 
                    onClick={(e) => onClickHandler(e, 'hello!')} 
                    className="corpus__labels" 
                    key={Math.random()}>
                        {corpus}
                    </Accordion.Body>)}
                {subcorporaList.map(elem => 
                    <Accordion.Body key={Math.random()}>
                        <Accordion>
                        {elem}
                        </Accordion>
                    </Accordion.Body>)}
        </Accordion.Item>
    );
}

export default function CorpusSelector() {

    function onClickHandler(e, corpusData) {
        console.log('CLICKED', corpusData)
    }

    return (
        <>
            <Accordion>
                {Object.values(testdata).map((k) => {
                    return populateCorpus(k, onClickHandler)
                })}
            </Accordion>
        </>
    );
}