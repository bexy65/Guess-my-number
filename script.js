const mainContainer = document.querySelector('.main-container');
const guessButton = document.querySelector('#guessButton');
const setDiffButton = document.querySelector('#setDifficulty');
const resetButton = document.querySelector('#resetGame');
guessButton.disabled = true;
const showGameButton = document.querySelector('#showGame');
const closeModalButton = document.querySelector('#closeModal');
// const bodyEl = document.querySelector('.body');

//Don`t know why can`t use as global selector!!
// let setDiff = Number(document.querySelector('.difficulty'));

const message = document.querySelector('.message');
const secretNumberSelector = document.querySelector('.secret-number');
const highScoreSelector = document.querySelector('#highScore');
const scoreMessageSelector = document.querySelector('#scorePoints');
const secretSection = document.querySelector('.secret-section');
const diffLevelSelector = document.querySelector('.difficultyLevel');
const guess = document.querySelector('.guess');
guess.disabled = true;

let secretNumber;
let score;
let highScore;

let alerts = {
  low: '🔻 Too low!',
  high: '🔺 Too high',
  error: 'No Number!',
  win: 'You Win!',
  lost: 'You Lost!',
  wrongDifficulty: 'Please choose between 10 and 20!',
  default: 'Let`s Play!',
};

function reset() {
  let setDiff = document.querySelector('.difficulty');
  const guess = document.querySelector('.guess');

  guessButton.disabled = true;
  setDiff.value = '';
  guess.value = '';
  guess.disabled = true;
  message.textContent = alerts.default;
  secretNumberSelector.textContent = '?';
  secretSection.style.backgroundColor = 'rgb(172, 126, 215)';
  // highScoreSelector.textContent = 0;
  scoreMessageSelector.textContent = 0;
}

closeModalButton.addEventListener('click', function () {
  mainContainer.classList.toggle('close-display');
  // bodyEl.classList.remove('blur-background');
});

showGameButton.addEventListener('click', function () {
  mainContainer.classList.toggle('close-display');
  // bodyEl.classList.add('blur-background');
});

resetButton.addEventListener('click', reset);

setDiffButton.addEventListener('click', function () {
  let setDiff = Number(document.querySelector('.difficulty').value);

  if (!setDiff || setDiff > 21) {
    message.textContent = alerts.wrongDifficulty;
    score = 0;
  } else {
    secretNumber = Math.trunc(Math.random() * setDiff) + 1;
    score = setDiff;
    console.log(secretNumber);
    scoreMessageSelector.textContent = score;
    guess.disabled = false;
    guessButton.disabled = false;
    score > 20
      ? (message.textContent = alerts.wrongDifficulty)
      : (message.textContent = alerts.default);
    setDiff > 10
      ? (diffLevelSelector.textContent = 'Hard')
      : (diffLevelSelector.textContent = 'Easy');
  }
});

guessButton.addEventListener('click', function () {
  let guess = Number(document.querySelector('.guess').value);

  scoreMessageSelector.textContent = score;
  if (score > 0) {
    if (!guess) {
      message.textContent = alerts.error;
    } else if (guess === secretNumber) {
      secretNumberSelector.textContent = secretNumber;
      secretSection.style.backgroundColor = 'Yellow';
      message.textContent = alerts.win;
      highScore = score;
      highScore > score ? highScore : score;
      highScoreSelector.textContent = highScore;
    } else if (guess < secretNumber) {
      message.textContent = alerts.low;
      score--;
    } else if (guess > secretNumber) {
      message.textContent = alerts.high;
      score--;
    }
  } else {
    message.textContent = alerts.lost;
    secretSection.style.backgroundColor = 'Red';
  }
});
