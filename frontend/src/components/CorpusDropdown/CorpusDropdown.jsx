import "./CorpusDropdown.css";
import Dropdown from 'react-bootstrap/Dropdown';
import CircleButton from "../CircleButton/CircleButton";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCorpusCollectionsList } from "../../services/api";

export default function CorpusDropDown ({colour, buttonLogo, getListFunction}) {
    
    const def = {'Loading...': 'default'}
    const [collectionsList, setCollectionsList] = useState(def);

    const { data = [], isLoading, error, refetch} = useQuery({
        queryKey : [collectionsList],
        queryFn: () => getListFunction(),
        enabled: true,
    });

    useEffect(() => {
        if (collectionsList) {
            return;
        } else {
            setCollectionsList(data.data);
        }
    }, [collectionsList, setCollectionsList, data])

    async function _getLists() {
        refetch().then((e) => {
            console.log('e', e.data)
            setCollectionsList(e.data)
        })
    }

    return (
    <>
        <Dropdown className="corpus_bar" 
            drop='down-centered'>
            <Dropdown.Toggle id="dropdown-basic">
                <CircleButton 
                    buttonColour= {colour}
                    buttonImage={buttonLogo}
                    buttonOnClick={() => _getLists()} />
            </Dropdown.Toggle>
            <Dropdown.Menu id="dropdown-menu">
            
            { Object.keys(collectionsList).map((item) => {
                return <Dropdown.Item href={null} key={item}>
                    {item}
                </Dropdown.Item>
            })}

            </Dropdown.Menu>
        </Dropdown>
        
        
    </>
    );

}
