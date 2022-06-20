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
// const input = document.querySelector('.theMessage');
const output = document.querySelector('.theMessage');
const outputContainer = document.querySelector('.messageBox');
const scoreDiv = document.querySelector('.score');

const resizeToFit = () => {
    let fontSize = window.getComputedStyle(output).fontSize;
    let scoreSize = window.getComputedStyle(scoreDiv).fontSize;
    // console.log(`Font size of score: ${scoreSize}`);
    console.log(
        `Font sizes before - message: ${fontSize}, score: ${scoreSize}`
    );
    // if (fontSize < scoreSize) {
    //     // output.style.fontSize = parseFloat(scoreSize) + 'px';
    output.style.fontSize = scoreSize;
    // }

    reduceSizeToFit();
    console.log(`Font sizes after - message: ${fontSize}, score: ${scoreSize}`);
};

const reduceSizeToFit = (theOutput, theOutputContainer) => {
    let fontSize = window.getComputedStyle(output).fontSize;
    if (output.clientHeight >= outputContainer.clientHeight) {
        output.style.fontSize = parseFloat(fontSize) - 1 + 'px';
        reduceSizeToFit();
    }
};

// window.onresize = resizeToFit(
//     document.querySelector('.theMessage'),
//     document.querySelector('.messageBox')
// );

const maxSecretNumber = 20;
const maxScore = 20;
const scrollHeight = document.querySelector('.mainContainer').scrollHeight;
const innerWindowHeight = window.innerHeight;
const outerWindowHeight = window.outerHeight;
let score,
    theMessage,
    highestScore = 0,
    secretNumber;

console.log('the title: ' + document.title);

// function alertHeight() {
//     alert(document.getElementById('mainContainer').style.height);
// }

/// Anonomous Functions
const createSecretNumber = function () {
    secretNumber = Math.trunc(Math.random() * maxSecretNumber + 1);
    document.querySelector('.secretText').textContent = '?';
    // alert(
    //     `Scroll Height: ${scrollHeight}\ninnerWindowHeight: ${innerWindowHeight}\nouterWindowHeight: ${outerWindowHeight}`
    // );

    // textContent =
    //     `Inner height: ${window.innerHeight}\n` +
    //     `Outer height: ${window.outerHeight}`;
};
const decrementScore = function () {
    score--;
    document.querySelector('.score').textContent = score;
};
const displayMessage = function (message) {
    // if innerWindowHeight() < 600px {
    //     document.querySelector('.theMessage').style.fontSize="10%";
    // }
    console.log(`Message font size: ${output.style.fontSize}`);
    console.log(`Client height: ${output.clientHeight}`);
    output.textContent = message;
    // reduceSizeToFit();
    //resizeToFit();
    console.log(`Client height after change: ${output.clientHeight}`);
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
// window.addEventListener('resize', resizeListener);

/// EventListeners
document.querySelector('.againBtn').addEventListener('click', function () {
    setInitializations();
});

document.querySelector('.checkBtn').addEventListener('click', function () {
    console.log('Check button eventlistener works');
    const inputNumber = Number(document.querySelector('.inputNumber').value);

    console.log(inputNumber);
    if (score < 1) {
        displayMessage('You Lost! There are no more guesses!');
    } else {
        if (!inputNumber || inputNumber < 1 || inputNumber > 20) {
            console.log('Bad Number');
            displayMessage(
                'Invalid number.  Please enter a number between 1 and 20.'
            );
        } else if (inputNumber == secretNumber) {
            displayMessage('You got it!');
            displaySecretNumber(secretNumber);
            setHighestScore(score);
        } else if (inputNumber < secretNumber) {
            displayMessage('Too low');
            decrementScore();
        } else if (inputNumber > secretNumber) {
            displayMessage('Too high');
            decrementScore();
        }

        if (score < 1) {
            displayMessage('You Lost!');
            displaySecretNumber(secretNumber);
        }
    }
    console.log(`Secret Number: ${secretNumber} inputContent: ${inputNumber}`);
});

// const heightOutput = document.querySelector('#height');
// const widthOutput = document.querySelector('#width');

// function resizeListener() {
//     heightOutput.textContent = window.innerHeight;
//     widthOutput.textContent = window.innerWidth;
//     alert(
//         `Scroll Height: ${scrollHeight}\ninnerWindowHeight: ${innerWindowHeight}\nouterWindowHeight: ${outerWindowHeight}`
//     );
// }
