import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { AlertColor } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { 
    useDispatch,  //dipakai untuk melempar action
    useSelector,   //ambil state dari sebuah store
} from 'react-redux'
import { setTasks } from '../../../store/actions';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 100,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};
  
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const KanbanInput = ()=>{
    const state:any = useSelector((state)=>state)
    const dispatch = useDispatch()

    // redux thunk
    const setNewTasks = (value:any) => {dispatch(setTasks(value))}

    const addTask = () => {
        setNewTasks([...state.tasks,{
            title: inputTask,
            description: inputTaskDesc,
            role: 0
        }])
    }

    const [openLoad, setOpenLoad] = useState(false);
    const handleOpenLoad = () => {
        setOpenLoad(true);
        setTimeout(()=>{
            setOpenLoad(false);
        },500)
    }
    const handleCloseLoad = () => setOpenLoad(false);
    
    const [open, setOpen] = useState(false);
    const [snackType, setSnackType] = useState<AlertColor>("success")
    const [inputTask, setInputTask] = useState<string>("")
    const [inputTaskDesc, setInputTaskDesc] = useState<string>("")

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
        if (inputTask.length>4 && inputTask.length<21) {
            addTask()
            handleOpenLoad()
            setTimeout(()=>{
                handleClick("success")
            },500)
        }
        else {
            handleClick("error")
        }
    }

    return (
        <>

            <div>
                <Modal
                    open={openLoad}
                    onClose={handleCloseLoad}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Loading...
                    </Typography>
                    </Box>
                </Modal>
            </div>  

            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={snackType} sx={{ width: '100%' }}>
                        {snackType==="success" ? "Add task success!" : "Input 5-20 characters only!"}
                    </Alert>
                </Snackbar>
            </Stack>



            <div>
                <TextField 
                onChange={event => setInputTask(event.target.value)}
                id="outlined-basic" label="Task title (5-20 character)" variant="outlined" fullWidth />
            </div>
            <div>
                <TextField 
                onChange={event => setInputTaskDesc(event.target.value)}
                id="outlined-basic" label="Task description (optional)" variant="outlined" fullWidth />
            </div>
            <div>
                <Button
                onClick={() => handleInput()}
                variant="outlined" fullWidth >Add to Backlog</Button>
            </div>
        </>
    )
}

export default KanbanInput