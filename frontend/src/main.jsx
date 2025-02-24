import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'
//import App from './pages/App.jsx'

//Set up routing
import routes from './pages/routes.jsx'
import { RouterProvider, createBrowserRouter} from 'react-router-dom';

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
