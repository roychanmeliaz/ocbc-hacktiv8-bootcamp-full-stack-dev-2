const axios = require('axios').default;
        
export function setTasks(value:any) {
    return async(dispatch:any) => {
        setTimeout(()=>{
            dispatch({ type: 'SET_TASKS', data: value })
        },500)
    }
}

export function resetLastOperation() {
    return async(dispatch:any) => {
        dispatch({ type: 'SET_LAST_OPERATION', data: {status:"",message:""} })
    }
}

export function addPeople(value:any) {
    return async(dispatch:any) => {
        console.log("action: adding...")
        axios.post('http://localhost:5000/keys', value)
        .then((response:any) => {
            console.log("response")
            console.log(response)
            dispatch({ type: 'SET_LAST_OPERATION', data: {status:"success",message:`Add ${value.firstName} ${value.lastName} success`} })
            dispatch(getAllPeople())
        })
        .catch((error:any) => {
            console.log("error")
            console.log(error)
            dispatch({ type: 'SET_LAST_OPERATION', data: {status:"error",message:`Add ${value.firstName} ${value.lastName} failed`} })
        })
    }
}

export function editPeople(value:any) {
    return async(dispatch:any) => {
        console.log("action: adding...")
        axios.put(`http://localhost:5000/keys/${value.key}`, value)
        .then((response:any) => {
            console.log("response")
            console.log(response)
            dispatch({ type: 'SET_LAST_OPERATION', data: {status:"success",message:`Edit ${value.firstName} ${value.lastName} success`} })
            dispatch(getAllPeople())
        })
        .catch((error:any) => {
            console.log("error")
            console.log(error)
            dispatch({ type: 'SET_LAST_OPERATION', data: {status:"error",message:`Edit ${value.firstName} ${value.lastName} failed`} })
        })
    }
}

export function getPeople(value:any) {
    return async(dispatch:any) => {
        console.log("action: adding...")
        axios.get(`http://localhost:5000/keys/${value}`)
        .then((response:any) => {
            console.log("response")
            console.log(response)
        })
        .catch((error:any) => {
            console.log("error")
            console.log(error)
        })
    }
}

export function deletePeople(value:any) {
    return async(dispatch:any) => {
        axios.delete(`http://localhost:5000/keys/${value}`)
        .then((response:any) => {
            console.log("response")
            console.log(response)
            dispatch({ type: 'SET_LAST_OPERATION', data: {status:"success",message:`Delete id ${value} success`} })
            dispatch(getAllPeople())
        })
        .catch((error:any) => {
            console.log("error")
            console.log(error)
            dispatch({ type: 'SET_LAST_OPERATION', data: {status:"error",message:`Delete id ${value} failed`} })
        })
    }
}

export function getAllPeople() {
    return async(dispatch:any) => {
        axios.get('http://localhost:5000/debug')
        .then((response:any) => {
            console.log("getting all...")
            console.log(response.data)
            let people:any=[]
            Object.keys(response.data).map((key)=>{
                const result = {
                    id: response.data[key].key,
                    key,
                    firstName: response.data[key].firstName,
                    lastName: response.data[key].lastName
                }
                people.push(result)
            })
            dispatch({ type: 'SET_PEOPLE', data: people })
        })
        .catch((error:any) => {
            console.log(error)
        })
    }
}