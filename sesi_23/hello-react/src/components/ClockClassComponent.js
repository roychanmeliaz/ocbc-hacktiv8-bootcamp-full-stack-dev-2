import React from "react";
import '../App.css'

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);


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


            <Card sx={{ minWidth: 275 }}>
                <CardContent style={{backgroundColor: "#FBF3E4"}}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Class Component Clock
                    </Typography>
                    <Typography variant="h5" component="div">
                        {this.state.date.getHours() > 12 ? this.state.date.getHours() - 12 : this.state.date.getHours()}{bull}{this.state.date.getMinutes()}{bull}{this.state.date.getSeconds()}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {this.state.date.getHours() >= 12 ? "PM" : "AM"}
                    </Typography>
                </CardContent>
            </Card>


            // <div>
            //     <h1>Class Component Clock</h1> <hr />
            //     <h1>{this.state.date.toLocaleTimeString()}</h1>
            // </div>
        );
    }
}

export default ClockClassComponent;