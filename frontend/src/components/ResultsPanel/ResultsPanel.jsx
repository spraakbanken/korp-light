import React, { useContext, useState, useEffect } from 'react';
import './ResultsPanel.css';
import ResultCard from '../ResultCard/ResultCard.jsx'
import ErrorPage from '../../pages/ErrorPage/ErrorPage.jsx';
import SettingsContext from "../../services/SettingsContext.jsx";
import { MoveLeft, MoveRight } from 'lucide-react';
const ResultsPanel = ({ response }) => {

  const [hits, setHits] = useState(0);
  const [startHit, setStartHit] = useState(0);
  const [endHit, setEndHit] = useState(20);
  const [page, setPage] = useState(0);
  const [currentResults, setCurrentResults] = useState([]);
  const { settings, updateSettings } = useContext(SettingsContext);

  const resultsPerPage = 20;


  useEffect(() => {
    if (response) {
      if (response.error) {
        setError(true); // API response has error
      } else {
        setHits(response.hits || 0);
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

        const start = page * settings.resultsPerPage;
        const end = Math.min(start + parseInt(settings.resultsPerPage), response.hits);

        setStartHit(start);
        setEndHit(end);
        setCurrentResults(response.kwic.slice(start, end));
        console.log("start+setting", start + parseInt(settings.resultsPerPage));
        console.log("start", start);
        console.log("end", end);
      }
    } else {
      setError(true); // response undefined
    }
  }, [response, page, settings]);



  if (hits === 0) {
    return (
      <h2 className='no-results'>No results found</h2>
    );
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
      <h1>Sökresultat</h1>
      <div>Antal: {hits}, visar {startHit + 1}–{endHit}</div>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Matchningar</th>
          </tr>
        </thead>
        <tbody>
          <tr className='corpusName'></tr>
          {currentResults.map((line, index) => {
            let n = startHit + index;

            return <ResultCard key={n} response={line} n={n} />;
          })}
        </tbody>
      </table>

      <div className="pagination-buttons">
        <button onClick={handlePrevPage} disabled={page === 0}>
        <MoveLeft size={28} className=" icon-hover text-dark hover:text-primary" />
        </button>
        <button onClick={handleNextPage} disabled={endHit >= hits}>
        <MoveRight size={28} className=" icon-hover text-dark hover:text-primary" />
        </button>
      </div>
    </div>
  );
};

export default ResultsPanel;

