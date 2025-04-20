import axios from 'axios';
//import qs from 'qs';

import { setHistory } from './history.js';
import queryParams from './queryParams.js';
import server_config from './server_config.js';

// Sample Axios Code
// Using Promises, Write a function for each endpoint
const axios_instance = axios.create({
  baseURL: server_config.pl_korp_api,
});


export async function getCorpusInfo(corpus='romi') {
  queryParams.corpus = corpus;

  try {
    const response = await axios_instance('/corpus_info', { 
        params: {corpus: corpus},
    });    
    return response.data;
  } catch (error) {
    console.log("getCorpusInfo ERROR: ", error);
    return `ERROR: corpus: ${corpus} not found on local server! Did you build it?`;
  }
}

export async function getCorpusCollections(collection='default') {
    try {
        const response = await axios_instance('/corpus_config');
        return response.data;
    } catch (error) {
        console.log("getCorpusCollections ERROR: ", error);
        return `ERROR: collection ${collection} not found!`
    }
}

export async function getCorpusCollectionsList(collection='default') {  
    try {
        const res = await getCorpusCollections(collection);
        let m = {}
        let modes = res.modes;
        for (let mode of modes) {
            let t = mode.label.swe;
            if (t) {
                m[t] = mode.mode;
            } else {
                m[mode.label] = mode.mode
            }
        }
        console.log('m: ', m)
        return m;
    } catch (error) {
        return `Error getting Corpus List: ${error}`;
    }
}


export function toggleAPI(which_server) {
  const servers = [
    {id: 0, value: server_config.pl_korp_api},
    {id: 1, value: server_config.sb_korp_api},
  ];

  axios_instance.defaults.baseURL = servers[which_server].value

}

// sample result, remove later
//getCorpusInfo('bnc-100k');

// Parse all queries from react to send to server
// We can build cqp here if we want or in the React component
export async function getCorpusQuery(inQuery) {

  console.log("inQuery", inQuery)
  queryParams.cqp = inQuery;

  const inputWords = inQuery.match(/"(.*?)"/g)
  try {
    const response = await axios_instance('/query', {params: queryParams});
    const currentUrl = window.location.search; 
    
    setHistory(inputWords, currentUrl);
    return response.data;
  } catch (error) {
    console.log("getCorpusQuery ERROR: ", error);
    return `ERROR: corpus: ${queryParams.corpus} not found on local server! Did you build it?`;
  }
}

export function buildQuery(params) {
  //Build the query here, assign it in the getCorpusQuery function.

  let buildAdvancedQuery = '';
  queryParams.default_within='sentence';
  console.log("params to buildQuery", params);
  
  params.forEach((w) => {
    if (w.tag === "Grundform") {
      buildAdvancedQuery = buildAdvancedQuery + `[lemma contains "${w.wordEntry}"] `
      
  } else if (w.tag === "Ordform") {
          buildAdvancedQuery = buildAdvancedQuery + `[word = "${w.wordEntry}"] `
      }
  })
  


  /* if (params !== null && typeof params === 'object'){
    if (Object.keys(params).length > 0){
      params.map((w) => {
          if (w.tag === "Grundform") {
          buildAdvancedQuery = buildAdvancedQuery + `[lemma contains "${w.wordEntry}"] `
          
      } else if (w.tag === "Ord") {
              buildAdvancedQuery = buildAdvancedQuery + `[word = "${w.wordEntry}"] `
          }
      })
      }
  }else{
    buildAdvancedQuery = `[word = "${params}"]`
  } */
  const finalQuery = buildAdvancedQuery.trim(); // trims trailing space

  
  console.log('finalQuery from buildQuery', finalQuery);
  return finalQuery;
}

export async function getStatisticsOverTime(word, wordClass) {
    console.log('Getting statistics for ', word, wordClass);
    
    queryParams.cqp = `[lex contains "${word}\\.\\.${wordClass}\\.1"]`
    
    try {
        const response = await axios_instance('/count_time', {params: queryParams});
        console.log('statistics response', response.data);
        return response.data;
    } catch(error) {
        console.log("getStatisticsOverTime ERROR: ", error);
        return `ERROR: statistics: ${word} not found!`;
    }

}

// See korp web-api for complete api calls to implement and parse
