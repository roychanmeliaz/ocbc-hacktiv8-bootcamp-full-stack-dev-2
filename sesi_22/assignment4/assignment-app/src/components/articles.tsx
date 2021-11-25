// Materials
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import Modal from '@mui/material/Modal';
import { useTheme } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';

import { useState, useEffect } from "react";

interface Article {
    id: number,
    date: Date,
    title: string,
    body: string
}

export default function Articles() {
    const theme = useTheme();

    const [baseURL] = useState('http://127.0.0.1:5000/articles')    
    const [articles,setArticles] = useState([])

    const [open, setOpen] = React.useState(false);
    const [currentArticle, setCurrentArticle] = React.useState<Article>({
        id: 0,
        date: new Date(),
        title: "",
        body: ""
    });
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function moreClicked(article:Article):void {
        handleOpen();
        setCurrentArticle(article);
    }

    useEffect(()=>{
        fetch(baseURL)
        .then(response => response.json())
        .then(result => setArticles(result))
        .catch((error) => {
            console.log(error);
        });
    },[])

    if (articles.length===0) {
        return (
            <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>    
                <p>Cannot receive articles... Bad network?</p>
            </Grid>
        )
    } else

    return (
    <>
        <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
        {
            articles.map((article: Article) => {
                let shortbody= article.body.substr(0, article.body.indexOf('.'))+"..."; 
                if (open)
                    return <></>
                else
                return (
                    <Grid item xs={3} key={article.id}>
                        <br />
                        <Card sx={{ minWidth: 300, maxWidth: 300, minHeight: 380, maxHeight: 380}}>
                            <CardMedia
                                component="img"
                                height="140"
                                image="https://markateur.com/wp-content/uploads/2017/04/articles.jpg"
                                alt="article image"
                            />
                            <CardContent style={{
                                // backgroundColor: "#FBF3E4"
                                }}>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    {new Date(article.date).toLocaleDateString("en-US",{ weekday: "long", year: 'numeric', month: 'long', day: 'numeric' })}
                                </Typography>
                                <Typography variant="h5" component="div">
                                    {article.title}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    article
                                </Typography>
                                <Typography variant="body2">
                                    {shortbody}
                                </Typography>
                            </CardContent>
                            <CardActions style={{
                                // backgroundColor: "#Ebf9ff"
                                }}>
                                <Button onClick={()=>moreClicked(article)} size="small">Read more</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                )
            })
            
        }
        </Grid>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: `0px solid ${theme.palette.primary.main}`,
                boxShadow: 24,
                p: 4,
            }}>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {new Date(currentArticle.date).toLocaleDateString("en-US",{ weekday: "long", year: 'numeric', month: 'long', day: 'numeric' })}
            </Typography>
            <Typography variant="h5" component="div">
                {currentArticle.title}
            </Typography>
            <Typography variant="body2">
                <br/>{currentArticle.body}
            </Typography>
            </Box>
        </Modal>

    </>
    )
}