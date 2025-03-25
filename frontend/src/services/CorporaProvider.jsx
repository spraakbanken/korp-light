import { useState } from 'react';
import CorporaContext from './CorporaContext.jsx';

export function CorporaProvider({ children }) {
  
    const [corporas, setCorporas] = useState([]); 
    
    const updateCorporas = (newCorporas) => {
        setCorporas(newCorporas)
    };


    return (
        <CorporaContext.Provider value={{ corporas, updateCorporas }}>
            {children}
        </CorporaContext.Provider>
    );
}