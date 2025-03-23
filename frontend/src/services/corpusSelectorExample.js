// This file shows how to parse the data returned from getMasterCorpus
// Use in corpusDropdown

// The data variable contains test.json
import data  from './test.json'

function getMainLevels(inData) {
  Object.values(inData).forEach(e => {
    console.log('TITLE: ', e[0])
    console.log('DESCRIPTION', e[1].swe || e[1])
    if (e[2] !== undefined) {
      if (e[2].length === 1) {
        console.log('CORPUS: ', e[2])  
      } else {
        Object.values(e[2]).forEach(corpus => {
          if (Array.isArray(corpus) ) {
            console.log('CORPUS: ', corpus[0])    
          } else {
            console.log('CORPUS: ', corpus)
        }
        })
      }
    }
    if (e[3] !== undefined) {
      console.log('\nSUBCORPORA')
      Object.values(e[3]).forEach(e => getMainLevels(e));
    }
    console.log('\n')
  })
}

//getMainLevels(data);
