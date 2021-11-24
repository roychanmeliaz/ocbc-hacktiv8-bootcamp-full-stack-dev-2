import { useState, useEffect } from "react";

export default function FetchComponent() {
    const [baseURL] = useState('https://cat-fact.herokuapp.com')
    const [facts,setFacts] = useState([])

    useEffect(()=>{
        fetch(`${baseURL}/facts`)
        .then(response => response.json())
        .then(result => setFacts(result))
    },[])

    return (
    <>
        {
            facts.map(fact => {return (
                <div key={fact._id}>
                    {fact.text}
                </div>
            )})
        }
    </>
    )
}