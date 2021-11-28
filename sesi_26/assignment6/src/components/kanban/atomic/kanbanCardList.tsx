import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { FC } from 'react';

export interface Props {
    title: string,
    description: string,
    index:number,
    majukanFnc:Function,
    mundurkanFnc:Function,
    hapuskanFnc:Function,
    role:number
}

const KanbanCardListComponent:FC<Props> = (props) => {


    return (
        <List sx={{ width: '100%', maxWidth: 360,  }}>
            <Divider />
            <ListItem alignItems="flex-start">
                <ListItemText
                primary={props.title}
                secondary={
                    <>
                    <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                    >
                        Roy
                    </Typography>
                    {` — ${props.description}`}
                    <div>
                        {
                            props.role>=1 ? <Button variant="text" onClick={() => props.mundurkanFnc(props.index)}>◄</Button> : <></>
                        }
                        <Button variant="text" onClick={() => props.hapuskanFnc(props.index)}>✕</Button>                        
                        {
                            props.role<=2 ? <Button variant="contained" onClick={() => props.majukanFnc(props.index)} style={{float: "right"}}>►</Button>: <></>
                        }
                    </div>
                    </>
                }
                />
            </ListItem>

        </List>
    )
}
export default KanbanCardListComponent