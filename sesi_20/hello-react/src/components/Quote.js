import React, {useState} from 'react'


// function Quote (props) { or
const Quote = (props) => {
    // const [quote] = useState(props.quote)
    return (
        <>
        <blockquote>
            {props.quote}
        </blockquote>
        </>
    )
}

export default Quote