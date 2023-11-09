const guessButton = document.querySelector('#guessButton');
const setDiffButton = document.querySelector('#setDifficulty');
const resetButton = document.querySelector('#resetGame');
guessButton.disabled = true;
const showGameButton = document.querySelector('#showGame');
const closeModalButton = document.querySelector('#closeModal');

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

closeModalButton.addEventListener('click', function () {
  document.querySelector('.main-container').classList.add('close-display');
});

showGameButton.addEventListener('click', function () {
  document.querySelector('.main-container').classList.contains('close-display')
    ? document
        .querySelector('.main-container')
        .classList.remove('close-display')
    : document.querySelector('.main-container').classList.add('close-display');
});

resetButton.addEventListener('click', function () {
  //alternative
  // location.reload();
  let setDiff = document.querySelector('.difficulty');
  let guess = document.querySelector('.guess');
  let message = document.querySelector('.message');
  let secretNumberSelector = document.querySelector('.secret-number');
  let highScoreSelector = document.querySelector('#highScore');
  let scoreMessageSelector = document.querySelector('#scorePoints');

  guessButton.disabled = true;
  setDiff.value = '';
  guess.value = '';
  message.textContent = alerts.default;
  secretNumberSelector.textContent = '?';
  highScoreSelector.textContent = 0;
  scoreMessageSelector.textContent = 0;
});

setDiffButton.addEventListener('click', function () {
  let setDiff = Number(document.querySelector('.difficulty').value);
  let diffLevelSelector = document.querySelector('.difficultyLevel');
  let message = document.querySelector('.message');

  if (!setDiff || setDiff > 21) {
    message.textContent = alerts.wrongDifficulty;
    score = 0;
  } else {
    let scoreMessageSelector = document.querySelector('#scorePoints');
    secretNumber = Math.trunc(Math.random() * setDiff) + 1;
    score = setDiff;
    scoreMessageSelector.textContent = score;
    console.log(score);

    console.log(secretNumber);
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
  let message = document.querySelector('.message');
  let secretNumberSelector = document.querySelector('.secret-number');
  let highScoreSelector = document.querySelector('#highScore');
  let secretNumberContainer = document.querySelector('.secret-section');

  let scoreMessageSelector = document.querySelector('#scorePoints');
  scoreMessageSelector.textContent = score;
  if (score > 0) {
    if (!guess) {
      message.textContent = alerts.error;
    } else if (guess === secretNumber) {
      secretNumberSelector.textContent = secretNumber;
      secretNumberContainer.style.backgroundColor = 'Yellow';
      message.textContent = alerts.win;
      highScore = score;
      highScore === score ? highScore : score;
      localStorage.setItem('highestScore', 'highScore');
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
    secretNumberContainer.style.backgroundColor = 'Yellow';
  }
});
