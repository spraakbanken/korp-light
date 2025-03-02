import axios from 'axios';
//import qs from 'qs';

import queryParams from './queryParams.js';
import server_config from './server_config.js';

// Sample Axios Code
// Using Promises, Write a function for each endpoint
const axios_instance = axios.create({
  baseURL: server_config.sb_korp_api,
});

export async function getCorpusInfo(corpus='bnc-100k') {

  queryParams.corpus = corpus;
  console.log(queryParams);

  try {
    const response = await axios_instance('/corpus_info', { 
        params: queryParams,
    });
    console.log("CORPUS RESPONSE: ", response.data);
    
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
  
  queryParams.cqp = buildQuery(inQuery);
   
  try {
    const response = await axios_instance('/query', {params: queryParams});
    console.log(queryParams);
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    console.log("getCorpusQuery ERROR: ", error);
    return `ERROR: corpus: ${queryParams.corpus} not found on local server! Did you build it?`;
  }
}

export function buildQuery(params) {
  //Build the query here, assign it in the getCorpusQuery function.
    // this doesnt work yet, we can only search one word for now.  
    // const cqpParams = {
    //     'word': String(params),
    // }
    // const result = qs.stringify(cqpParams);
    
    const result = `[word="${params}"]`;
    return result;
}

// See korp web-api for complete api calls to implement and parse
