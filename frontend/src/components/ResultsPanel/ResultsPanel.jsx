import React, { useContext, useState, useEffect } from 'react';
import './ResultsPanel.css';
import ResultCard from '../ResultCard/ResultCard.jsx';
import ErrorPage from '../../pages/ErrorPage/ErrorPage.jsx';
import SettingsContext from "../../services/SettingsContext.jsx";
import { MoveLeft, MoveRight, ChevronDown, ChevronRight } from 'lucide-react';
import CorporaContext from '../../services/CorporaContext.jsx';
import Definition from '../Definition/Definition.jsx';
import BarChart from '../Statistics/BarChart.jsx';


//This should all later be changed to use individual api calls for each corpus, so we get (hopefully) a quicker response.
const ResultsPanel = ({ response, wordToDef }) => {
  const [hits, setHits] = useState(0);
  const [startHit, setStartHit] = useState(0);
  const [endHit, setEndHit] = useState(0);
  const [page, setPage] = useState(0);
  const [groupedResults, setGroupedResults] = useState({});
  const [corpusOrder, setCorpusOrder] = useState([]);
  const [expandedCorpus, setExpandedCorpus] = useState({});
  const [activeCorporas, setActiveCorporas] = useState({});
  const { settings, updateSettings } = useContext(SettingsContext);
  const { corporas } = useContext(CorporaContext);
  
  const corpusPerPage = 3; // Should be swapped with resultsperpage.
  const [resultsPerCorpus, setResultsPerCorpus] = useState(settings.sampleSize);

  
  
  useEffect(() => {
    if (response) {
      if (response.error) {
        setError(true); // API response has error
      } else {
        setHits(response.hits || 0);
        setPage(0);
        setActiveCorporas(corporas.corporas);
        
        // Set corpus order from response
        if (response.corpus_order) {
          setCorpusOrder(response.corpus_order);
          
          // Initialize all corpora as expanded
          const initialExpandState = {};
          response.corpus_order.forEach(corpus => {
            initialExpandState[corpus] = true;
          });
          setExpandedCorpus(initialExpandState);

        }
      }
    }
  }, [response]);
  
  useEffect(() => {
    if (response && response.kwic) {
      if (response.error) {
        setError(true); // API response has error
      } else {
        setResultsPerCorpus(settings.sampleSize);
        const grouped = {};
        corpusOrder.forEach(corpus => {

          const corpusResults = response.kwic.filter(result => result.corpus === corpus);
          grouped[corpus] = corpusResults.slice(0, settings.sampleSize);
        });
        
        setGroupedResults(grouped);
        

        calculateResultRange();
      }
    }
  }, [response, corpusOrder, settings.sampleSize]);

  
  useEffect(() => {
    calculateResultRange();
  }, [page]);
  

  const calculateResultRange = () => {
    if (!response || !response.corpus_order) return;
    
    const start = page * corpusPerPage;
    const displayedCorpora = response.corpus_order.slice(start, start + corpusPerPage);
    
    let totalPrevResults = 0;
    let currentPageResults = 0;
    
    response.corpus_order.forEach((corpus, index) => {
      const count = Math.min(resultsPerCorpus, response.kwic.filter(r => r.corpus === corpus).length); // This should probably just be the kwic.filter, but im not 100% sure.
      //Or it shouldnt show hits here at all, and just in each corpus.
      
      if (index < start) { //We add all the corpuses from previous pages hits, so we know were we should start.
        totalPrevResults += count; // All hits from the pages before.
      } else if (displayedCorpora.includes(corpus)) {
        currentPageResults += count;
      }
    });
    console.log(totalPrevResults + currentPageResults);
    setStartHit(totalPrevResults);
    setEndHit(totalPrevResults + currentPageResults);
  };
  

  
  if (hits === 0) {
    return (
      <div className="results-panel results-panel-empty">
        <div className="no-results">
          <h2>Inga resultat hittades</h2>
          <p>Försök med en annan sökning</p>
        </div>
      </div>
    );
  }
  
  const handleNextPage = () => {
    const totalPages = Math.ceil(corpusOrder.length / corpusPerPage);
    if (page < totalPages - 1) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  
  const handlePrevPage = () => {
    if (page > 0) {
      setPage((prevPage) => prevPage - 1);
    }
  };
  
  const toggleCorpusExpand = (corpus) => {
    setExpandedCorpus(prev => ({
      ...prev,
      [corpus]: !prev[corpus]
    }));
  };
  

  const getVisibleCorpora = () => {
    const start = page * corpusPerPage;
    return corpusOrder.slice(start, start + corpusPerPage);
  };
  
  const visibleCorpora = getVisibleCorpora();
  const totalPages = Math.ceil(corpusOrder.length / corpusPerPage);

  const generateDefintions = (wordToDef) => {
    console.log('defs', wordToDef);
    let elemArr = [];
    if (Array.isArray(wordToDef)) {
      wordToDef.forEach((w) => {
        if (w.wordEntry !== "" && !w.pos) {
            console.log('w in genDef', w);
            elemArr.push(<Definition wordEntry={w.wordEntry}></Definition>)}})
        } else {
            elemArr.push(<Definition wordEntry={wordToDef}></Definition>)
        }

    return elemArr;
  }

  const generateStatistics = (wordToDef) => {
    
      let elemArr = [];
      if (Array.isArray(wordToDef)) {
        console.log('stats is array', wordToDef);
        wordToDef.forEach(w => {
          if (w.wordEntry !== "" && !w.pos) {
          elemArr.push(<BarChart word={w.wordEntry}></BarChart>)}})
      } else {
          elemArr.push(<BarChart word={wordToDef}></BarChart>)
      }

      return elemArr;
  }

  return (
    <div className="results-panel">
      {wordToDef ? generateDefintions(wordToDef).map(w => w) : null}
      {wordToDef ? generateStatistics(wordToDef).map(w => w): null}
      <div className="results-header">
        <div className="results-stats">
          <span className="results-count">Totala matchningar: <strong>{hits}</strong></span>
          {/*Should probably say the total of the corpuses from that page, not current endhit */}
          <span className="results-showing">Visar <strong>{startHit + 1}–{resultsPerCorpus}</strong></span>
        </div>
      </div>
      
      <div className="results-table-container">
        {visibleCorpora.map((corpus) => {
          const corpusResults = groupedResults[corpus] || [];
          const corpusHitCount = response?.corpus_hits?.[corpus] || 0;
          
          // Skip if no results for this corpus
          //Maybe still show corpus and just say no results, idk whats best.
          if (corpusHitCount === 0) return null;
          
          return (
            <div key={corpus} className="corpus-group">
              <div 
                className="corpus-header" 
                onClick={() => toggleCorpusExpand(corpus)}
              >
                {expandedCorpus[corpus] ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                <span className="corpus-name">{activeCorporas[corpus.toLowerCase()]}</span>
                <span className="corpus-count">({corpusHitCount})</span>
              </div>
              {expandedCorpus[corpus] && (
                <table className="results-table">
                  <tbody>
                    {corpusResults.length > 0 ? (
                      corpusResults.map((line, index) => {
                        
                        let resultIndex = 0;
                        for (let i = 0; i < corpusOrder.indexOf(corpus); i++) {
                          resultIndex += Math.min(
                            resultsPerCorpus, 
                            response.kwic.filter(r => r.corpus === corpusOrder[i]).length
                          );
                        }
                        resultIndex += index;
                        
                        return <ResultCard key={`${corpus}-${index}`} response={line} n={resultIndex} extraData={line.structs}/>;
                      })
                    ) : (
                      <tr>
                        <td className="no-corpus-results">
                          Inga resultat från denna korpus
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          );
        })}
        
        {/* Idk if its needed, just a thought if we implement page in the url, and someone were to tweak the url to next page even tho button doesnt allow.*/}
        {visibleCorpora.length === 0 && (
          <div className="no-results">
            <p>Inga fler korpusar att visa</p>
          </div>
        )}
      </div>
      
      <div className="pagination">
        <div className="pagination-button-container">
          <button 
            className={`pagination-button ${page === 0 ? 'disabled' : ''}`} 
            onClick={handlePrevPage} 
            disabled={page === 0}
            aria-label="Previous page"
          >
            <MoveLeft size={20} />
            <span className="pagination-text">Föregående</span>
          </button>
        </div>
        
        <div className="pagination-info">
          Sida {page + 1} av {totalPages}
        </div>
        
        <div className="pagination-button-container">
          <button 
            className={`pagination-button ${page + 1 >= totalPages ? 'disabled' : ''}`} 
            onClick={handleNextPage} 
            disabled={page + 1 >= totalPages}
            aria-label="Next page"
          >
            <span className="pagination-text">Nästa</span>
            <MoveRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPanel;