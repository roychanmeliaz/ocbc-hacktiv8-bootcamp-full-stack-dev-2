import { Chip, Divider, Grid, Typography, } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import InputComponent from './input';
import TableComponent from './table';
import { InputInterface } from './input';

const axios = require('axios').default;

function MainComponent() {

    const emptyInput:InputInterface = {
        key: "",
        firstName: "",
        lastName: ""
    }

    const [inputMode, setInputMode] = useState("add") //add or edit
    const [inputValue, setInputValue] = useState<InputInterface>(emptyInput)

    function initEdit(value:InputInterface) {
        setInputMode("edit")
        setInputValue(value)
        console.log("input value:")
        console.log(value)
    }

    function cancelEdit() {
        setInputMode("add")
        setInputValue(emptyInput)
    }

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
                    People CRUD App 
                </Typography>
            </Box>
            <Grid container >
                <Grid item xs={4}> 
                    <Box sx={{'& > :not(style)': { mr:2, ml: 15},}}>
                        <Divider style={{marginTop: "24px"}}>
                            <Chip label="Input Form" />
                        </Divider>
                        <Box sx={{'& > :not(style)': { pt: 2 },}}>
                            <InputComponent cancelEdit={cancelEdit} inputMode={inputMode} inputValue={inputValue}/>
                        </Box>
                    </Box>
                </Grid>


                <Grid item xs={8}>
                    <Box sx={{'& > :not(style)': { ml:2, mr: 15},}}>
                        <Divider style={{marginTop: "24px"}}>
                            <Chip label="Data Table" />
                        </Divider>

                        <Box sx={{'& > :not(style)': { pt:2 },}}>
                            <TableComponent initEdit={initEdit}/>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default MainComponent