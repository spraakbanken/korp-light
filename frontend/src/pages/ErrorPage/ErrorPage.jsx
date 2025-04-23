import './ErrorPage.css';
import deadkorp from '../../assets/deadkorp.svg';
import { Button } from "react-bootstrap"; // Bootstrap button for styling
import { Link } from 'react-router-dom';

export default function ErrorPage() {
  
  return (
    <div className="error-container">
      <h1 className="error-title">ERROR</h1>
      <p className="error-message">Nåt gick fel...</p>
      <img src={deadkorp} className="error-image" />
      <Link to={"/"}>
                <Button className="simple-button" 
                    variant="danger" 
                    size="sm">
                    Hem
                </Button>
            </Link>
    </div>
  );
};