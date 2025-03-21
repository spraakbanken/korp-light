// gets the "master corpus" which we use for corpus dropdown
// will have to refactor later kupo

const fs = require('fs')
let masterCorpus = {}

async function handleCorpusCategories(data) {

  async function getName(c) {
    let transformedList = []
    console.log("\nTransforming corpora: ", c)
    if (c) {
      for (const i of Object.values(c)) {
        console.log('Transforming corpus: ', i)
        if (typeof data.corpora[i].title === 'string') {
          transformedList.push([i, data.corpora[i].title])
        } else {
          for (const [k, v] of Object.entries(data.corpora[i].title)) {
            console.log('Corpus title: ', v)

            transformedList.push([i, v])
          }
        }   
      }
    }
    return transformedList;
  }
    
  if (data.folders) {
    for (const [k, v] of Object.entries(data.folders)) {
      //console.log(v)
      masterCorpus[k] = [
        v.title.swe || v.title || undefined , 
        v.description || 'No description',
        await getName(v.corpora) || undefined]
      if ('subfolders' in v) {        
        for (const [k2, v2] of Object.entries(v.subfolders)) {
          masterCorpus[k].push({k2: [
             v2.title.swe || v2.title || undefined,
             v2.description || 'No description', 
             await getName(v2.corpora) || undefined]})
        }
      }
    }
  }
  return masterCorpus
}

async function getCorpusResponse() {

  fetch('https://ws.spraakbanken.gu.se/ws/korp/v8/corpus_config')
    .then(resp => resp.json())
    .then(data => {
      handleCorpusCategories(data).then(
        e => {
          let f = JSON.stringify(e, null, 4)
          //console.log(f)

          fs.writeFile('test.json', f, function(err) {
            if (err) {
              console.log(err)
            }
          })
        });
    })
    .catch(err => {console.log(err)})
}

//getCorpusResponse();
