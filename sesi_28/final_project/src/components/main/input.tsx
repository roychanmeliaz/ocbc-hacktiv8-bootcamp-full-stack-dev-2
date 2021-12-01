import { Alert, AlertColor, Button, Snackbar, Stack, TextField } from "@mui/material"
import { FC, useEffect, useState } from "react"
import useEffectNonInit from "../../customHooks/useEffectNonInit"

// redux
import { 
    useDispatch,  //dipakai untuk melempar action
    useSelector,   //ambil state dari sebuah store
} from 'react-redux'
import { addPeople, editPeople, getAllPeople, resetLastOperation } from '../../store/action';
import { styled } from "@mui/system";

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
    const [inputKeyColor, setInputKeyColor] = useState("green")
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

    // validation field
    const ValidationTextField = styled(TextField)({
        '& input:valid + fieldset': {
            borderColor: inputKeyColor,
            borderWidth: 2,
        },
        "&.MuiFormHelperText-root.Mui-error" :{
            color: 'green',
        },
    });

    // on init
    useEffect(()=>{
        setTimeout(()=>{
            setInputKeyColor("blue")
        },2000)

        if (state.lastOperation.status!=="") {
            dispatch(resetLastOperation())          
            setOpenSnackbar(true)
            setSnackType(state.lastOperation.status)
            setSnackBarMessage(state.lastOperation.message)
        }
    },[state.lastOperation])

    // changes in inputMode or select edit
    useEffect(()=>{
        if (props.inputMode==="edit") {
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
            setInputKey("")
            setInputKeyDisabled(false)
            setInputFirstName("")
            setInputLastName("")
        }
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

    // useEffectNonInit(()=>{
    //     setinputCanErr(true)        
    // },[inputKey,inputFirstName,inputLastName])

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
        if (checkValidate()) {
            dispatch(addPeople({
                key: inputKey,
                firstName: inputFirstName,
                lastName: inputLastName
            }))
        }
        console.log("submitting")
    }

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

    return (
        <>
            {/* <form onSubmit={handleSubmit}> */}
            {/* <div>
            <ValidationTextField
                label="CSS validation style"
                required
                variant="outlined"
                defaultValue="Success"
                id="validation-outlined-input"
                helperText="Key 021 available"
                fullWidth
            />
            </div> */}

            {/* snackbar */}
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={snackType} sx={{ width: '100%' }}>
                        {/* {snackType==="success" ? "Add task success!" : "Input 5-20 characters only!"} */}
                        {snackBarMessage}
                    </Alert>
                </Snackbar>
            </Stack>

            <div>
                <TextField 
                onChange={event => setInputKey(event.target.value)}
                value={inputKey}
                error={inputKeyErr && inputCanErr}
                helperText={inputKeyErrMessage}
                disabled={inputKeyDisabled}
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
                    // type="submit"
                    variant="outlined" fullWidth >Add</Button>
                </div>
                :
                <>
                <div>
                    <Button
                    onClick={handleEdit}
                    // type="submit"
                    variant="outlined" fullWidth >Edit</Button>
                </div>
                <div>
                    <Button
                    onClick={() => props.cancelEdit()}
                    // type="submit"
                    variant="outlined" fullWidth >Cancel</Button>
                </div>
                </>
            }
            {/* </form> */}
        </>
    )
}

export default InputComponent