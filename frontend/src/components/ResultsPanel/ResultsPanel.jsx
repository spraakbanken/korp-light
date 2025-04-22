import React, { useContext, useState, useEffect } from 'react';
import './ResultsPanel.css';
import ResultCard from '../ResultCard/ResultCard.jsx';
import ErrorPage from '../../pages/ErrorPage/ErrorPage.jsx';
import SettingsContext from "../../services/SettingsContext.jsx";
import { MoveLeft, MoveRight, ChevronDown, ChevronRight } from 'lucide-react';
import CorporaContext from '../../services/CorporaContext.jsx';
import Definition from '../Definition/Definition.jsx';
import BarChart from '../Statistics/BarChart.jsx';

const ResultsPanel = ({ response, wordToDef }) => {
  const [hits, setHits] = useState(0);
  const [startHit, setStartHit] = useState(0);
  const [endHit, setEndHit] = useState(0);
  const [page, setPage] = useState(0);
  const [groupedResults, setGroupedResults] = useState({});
  const [corpusOrder, setCorpusOrder] = useState([]);
  const [expandedCorpus, setExpandedCorpus] = useState({});
  const [activeCorporas, setActiveCorporas] = useState({});
  const [resultsPerCorpus, setResultsPerCorpus] = useState(0);
  const { settings } = useContext(SettingsContext);
  const { corporas } = useContext(CorporaContext);
  const corpusPerPage = 3;

  // Helper function to find matching corpus key case-insensitively
  const findMatchingCorpusKey = (corpusName) => {
    if (!response) return corpusName;
    return Object.keys(response).find(
      key => key.toLowerCase() === corpusName.toLowerCase()
    ) || corpusName;
  };

  useEffect(() => {
    setResultsPerCorpus(settings.sampleSize);
  }, [settings.sampleSize]);

  useEffect(() => {
    if (!response || response.error) return;

    const firstCorpusKey = Object.keys(response)[0];
    const order = (response[firstCorpusKey]?.corpus_order || [])
      .map(c => c.toLowerCase());

    setCorpusOrder(order);
    setHits(calculateTotalHits());
    setPage(0);
    setActiveCorporas(corporas.corporas);

    const initialExpandState = {};
    order.forEach(corpus => {
      initialExpandState[corpus] = true;
    });
    setExpandedCorpus(initialExpandState);

    const grouped = {};
    order.forEach(corpus => {
      const responseKey = findMatchingCorpusKey(corpus);
      const corpusResults = response[responseKey]?.kwic || [];
      grouped[corpus] = corpusResults.slice(0, settings.sampleSize);
    });
    setGroupedResults(grouped);
  }, [response]);

  useEffect(() => {
    calculateResultRange();
  }, [page, groupedResults]);

  const calculateTotalHits = () => {
    if (!response) return 0;
    return Object.keys(response).reduce((total, corpus) => {
      const corpusHits = response[corpus]?.corpus_hits || {};
      return total + Object.values(corpusHits).reduce((sum, hits) => sum + (hits || 0), 0);
    }, 0);
  };

  const calculateResultRange = () => {
    if (!response || !corpusOrder.length) return;

    const start = page * corpusPerPage;
    const displayedCorpora = corpusOrder.slice(start, start + corpusPerPage);

    let totalPrevResults = 0;
    let currentPageResults = 0;

    corpusOrder.forEach((corpus, index) => {
      const responseKey = findMatchingCorpusKey(corpus);
      const count = Math.min(
        resultsPerCorpus,
        (response[responseKey]?.kwic || []).length
      );

      if (index < start) {
        totalPrevResults += count;
      } else if (displayedCorpora.includes(corpus)) {
        currentPageResults += count;
      }
    });

    setStartHit(totalPrevResults);
    setEndHit(totalPrevResults + currentPageResults);
  };

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
    let elemArr = [];
    if (Array.isArray(wordToDef)) {
      wordToDef.forEach((w) => {
        if (w.wordEntry !== "" && !w.pos) {
          elemArr.push(<Definition key={w.wordEntry} wordEntry={w.wordEntry} />);
        }
      });
    } else {
      elemArr.push(<Definition wordEntry={wordToDef} />);
    }
    return elemArr;
  };

  const generateStatistics = (wordToDef) => {
    let elemArr = [];
    if (Array.isArray(wordToDef)) {
      wordToDef.forEach(w => {
        if (w.wordEntry !== "" && !w.pos) {
          elemArr.push(<BarChart key={w.wordEntry} word={w.wordEntry} />);
        }
      });
    } else {
      elemArr.push(<BarChart word={wordToDef} />);
    }
    return elemArr;
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

  return (
    <div className="results-panel">
      {wordToDef && generateDefintions(wordToDef)}
      {wordToDef && generateStatistics(wordToDef)}
      <div className="results-header">
        <div className="results-stats">
          <span className="results-count">Totala matchningar: <strong>{hits}</strong></span>
        </div>
      </div>

      <div className="results-table-container">
        {visibleCorpora.map((corpus) => {
          const corpusResults = groupedResults[corpus] || [];
          const responseKey = findMatchingCorpusKey(corpus);
          const corpusHitCount = 
            response[responseKey]?.corpus_hits?.[corpus.toUpperCase()] || 
            response[responseKey]?.corpus_hits?.[corpus.toLowerCase()] || 
            0;

          if (corpusHitCount === 0) return null;

          return (
            <div key={corpus} className="corpus-group">
              <div className="corpus-header" onClick={() => toggleCorpusExpand(corpus)}>
                {expandedCorpus[corpus] ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                <span className="corpus-name">{activeCorporas[corpus.toLowerCase()]}</span>
                <span className="corpus-count">({corpusHitCount})</span>
              </div>
              {expandedCorpus[corpus] && (
                <table className="results-table">
                  <tbody>
                    {corpusResults.length > 0 ? (
                      corpusResults.map((line, index) => (
                        <ResultCard
                          key={`${corpus}-${index}`}
                          response={line}
                          n={index}
                          extraData={line.structs}
                        />
                      ))
                    ) : (
                      <tr>
                        <td className="no-corpus-results">Inga resultat från denna korpus</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          );
        })}

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