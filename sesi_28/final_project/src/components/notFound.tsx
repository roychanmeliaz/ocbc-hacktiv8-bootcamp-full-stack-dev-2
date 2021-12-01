import { Grid, Typography } from "@mui/material"

const NotFound=()=>{
    return (
        <>
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            height="80vh"
        >
            <div>
            <Typography align="center" variant="h1" component="p" sx={{ flexGrow: 1}}>
                404...
            </Typography><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            </div>
            <div>
            <Typography align="center" variant="h2" component="p" sx={{ flexGrow: 1}}>
                You are lost, buddy.
            </Typography>
            </div>
        </Grid>
        </>
    )
}

export default NotFound