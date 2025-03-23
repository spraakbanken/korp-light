// gets the "master corpus" which we use for corpus dropdown
// will have to refactor later kupo


// getMasterCorpus calls ?corpus_config from korp webapi 
// it returns an ARRAY with 4 elements 
// [NAME, DESCRIPTION, CORPORA, SUBCORPORA]
// CORPORA in turn is an ARRAY of [NAME, DESCRIPTION for EACH CORPUS]]
// SUBCORPORA contains again NAME, DESCRIPTION AND CORPORA
// Check testdata.json to see how the response looks like.

import fs from 'fs';

async function handleCorpusCategories(data) {

  let masterCorpus = {}
  async function getName(c) {
    let transformedList = {}
    console.log("\nTransforming corpora: ", c)
    if (c) {
      for (const i of Object.values(c)) {
        console.log('Transforming corpus: ', i)
        if (typeof data.corpora[i].title === 'string') {
          transformedList[i] = data.corpora[i].title
        } else {
          let corpusList = []
          for (const v of Object.values(data.corpora[i].title)) {
            console.log('Corpus title: ', v)
            corpusList.push(v)
          }
            transformedList[i] = corpusList
        }   
      }
    }
    console.log('Lists: ', transformedList)
    return transformedList;
  }
    
  if (data.folders) {
    for (const [_, [k, v]] of Object.entries(Object.entries(data.folders))) {
      //console.log(v)
      masterCorpus[k] = [
        v.title.swe || v.title || undefined , 
        v.description || 'No description',
        await getName(v.corpora) || undefined]
      
      
      
        if ('subfolders' in v) { 
        let temp = {}       
        for (const [k2, v2] of Object.entries(v.subfolders)) {
          temp[k2] = [
             v2.title.swe || v2.title || undefined,
             v2.description || 'No description', 
             await getName(v2.corpora) || undefined]
            }
            masterCorpus[k].push({subcorpora: temp})
      }
    }
  }
  return masterCorpus
}

async function getMasterCorpus() {

  fetch('https://ws.spraakbanken.gu.se/ws/korp/v8/corpus_config')
    .then(resp => resp.json())
    .then(data => {
      handleCorpusCategories(data).then(
        e => {
          let f = JSON.stringify(e, null, 4)
          console.log(f)
          fs.writeFile('test.json', f, function(err) {
            if (err) {
              console.log(err)
           }
          })
        })
    .catch(err => console.log(err))
})}

//getMasterCorpus();
