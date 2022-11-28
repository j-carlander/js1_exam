// Memory examination exercise course JavScript 1, class KYHA_FE22

// Variables including from DOM
const gameBoard = document.querySelector('.game-board');

const restartGameBtn = document.querySelector('.restart-game-btn');
const quitGameBtn = document.querySelector('.quit-to-menu-btn');
const gameBodyContainer = document.querySelector('.game-body');

let cardsClickedCounter = 0;
let gameTurn = 0;
const storedCards = []; // For storing which two cards is clicked for comparison

const cardArray = [
    {
        title: '2morrow',
        img: 'assets/2morrow.jpg',
    },
    {
        title: 'aview',
        img: 'assets/aview.jpg',
    },
    {
        title: 'casino',
        img: 'assets/casino.jpg',
    },
    {
        title: 'dieanother',
        img: 'assets/dieanother.jpg',
    },
    {
        title: 'goldeneye',
        img: 'assets/goldeneye.jpg',
    },
    {
        title: 'licence',
        img: 'assets/licence.jpg',
    },
    {
        title: 'notime',
        img: 'assets/notime.jpg',
    },
    {
        title: 'quantum',
        img: 'assets/quantum.jpg',
    },
    {
        title: 'skyfall',
        img: 'assets/skyfall.jpg',
    },
    {
        title: 'spectre',
        img: 'assets/spectre.jpg',
    },
    {
        title: 'theliving',
        img: 'assets/theliving.jpg',
    },
    {
        title: 'theworld',
        img: 'assets/theworld.jpg',
    },
];

//Array ranomdizer insp. https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#Modern_method

function randomizeArray(array) {
    const result = [];
    for (i = array.length; i >= 1; i--) {
        let randomIndex = Math.floor(Math.random() * i);
        result.unshift(array[randomIndex]);
        array.splice(randomIndex, 1);
    }
    return result;
}

// function start game => add players, hide registration, show game body, run game,

// display update

function removeListenerFromMatchingCards(storedCards) {
    let cardOneParent = storedCards[0].target.parentNode;
    let cardTwoParent = storedCards[1].target.parentNode;

    cardOneParent.removeEventListener('click', handleCardClick);
    cardTwoParent.removeEventListener('click', handleCardClick);
}

function returnNonMatchingCardsFaceDown(storedCards) {
    let cardOneParent = storedCards[0].target.parentNode;
    let cardTwoParent = storedCards[1].target.parentNode;

    setTimeout(() => {
        cardOneParent.classList.remove('img-card-rotate');
        cardTwoParent.classList.remove('img-card-rotate');
    }, 1500);
}

// function Click card to flip
function handleCardClick(card, gameType) {
    let parent = card.target.parentNode;
    parent.classList.add('img-card-rotate');
    cardsClickedCounter = (cardsClickedCounter + 1) % 2;
    storedCards.push(card);
    if (cardsClickedCounter == 0) {
        if (gameType == 'single') {
            compareCardsTimeTrial(storedCards);
        } else {
            compareCards(storedCards);
        }
    }
}

// function Create cards, creates HTML and adds card image and data-value for later compare
function createCard(card) {
    // First create the HTML for the card.
    let cardContainer = document.createElement('div');
    let cardImg = document.createElement('div');
    let cardBack = document.createElement('img');
    let cardFront = document.createElement('img');

    cardContainer.classList.add('card-container');

    cardImg.classList.add('img-card');

    cardBack.setAttribute('src', 'assets/CardBack007.png');
    cardBack.classList.add('img-back');
    cardBack.setAttribute('data-name', card.title);

    cardFront.setAttribute('src', card.img);
    cardFront.classList.add('img-front');

    cardImg.append(cardBack, cardFront);
    // Add a listener to every card to be created
    cardImg.addEventListener('click', handleCardClick);

    cardContainer.append(cardImg);

    return cardContainer;
}

// function to add all cards to the game board

function appendCardsToBoard(container, cardArray, gameType) {
    for (let card of cardArray) {
        container.append(createCard(card, gameType));
    }
}