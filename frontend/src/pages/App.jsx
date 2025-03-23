// React Components
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route
import LandingPage from "../pages/LandingPage/LandingPage.jsx";
import ResultsPage from "../pages/ResultsPage/ResultsPage.jsx";
import HelpPage from "../pages/HelpPage/HelpPage.jsx";
import SettingsPage from "../pages/SettingsPage/SettingsPage.jsx";

import { SettingsProvider } from "../services/SettingsProvider.jsx";

//Bootstrap Components


// main style
import "./App.css"

export default function App() {
    return (
      <SettingsProvider>
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </SettingsProvider>
    );
  }