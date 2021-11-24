import { useState, useEffect } from "react";

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
        <Card sx={{ minWidth: 275 }}>
            <CardContent style={{backgroundColor: "#FBF3E4"}}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Function Component Clock
                </Typography>
                <Typography variant="h5" component="div">
                    {date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}{bull}{date.getMinutes()}{bull}{date.getSeconds()}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {date.getHours() >= 12 ? "PM" : "AM"}
                </Typography>
            </CardContent>
        </Card>
        // <div>
        //     <h1>Function Component Clock</h1> <hr />
        //     <h1>{date.toLocaleTimeString()}</h1>
        // </div>
        );
    }

export default ClockFunctionComponent; 