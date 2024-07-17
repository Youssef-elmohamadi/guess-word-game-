const typing = document.querySelector(".none"),
  disc = document.querySelector(".disc"),
  inputsContainer = document.querySelector(".inputs"),
  guessCount = document.querySelector(".guess_count"),
  reset = document.querySelector("button"),
  winner = document.querySelector(".winner"),
  succ = new Audio("audio/YXFBY9J-win.mp3");

const Words = [
  // ... (words array)
];

let Word;
let countToWin = [];
let maxGuess = 12;

typing.addEventListener("input", startGame);
getRandomWord();
reset.addEventListener("click", getRandomWord);

function getRandomWord() {
  console.log("Getting a new random word.");
  freset();
  let random = Math.floor(Math.random() * Words.length);
  let randomObj = Words[random];
  Word = randomObj.word;
  disc.textContent = randomObj.disc;
  guessCount.innerText = maxGuess;
  let inputs = "";
  for (i = 0; i < Word.length; i++) {
    inputs += `<input type="text" disabled />`;
  }
  inputsContainer.innerHTML = inputs;
  console.log("Random word is:", Word);
}

document.addEventListener("keydown", () => typing.focus());

function startGame(e) {
  char = e.target.value;
  console.log("Input character:", char);
  if (!char.match(/[a-z]/i)) return;
  if (Word.includes(char)) {
    for (i = 0; i < Word.length; i++) {
      if (
        Word[i] === char &&
        !inputsContainer.querySelectorAll("input")[i].value
      ) {
        inputsContainer.querySelectorAll("input")[i].value = char;
        countToWin.push(char);
      }
    }
  } else {
    typing.value = "";
    maxGuess--;
    guessCount.innerText = maxGuess;
  }

  typing.value = "";
  if (Word.length === countToWin.length) {
    console.log("You win!");
    succ.play();
    countToWin = [];
    winner.classList.remove("hidden");
  }
  setTimeout(() => {
    if (maxGuess <= 0) {
      alert("  😄 ههههههههههه حمقك  :)");
      for (let i = 0; i < Word.length; i++) {
        inputsContainer.querySelectorAll("input")[i].value = Word[i];
      }
    }
  });
}

function freset() {
  console.log("Resetting game.");
  maxGuess = 12;
  winner.classList.add("hidden");
  countToWin = [];
  succ.pause();
  succ.currentTime = 0;
}
