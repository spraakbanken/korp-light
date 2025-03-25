import { Accordion } from "react-bootstrap";

import testdata from '../../services/testdata.json'

import './CorpusSelector.css'
import { useEffect, useState } from "react";

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
                    //we have to use a different way to get ID! uuid package?
                    const subcorpId = crypto.randomUUID()
                    subcorporaList[subcorpId]= generateCorpusSelector(el2);
                })
            }); 
        }
        
        function renderSubcorpora (id, elem) {
            return (<Accordion.Body key={id}>
                    <Accordion> 
                        {elem}
                    </Accordion>
                </Accordion.Body>);
        }

        return (
             
                <Accordion>
                    <Accordion.Header>{title}</Accordion.Header>
                    <Accordion.Body className="corpus__desc">{desc}</Accordion.Body>
                    {Object.entries(testDict).map(([key, corpus]) => 
                        <Accordion.Body 
                        onClick={ e2 => handleCorpusClick(e2, key, corpus) }
                        className="corpus__labels" 
                        corpus={key}
                        key={key}>
                                {corpus}
                        </Accordion.Body>)}
                        {Object.entries(subcorporaList).map(([id, elem]) => 
                            renderSubcorpora(id, elem)
                        )}
                </Accordion>
            
        );
    }

    const [selectedCorpora, setSelectedCorpora] = useState([{}]);

    const handleHeaderClick = (e) => {
       console.log(e.target);
    }    
    const handleCorpusClick = (e, corpusID, corpusLabel) => {
        const pickedCorpus = e.target.getAttribute('corpus')
        
        console.log('Corpus Label: ', corpusLabel, 'Corpus ID: ', corpusID)
        let newDict = {}
        newDict.corpusID = corpusID
        newDict.corpusLabel = corpusLabel
        if (selectedCorpora.includes(pickedCorpus)) {
            setSelectedCorpora(selectedCorpora.filter(c => c !== pickedCorpus))
        } else {
            setSelectedCorpora([...selectedCorpora, newDict])
        }
        
    }   

    useEffect(() => {
        console.log('selected corpora: ', selectedCorpora)
    }, [selectedCorpora])

    return (
        <>
        
            <Accordion alwaysOpen='false'>
                {Object.values(testdata).map((k) => {
                    return generateCorpusSelector(k)
                })}
            </Accordion>
           
        </>
    );
}