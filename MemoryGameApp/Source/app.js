// memory game app

const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;

    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        //* first click
        hasFlippedCard = true;
        firstCard = this;
        console.log('first flip');
        return;
    }
    //* second click
    hasFlippedCard = true;
    secondCard = this;

    console.log('second flip');

    checkForMatch();
}

function checkForMatch() {
    console.log('checking for match');
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : closeCards();
}


function disableCards() {
    console.log('disabled');

    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function closeCards() {

    console.log('closed');

    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        lockBoard = false;
        resetBoard();
    }, 1500);
}

function resetBoard() {
    console.log('board reset');
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
}

(function shuffleCards() {
    console.log('shuffled');
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => {
    card.addEventListener('click', flipCard);
    console.log(card);
});