import { useEffect, useState } from 'react';
import { setLocalSettings, getLocalSettings, initialSettings} from './initialSettings.js';
import SettingsContext from './SettingsContext.jsx';

export function SettingsProvider({ children }) {
  
    const [settings, setSettings] = useState(initialSettings); //Should be getlocal when works.

    const updateSettings = (newSettings) => {
        setSettings(prevSettings => ({ ...prevSettings, ...newSettings }));
    };

    useEffect( () => {
        setLocalSettings(settings);
    }, [settings])

    return (
        <SettingsContext.Provider value={{ settings, updateSettings }}>
            {children}
        </SettingsContext.Provider>
    );
}