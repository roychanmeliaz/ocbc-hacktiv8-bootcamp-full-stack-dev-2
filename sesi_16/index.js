let playerName = "Budi"
console.log(playerName)
playerName = "Rudi"
console.log(playerName)

switch (true) {
    case 1 + 1:
        break
}

const num = 1
const str = "1"
const bool = true

console.log(`${num} ${str} ${bool}`)

let numArr = [1,2,3,4]
let strArr = ["saya", "lagi", "coding"]
let boolArr = [true, false]

console.log(numArr)
console.log(strArr)
console.log(boolArr)

numArr.push(22)
console.log(numArr)
numArr.shift()
console.log(numArr)
numArr.unshift(4,5)
console.log(numArr)

class Whatever {
    #abilities = [
        'attack', 'run', 'walk'
    ]
    name = "warria"
    class = "warrior"

    show() {
        console.log(this)
    }
}

let warria = new Whatever()
warria.show()
console.log((warria))
console.log(this)

function sumTraditional(a,b) {
    return a+b
}
const sum = (a,b) => a+b

console.log(sum(1,45))

function curryFunction(a,b) {
    const c = a+b
    return function(d) {
        console.log(c+d)
    }
}
const anotherCurryFunction = (a,b) => (c,d) => (a+b) - (c+d)

const anotherFunction = curryFunction(15,78)

curryFunction(1,45)(2)
console.log(anotherCurryFunction(1,45)(1,2))

