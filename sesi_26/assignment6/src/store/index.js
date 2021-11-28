import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

const initialState = {
    tasks: [
        {
            title: "Kerjain assignment 5",
            description: "Bikin aplikasi antrian di react",
            role: 3
        },
        {
            title: "Kerjain assignment 6",
            description: "Bikin tugas kanban di react",
            role: 1
        },
        {
            title: "Kerjain Final Project",
            description: "Bikin crud app di react",
            role: 0
        },
        {
            title: "OJT OCBC",
            description: "on job training dengan ocbc nisp",
            role: 0
        },
    ]
}

// reducer
const tasks = (state=initialState, action) => {
    console.log(action)
    switch(action.type) {
        case 'SET_TASKS':
            return { tasks: action.data }
        default:
            return state
    }
}

const enhancer = applyMiddleware(thunk)
// create store here
const store = createStore(tasks, enhancer)

export default store