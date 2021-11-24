import React from "react";
import '../App.css'

class ClockClassComponent extends React.Component {

    constructor() {
        super()
        this.state = {
            date: new Date()
        }
    }

    tick() {
        this.setState({
            date: new Date()
        })
    }

    componentDidMount() {
        this.timerID = setInterval(this.tick.bind(this),1000)
    }

    componentWillUnmount() {
        clearInterval(this.timerID)
    }

    render() {
        return (
            <div classname="Clock">
                <h1>Class Component Clock</h1> <hr />
                <h1>{this.state.date.toLocaleTimeString()}</h1>
            </div>
        );
    }
}

export default ClockClassComponent;