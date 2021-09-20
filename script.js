'use strict';

//Storing the state variables like score to be used later in the program
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const scorePlayer0 = document.querySelector('#score--0');
const scorePlayer1 = document.querySelector('#score--1');
const currentScorePlayer0 = document.querySelector('#current--0');
const currentScorePlayer1 = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playingGame = true;

//Defining the starting conditions for the game

scorePlayer0.textContent = 0;
scorePlayer1.textContent = 0;
diceEl.classList.add('hidden');

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice functionality

btnRoll.addEventListener('click', function () {
  if (playingGame) {
    //1. Generating a random dice roll

    const dice = Math.trunc(Math.random() * 6 + 1);
    console.log(dice);
    //2.Display the rolled dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3.Check whether the rolled dice is a 1 or not
    if (dice !== 1) {
      //add the dice score to the current score of the player
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
    //switch to next player
    else switchPlayer();
  }
});

btnHold.addEventListener('click', function () {
    if (playingGame) {
      //1.Add the current score to the score of the active player
      scores[activePlayer] += currentScore;
      // if (activePlayer == 0)
      //     scorePlayer0.textContent = scores[activePlayer];
      // else
      //     scorePlayer1.textContent = scores[activePlayer];
      document.querySelector(`#score--${activePlayer}`).textContent =
        scores[activePlayer];

      //2.Check if the score is>=100
      //finish the game
      if (scores[activePlayer] >= 20) {
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.add('player--winner');
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.remove('player--active');
          playingGame = false;
          diceEl.classList.add('hidden');
      }
      //3. switch the player
      else switchPlayer();
    }
  
});

btnNew.addEventListener("click", function () {
    //remove the winner class from whoever the winner was
    document
      .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--winner');
//Checked if player 1 was the active player or not
     //If he was then removed his active player class
    if(activePlayer==1)
        player1El.classList.remove("player--active");
//Assigned player 0 as the active player
    player0El.classList.add("player--active");
//Re-initializing all the state variables with 0
    activePlayer = 0;
    currentScore = 0;
//Resetting both the current and high scores of the players to initial condition
    scorePlayer0.textContent = 0;
    scorePlayer1.textContent = 0;
    currentScorePlayer0.textContent = 0;
    currentScorePlayer1.textContent = 0;
    scores[1] = 0;
    scores[0] = 0;
    playingGame = true;
      
})
