import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'
import App from './pages/App.jsx'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from 'react';

import { BrowserRouter as Router } from 'react-router-dom'; // Import Router



const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <App />
      </Router>
    </QueryClientProvider>
  </StrictMode>
);