import * as React from 'react';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';

export interface Props {
    queue: string[];
    setQueueFunc: Function
}

const QueueList:React.FC<Props> = (props) => {

    function moveUp(index:number) {
        let tempQueue = props.queue
        let temp=tempQueue[index]
        tempQueue[index] = tempQueue[index-1]
        tempQueue[index-1] = temp
        props.setQueueFunc([...tempQueue])
    }

    function moveDown(index:number) {
        let tempQueue = props.queue
        let temp=tempQueue[index]
        tempQueue[index] = tempQueue[index+1]
        tempQueue[index+1] = temp
        props.setQueueFunc([...tempQueue])
    }

    return (
        <>


            <Divider style={{marginTop: "48px", marginBottom: "24px"}}>
                <Chip label="Antrian" />
            </Divider>

            {(() => {
            if (props.queue.length === 0){
                return (
                    <p style={{textAlign: "center"}}>Antrian kosong</p>
                )
            }
            return null;
            })()}

            <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {props.queue.map((value, index) => {
                    const labelId = `checkbox-list-secondary-label-${value}`;
                    return (
                    <div key={index}>
                        <ListItem
                            key={index}
                            secondaryAction={
                            <>
                                {
                                    props.queue.length > 1 ? <>
                                    {
                                        index===0 ?
                                            <>
                                            <Button disabled={true} onClick={() => moveUp(index)} variant="outlined">▲</Button>
                                            <Button onClick={() => moveDown(index)} variant="outlined">▼</Button>
                                            </> : <></>
                                    }
                                    {
                                        index===props.queue.length-1 ?
                                            <>
                                            <Button onClick={() => moveUp(index)} variant="outlined">▲</Button>
                                            <Button disabled={true} onClick={() => moveDown(index)} variant="outlined">▼</Button> 
                                            </> : <></>
                                    }
                                    {
                                        index!==props.queue.length-1 && index!==0 ?
                                            <>
                                            <Button onClick={() => moveUp(index)} variant="outlined">▲</Button>
                                            <Button onClick={() => moveDown(index)} variant="outlined">▼</Button> 
                                            </> : <></>
                                    }
                                    </>:<></>
                                }
                            </>
                            }
                            disablePadding
                        >
                            <ListItemButton>
                            <ListItemAvatar>
                                <Avatar
                                alt={`Avatar ${value}`}
                                // src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${value}`}
                                src={`https://ui-avatars.com/api/?background=random&color=fff&name=${value}`}
                                />
                            </ListItemAvatar>
                            <ListItemText id={labelId} primary={`${index+1}. ${value}`} />
                            </ListItemButton>
                        </ListItem>
                        <Divider></Divider>
                    </div>
                    );
                })}
            </List>


            {/*
            //VERSI LAMA

            <Divider style={{marginTop: "48px", marginBottom: "24px"}}>
                <Chip label="Antrian" />
            </Divider>

            {(() => {
            if (props.queue.length === 0){
                return (
                    <p style={{textAlign: "center"}}>Tidak ada data</p>
                )
            }
            return null;
            })()}

            {
                props.queue.map((value, index) => {
                    return (
                        <div key={index}>
                            <p key={index} style={{textAlign: "center"}}>{index+1}. {value}</p>
                            <Divider>^</Divider>
                        </div>
                    )
                })
            }    */}
        </>
    )
}

export default QueueList