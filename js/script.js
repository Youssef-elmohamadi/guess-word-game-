const typing = document.querySelector(".none"),
  disc = document.querySelector(".disc"),
  inputsContainer = document.querySelector(".inputs"),
  guessCount = document.querySelector(".guess_count"),
  reset = document.querySelector("button"),
  winner = document.querySelector(".winner"),
  succ = new Audio("/audio/YXFBY9J-win.mp3");

const Words = [
  { word: "react", disc: "JavaScript library" },
  { word: "vue", disc: "JavaScript Framework" },
  { word: "angular", disc: "JavaScript MVW Framework" },
  { word: "nodejs", disc: "JavaScript runtime environment" },
  { word: "php", disc: "general-purpose scripting language" },
  { word: "ruby", disc: "open source programming language" },
  { word: "python", disc: "Programming Language" },
  { word: "tailwind", disc: "A utility-first CSS framework" },
  { word: "bootstrap", disc: "world's most famous free CSS framework" },
];

let Word,
  countToWin = [],
  maxGuess = 12;

typing.addEventListener("input", startGame);
reset.addEventListener("click", getRandomWord);

function getRandomWord() {
  freset();
  const random = Math.floor(Math.random() * Words.length);
  const randomObj = Words[random];
  Word = randomObj.word;
  disc.textContent = randomObj.disc;
  guessCount.innerText = maxGuess;
  inputsContainer.innerHTML = Word.split("")
    .map(() => `<input type="text" disabled />`)
    .join("");
  typing.focus();
}

document.addEventListener("keydown", () => typing.focus());

function startGame(e) {
  const char = e.target.value.toLowerCase();
  if (!char.match(/[a-z]/i)) return;

  let correctGuess = false;
  if (Word.includes(char)) {
    Word.split("").forEach((letter, index) => {
      if (
        letter === char &&
        !inputsContainer.querySelectorAll("input")[index].value
      ) {
        inputsContainer.querySelectorAll("input")[index].value = char;
        countToWin.push(char);
        correctGuess = true;
      }
    });
  }

  if (!correctGuess) {
    maxGuess--;
    guessCount.innerText = maxGuess;
  }

  typing.value = "";

  if (countToWin.length === Word.length) {
    succ.play();
    winner.classList.remove("hidden");
    countToWin = [];
  }

  if (maxGuess <= 0) {
    setTimeout(() => {
      alert(`Game Over! The word was: ${Word}`);
      Word.split("").forEach((letter, index) => {
        inputsContainer.querySelectorAll("input")[index].value = letter;
      });
    }, 0);
  }
}

function freset() {
  maxGuess = 12;
  guessCount.innerText = maxGuess;
  winner.classList.add("hidden");
  countToWin = [];
  succ.pause();
  succ.currentTime = 0;
  typing.value = "";
}

getRandomWord();
