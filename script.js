if (!Object.hasOwn(localStorage, 'score')) {
  localStorage.setItem('score', 0);
}

let userInput = null;
let AIInput = null;
let modeJeu = null;
let score = parseInt(localStorage.getItem('score'));

const modeLogo = document.getElementById('logoMode');
const changeScore = document.getElementById('score');
const fermerRegle = document.getElementById('rulesButtonStandard');
const fermerRegle2 = document.getElementById('rulesButtonComplex');
const rules = document.getElementById('displayRulesStandard');
const rulesTwo = document.getElementById('displayRulesComplex');
const whatRules = document.getElementById('displayRulesStandard');
const displayScore = document.getElementById('displayScore');
const resultContainer = document.getElementById('displayResult');

// Init score

document.getElementById('score').innerHTML = score;

// ---------------------------------------------------------------------------------choix du mode

const modeButton = document.getElementsByClassName('modeButton');

for (let i = 0; i < modeButton.length; i++) {
  modeButton[i].addEventListener('click', () => chooseMode(i));
}
// ---------------------------------------------------------------------------------fermer les regles

function chooseMode(i) {
  if (i === 0) {
    modeStandard.style.display = 'grid';
    modeSelector.style.display = 'none';
    displayScore.style.display = 'flex';
    rules.style.display = 'flex';
    modeJeu = 'standard';
    modeLogo.innerHTML = '<img src="./images/logo.svg" alt="" />';
  } else {
    modeComplex.style.display = 'grid';
    modeSelector.style.display = 'none';
    displayScore.style.display = 'flex';
    rulesTwo.style.display = 'flex';
    modeJeu = 'complex';
    modeLogo.innerHTML = ' <img src="./images/logo-bonus.svg" alt="" id="" />';
  }
  console.log(modeJeu);
  getUserInput();
}
fermerRegle.addEventListener('click', function () {
  rules.style.display = 'none';
});
fermerRegle2.addEventListener('click', function () {
  rulesTwo.style.display = 'none';
});
// ---------------------------------------------------------------------------------choix du winner
const choices = ['rock', 'scissors', 'paper', 'lizard', 'spock'];
const affichResult = document.getElementById('winLoseTie');

function getWinner(a, b) {
  if (a === b) {
    displayResult('Tie');
  } else if (doesUserWon(a, b)) {
    saveScore(1);
    displayResult('You win');
  } else {
    saveScore(-1);
    displayResult('You lose');
  }
}

function saveScore(modifier) {
  localStorage.setItem(
    'score',
    parseInt(localStorage.getItem('score')) + modifier,
  );
}

function doesUserWon(a, b) {
  return (
    (a === choices[0] && b === choices[1]) ||
    (a === choices[0] && b === choices[3]) ||
    (a === choices[1] && b === choices[2]) ||
    (a === choices[1] && b === choices[3]) ||
    (a === choices[2] && b === choices[0]) ||
    (a === choices[2] && b === choices[4]) ||
    (a === choices[3] && b === choices[4]) ||
    (a === choices[3] && b === choices[2]) ||
    (a === choices[4] && b === choices[0]) ||
    (a === choices[4] && b === choices[1])
  );
}

function displayResult(resultMsg) {
  modeStandard.style.display = 'none';
  modeComplex.style.display = 'none';

  displayScore.style.display = 'flex';
  resultContainer.style.display = 'flex';

  changeScore.innerHTML = localStorage.getItem('score');

  affichResult.innerHTML = `<p>${resultMsg}</p><button onclick="playAgain()" class="buttonRestart">PLAY AGAIN</button>`;
}

// ---------------------------------------------------------------------------------choix de l'IA
//--test concluant, l'ia choisi ntre les 5 lors du mode complexe et le 3 pour l'autre
function getIAInput() {
  const houseResult = document.getElementById('housePicked');
  if (modeStandard.style.display === 'grid') {
    const randomIndex = Math.floor(Math.random() * 3);
    AIInput = choices[randomIndex];
    console.log(AIInput);
    getWinner(userInput, AIInput);
  } else {
    const randomIndex = Math.floor(Math.random() * 5);
    AIInput = choices[randomIndex];
    console.log(choices[randomIndex]);
    getWinner(userInput, AIInput);
  }
  houseResult.innerHTML = `<p>The house picked</p> <img src="./images/icon-${AIInput}.svg" alt="" class="${AIInput}Standard logoResult" />`;
}
// ---------------------------------------------------------------------------------choix du joueur
function getUserInput() {
  const getUserInput = document.getElementsByClassName('gameButton');
  const userResult = document.getElementById('youPicked');
  for (let i = 0; i < getUserInput.length; i++) {
    getUserInput[i].addEventListener('click', function () {
      userInput = this.id;
      getInputID(this);
      getIAInput();
      userResult.innerHTML = `<p>You picked</p> <img src="./images/icon-${this.id}.svg" alt="" class="${this.id}Standard logoResult" />`;
    });
  }
}

function getInputID(em) {
  console.log(em.id);
}

// ---------------------------------------------------------------------------------NOUVELLE PARTIE
function playAgain() {
  if (modeJeu === 'standard') {
    modeStandard.style.display = 'grid';
    resultContainer.style.display = 'none';
  } else if (modeJeu === 'complex') {
    modeComplex.style.display = 'grid';
    resultContainer.style.display = 'none';
  }
}
