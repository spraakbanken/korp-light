
import React, { useContext, useState, useEffect } from 'react';
import './ResultCard.css';
import SettingsContext from "../../services/SettingsContext.jsx";

export default function ResultCard({ response, n, extraData}) {
  const { settings, updateSettings } = useContext(SettingsContext);
  const [expandCard, setExpandCard] = useState(false);


  const showToken = (token) => {
    const word = token.word;
    const title = Object.keys(token).map((k) => `${k}: ${token[k]}`).join('\n');
    const specialChars = ['.', ',', ':', ';'];
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



  const handleContext = (matchIndex, pos) => {
    if (pos === "start") {
      return Math.max(matchIndex - (settings.contextSize / 2), 0);
    }
    else if (pos === "end") {
      return Math.min(matchIndex + (settings.contextSize / 2));
    }
  }




  if (!response) return null;

  const processedTokens = preprocessToken(response.tokens);

  let matchIndex;
  let endIndex;

  if (response.match && response.match[0] && response.match[0].start !== undefined) {
    matchIndex = response.match[0].start;
  } else if (response.match && response.match.start !== undefined) {
    matchIndex = response.match.start;
  }

  function handleCardClick() {
    setExpandCard((prev) => !prev);
  }

  return (
    <tr key={n} className='resultRow'onClick={handleCardClick}>
      <td className='tableD'>
        <div className='token-container'>
          <div className="prefix-container">
            {processedTokens.slice(handleContext(matchIndex, "start"), matchIndex).map((token, i) => (
              < span key={i} className="prefix">{showToken(token)}</span>
            ))}
          </div>
          <div className="match-container">
            <span className="token match">{showToken(processedTokens[matchIndex])}</span>
          </div>
          <div className="suffix-container">
            {processedTokens.slice(matchIndex + 1, handleContext(matchIndex, "end")).map((token, i) => (
              <span key={i} className="suffix">{showToken(token)}</span>
            ))}
          </div>
        </div>
        
        {extraData && expandCard && <div className='resultCard__match_info'>
            <p>Titel: <span className='resultCard__match_info_entry'>{extraData.text_title }</span></p>
            <p>Datum: <span className='resultCard__match_info_entry'>{extraData.text_date}</span></p>
            <p>Författare: <span className='resultCard__match_info_entry'>{extraData.text_author}</span></p>
            <p>Källa: <a href={extraData.text_url}><span className='resultCard__match_info_entry'>{extraData.text_url}</span></a></p>
        </div>
        }
      </td>
    </tr>
  );
}