import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import ResultsPanel from "../../components/ResultsPanel/ResultsPanel.jsx";

import NavigationBar from "../../components/NavigationBar/NavigationBar.jsx";
import { useQuery } from "@tanstack/react-query";

import { getCorpusInfo, getCorpusQuery } from "../../services/api.js";
import { useContext, useEffect, useState } from "react";
import SettingsContext from "../../services/SettingsContext.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import ProgressBar from "../../components/ProgressBar/ProgressBar.jsx"; 
import "./ResultPage.css"


export default function ResultsPage() {

    const { settings, updateSettings } = useContext(SettingsContext);
    const [corpus, setCorpus] = useState("bnc-100k");
    const [corpusInput, setCorpusInput] = useState("bnc-100k");
    const [searchWordInput, setSearchWordInput] = useState('');

    const [queryData, setQueryData] = useState({});

    const 
        {  data      : searchCorpusData = [], 
           isLoading : searchCorpusIsLoading, 
           refetch   : searchCorpusRefetch,
        } = useQuery({
        queryKey: [corpusInput],
        queryFn: () => getCorpusInfo(corpusInput),
        enabled: false,
    });

    const 
        {  data      : searchQueryData = [], 
           isLoading : searchQueryIsLoading, 
           refetch   : searchQueryRefetch,
        } = useQuery({
        queryKey: [searchWordInput],
        queryFn: () => getCorpusQuery(searchWordInput),
        enabled: false,
    });

    function getCorpusData(data) {
        const langs = data.corpora
        let current_corpora = []
        for (const lang in langs) {
            //add error checking for corpora not existing?
            current_corpora = current_corpora + " " + (data.corpora[lang]['info']['Name'])
        }
        setCorpus(`[ ${current_corpora} ]`)
    }
    
    useEffect(() => {
        if(searchWordInput){



            searchQueryRefetch().then((res) => {
                console.log(res.data)
                setQueryData(res.data);
                
            });

            

            console.log("CHANGED: ", searchWordInput)
        }

    }, [searchWordInput, searchQueryRefetch])

    
    useEffect(() => {
        console.log("Settings in Results: ", settings);
    }, [settings])

    return(
        <div>
            <NavigationBar />
            <h1 className="mt-5 results-header">Resultat</h1>
            
            <input type="text" placeholder="corpus name, e.g. ROMI"
                onChange={(e) => setCorpusInput(e.target.value)}/>

            <Button className="simple-button m-1" 
                    variant="danger" 
                    size="sm"
                    onClick={() => {
                        searchCorpusRefetch().then((res) => {
                            getCorpusData(res.data);
                        }); 
                    }}>
                    Byt Korpus!
            </Button>
            
            <Link to={"/"}>
                <Button className="simple-button m-1" 
                    variant="danger" 
                    size="sm"
                    onClick={null}>
                    Gå tillbaka!
                </Button>
            </Link>

            <div> 
                <p>Vald Korpus: </p>
                {searchCorpusIsLoading? <p>Laddar...</p> : corpus}
            </div>    

            <SearchBar returnSearchInput={(e) => {
                setSearchWordInput(e);
            }}/>

            <p>Söker efter: {searchWordInput}</p>

            <ProgressBar isLoading={searchQueryIsLoading} />

            <div className="mt-5">
                {/*queryData.kwic == undefined ? <p>Loading...</p> : JSON.stringify(queryData) */}
                {queryData.kwic === undefined ? <p>Laddar...</p> :
                    <ResultsPanel response={queryData} />}
            </div>
            <Footer/>
        </div>
    );
}