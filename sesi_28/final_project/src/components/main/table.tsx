import { Button, } from "@mui/material";
import { DataGrid, GridApi, GridColDef, GridValueGetterParams } from "@mui/x-data-grid"
import { FC, useEffect, useState } from "react";

// redux
import { 
    useDispatch,  //dipakai untuk melempar action
    useSelector,   //ambil state dari sebuah store
} from 'react-redux'
import { getAllPeople, deletePeople, getPeople } from '../../store/action';
import { useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

// modal
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 200,
  bgcolor: 'background.paper',
//   border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface Props {
    initEdit: Function
}

const TableComponent:FC<Props> = (props) => {
    let navigate = useNavigate();

    const [selectedName, setSelectedName] = useState("")
    const [selectedKey, setSelectedKey] = useState()
    function deletePerson() {
        dispatch(deletePeople(selectedKey))
        handleClose()
    }

    // table column
    const columns: GridColDef[] = [
        { field: 'key', headerName: 'Key', width: 70 },
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        {
            field: "more",
            headerName: "",
            sortable: false,
            disableColumnMenu:true,
            renderCell: (params) => {
                const onClick = () => {
                    const api: GridApi = params.api;
                    const fields = api
                      .getAllColumns()
                      .map((c) => c.field)
                      .filter((c) => c !== "__check__" && !!c);
                    const thisRow: any = {};
                
                    fields.forEach((f) => {
                      thisRow[f] = params.getValue(params.id, f);
                    });
                    navigate(`/person/${thisRow["key"]}`, { replace: true });
                };
            
                return (
                    <>
                        <Button onClick={onClick}>More</Button>
                    </>
                )
            }
        },
        {
            field: "edit",
            headerName: "",
            sortable: false,
            disableColumnMenu:true,        
            renderCell: (params) => {
                const onClick = () => {
                    const api: GridApi = params.api;
                    const fields = api
                      .getAllColumns()
                      .map((c) => c.field)
                      .filter((c) => c !== "__check__" && !!c);
                    const thisRow: any = {};
                
                    fields.forEach((f) => {
                      thisRow[f] = params.getValue(params.id, f);
                    });

                    props.initEdit(thisRow)
                };
            
                return (
                    <>
                        <Button onClick={onClick}>Edit</Button>
                    </>
                )
            }
        },
        {
            field: "delete",
            headerName: "",
            sortable: false,
            disableColumnMenu:true,        
            renderCell: (params) => {
                const onClick = () => {
                    const api: GridApi = params.api;
                    const fields = api
                      .getAllColumns()
                      .map((c) => c.field)
                      .filter((c) => c !== "__check__" && !!c);
                    const thisRow: any = {};
                
                    fields.forEach((f) => {
                      thisRow[f] = params.getValue(params.id, f);
                    });
                    setSelectedName(`${thisRow['firstName']} ${thisRow['lastName']}`)
                    setSelectedKey(thisRow['key'])
                    handleOpen()
                };
            
                return (
                    <>
                        <Button onClick={onClick}>Delete</Button>
                    </>
                )
            }
        },
    ];

    // modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // redux
    const state:any = useSelector((state)=>state)
    const dispatch = useDispatch()

    // redux thunk
    const reduxGetAllPeople = ()=>{dispatch(getAllPeople())}

    useEffect(()=>{
        console.log(state)
        reduxGetAllPeople()
    },[])

    useEffect(()=>{
        console.log("state")
        console.log(state)
    },[state])

    return (
        <>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Delete
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Delete {selectedName}?
            </Typography><br/><br/>
            <Button onClick={deletePerson}>Delete</Button>
            <Button onClick={handleClose}>Cancel</Button>
            </Box>
        </Modal>
        <div style={{ height: 390, width: '100%' }}>
            <DataGrid
                rows={state.people}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick={true}
            />
        </div>
        </>
    )
}

export default TableComponent