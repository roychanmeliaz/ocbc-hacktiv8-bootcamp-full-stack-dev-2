import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import QueueList from './atomic/queue_list';
import QueueInput from './atomic/queue_input';

function QueueComponent() {

    const [queue, setQueue] = useState<string[]>(['Roychan','Keysha', 'Fenny', 'Wicak'])
    const [inputName, setInputName] = useState<string>('')
    const [queueHistory, setQueueHistory] = useState<string[][]>([
        ['Roychan','Keysha', 'Fenny'],
        ['Roychan','Keysha'],
        ['Roychan'],
        [],
    ]) //mock

    const majukan = () => {
        let tempQueue = queue;
        tempQueue.shift()
        setQueue([...tempQueue])
    }

    useEffect(()=>{
        setQueueHistory([[...queue],...queueHistory])
    },[queue])

    const undo = () => {
        if (queueHistory.length>1) {
            setQueue(queueHistory[1])
            let tempQueueHistory = queueHistory;
            tempQueueHistory.shift()
            tempQueueHistory.shift() //2x untuk cancel useffect
            setQueueHistory([...tempQueueHistory])
        }
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
            '& > :not(style)': { m: 1, width: '40ch' },
            }}
            noValidate
            autoComplete="off"
        >

            <QueueInput majukanFunc={majukan} setQueueFunc={setQueue} setInputNameFunc={setInputName} queue={queue} inputName={inputName} undo={undo}/>
            <QueueList queue={queue} setQueueFunc={setQueue}/>

        </Box>

        </Grid>         
    )
}

export default QueueComponent