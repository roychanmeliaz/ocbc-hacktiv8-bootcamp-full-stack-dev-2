import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

function AppBarComponent() {
    return (

        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                {/* <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                </IconButton> */}
                {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign:"center"}}> */}
                <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
                    FINAL PROJECT - Roy 021
                </Typography>
                <Button color="inherit">DEBUG</Button>
                </Toolbar>
            </AppBar>
        </Box>

        );
    }

export default AppBarComponent; 