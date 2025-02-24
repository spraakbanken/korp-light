import LandingPage from './LandingPage/LandingPage.jsx';
import ResultsPage from './ResultsPage/ResultsPage.jsx';

const routes = [
    {path: '/', element: <LandingPage />},
    {path: '/results', element: <ResultsPage />}
];

export default routes;