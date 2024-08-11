import { WORDS } from "./words.js"

const no_of_guesses = 6
let guessesRemaining = no_of_guesses
let nextLetter = 0
let currentGuess = []
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)]
console.log(rightGuessString)

function createBoard() {
    let board = document.getElementById("board")

    for(let i = 0; i<no_of_guesses; i++){
        let row = document.createElement("div")
        row.className = "letter-row"

        for(let j = 0; j<5; j++){
            let box = document.createElement("div")
            box.className = "letter-box"
            row.appendChild(box)
        }

        board.appendChild(row)

    }

}

createBoard()

document.addEventListener("keyup", (e) => {


    if (guessesRemaining === 0){
        return
    }

    let pressedkey = String(e.key)
    if (pressedkey === "Backspace" && nextLetter !== 0){
        deleteLetter()
        return
    }

    if (pressedkey === "Enter"){
        checkGuess()
        return
    }

    let found = pressedkey.match(/[a-z]/gi)
    if(!found || found.length>1) {
        return
    } else {
        insertLetter(pressedkey)
    }

})

function insertLetter(pressedkey) {
    if (nextLetter === 5){
        return
    }

    pressedkey = pressedkey.toLowerCase()
    
    let row = document.getElementsByClassName("letter-row")[6-guessesRemaining]
    let box = row.children[nextLetter]
    box.textContent = pressedkey
    box.classList.add("filled-box")
    currentGuess.push(pressedkey)
    nextLetter += 1

}

function deleteLetter() {
    let row = document.getElementsByClassName("letter-row")[6-guessesRemaining]
    let box = row.children[nextLetter-1]
    box.textContent=""
    box.classList.remove("filled-box")
    currentGuess.pop()
    nextLetter -= 1
}

function checkGuess() {
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    
    let guessWord = ""
    currentGuess.forEach((i) => guessWord += i)
    let rightGuess = Array.from(rightGuessString)

    if (guessWord.length !== 5){
        alert("Not enough letters")
        return
    }

    if (!WORDS.includes(guessWord)){
        alert("Word not in list")
        return
    }

    for (let i = 0; i<5; i++){
        let box = row.children[i]
        let lettercolour = ""
        let letter = currentGuess[i]

        let letterposition = rightGuess.indexOf(letter)

        if (letterposition === -1){
            lettercolour = "grey"
        } else {
            if (letter === rightGuess[i]){
                lettercolour = "green"
            } else {
                lettercolour = "yellow"
            }
            rightGuess[letterposition] = "-"
        }

        box.style.backgroundColor = lettercolour

    }



    if (guessWord === rightGuessString){
        alert("You Win!")
        guessesRemaining = 0
        return
    } else{
        nextLetter = 0
        currentGuess = []
        guessesRemaining -= 1

        if(guessesRemaining === 0){
           alert(`No more guesses left. The correct word was ${rightGuessString}`)
        }
    }
}

