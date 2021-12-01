import { Alert, AlertColor, Button, Snackbar, Stack, TextField } from "@mui/material"
import { FC, useEffect, useState } from "react"
import useEffectNonInit from "../../customHooks/useEffectNonInit"

// redux
import { 
    useDispatch,  //dipakai untuk melempar action
    useSelector,   //ambil state dari sebuah store
} from 'react-redux'
import { addPeople, editPeople, getAllPeople, resetLastOperation } from '../../store/action';
import axios from "axios";

export interface InputInterface {
    key:string,
    firstName: string,
    lastName: string,
}

export interface Props {
    inputMode: string,
    inputValue: InputInterface,
    cancelEdit: Function,
}

const InputComponent:FC<Props> = (props)=>{

    // for forms
    const [inputCanErr, setinputCanErr] = useState(true)

    const [inputKey, setInputKey] = useState("")
    const [inputKeyErr, setInputKeyErr] = useState(false)
    const [inputKeyErrMessage, setInputKeyErrMessage] = useState("")
    const [inputKeyDisabled, setInputKeyDisabled] = useState(false)
    
    const [inputFirstName, setInputFirstName] = useState("")
    const [inputFirstNameErr, setInputFirstNameErr] = useState(false)
    const [inputFirstNameErrMessage, setInputFirstNameErrMessage] = useState("")
    
    const [inputLastName, setInputLastName] = useState("")
    const [inputLastNameErr, setInputLastNameErr] = useState(false)
    const [inputLastNameErrMessage, setInputLastNameErrMessage] = useState("")

    // snackbar
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("")
    const [snackType, setSnackType] = useState<AlertColor>("success")
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpenSnackbar(false);
    };

    // redux
    const state:any = useSelector((state)=>state)
    const dispatch = useDispatch()

    // on init
    useEffect(()=>{
        if (state.lastOperation.status!=="") {
            dispatch(resetLastOperation())          
            setOpenSnackbar(true)
            setSnackType(state.lastOperation.status)
            setSnackBarMessage(state.lastOperation.message)
        }
    },[state.lastOperation])

    // reset the form
    function resetForm() {
        if (props.inputMode==="edit") {
            setInputKeyErr(false)
            setInputKeyErrMessage("")
            
            setInputKey(props.inputValue.key)
            setInputKeyDisabled(true)
            setInputFirstName(props.inputValue.firstName)
            setInputLastName(props.inputValue.lastName)
        }
        else {
            setinputCanErr(false)
            setTimeout(()=>{
                setinputCanErr(true)
                setInputKeyErr(false)
                setInputFirstNameErr(false)
                setInputLastNameErr(false)
                setInputKeyErrMessage("")
                setInputFirstNameErrMessage("")
                setInputLastNameErrMessage("")
            },10)
            console.log("WOY")
            setInputKey("")
            setInputKeyDisabled(false)
            setInputFirstName("")
            setInputLastName("")
        }
    }

    // changes in inputMode or select edit
    useEffect(()=>{
        resetForm()
    },[props.inputMode, props.inputValue.key])

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

    // validate key function
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

    // validate fname function
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

    // validate lname function
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

    // validate all
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

    // add person on click
    const handleSubmit = () => {
        if (checkValidate()) {
            dispatch(addPeople({
                key: inputKey,
                firstName: inputFirstName,
                lastName: inputLastName
            }))
            resetForm()
        }
        console.log("submitting")
    }

    // edit person on click
    const handleEdit = () => {
        if (checkValidate()) {
            dispatch(editPeople({
                key: inputKey,
                firstName: inputFirstName,
                lastName: inputLastName
            }))
            props.cancelEdit()
        }
        console.log("submitting")
    }

    function checkInputtedKey() {
        if (validateKey() && props.inputMode==="add") {
            console.log("now checking key...")
            axios.get(`http://localhost:5000/keys/${inputKey}`)
            .then((response:any) => {
                setInputKeyErr(true)
                setInputKeyErrMessage(`Key ${inputKey} has been used`)
            })
            .catch((error:any) => {
                setInputKeyErr(false)
                setInputKeyErrMessage(`Key ${inputKey} available`)
            })
        }
    }

    return (
        <>
            {/* snackbar */}
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={snackType} sx={{ width: '100%' }}>
                        {snackBarMessage}
                    </Alert>
                </Snackbar>
            </Stack>

            {/* input field */}
            <div>
                <TextField 
                onChange={event => setInputKey(event.target.value)}
                value={inputKey}
                error={inputKeyErr && inputCanErr}
                helperText={inputKeyErrMessage}
                disabled={inputKeyDisabled}
                onBlur={checkInputtedKey}
                id="inputKey" label="Key (number)" variant="outlined" fullWidth/>
            </div>
            <div>
                <TextField 
                onChange={event => setInputFirstName(event.target.value)}
                value={inputFirstName}
                error={inputFirstNameErr && inputCanErr}
                helperText={inputFirstNameErrMessage}
                id="inputFirstName" label="First Name (1-15 character)" variant="outlined" fullWidth />
            </div>
            <div>
                <TextField 
                onChange={event => setInputLastName(event.target.value)}
                value={inputLastName}
                error={inputLastNameErr && inputCanErr}
                helperText={inputLastNameErrMessage}
                id="inputLastName" label="Last Name (1-15 character)" variant="outlined" fullWidth />
            </div>
            {
                props.inputMode=="add" ?
                <div>
                    <Button
                    onClick={handleSubmit}
                    variant="outlined" fullWidth >Add</Button>
                </div>
                :
                <>
                <div>
                    <Button
                    onClick={handleEdit}
                    variant="outlined" fullWidth >Edit</Button>
                </div>
                <div>
                    <Button
                    onClick={() => props.cancelEdit()}
                    variant="outlined" fullWidth >Cancel</Button>
                </div>
                </>
            }
        </>
    )
}

export default InputComponent