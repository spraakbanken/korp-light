import React, { useState, useEffect } from 'react';
import './ResultsPanel.css';

import ResultCard from '../ResultCard/ResultCard.jsx'
import ErrorPage from '../../pages/ErrorPage/ErrorPage.jsx';


const ResultsPanel = ({ response }) => {
  
  const [hits, setHits] = useState(0);
  const [startHit, setStartHit] = useState(0);
  const [endHit, setEndHit] = useState(20);
  const [kwicLines, setKwicLines] = useState([]);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(0);
  const [currentResults, setCurrentResults] = useState([]);



  const resultsPerPage = 20;

  
  useEffect(() => {
    if (response) {
      if (response.error) {
        setError(true); // API response has error
      } else {
        setHits(response.hits || 0);
        setKwicLines(response.kwic || []);
        setPage(0);
      }
    } else {
      setError(true); // response undefined
    }
  }, [response]);


  useEffect(() => {
    if (response) {
      if (response.error) {
        setError(true); // API response has error
      } else {
        console.log(page);
        // const start = page * resultsPerPage;
        // const end = Math.min(start + resultsPerPage, response.hits)

        const start = page * resultsPerPage;
        const end = Math.min(start + resultsPerPage, response.hits);

        setStartHit(start);
        setEndHit(end);

    
        setCurrentResults(response.kwic.slice(start, end));

        console.log("hits", response.hits);
        console.log("start", start);
        console.log("end", end);
        console.log("res", currentResults);
        

      }
    } else {
      setError(true); // response undefined
    }
  }, [response, page]);

  




  if (error || hits === 0) {
    return <ErrorPage />;
  }


  const handleNextPage = () => {
    if (page < Math.floor(hits / resultsPerPage)) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 0) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  

  
// Renders a table for the objects returned, kwicLines is basically an array of the objects, where each "search result" is rendered inside a table row element.
// line.tokens is an array of tokens/words/phrases, and the map iterates over them to display them in the row.

// React fragment basically just takes a way a div that would be in the way for easier styling etc. Kind of like an invisible div.




return (
  <div className="results-panel">
    <h3>Sökresultat:</h3>
    <div>Antal: {hits}, visar {startHit + 1}–{endHit}</div>
    <table className="custom-table">
      <thead>
        <tr>
          <th>Matchningar</th>
        </tr>
      </thead>
      <tbody>
        {currentResults.map((line, index) => {
          let n = startHit + index;
          return <ResultCard key={n} response={line} n={n} />;
        })}
      </tbody>
    </table>
    
    <div className="pagination-buttons">
      <button onClick={handlePrevPage} disabled={page === 0}>
        ← Föregående
      </button>
      <button onClick={handleNextPage} disabled={endHit >= hits}>
        Nästa →
      </button>
    </div>
  </div>
);
};

export default ResultsPanel;

