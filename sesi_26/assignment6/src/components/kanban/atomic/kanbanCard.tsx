import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import KanbanCardListComponent from './kanbanCardList';
import { FC, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import { 
    useDispatch,  //dipakai untuk melempar action
    useSelector,   //ambil state dari sebuah store
} from 'react-redux'
import { setTasks } from '../../../store/actions';

export interface Props {
    role: number,
}

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

const KanbanCardComponent:FC<Props> = (props) => {

    const [bgCol, setBgCol] = useState("#ffffff")
    const [openLoad, setOpenLoad] = useState(false);
    const handleOpenLoad = () => {
        setOpenLoad(true);
        setTimeout(()=>{
            setOpenLoad(false);
        },500)
    }
    const handleCloseLoad = () => setOpenLoad(false);

    const state:any = useSelector((state)=>state)
    const dispatch = useDispatch()

    // redux thunk
    const setNewTasks = (value:any) => {dispatch(setTasks(value))}

    const majukan = (index:number) => {
        handleOpenLoad()
        let newTasks = state.tasks
        newTasks[index].role = state.tasks[index].role+1
        setNewTasks(newTasks)
    }
    const mundurkan = (index:number) => {
        handleOpenLoad()
        let newTasks = state.tasks
        newTasks[index].role = state.tasks[index].role-1
        setNewTasks(newTasks)
    }

    const hapuskan = (index:number) => {
        handleOpenLoad()
        let newTasks = state.tasks
        newTasks[index].role = -1
        setNewTasks(newTasks)
    }

    const [title, setTitle] = useState<string>("")
    const [subTitle, setSubTitle] = useState<string>("")

    useEffect(()=>{
        switch (props.role) {
            case 0:
                setTitle("Backlog")
                setSubTitle("List of tasks")
                setBgCol("#F2ffef")
                break
            case 1:
                setTitle("In progress")
                setSubTitle("Ongoing tasks")
                setBgCol("#Ffffef")
                break
            case 2:
                setTitle("Evaluation")
                setSubTitle("Under monitor tasks")
                setBgCol("#Fff2ef")
                break
            case 3:
                setTitle("Done")
                setSubTitle("Finished tasks")
                setBgCol("#F0efff")
                    break
        }
    },[])

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


        <Grid item xs={2.5} key={props.role}>
            <br />
            <Card sx={{}}>
                <CardMedia
                    component="img"
                    height="100"
                    image={`https://picsum.photos/300/100?random=${props.role}`}
                    alt={`${title} image`}
                />
                <CardContent style={{
                    backgroundColor: bgCol
                    }}>
                    <Typography variant="h5" component="div">
                        <b>{title}</b>
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {subTitle}
                    </Typography>
                    
                    {
                        state.tasks.map((task:any, index:number) => {
                            if (task.role===props.role)
                                return (
                                    <KanbanCardListComponent title={task.title} description={task.description} index={index} majukanFnc={majukan} mundurkanFnc={mundurkan} role={props.role} hapuskanFnc={hapuskan}/>
                                )
                            else return (<></>)
                        })
                    }

                </CardContent>
            </Card>
        </Grid>
        </>
    )
}

export default KanbanCardComponent