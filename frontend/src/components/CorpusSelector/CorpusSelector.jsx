import { Accordion } from "react-bootstrap";

import testdata from '../../services/testdata.json'

function populateCorpus(e) {
    let title = null;
    let desc = null;
    let corpora = [];

    console.log('e is', e)
    console.log('TITLE: ', e[0])
    console.log('DESCRIPTION', e[1].swe || e[1])
      
    title = e[0]
    desc = e[1].swe || e[1]

    if (e[2] !== undefined) {    
        if (e[2].length === 1) {
            console.log('SINGULAR CORPUS IS: ', e[2])
            corpora.push(e[2])  
        } else {
            Object.values(e[2]).forEach(corpus => {
            if (Array.isArray(corpus) ) {
                console.log('CORPUS: ', corpus[0]) 
                corpora.push(corpus[0])   
            } else {
                console.log('CORPUS: ', corpus)
                corpora.push(corpus)
            }
            })
        }
    }
    
    if (e[3] !== undefined) {
        console.log('\nSUBCORPORA')
        Object.values(e[3]).forEach(() => {
             singularElement => populateCorpus(singularElement);}
        );
    }

    return (
        <Accordion.Item eventKey={Math.random()}>
                <Accordion.Header>{title}</Accordion.Header>
                {desc ? <Accordion.Body>{desc}</Accordion.Body> : null}
                <hr/>
                {corpora.map(corpus => <Accordion.Body key={Math.random()}>{corpus}</Accordion.Body>)}
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
                <Accordion.Item eventKey="100">
                    <Accordion.Header>Hello</Accordion.Header>
                    <Accordion.Body>This field has more drop downs!</Accordion.Body>
                    <Accordion.Body>
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Hello Again</Accordion.Header>
                                <Accordion.Body>Description 2</Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Hello Again</Accordion.Header>
                                <Accordion.Body>Description 2</Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Hello Again</Accordion.Header>
                                <Accordion.Body>Description 2</Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );
}