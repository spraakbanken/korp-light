import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import ResultsPanel from "../../components/ResultsPanel/ResultsPanel.jsx";

import NavigationBar from "../../components/NavigationBar/NavigationBar.jsx";
import { useQuery } from "@tanstack/react-query";

import { getCorpusInfo } from "../../services/api.js";
import { useEffect, useState } from "react";

import mockResults from './mockResults.json' with {type: 'json'};
import SearchBar from "../../components/SearchBar/SearchBar.jsx";

export default function ResultsPage() {

    const [corpus, setCorpus] = useState("bnc-100k");
    const [queryData, setQueryData] = useState({});
    const [isDataLoaded, setIsDataLoaded] = useState(false); 

    const {data = [], isLoading, error, refetch} = useQuery({
        queryKey: [corpus],
        queryFn: () => getCorpusInfo(corpus),
        enabled: false,
    });

    function getCorpusData(data) {
        console.log("CORPUS JSON: ", data["corpora"]);
    }

    // useEffect(() => {
    //     console.log("used effect");
    // }, [queryData]);

    function getQueryData(indata) {
        //need temp variable for this to work.
        const res = indata.data;
        setQueryData(res); 
        
        console.log("indata: ", indata);
        console.log("QUERY: ", queryData.kwic);
    }

    return(
        <>
            <NavigationBar />
            <h1 className="mt-5">Results</h1>
            <p>Display Results on this page!</p>
            
            <input type="text" placeholder="corpus name, e.g. ROMI"
                onChange={(e) => setCorpus(e.target.value)}/>

            <Button className="simple-button m-1" 
                    variant="danger" 
                    size="sm"
                    onClick={() => {refetch(); getCorpusData(data)}}>
                    Switch Corpus!
            </Button>
            
            <Link to={"/"}>
                <Button className="simple-button m-1" 
                    variant="danger" 
                    size="sm"
                    onClick={null}>
                    Take me back!
                </Button>
            </Link>

            <div> 
                <p>Selected Corpus: </p>
                {isLoading? <p>Loading...</p> : 
                    JSON.stringify(data.corpora)}
            </div>    

            <SearchBar returnQueryData={getQueryData}/>

            <div className="mt-5">
                {/*queryData.kwic == undefined ? <p>Loading...</p> : JSON.stringify(queryData) */}
                {queryData.kwic === undefined ? <p>Loading...</p> : 
                    <ResultsPanel response={queryData} />}
            </div>
        </>
    );
}