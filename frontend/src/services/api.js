import axios from 'axios';

import server_config from './server_config.js';

// Sample Axios Code
// Using Promises, Write a function for each endpoint
const axios_instance = axios.create({
  baseURL: server_config.sb_korp_api,
});

export async function getCorpusInfo(corpus='bnc-100k') {

  const params = {
    "corpus" : String(corpus),
  }

  try {
    const response = await axios_instance('/corpus_info', { params });
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    console.log("ERROR: ", error);
    return `ERROR: corpus: ${corpus} not found on local server! Did you build it?`;
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
export async function getCorpusQuery(params) {
  console.log('query not implemented');
}

export function getSearchInput(params) {
  console.log(params);
}

// See korp web-api for complete api calls to implement and parse
