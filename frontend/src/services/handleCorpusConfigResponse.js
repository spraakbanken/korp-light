import selectedItems from "../components/CorpusDropdown.jsx"
import { getCorpusQuery } from "./api";
import queryParams from "./queryParams.js";


const corpusQueryBuild = (cString)  =>{
    const chosenCorpusString = Array.from(selectedItems).join(',');

    queryParams.corpus = chosenCorpusString; // is it bad to use global?
    getCorpusQuery(cString);

};



