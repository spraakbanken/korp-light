import React, { useState, useEffect } from 'react';
import './ResultsPanel.css';

import ResultCard from '../ResultCard/ResultCard.jsx'

const ResultsPanel = ({ response }) => {
  
  const [hits, setHits] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [kwicLines, setKwicLines] = useState([]);

  useEffect(() => {
    if (response) {
      setHits(response.hits);
      setStart(response.start);
      setEnd(response.end);
      setKwicLines(response.kwic);
    }
  }, [response]); 


  
// Renders a table for the objects returned, kwicLines is basically an array of the objects, where each "search result" is rendered inside a table row element.
// line.tokens is an array of tokens/words/phrases, and the map iterates over them to display them in the row.

// React fragment basically just takes a way a div that would be in the way for easier styling etc. Kind of like an invisible div.

return (
  <div className="results-panel">
    <h3>Sök resultat:</h3>
    <div>Antal: {hits}, visar {start+1}–{end+1}</div>
    <table className="custom-table">
      <thead>
        <tr>
          <th>Matchningar</th>
        </tr>
      </thead>
      <tbody>
      {kwicLines.map((line, index) => {
        let n = start + index;
        return <ResultCard key={n} response={line} n={n} />;
      })}

      </tbody>
    </table>
  </div>
);
};

export default ResultsPanel;

