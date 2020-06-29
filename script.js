/* eslint-disable no-console */
// TODO: Fix overflow
// TODO: Display every input properly
let numberArray = [];
let operatorDisplay;
let i = 0;
let operator = 0;
let previousResult;
let previousButtonId;
let override = false;
let hasDecimal = false;

function add(x, y) {
        return Number(x) + Number(y);
}
function subtract(x, y) {
        return x - y;
}
function multiply(x, y) {
        return x * y;
}
function divide(x, y) {
        if (y === '0') {
                return "Can't divide by zero";
        }
        return x / y;
}

function operate(op, number1, number2) {
        switch (op) {
                case '+':
                        return add(number1, number2);
                case '-':
                        return subtract(number1, number2);
                case '*':
                        return multiply(number1, number2);
                case '/':
                        return divide(number1, number2);
                default:
                        console.log(`Can't find case`);
        }
}

const display = document.querySelector('#display');

function updateDisplay() {
        display.textContent =
                (!(numberArray[0] === undefined) ? numberArray[0] : 0) +
                (!(operatorDisplay === undefined) ? operatorDisplay : 0) +
                (!(numberArray[1] === undefined) ? numberArray[1] : 0);
}

function main(buttonId) {
        console.log('start cycle');

        console.log(`previous button id: ${previousButtonId}`);

        if (buttonId === 'clear') {
                override = false;
                hasDecimal = false;
                previousButtonId = buttonId;
                previousResult = undefined;
                i = 0;
                numberArray = [];
                return;
        }
        if (buttonId === 'equals') {
                if (i === 0 || /[-+*//]/.test(previousButtonId)) {
                        return;
                }
                override = false;
                previousButtonId = buttonId;
                previousResult = operate(operator, numberArray[0], numberArray[1]);
                i = 0;
                numberArray = [];
                numberArray[0] = previousResult;
                updateDisplay();
                return;
        }
        if (i === 1 && !/[-+*//]/.test(buttonId) && !(previousResult === undefined)) {
                if (!/[-+*//]/.test(previousButtonId) && override === false) {
                        console.log('passed');
                        previousResult = undefined;
                        i = 0;
                        numberArray = [];
                        numberArray[0] = previousButtonId;
                        previousButtonId = buttonId;
                }
                console.log("didn't pass");
        }
        if (/[0-9.]/.test(buttonId)) {
                if (buttonId === '.') {
                        if (hasDecimal === true) {
                                return;
                        }
                        hasDecimal = true;
                }
                if (!(previousResult === undefined)) {
                        i = 1;
                }
                previousButtonId = buttonId;

                if (numberArray[i] === undefined) {
                        numberArray[i] = buttonId;
                } else if (numberArray[i] !== undefined) {
                        numberArray[i] += buttonId;
                }
                updateDisplay();
                console.log(numberArray[i]);
                console.log(numberArray);
                return;
        }
        if (/[-+*//]/.test(buttonId)) {
                if (previousButtonId === buttonId) {
                        return;
                }
                if (numberArray[0] === undefined) {
                        alert('Click a number first');
                        return;
                }
                if (!(previousResult === undefined)) {
                        override = true;
                        console.log('override:true');
                }
                operator = buttonId;
                operatorDisplay = operator;
                updateDisplay();
                console.log(operator);
                if (!/[-+*//]/.test(previousButtonId)) {
                        i += 1;
                }
                console.log(i);
                previousButtonId = buttonId;
        }
        console.log('end cycle');
}

display.textContent = numberArray[0] + operatorDisplay + numberArray[1];

const button = document.querySelectorAll('button');
button.forEach(x =>
        x.addEventListener('click', () => {
                main(x.id);
        })
);
