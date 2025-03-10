
import React, { useState, useEffect } from 'react';
import './ResultCard.css';

export default function ResultCard({ response, n }) {

  
    const showToken = (token) => {
      const word = token.word; 
      const title = Object.keys(token).map((k) => `${k}: ${token[k]}`).join('\n');
      const specialChars = [',', ':', ';'];
      if (specialChars.includes(word)) {
        return (
          <span className="special-char" title={title}>
            {word}
          </span>
        );
      }
      
      return (
        <span className="token" title={title}>
          {word}
        </span>
      );
    };
  

    const preprocessToken = (token) => {
      let processedTokens = [];

      token.forEach((token, index) => {
        const word = token.word;


        if (index > 0 && /,;:/.test(token.word)) {
          processedTokens[processedTokens.length - 1].word += word;
        } else {
          processedTokens.push({ ...token });
        }
      });
      return processedTokens;
    };

    



    if (!response) return null;

    const processedTokens = preprocessToken(response.tokens);

    let matchIndex;

    if (response.match && response.match[0] && response.match[0].start !== undefined) {
        matchIndex = response.match[0].start;
    } else if (response.match && response.match.start !== undefined) {
        matchIndex = response.match.start;
    }
    
    
    console.log("matchindex:", matchIndex);


  
    return (
        <tr key={n} className='resultRow'>
          <td className='tableD'>
            <div className='token-container'>
              <div className="prefix-container">
                {processedTokens.slice(0, matchIndex).map((token, i) => (
                  < span key={i} className="prefix">{showToken(token)}</span>
                ))}
              </div>

              <div className="match-container">
                <span className="token match">{showToken(processedTokens[matchIndex])}</span>
              </div>


              <div className="suffix-container">
                {processedTokens.slice(matchIndex + 1).map((token, i) => (
                  <span key={i} className="suffix">{showToken(token)}</span>
                ))}
              </div>


              {/* <div className="spacer" style={{ flex: tokensBeforeMatch }}></div> */}









              {/* {response.tokens.map((token, i) => (
                <React.Fragment key={i}>

                  
                
                {i === matchIndex ? (
                  <div className="token match">{showToken(token)}</div>
                ) : i < matchIndex ? (
                  <div className="prefix">{showToken(token)}</div>
                ) : i > matchIndex ? (
                  <div className="suffix">{showToken(token)}</div>
                ) : (
                  showToken(token)
                )
                
                
                }
                </React.Fragment>
              ))} */}
    
                {/* <div className="spacer" style={{ flex: tokensAfterMatch }}></div> */}
              </div>
          </td>
        </tr>
      );
    }
  

/*     <div className="token-container">
    
    <div className="prefix-container">
        {response.tokens.slice(0, matchIndex).map((token, i) => (
            <span key={i} className="prefix">{showToken(token)}</span>
        ))}
    </div>

    
    <div className="match-container">
        <span className="token match">{showToken(response.tokens[matchIndex])}</span>
    </div>

    
    <div className="suffix-container">
        {response.tokens.slice(matchIndex + 1).map((token, i) => (
            <span key={i} className="suffix">{showToken(token)}</span>
        ))}
    </div>
</div> */
