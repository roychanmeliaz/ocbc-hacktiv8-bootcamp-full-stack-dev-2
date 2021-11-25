import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';

function AppBarComponent() {
    return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "center"}}>
                Queue System - 021 Roy
                </Typography>
            </Toolbar>
        </AppBar>
    </Box>
    )
}

export default AppBarComponent