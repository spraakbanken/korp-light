import axios from 'axios';

import server_config from './server_config.js';

// Sample Axios Code
// Using Promises, Write a function for each endpoint
const axios_instance = axios.create({
  baseURL: server_config.pl_korp_api,
});

function getCorpusInfo(corpus='bnc-100k') {

  const params = {
    "corpus" : String(corpus),
  }
  
  axios_instance
    .get('/info', {params})
    .then(res => console.log(res.data))
    .catch(err => console.error(err));
}

// sample result, remove later
getCorpusInfo('bnc-100k');

// Parse all queries from react to send to server
// We can build cqp here if we want or in the React component
function getQuery(params) {
  console.log('query not implemented');
}

// See korp web-api for complete api calls to implement and parse
