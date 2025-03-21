import { createContext, useState } from 'react';

// Default context values
const SettingsContext = createContext({ 
  "resultsPerPage": 20,
  "sampleSize": 1,
  "contextSize": 10,
  "theme": "light",
  "selectedView": "wide"
});

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState({
    "resultsPerPage": 20,
    "sampleSize": 1,
    "contextSize": 10,
    "theme": "light",
    "selectedView": "wide"
  });

  const updateSettings = (newSettings) => {
    setSettings(prevSettings => ({ ...prevSettings, ...newSettings }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export default SettingsContext;
