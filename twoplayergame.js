// Variables including from DOM

const playerOneNameField = document.querySelector('#reg-player-one');
const playerTwoNameField = document.querySelector('#reg-player-two');

const startTwoPlayerGameBtn = document.querySelector('.start-game-btn');

const twoPlayerScoreBoard = document.querySelector('.two-player');

const displayPlayerOneName = document.querySelector('.player-one-name');
const displayPlayerOneScore = document.querySelector('.player-one-score');
const displayPlayerTwoName = document.querySelector('.player-two-name');
const displayPlayerTwoScore = document.querySelector('.player-two-score');
const displayCurrentPlayer = document.querySelector('.current-player');

const playerRegistrationFields = document.querySelector('.player-reg');

const playerOne = { name: '', score: 0 }; // .name will take value of playerOneNameField when started thourgt startGameBtn
const playerTwo = { name: '', score: 0 };

const players = [playerOne, playerTwo];

function updateTwoPlayerScoreBoard() {
    let currentPlayer = players[gameTurn].name;
    displayCurrentPlayer.innerText = `${currentPlayer}`;

    displayPlayerOneName.innerText = `${playerOne.name}:`;
    displayPlayerOneScore.innerText = `${playerOne.score}`;
    displayPlayerTwoName.innerText = `${playerTwo.name}:`;
    displayPlayerTwoScore.innerText = `${playerTwo.score}`;
}

function scoreTwoPlayer(match) {
    if (match == true) {
        //give points to the player::::
        players[gameTurn].score += 1;

        updateGameHistory(storedCards, players[gameTurn].name);

        gameTurn = gameTurn; //current player plays again

        updateTwoPlayerScoreBoard();
    } else {
        setTimeout(() => {
            gameTurn = (gameTurn + 1) % 2;
            updateTwoPlayerScoreBoard();
        }, 1000);
    }
}

startTwoPlayerGameBtn.addEventListener('click', () => {
    playerOne.name = playerOneNameField.value;
    playerTwo.name = playerTwoNameField.value;
    playerRegistrationFields.setAttribute('style', 'display: none;');
    gameBodyContainer.setAttribute('style', 'display: flex;');
    twoPlayerScoreBoard.setAttribute('style', 'display: block;');
    gameMode = 'twoplayer';
    startTwoPlayerGame();
});

function startTwoPlayerGame() {
    gameTurn = 0;
    cardsClickedCounter = 0;
    let dubbleCards = cardArray.concat(cardArray);
    let randomizedCards = randomizeArray(dubbleCards);
    appendCardsToBoard(gameBoard, randomizedCards, 'multi');
    updateTwoPlayerScoreBoard();
}

// eventlistener

restartGameBtn.addEventListener('click', () => {
    gameBoard.innerHTML = '';
    gameHistoryList.innerHTML = '';
    startTwoPlayerGame();
});
