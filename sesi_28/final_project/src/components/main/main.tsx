import { Chip, Divider, Grid, Typography, } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect } from 'react';
import InputComponent from './input';
import TableComponent from './table';

const axios = require('axios').default;


function MainComponent() {

    useEffect(()=>{
        axios.get('http://localhost:5000/debug')
        .then((response:any) => {
            console.log(response)
        })
        .catch((error:any) => {
            console.log(error)
        })
    },[]) 

    return (
        <>
            <Box sx={{'& > :not(style)': { mr:2, ml: 15, pt:5 },}}>
                <Typography variant="h4" component="div" sx={{ flexGrow: 1}}>
                    Person CRUD App 
                </Typography>
            </Box>
            <Grid container >
                <Grid item xs={4}> 
                    <Box sx={{'& > :not(style)': { mr:2, ml: 15},}}>
                        <Divider style={{marginTop: "24px"}}>
                            <Chip label="Input Form" />
                        </Divider>
                        <Box sx={{'& > :not(style)': { pt: 2 },}}>
                            <InputComponent />
                        </Box>
                    </Box>
                </Grid>


                <Grid item xs={8}>
                    <Box sx={{'& > :not(style)': { ml:2, mr: 15},}}>
                        <Divider style={{marginTop: "24px"}}>
                            <Chip label="Data Table" />
                        </Divider>

                        <Box sx={{'& > :not(style)': { pt:2 },}}>
                            <TableComponent />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default MainComponent