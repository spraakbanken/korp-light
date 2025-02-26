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
    console.log(error);
  }
}

export function toggleAPI(which_server) {
  const servers = [
    {id: 0, value: server_config.pl_korp_api},
    {id: 1, value: server_config.sb_korp_api},
  ];

  axios_instance.baseURL = servers[which_server].value
  console.log(axios_instance.baseURL)
}

// sample result, remove later
//getCorpusInfo('bnc-100k');

// Parse all queries from react to send to server
// We can build cqp here if we want or in the React component
function getCorpusQuery(params) {
  console.log('query not implemented');
}

// See korp web-api for complete api calls to implement and parse
