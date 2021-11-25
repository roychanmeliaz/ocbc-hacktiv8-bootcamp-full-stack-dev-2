// import {Action, createStore} from 'redux';
// // const {createStore} = require('redux')

// export interface CounterModel {
//     counter: number
// }

// export interface ActionModel extends Action {
//     type: string
//     payload?: number
// }

// const initialState:CounterModel = {
//     counter: 0
// }

// // reducer
// const counter = (state=initialState, action:ActionModel) => {
//     console.log(action)
//     switch(action.type) {
//         case 'SET_COUNTER':
//             return { counter: action.payload }
//         case 'INCREMENT':
//             return { counter: state.counter+1 }
//         case 'DECREMENT':
//             return { counter: state.counter-1 }
//         default:
//             return state
//     }
// }

// // create store here
// const store = createStore<CounterModel, ActionModel, unknown, unknown>(counter)

// // // get state from store
// // store.subscribe(()=> {
// //     console.log(store.getState())
// // })

// export default store