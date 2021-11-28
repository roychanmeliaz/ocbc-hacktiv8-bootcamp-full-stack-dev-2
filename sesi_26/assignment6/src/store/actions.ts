export function setTasks(value:any) {
    return  async(dispatch:any) => {
        setTimeout(()=>{
            dispatch({ type: 'SET_TASKS', data: value })
        },500)
    }
}