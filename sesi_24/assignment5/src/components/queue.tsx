import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import { useState } from 'react';

function QueueComponent() {

    const [queue, setQueue] = useState(['Roy','Fenny','Roy','Fenny'])
    const [inputName, setInputName] = useState('')

    const majukan = () => {
        let tempQueue = queue;
        tempQueue.shift()
        setQueue([...tempQueue])
    }

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            marginTop="48px"
            style={{ minHeight: '100vh' }}
        >

        <Box
            component="form"
            sx={{
            '& > :not(style)': { m: 1, width: '35ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <div>
            <TextField onChange={event => setInputName(event.target.value)} id="outlined-basic" label="Masukkan nama" variant="outlined" fullWidth />
            </div>
            <div>
            <Button onClick={() => setQueue([...queue, inputName])} variant="outlined" fullWidth >Antrikan</Button>
            </div>
            <div>
            <Button onClick={() => majukan()} variant="outlined" color="success" fullWidth >Majukan</Button>
            </div>

            <Divider style={{marginTop: "48px", marginBottom: "24px"}}>
            <Chip label="Antrian" />
            </Divider>

            {
                queue.map((value, index) => {
                    return (
                        <>
                            <p key={index} style={{textAlign: "center"}}>{value}</p>
                            <Divider>^</Divider>
                        </>
                    )
                })
            }   


        </Box>

        </Grid>         
    )
}

export default QueueComponent