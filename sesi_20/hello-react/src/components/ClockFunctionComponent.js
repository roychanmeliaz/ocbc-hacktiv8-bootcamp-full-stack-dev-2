import { useState, useEffect } from "react";

function ClockFunctionComponent() {
    const [date, setDate] = useState(new Date())
    
    useEffect(() => {
        const interval = setInterval(tick, 1000)
        return function() {
            clearInterval(interval)
        } 
    }, [])
        
    function tick() {
        setDate(new Date())
    }

    return (
        <div className="FunctionalClock">
            <h1>Function Component Clock</h1> <hr />
            <h1>{date.toLocaleTimeString()}</h1>
        </div>
        );
    }

export default ClockFunctionComponent; 