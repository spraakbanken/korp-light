import { Accordion } from "react-bootstrap";
import testdata from '../../services/testdata.json'

function populateCorpus(e) {
    let title = null;
    let desc = null;
    let corpora = [];
    let subcorporaList = [];
      
    title = e[0]
    desc = e[1].swe || e[1] || ''

    if (e[2] !== undefined) {
        let arr = Object.keys(e[2])   
        if (arr.length === 1) {
            corpora.push(arr.title)
        } else {
            Object.values(e[2]).forEach(corpus => {
            if (Array.isArray(corpus) ) {
                //console.log('CORPUS 1: ', corpus[0]) 
                corpora.push(corpus[0])   
            } else {
                //console.log('CORPUS 2: ', corpus)
                corpora.push(corpus)
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
                {desc ? <Accordion.Body>{desc}</Accordion.Body> : null}
                {corpora.map(corpus => 
                    <Accordion.Body key={Math.random()}>
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
    return (
        <>
            <Accordion>
                {Object.values(testdata).map((k) => {
                    return populateCorpus(k)
                })}
            </Accordion>
        </>
    );
}