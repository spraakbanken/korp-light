import {useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import './ExampleSearches.css';

import Button from "react-bootstrap/Button";

export default function ExampleSearches() {
  const navigate = useNavigate();
  const [example, setExample] = useState([]);
  const [fadeProp, setFadeProp] = useState({ fade: 'fade-in' });


  const resultExamples= [
    {    url:"/results?corpus=svt-2005%2Csvt-2007%2Csvt-2008%2Csvt-2006%2Cattasidor%2Csvt-2009%2Csvt-2010%2Csvt-2011%2Csvt-2012%2Csvt-2013%2Csvt-2014%2Csvt-2015%2Csvt-2016%2Csvt-2017%2Csvt-2018%2Csvt-2019%2Csvt-2020%2Csvt-2021%2Csvt-2022%2Csvt-2023&cqp=%5Bword%20%3D%20%22polis%22%5D",
        label: "'polis' i nyhetstexter"
    },
    {
        url:    "/results?corpus=romi%2Cromii%2Crom99%2Cstorsuc&cqp=%5Bword%20%3D%20%22korp%22%5D", 
        label: "'korp' i romantexter"
    },
    {
        url:    "/results?corpus=familjeliv-allmanna-ekonomi%2Cfamiljeliv-allmanna-familjeliv%2Cfamiljeliv-allmanna-fritid%2Cfamiljeliv-allmanna-husdjur%2Cfamiljeliv-allmanna-hushem%2Cfamiljeliv-allmanna-noje&cqp=%5Bword%20%3D%20%22fan%22%5D",
        label: "'fan' i sociala medie-texter"
    },
    {
        url:"/results?corpus=attasidor%2Csvt-2005%2Csvt-2006%2Csvt-2007%2Csvt-2008%2Csvt-2009%2Csvt-2010%2Csvt-2011%2Csvt-2012%2Csvt-2013%2Csvt-2014%2Csvt-2015%2Csvt-2016%2Csvt-2017%2Csvt-2018%2Csvt-2019%2Csvt-2020%2Csvt-2021%2Csvt-2022%2Csvt-2023&cqp=%5Bpos%20%3D%20%22IN%22%5D",
        label: "interjektioner i nyhetstexter"
        
    },
    {
        url:"/results?corpus=wikipedia-sv&cqp=%5Bword%20%3D%20%22person%22%5D%5Bword%20%3D%20%22som%22%5D%5Bword%20%3D%20%22gillar%22%5D",
        label: "'person som gillar' i faktatexter"
        
    },
    {
        url: "/results?corpus=strindbergbrev%2Cstrindbergromaner&cqp=%5Bword%20%3D%20%22kvinna%22%5D",
        label: "'kvinna' i August Strindbergs texter"
    },
    {
        url: "/results?corpus=klarsprak%2Csou%2Csnp7879%2Ctkr-bet-mem-utl%2Ctkr-motioner%2Ctkr-protokoll%2Ctkr-register%2Ctkr-rskr%2Ctkr-berattelser-redogorelser-frsrdg%2Ctkr-propositioner-skrivelser%2Ctkr-reglementen-sfs%2Ctkr-riksdagens-forfattningssamling-rfs%2Ctkr-utredningar-kombet-sou%2Crd-bet%2Crd-ds%2Crd-eun%2Crd-flista%2Crd-fpm%2Crd-frsrdg%2Crd-ip%2Crd-kammakt%2Crd-kom%2Crd-mot%2Crd-ovr%2Crd-prop%2Crd-prot%2Crd-rskr%2Crd-samtr%2Crd-skfr%2Crd-sou%2Crd-tlista%2Crd-utr%2Crd-utsk%2Crd-yttr%2Csfs&cqp=%5Bword%20%3D%20%22tr%C3%B6tt%22%5D",
        label: "trött i myndighetstexter"
    },
    {
        url:"/results?corpus=svt-2005%2Csvt-2006%2Csvt-2007%2Csvt-2008%2Csvt-2009%2Csvt-2010%2Csvt-2011%2Csvt-2012%2Csvt-2013%2Csvt-2014%2Csvt-2015%2Csvt-2016%2Csvt-2017%2Csvt-2018%2Csvt-2019%2Csvt-2020%2Csvt-2021%2Csvt-2022%2Csvt-2023&cqp=%5Bword%20%3D%20%22stor%22%5D%5Bword%20%3D%20%22skandal%22%5D",
        label: "'stor skandal' i SVT nyhetstexter"
    },
    {
        url:"/results?corpus=svt-2005%2Csvt-2006%2Csvt-2007%2Csvt-2008%2Csvt-2009%2Csvt-2010%2Csvt-2011%2Csvt-2012%2Csvt-2013%2Csvt-2014%2Csvt-2015%2Csvt-2016%2Csvt-2017%2Csvt-2018%2Csvt-2019%2Csvt-2020%2Csvt-2021%2Csvt-2022%2Csvt-2023%2Cattasidor%2Cfamiljeliv-allmanna-ekonomi%2Cfamiljeliv-allmanna-familjeliv%2Cfamiljeliv-allmanna-fritid%2Cfamiljeliv-allmanna-husdjur%2Cfamiljeliv-allmanna-hushem%2Cfamiljeliv-allmanna-noje%2Cromi%2Cromii%2Crom99%2Cstorsuc%2Cwikipedia-sv&cqp=%5Bword%20%3D%20%22ful%22%5D",
        label:"'ful' i alla texter"
    },
    {
        url:"/results?corpus=svt-2005%2Csvt-2006%2Csvt-2007%2Csvt-2008%2Csvt-2009%2Csvt-2010%2Csvt-2011%2Csvt-2012%2Csvt-2013%2Csvt-2014%2Csvt-2015%2Csvt-2016%2Csvt-2017%2Csvt-2018%2Csvt-2019%2Csvt-2020%2Csvt-2021%2Csvt-2022%2Csvt-2023%2Cattasidor%2Cfamiljeliv-allmanna-ekonomi%2Cfamiljeliv-allmanna-familjeliv%2Cfamiljeliv-allmanna-fritid%2Cfamiljeliv-allmanna-husdjur%2Cfamiljeliv-allmanna-hushem%2Cfamiljeliv-allmanna-noje%2Cromi%2Cromii%2Crom99%2Cstorsuc%2Cwikipedia-sv&cqp=%5Bword%20%3D%20%22fin%22%5D",
        label:"'fin' i alla texter"
    }
    ];
  
    const getRandom = (arr, exclude) => {
      let filtered = arr.filter(item => item !== exclude);
      return filtered[Math.floor(Math.random() * filtered.length)];
    };
  
    useEffect(() => {
      setExample(getRandom(resultExamples));
    }, []);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setFadeProp({ fade: 'fade-out' });

        setTimeout(() => {
          setExample(prev => getRandom(resultExamples, prev));
          setFadeProp({ fade: 'fade-in' });
        }, 1200); 
      }, 9000);
  
      return () => clearInterval(interval);
    }, []);
  
    const handleExampleSearch = () => {
      if (example) {
        navigate(example.url);
      }
    };
  
    if (!example) return null;
  
    return (
      <div>
        <Button className={`examples ${fadeProp.fade}`} onClick={handleExampleSearch}>
          Sök efter {example.label}!
        </Button>
      </div>
    );
  }



