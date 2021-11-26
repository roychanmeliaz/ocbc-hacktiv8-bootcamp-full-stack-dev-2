import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
// const {createStore} = require('redux')

const initialState = {
    counter: 0
}

// reducer
const counter = (state=initialState, action) => {
    console.log(action)
    switch(action.type) {
        case 'SET_COUNTER':
            return { counter: action.payload }
        case 'INCREMENT':
            return { counter: state.counter+1 }
        case 'DECREMENT':
            return { counter: state.counter-1 }
        default:
            return state
    }
}

const enhancer = applyMiddleware(thunk)
// create store here
const store = createStore(counter, enhancer)

// // get state from store
// store.subscribe(()=> {
//     console.log(store.getState())
// })

export default store