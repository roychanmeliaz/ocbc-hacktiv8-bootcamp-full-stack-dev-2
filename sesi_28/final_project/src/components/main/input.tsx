import { Button, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import useEffectNonInit from "../../customHooks/useEffectNonInit"

const InputComponent = ()=>{

    const [inputKey, setInputKey] = useState("")
    const [inputKeyErr, setInputKeyErr] = useState(false)
    const [inputKeyErrMessage, setInputKeyErrMessage] = useState("")
    
    const [inputFirstName, setInputFirstName] = useState("")
    const [inputFirstNameErr, setInputFirstNameErr] = useState(false)
    const [inputFirstNameErrMessage, setInputFirstNameErrMessage] = useState("")
    
    const [inputLastName, setInputLastName] = useState("")
    const [inputLastNameErr, setInputLastNameErr] = useState(false)
    const [inputLastNameErrMessage, setInputLastNameErrMessage] = useState("")

    // validate key only on change
    useEffectNonInit(()=>{
        validateKey()
    }, [inputKey])

    // validate fname only on change
    useEffectNonInit(()=>{
        validateFirstName()
    }, [inputFirstName])

    // validate lname only on change
    useEffectNonInit(()=>{
        validateLastName()
    }, [inputLastName])

    const validateKey=()=>{
        if (inputKey.length===0) {
            setInputKeyErr(true)
            setInputKeyErrMessage("Insert key.")
            return false
        }

        let regex = new RegExp(/^[0-9]*$/)
        if (regex.test(inputKey)===false) {
            setInputKeyErr(true)
            setInputKeyErrMessage("Insert numbers only.")
            return false
        }

        setInputKeyErr(false)
        setInputKeyErrMessage("")
        return true
    }

    const validateFirstName=()=>{
        if (inputFirstName.length===0) {
            setInputFirstNameErr(true)
            setInputFirstNameErrMessage("Insert first name.")
            return false
        }

        if (inputFirstName.length > 15) {
            setInputFirstNameErr(true)
            setInputFirstNameErrMessage("Maximum 15 characters.")
            return false
        }

        let regex = new RegExp(/^[a-z A-Z]*$/)
        if (regex.test(inputFirstName)===false) {
            setInputFirstNameErr(true)
            setInputFirstNameErrMessage("Permitted format: alphabets and space only.")
            return false
        }

        setInputFirstNameErr(false)
        setInputFirstNameErrMessage("")
    return true
    }

    const validateLastName=()=>{
        if (inputLastName.length===0) {
            setInputLastNameErr(true)
            setInputLastNameErrMessage("Insert last name.")
            return false
        }

        if (inputLastName.length > 15) {
            setInputLastNameErr(true)
            setInputLastNameErrMessage("Maximum 15 characters.")
            return false
        }

        let regex = new RegExp(/^[a-z A-Z]*$/)
        if (regex.test(inputLastName)===false) {
            setInputLastNameErr(true)
            setInputLastNameErrMessage("Permitted format: alphabets and space only.")
            return false
        }

        setInputLastNameErr(false)
        setInputLastNameErrMessage("")
        return true
    }

    const checkValidate = () => {
        let passValidation = true

        let keyValidated = validateKey()
        let fnameValidated = validateFirstName()
        let lnameValidated = validateLastName()

        if (!keyValidated || !fnameValidated || !lnameValidated) {
            passValidation = false
        }
        return passValidation
    }

    const handleSubmit = () => {
        checkValidate()
        console.log("submitting")
    }

    useEffect(()=>{
        console.log(inputKey)
    },[inputKey])

    return (
        <>
            {/* <form onSubmit={handleSubmit}> */}
            <div>
                <TextField 
                onChange={event => setInputKey(event.target.value)}
                value={inputKey}
                error={inputKeyErr}
                helperText={inputKeyErrMessage}
                id="inputKey" label="Key (number)" variant="outlined" fullWidth/>
            </div>
            <div>
                <TextField 
                onChange={event => setInputFirstName(event.target.value)}
                value={inputFirstName}
                error={inputFirstNameErr}
                helperText={inputFirstNameErrMessage}
                id="inputFirstName" label="First Name (1-15 character)" variant="outlined" fullWidth />
            </div>
            <div>
                <TextField 
                onChange={event => setInputLastName(event.target.value)}
                value={inputLastName}
                error={inputLastNameErr}
                helperText={inputLastNameErrMessage}
                id="inputLastName" label="Last Name (1-15 character)" variant="outlined" fullWidth />
            </div>
            <div>
                <Button
                onClick={handleSubmit}
                // type="submit"
                variant="outlined" fullWidth >Add</Button>
            </div>
            {/* </form> */}
        </>
    )
}

export default InputComponent