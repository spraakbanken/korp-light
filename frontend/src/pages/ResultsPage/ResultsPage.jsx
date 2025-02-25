import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

import NavigationBar from "../../components/NavigationBar/NavigationBar.jsx";
import { useQuery } from "@tanstack/react-query";

import { getCorpusInfo } from "../../services/api.js";
import { useState } from "react";

export default function ResultsPage() {

    const [corpus, setCorpus] = useState("bnc-100k");

    const {data = [], isLoading} = useQuery({
        queryKey: [corpus],
        queryFn: () => getCorpusInfo(corpus)
    });

    return(
        <>
            <NavigationBar />
            <h1 className="mt-5">Results</h1>
            <p>Display Results on this page!</p>
            
            <Button className="simple-button m-1" 
                    variant="danger" 
                    size="sm"
                    onClick={null}>
                    Test React Query!
            </Button>
            
            <Link to={"/"}>
                <Button className="simple-button m-1" 
                    variant="danger" 
                    size="sm"
                    onClick={null}>
                    Take me back!
                </Button>
            </Link>

            <div className="mt-5">
                {isLoading ? <p>Loading...</p> : JSON.stringify(data)}
            </div>
        </>
    );
}