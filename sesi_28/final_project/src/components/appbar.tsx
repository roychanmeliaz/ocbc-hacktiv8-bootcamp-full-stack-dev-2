import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";

function AppBarComponent() {
    let navigate = useNavigate()
    function goHome() {
        navigate(`/`, { replace: true });
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
                    CRUD - Roy 021
                </Typography>
                <Button onClick={goHome} color="inherit">HOME</Button>
                {/* <Button color="inherit">DEBUG</Button> */}
                </Toolbar>
            </AppBar>
        </Box>

        );
    }

export default AppBarComponent; 