// Will move context here when it works out in main.jsx

import { createContext } from "react";

const SettingsContext = createContext({ 
    "resultsPerPage": 20,
    "sampleSize": 1,
    "contextSize": 10,
    "theme": "light",
    "selectedView": "wide"});

export default SettingsContext;