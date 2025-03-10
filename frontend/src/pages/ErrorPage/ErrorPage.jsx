import React from "react";
import './ErrorPage.css';
import deadkorp from '../../assets/deadkorp.svg';
import { Button } from "react-bootstrap"; // Bootstrap button for styling
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="error-container">
      <h1 className="error-title">ERROR</h1>
      <p className="error-message">No results found, try something else!</p>
      <img src={deadkorp} className="error-image" />
      <Button className="back-home-btn" onClick={() => navigate("/")}>
        Go Back Home
      </Button>
    </div>
  );
};

export default ErrorPage;
