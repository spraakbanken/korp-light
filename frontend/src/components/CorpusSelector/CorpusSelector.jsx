import { Accordion } from "react-bootstrap";
import testdata from '../../services/testdata.json'

import './CorpusSelector.css'

export default function CorpusSelector() {

    function generateCorpusSelector(e) {
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
                    testDict[key] = value[0]   
                } else {
                    corpora.push(value)
                    testDict[key] = value
                }
                })
            }
        }
        
        if (e[3] !== undefined) {
            Object.values(e[3]).forEach((el) => {
                Object.values(el).forEach((el2) => {
                    subcorporaList.push(generateCorpusSelector(el2));
                })
            }); 
        }
    
        return (
            <Accordion.Item eventKey={Math.random()}>
                    <Accordion.Header>{title}</Accordion.Header>
                    {desc ? <Accordion.Body className="corpus__desc">{desc}</Accordion.Body> : null}
                    {corpora.map((corpus) => 
                        <Accordion.Body 
                        onClick={e => handleClick(e, testDict)} 
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
    

    const handleClick = (e, corpusData) => {
        const pickedCorpus = Object.keys(corpusData)
            .find(o => corpusData[o] === e.target.innerText)
        console.log('Corpus id: ', pickedCorpus)
    }   

    return (
        <>
            <Accordion>
                {Object.values(testdata).map((k) => {
                    return generateCorpusSelector(k)
                })}
            </Accordion>
        </>
    );
}