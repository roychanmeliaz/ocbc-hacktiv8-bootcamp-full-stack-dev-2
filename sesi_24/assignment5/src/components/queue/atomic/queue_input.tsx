import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';


import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { AlertColor } from '@mui/material';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export interface Props {
    majukanFunc: Function
    setQueueFunc: Function
    setInputNameFunc: Function
    queue: string[];
    inputName: string;
    undo: Function;
}

const QueueInput:React.FC<Props> = (props)=>{

    const [open, setOpen] = useState(false);
    const [snackType, setSnackType] = useState<AlertColor>("success")

    const handleClick = (type:AlertColor) => {
        setOpen(true);
        setSnackType(type)
    };

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };

    const handleInput = () => {
        if (props.inputName.length>4 && props.inputName.length<16) {
            handleClick("success")
            props.setQueueFunc([...props.queue, props.inputName])
        }
        else {
            handleClick("error")
        }
    }

    return (
        <>

            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={snackType} sx={{ width: '100%' }}>
                        {snackType==="success" ? "Menambahkan antrian berhasil!" : "Masukkan input berjumlah 5-15 karakter"}
                    </Alert>
                </Snackbar>
            </Stack>



            <Divider style={{marginTop: "24px", marginBottom: "24px"}}>
                <Chip label="Masukkan antrian" />
            </Divider>
            <div>
                <TextField onChange={event => props.setInputNameFunc(event.target.value)} id="outlined-basic" label="Masukkan nama (5-15 karakter)" variant="outlined" fullWidth />
            </div>
            <div>
                <Button onClick={() => handleInput()} variant="outlined" fullWidth >Antrikan</Button>
            </div>
            <div>
                <Button onClick={() => props.majukanFunc()} variant="outlined" color="success" fullWidth >Majukan</Button>
            </div>
            <div>
                <Button onClick={() => props.undo()} variant="outlined" color="secondary" fullWidth >Undo</Button>
            </div>
        </>
    )
}

export default QueueInput