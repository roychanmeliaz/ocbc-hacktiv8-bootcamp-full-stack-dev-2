import { Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useParams } from "react-router"
const axios = require('axios').default;

const PersonComponent=()=>{
    let params = useParams()
    const [person, setPerson] = useState<any>([])

    useEffect(()=>{
        axios.get(`http://localhost:5000/keys/${params.id}`)
        .then((response:any) => {
            console.log("response")
            console.log(response)
            setPerson(response.data)
        })
        .catch((error:any) => {
            console.log("error")
            console.log(error)
        })
    },[])

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
                id: {params.id}
            </Typography><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            </div>
            <div>
            <Typography align="center" variant="h2" component="p" sx={{ flexGrow: 1}}>
                firstName: {person.firstName}<br />
                lastName: {person.lastName}
            </Typography>
            </div>
        </Grid>
        </>
    )
}

export default PersonComponent