function showInTerminal (message) {
    console.log(message)
}

function greeting(name, fnc = showInTerminal) {
    const value = `halo! namaku ${name}`
    // fnc(value)

    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            fnc(value)
        }, 1500)

        resolve("perintah selesai")
    })
    
}


greeting("roy").then(message => console.log(message))

// greeting("roy", (message) => {
//     console.log("start arrow")
//     console.log(message)
//     console.log("end")
// })



