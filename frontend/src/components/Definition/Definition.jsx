import { useEffect, useState } from 'react';
import { getDefintion } from '../../services/getDefinition';
import './Definition.css'
//import { Button } from 'react-bootstrap';
import { ChevronDown, ChevronRight } from 'lucide-react'

export default function Definition({wordEntry}) {

    const [wordData, setWordData] = useState([{}]);
    const [expandDef, setExpandDef] = useState(true);
    //const [wordInput, setWordInput] = useState("");

    const toggleDefExpand = () => {
        setExpandDef(prev => !prev);
    }

    useEffect(() => {
        getDefintion(wordEntry)
            .then(r => {
                //console.log('Full Response', r);
                // We can add ordklass and stuff if we want to, it's a bit harder to parse.

                if (r.total === 0) {
                    setWordData([{
                            id: 0,
                            word: "",
                            definition: "Ordet finns inte i ordboken",
                            examples: ""
                    }]);
                } 

                let finalArray = [];
                for (let i = 0; i < 3; i++) {
                    if (r.hits[i]){
                        let firstEntry = r.hits[i];
                        let defObj = firstEntry.entry.sense
                        let defEntry = defObj.definition ? defObj.definition.text : 'Meningen saknas i ordboken!'
                        let exampleObj = defObj.examples;
                        let swedishExamples = exampleObj?.filter(ex => 
                            ex.type === "example" && ex.lang === "swe");
                        
                        finalArray.push(
                            {
                                id: i,
                                word: wordEntry,
                                definition: defEntry,
                                examples: swedishExamples
                            }
                        )
                    }
                }

                setWordData(finalArray);
            })
            .catch(e => console.log('error', e));
    }, [wordEntry]);

    const getExamples = (examples) => {
        if(examples) {
            for( let ex of examples) {
                return <p className='defintion__example'>{ex.text}</p>
            }
        }
    }

    return (
        <>
            {/* <p>Dictionary Test</p>
            <input type="text" 
                onChange={(e) => setWordInput(e.target.value)}/>
            <Button onClick={() => handleClick(wordInput)}>Search</Button> */}
            <div className="corpus-group">
            <div className="corpus-header-defintion" 
                onClick={toggleDefExpand}>
            {expandDef ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                <span className="corpus-name">Lexin ordbok: {wordEntry}</span>
                <span className="corpus-count"></span>
            </div>
            {expandDef && <div className="results-table">
                  <div className='defintion__container'>
                    {
                    wordData.map(w => {
                        
                        if (Object.keys(w).length > 0) {
                        return (<div key={w.id} className='defintion__label'>
                        <p className='defintion__defintion'><span className='defintion__number'>{w.id + 1}</span> {w.definition}</p>
                        {getExamples(w.examples)}
                        </div>)
                        } else {
                            return <p key={0} className='defintion__defintion'>Inga Resultat!</p>;
                        }
                    })}
                    <a href={`https://lexin.nada.kth.se/lexin/#searchinfo=both,swe_swe,${wordEntry};`} 
                        target="_blank" rel="noopener noreferrer">Lexin ordbok för fler betydelser och exempel.</a>
                  </div>
            </div>
            }
            </div>
        </>
    );
}