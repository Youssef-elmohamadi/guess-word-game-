const typing = document.querySelector(".none"),
  disc = document.querySelector(".disc"),
  inputsContainer = document.querySelector(".inputs"),
  guessCount = document.querySelector(".guess_count"),
  reset = document.querySelector("button"),
  winner = document.querySelector(".winner"),
  succ = new Audio("../audio/YXFBY9J-win.mp3");
const Words = [
  {
    word: "react",
    disc: "JavaScript library",
  },
  {
    word: "vue",
    disc: "JavaScript Framework",
  },
  {
    word: "angular",
    disc: "JavaScript MVW Framework",
  },
  {
    word: "nodejs",
    disc: "JavaScript runtime environment",
  },
  {
    word: "php",
    disc: "general-purpose scripting language",
  },
  {
    word: "ruby",
    disc: "open source programming language",
  },
  {
    word: "python",
    disc: "Programming Language",
  },
  {
    word: "tailwind",
    disc: "A utility-first CSS framework",
  },
  {
    word: "bootstrap",
    disc: "world's most famous free CSS framework",
  },
];
let Word;
let countToWin = [];
let maxGuess = 12;
typing.addEventListener("input", startGame);
getRandomWord();
reset.addEventListener("click", getRandomWord);
function getRandomWord() {
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
}

document.addEventListener("keydown", () => typing.focus());
function startGame(e) {
  char = e.target.value;
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
  // guees count
  maxGuess = 12;
  // hidden winneer
  winner.classList.add("hidden");
  // countToWin
  countToWin = [];
  // paues audio
  succ.pause();
  succ.currentTime = 0;
}
