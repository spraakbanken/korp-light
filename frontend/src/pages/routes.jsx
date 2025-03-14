import HelpPage from './HelpPage/HelpPage.jsx';
import LandingPage from './LandingPage/LandingPage.jsx';
import ResultsPage from './ResultsPage/ResultsPage.jsx';
import ErrorPage from './ErrorPage/ErrorPage.jsx';
import SettingsPage from './SettingsPage/SettingsPage.jsx';


const routes = [
    {path: '/', element: <LandingPage />},
    {path: '/results', element: <ResultsPage />},
    {path: '/help', element: <HelpPage />},
    {path: '/settings', element: <SettingsPage />},
    { path: '*', element: <ErrorPage /> } //catch all!
];

export default routes;