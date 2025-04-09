import { useState } from 'react';
import CorporaContext from './CorporaContext.jsx';

export function CorporaProvider({ children }) {
  
    const [corporas, setCorporas] = useState({api:1, corporas:['attasidor', 'svt-2008']}); 
    
    const updateCorporas = (newCorpora) => {
        setCorporas(prevCorporas => ({ ...prevCorporas, ...newCorpora }));
    };


    return (
        <CorporaContext.Provider value={{ corporas, updateCorporas }}>
            {children}
        </CorporaContext.Provider>
    );
}