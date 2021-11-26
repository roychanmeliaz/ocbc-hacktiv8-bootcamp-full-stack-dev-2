export function increment() {
    return  async(dispatch) => {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
        const json = await response.json()
        console.log(json)

        setTimeout(()=>{
            dispatch({ type: 'INCREMENT' })
        },1000)
    }
}

export function decrement() {
    return { type: 'DECREMENT' }
}

export function setCounter(value) {
    return { type: 'SET_COUNTER', payload: value }
}