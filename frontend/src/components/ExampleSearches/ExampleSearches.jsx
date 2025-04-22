import { useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import './ExampleSearches.css';

import Button from "react-bootstrap/Button";

export default function ExampleSearches() {
  const navigate = useNavigate();
  const [examples, setExamples] = useState([]);

  const resultExamples= [
    {    url:"/results?corpus=svt-2005%2Csvt-2007%2Csvt-2008%2Csvt-2006%2Cattasidor%2Csvt-2009%2Csvt-2010%2Csvt-2011%2Csvt-2012%2Csvt-2013%2Csvt-2014%2Csvt-2015%2Csvt-2016%2Csvt-2017%2Csvt-2018%2Csvt-2019%2Csvt-2020%2Csvt-2021%2Csvt-2022%2Csvt-2023&cqp=%5Bword%20%3D%20%22polis%22%5D",
        label: "Sök på ordet polis i nyhetstexter"
    },
    {
        url:    "/results?corpus=romi%2Cromii%2Crom99%2Cstorsuc&cqp=%5Bword%20%3D%20%22korp%22%5D", 
        label: "Sök på ordet Korp i Romantexter"
    },
    {
        url:    "/results?corpus=familjeliv-allmanna-ekonomi%2Cfamiljeliv-allmanna-familjeliv%2Cfamiljeliv-allmanna-fritid%2Cfamiljeliv-allmanna-husdjur%2Cfamiljeliv-allmanna-hushem%2Cfamiljeliv-allmanna-noje&cqp=%5Bword%20%3D%20%22fan%22%5D",
        label: "Sök på ordet fan i sociala medier"
    },
  ];


 const getRandomExamples = (arr, count) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    const picked = getRandomExamples(resultExamples, 3); 
    setExamples(picked);
  }, []);

  const handleExampleSearch = (examples) => {
    navigate(examples.url);
  };

  return (
    <div>
      {examples.map((examples, index) => (
        <Button
        className="examples"
          key={index}
          onClick={() => handleExampleSearch(examples)}
        >
          {examples.label}
        </Button>
      ))}
    </div>
  );
}
 


