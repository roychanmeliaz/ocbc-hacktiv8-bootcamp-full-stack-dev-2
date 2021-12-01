import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

const initialState = {
    loading: {
        status: false
    },
    lastOperation: {
        status: "", // "", "success", or "error"
        message: "",
    },
    people: [
    ]
}

// reducer
const people = (state=initialState, action:any) => {
    console.log(action)
    switch(action.type) {
        case 'SET_LAST_OPERATION':
            return { ...state, lastOperation: action.data }
        case 'SET_PEOPLE':
            return { ...state, people: action.data }
        case 'SET_LOADING':
            return { ...state, loading: action.data }
        default:
            return state
    }
}

const enhancer = applyMiddleware(thunk)
// create store here
const store = createStore(people, enhancer)

export default store