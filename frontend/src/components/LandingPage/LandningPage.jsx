import "./LandningPage.css";
import React from "react";
import korp_logo from '../../assets/korp.svg';
import searchIcon from '../../assets/search.svg';
import advancedIcon from '../../assets/advanced.svg';
import corpusIcon from '../../assets/book-open.svg';
import historyIcon from '../../assets/history.svg';
import helpIcon from '../../assets/help-circle.svg';
import settingsIcon from '../../assets/settings.svg';
import burgerKingMenu from '../../assets/menu.svg';

export default function LandingPage() {
  return (
    <div className="landing-page">
      <div className="nav-bar">
        <div className="logo">
          <img src={korp_logo} alt="Logo" width="100" />
        <div className="nav-buttons">
          <div className="burger-menu">
            <img src={burgerKingMenu} alt="Menu"/>
          </div>
          <div className="settings-button">
            <img src={settingsIcon} alt="Settings" />
          </div>
          <div className="help-button">
            <img src={helpIcon} alt="Help" />
          </div>
        </div>
      </div>
      </div>

      <div className="search-bar">
        <img src={searchIcon} alt="Search" className="search-bar__icon" />
        <input type="text" className="search-bar__input" placeholder="Search" />
      </div>

      <div className="search-button-group">
        <button className="search-button advanced-search-button">
          <img src={advancedIcon} alt="Advanced Search" />
        </button>
        <button className="search-button corp-button">
          <img src={corpusIcon} alt="Corpus" />
        </button>
        <button className="search-button history-button">
          <img src={historyIcon} alt="History" />
        </button>
        <button className="search-button simple-search-button">
          <img src={searchIcon} alt="Simple Search" />
        </button>
      </div>

    </div>
  );
}
