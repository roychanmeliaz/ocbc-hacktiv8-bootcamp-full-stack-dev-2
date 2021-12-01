import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';

// redux
import { 
    useSelector,   //ambil state dari sebuah store
} from 'react-redux'

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

function LoadingModalComponent() {
    // redux
    const state:any = useSelector((state)=>state)

    // modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // init
    useEffect(()=>{
        if (state.loading.status===true) {
            handleOpen()
        }
        else {
            handleClose()
        }
    },[state.loading])
  
    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
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
    );
  }

export default LoadingModalComponent