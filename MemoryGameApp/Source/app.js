//! MEMORY GAME APP !//

//* global variables

const cards = document.querySelectorAll('.memory-card');
let cardCount = 0;
let matchedPairs = 0;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let nameInput = document.getElementById('playername');
let name;
let minutes;
let seconds;
let isTimerRunning = true;

//* IIFE to shuffle card positions when game begins

(function shuffleCards() {

        cards.forEach(card => {
            cardCount++;
            let randomPos = Math.floor(Math.random() * 12);
            card.style.order = randomPos;
            card.addEventListener('click', flipCard);
        });
    }

)();

//* add click event listened to each card

function enableCards() {
    cards.forEach(card => {
        card.addEventListener('click', flipCard);
        console.log(card);
    });
}

//* timer

let timer = setInterval(updateTimer, 1000);

const startingMinutes = 0;
let time = startingMinutes * 60;


const timerElement = document.getElementById('timer');

function updateTimer() {
    minutes = Math.floor(time / 60);
    seconds = time % 60;

    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    timerElement.innerHTML = `${minutes}:${seconds}`;

    time++;
}

//* resume timer
function resumeTimer() {
    isTimerRunning = true;
    timer = setInterval(updateTimer, 1000);
}

//* stop timer
function stopTimer() {
    isTimerRunning = false;
    clearInterval(timer);
}

//* display modal message when game is completed
function displayMessage() {
    modal.style.display = "block";
    let player = localStorage.getItem('playerName'); //! browser local storage
    msg.innerHTML = `Congrats, ${player}! <br>You completed the game in <br>
    ${minutes} min ${seconds} sec.`;
}

//* Submit name 

function submitName() {
    name = nameInput.value;
    localStorage.setItem('playerName', name); //! browser local storage
    console.log(name);
    if (name !== null && name !== "") {
        window.location.href = "../View/choose.html";
    }
}

//* Choose game chooseDifficulty

function chooseDifficulty(id) {
    let easy = "easybtn";
    let medium = "mediumbtn";
    let hard = "hardbtn";

    if (id === easy) window.location.href = "../View/easy.html";
    else if (id === medium) window.location.href = "../View/medium.html";
    else if (id === hard) window.location.href = "../View/hard.html";
}

//********************! 
//! GAME LOGIC

//* flip a card when clicked

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

//* check if cards match

function checkForMatch() {
    console.log('checking for match');

    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : closeCards();

}

//* disable cards when they have matched

function disableCards() {
    if (isTimerRunning === true) {
        let maxPairs = cardCount / 2;
        matchedPairs++;

        if (maxPairs === matchedPairs) {
            stopTimer();
            displayMessage();
        }
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        resetBoard();
    } else {
        cards.forEach(card => {
            card.removeEventListener('click', flipCard);
        });
    }
}

//* close the cards when they don't match

function closeCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        lockBoard = false;
        resetBoard();
    }, 1500);
}

//* reset values to reset variables 

function resetBoard() {
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
}

function pauseGame() {

    if (isTimerRunning === false) {
        resumeTimer();
        enableCards();
        document.querySelector('.pause-btn').innerHTML = 'PAUSE';
    } else {

        stopTimer();
        disableCards();
        document.querySelector('.pause-btn').innerHTML = 'RESUME';
    }
}

function restartGame() {
    location.reload();
}

function chooseGame() {
    window.location.href = "../View/choose.html";
}

function quitGame() {
    localStorage.setItem('playerName', '');
    window.location.href = "../View/intro.html";
}
//****************!

//* modal for message when game is complete

let modal = document.getElementById("myModal");

//* Get the <span> element that closes the modal
let close = document.getElementsByClassName("close")[0];

let msg = document.getElementById('modaltxt');


//* When the user clicks on <span> (x), close the modal
close.onclick = function () {
    modal.style.display = "none";
    location.reload();
}