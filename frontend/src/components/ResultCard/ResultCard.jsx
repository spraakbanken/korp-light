
import React, { useState, useEffect } from 'react';
import './ResultCard.css';

export default function ResultCard({ response, n }) {
  
    const showToken = (token) => {
      const word = token.word; 
      const title = Object.keys(token).map((k) => `${k}: ${token[k]}`).join('\n');
      return (
        <span className="token" title={title}>
          {word}
        </span>
      );
    };
  
    if (!response) return null;

    // <td className="match">
    //             {line.tokens.slice(line.match.start, line.match.end + 1).map((token, i) => (
    //               <span key={i} className="match-highlight">
    //                 {showToken(token)}
    //               </span>
    //             ))}
    //           </td>


    const matchIndex = response.match.start;
    const tokensBeforeMatch = matchIndex;
    const tokensAfterMatch = response.tokens.length - matchIndex - 1;

  
    return (
        <tr key={n} className='resultRow'>
          <td className='tableD'>
            <div className="token-container">
                <div className="spacer" style={{ flex: tokensBeforeMatch }}></div>


              {response.tokens.map((token, i) => (
                <React.Fragment key={i}>
                  {i === matchIndex ? (
                    <span className="token match">{showToken(token)}</span>
                  ) : (
                    showToken(token)
                  )}
                </React.Fragment>
              ))}
    
                <div className="spacer" style={{ flex: tokensAfterMatch }}></div>
            </div>
          </td>
        </tr>
      );
    }
  