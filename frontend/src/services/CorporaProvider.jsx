import { useState } from 'react';
import CorporaContext from './CorporaContext.jsx';

export function CorporaProvider({ children }) {
  
    const [corporas, setCorporas] = useState({api:1, corporas: {'attasidor': '8 Sidor', 'svt-2006': 'SVT Nyheter 2006'}}); 
    
    const updateCorporas = (newCorpora) => {
        setCorporas(prevCorporas => ({ ...prevCorporas, ...newCorpora }));
    };


    return (
        <CorporaContext.Provider value={{ corporas, updateCorporas }}>
            {children}
        </CorporaContext.Provider>
    );
}