import React, {Component} from "react";
import './App.css';
import ClockClassComponent from "./components/ClockClassComponent";
import ClockFunctionComponent from "./components/ClockFunctionComponent";
import { Grid } from '@mui/material';

function App() {
  return (
    // <div className="App">
    //   <div className="App-header">
    //     <ClockClassComponent/>
    //     <ClockFunctionComponent/>
    //   </div>
    // </div> 

    <div
      style={{
      backgroundColor: '#DFD8CA',
    }}>

      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >

        <Grid item xs={3}>
          {/* <ClockClassComponent/> */}
          <ClockFunctionComponent/>
        </Grid>   
        
      </Grid> 
    </div>
)
}

export default App;