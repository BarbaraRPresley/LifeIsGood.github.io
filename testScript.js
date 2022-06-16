'use strict';
/*
.gameTitle {
.gameDescription {
.secretText {
.theMessage,
.score,
.highestScore 
.inputLabel {
.inputNumber {
.checkBtn {
.againBtn {
*/
const maxSecretNumber = 20;
const maxScore = 20;
let score,
    theMessage,
    highestScore = 0,
    secretNumber;

console.log('the title: ' + document.title);

/// Anonomous Functions
const createSecretNumber = function () {
    secretNumber = Math.trunc(Math.random() * maxSecretNumber + 1);
    document.querySelector('.secretText').textContent = '?';
};
const decrementScore = function () {
    score--;
    document.querySelector('.score').textContent = score;
};
const displayMessage = function (message) {
    document.querySelector('.theMessage').textContent = message;
};
const displaySecretNumber = function (theNumber) {
    document.querySelector('.secretText').textContent = theNumber;
};
const resetScore = function () {
    score = maxScore;
    document.querySelector('.score').textContent = score;
};
const setHighestScore = function (theScore) {
    console.log(`highestScore: ${highestScore}, and score: ${theScore}`);
    if (highestScore < theScore) {
        console.log('Established that new highestScore is needed');
        highestScore = theScore;
        console.log(`New highestScore: ${highestScore}`);
        document.querySelector('.highestScore').textContent = theScore;
    }
    console.log(`New highestScore: ${highestScore}`);
};
const setInitializations = function () {
    createSecretNumber();
    resetScore();
    theMessage = `Please enter a number between 1 and ${maxSecretNumber}`;
    displayMessage(theMessage);
};

/// INITIALIZATIONS
setInitializations();
console.log(`Secret Number: ${secretNumber}`);

/// EventListeners
document.querySelector('.againBtn').addEventListener('click', function () {
    setInitializations();
});

document.querySelector('.checkBtn').addEventListener('click', function () {
    console.log('eventlistener works');
    const inputNumber = Number(document.querySelector('.inputNumber').value);

    console.log(inputNumber);
    if (score < 1) {
        displayMessage('You Lost! There are no more guesses!');
    } else {
        if (!inputNumber || inputNumber < 1 || inputNumber > 20) {
            console.log('Bad Number');
            displayMessage(
                'Invalid number.  Please enter a number between 1 and 20'
            );
        } else if (inputNumber == secretNumber) {
            displayMessage('You got it!');
            displaySecretNumber(secretNumber);
            setHighestScore(score);
        } else if (inputNumber < secretNumber) {
            displayMessage('Too low.');
            decrementScore();
        } else if (inputNumber > secretNumber) {
            displayMessage('Too high.');
            decrementScore();
        }

        if (score < 1) {
            displayMessage('You Lost!');
            displaySecretNumber(secretNumber);
        }
    }
    console.log(`Secret Number: ${secretNumber} inputContent: ${inputNumber}`);
});
