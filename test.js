let a = ["a","b","c"]
let b = ""
let c = "abc"

a.forEach((i) => b += i)
console.log(b)

if(b===c){
    console.log(true)
}else {
    console.log(false)
}