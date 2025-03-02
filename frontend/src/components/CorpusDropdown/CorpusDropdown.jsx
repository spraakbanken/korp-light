import "./CorpusDropdown.css";
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'
import book_logo from '../../assets/book-open.svg';

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCorpusCollectionsList } from "../../services/api";

export default function CorpusDropDown () {;
    
    const def = {'Reload Collections': 'b'}
    const [collectionsList, setCollectionsList] = useState(def);

    const { data = [], isLoading, error, refetch} = useQuery({
        queryKey : [collectionsList],
        queryFn: () => getCorpusCollectionsList(),
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
        <Button onClick={() => _getLists()}>Test Collections</Button>

        {isLoading ? <p>Loading...</p> : <p></p>}
        
        <Dropdown className="corpus_bar">
            <Dropdown.Toggle id="dropdown-basic">
                <Image src={book_logo}></Image>
            </Dropdown.Toggle>
            <Dropdown.Menu id="corpus_menu">
            
            { Object.keys(collectionsList).map((item) => {
                return <Dropdown.Item href={null} key={item}>{item}</Dropdown.Item>
            })}

            </Dropdown.Menu>
        </Dropdown>
        
        
    </>
    );

}
