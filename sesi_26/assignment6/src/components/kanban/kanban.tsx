import { Chip, Divider, Grid } from '@mui/material';
import { Box } from '@mui/system';
import KanbanCardComponent from './atomic/kanbanCard';
import KanbanInput from './atomic/kanbanInput';

function KanbanComponent() {
  
    return (
        <>
        <Divider style={{marginTop: "24px", marginBottom: "24px"}}>
            <Chip label="Add task " />
        </Divider>
        <Grid container spacing={2} justifyContent="center" >
        <Box component="form" sx={{'& > :not(style)': { m: 1, width: '40ch' },}} noValidate autoComplete="off">
            <KanbanInput />
        </Box>
        </Grid>
        <Divider style={{marginTop: "24px", marginBottom: "24px"}}>
            <Chip label="Kanban board " />
        </Divider>
        <Grid container spacing={2} justifyContent="center"  style={{ minHeight: '100vh' }}>
        {
            [0,1,2,3].map((num: number) => {
                return (
                    <KanbanCardComponent role={num} />
                )
            })
        }
        </Grid>
        </>
    )
}

export default KanbanComponent