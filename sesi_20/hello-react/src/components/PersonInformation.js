import React, {Component, useEffect, useState} from 'react'
import Quote from "./Quote";

function PersonInformation () {
    const [personData, setPersonData] = useState({
        name: "Septyan",
        age: 17,
        quote: "Tiada hari tanpa ngoding React"
    })

    const changeName = () => {
        const name = personData.name+5
        setPersonData({
            ...personData,
            name,
        })
    }

    const changeAge = () => {
        const age = personData.age+1
        setPersonData({
            ...personData,
            age
        })
    }

    useEffect(()=>{
        document.title = `The age is ${personData.age}`
    },[personData.name])

    return (
        <>
        <h1>Person Information</h1>
        <div>
            <span>Name: {personData.name}</span><br />
            <span>Age: {personData.age}</span><br />
            <span>Quote: {personData.quote}</span><br />
            <Quote quote={personData.quote} />
            <button onClick={changeName}>Change Name</button>
            <button onClick={changeAge}>Change Age</button>
        </div>
        {/* */}
        </>
    )
}

// class PersonInformation extends Component {
//     constructor() {
//         super()
//         this.state = {
//             name: "Septyan",
//             age: 17,
//             quote: "Tiada hari tanpa ngoding React"
//         }
//     }
//     render() {
//         return (
//             <>
//             <h1>Person Information</h1>
//             <div>
//                 <span>Name: {this.state.name}</span><br />
//                 <span>Age: {this.state.age}</span><br />
//                 <span>Quote: {this.state.quote}</span><br />
//                 <Quote quote={this.state.quote} />
//             </div>
//             {/* */}
//             </>
//         )
//     }
// }

export default PersonInformation