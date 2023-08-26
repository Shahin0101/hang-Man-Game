const hangManImg = document.querySelector(".hangman-box img");
const keyboardDiv = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again") 

let currentWord, currectLeters , wrongGuessCount ;
const maxGuesses = 6;

//ressetting all game variables and ui  elements
const resetGame = () => {
    currectLeters = [];
    wrongGuessCount = 0; 
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
     hangManImg.src = `img/images/hangman-${wrongGuessCount}.svg`;
     keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false)
     wordDisplay.innerHTML = word.split("").map(() => `<li class="letter"></li>`).join("") 
     gameModal.classList.remove("show");
    
}

const getRandomWord = () => {
    // selecting a random word and hint  from randomWord.js 
    const {word , hint} = randomWordList[Math.floor(Math.random * randomWordList.length)];
    currentWord = word;
    console.log(word , hint);
    document.querySelector(".hint-text").innerText = hint;
    resetGame();
    
};

const gameOver = (isValide) => {
    // after 300ms of game complete .. showing modal with relevant details 
    setTimeout(() => {
        const modalText = isValide ? `you fount the word` : `the correct word was:`;
        gameModal.querySelector("img").src = `img/images/${isValide ? "valide" : "lost"}.gif`;
        gameModal.querySelector("h4").innerText = `${isValide ? "Congrats" : "game over"}`;
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add("show");
    },300)
}

const initGame = (button , clickedLetter) => {
    // to cheking if clickedLetter is exist on the currentWord
    if (currentWord.includes(clickedLetter)) {
        // showing all currect letters on word display
      [...currentWord].forEach((letter , index ) => {
            if (letter === clickedLetter) {
                currectLeters.push(letter);
                    wordDisplay.querySelectorAll("li")[index].innerHTML = letter;
                    wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
      } )
    }else{
        // if clicked letter doesnot exist then update  the wrongGuessCount and hangman img
        wrongGuessCount++;
        hangManImg.src = `img/images/hangman-${wrongGuessCount}.svg`;
    }
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
        // calling gameOver function if any of these condition meets
    if ( wrongGuessCount === maxGuesses) return gameOver(false);
    if ( currectLeters.length === currentWord.length) return gameOver(true);

} 

// creating keaboards buttons
for (let i = 97; i <= 122; i++){
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click",  e = initGame(e.target , String.fromCharCode(i)));
};

getRandomWord();
playAgainBtn.addEventListener("click" , getRandomWord)