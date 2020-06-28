/* eslint-disable no-console */
// TODO: Not add a 0 before every number..
const numberArray = [];
numberArray[0] = 0; // I can't seem to find a good way to initialize an array without undefined
numberArray[1] = 0; // so I have to do this /shrug
let i = 0;
let operator;
let previousResult;
let previousButtonId;
function add(x, y) {
        return x + y;
}
function subtract(x, y) {
        return x - y;
}
function multiply(x, y) {
        return x * y;
}
function divide(x, y) {
        if (y === '00') {
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

function main(buttonId) {
        const display = document.querySelector('#display');
        console.log(`previous button id: ${previousButtonId}`);
        if (buttonId === 'clear') {
                previousButtonId = buttonId;
                previousResult = undefined;
                i = 0;
                numberArray[0] = 0;
                numberArray[1] = 0;
                display.textContent = 0;
        }
        if (buttonId === 'equals') {
                if (i === 0 || /[-+*//]/.test(previousButtonId)) {
                        return;
                }
                previousButtonId = buttonId;
                previousResult = operate(operator, numberArray[0], numberArray[1]);
                display.textContent = previousResult;
                i = 0;
                // numberArray = [0];
                numberArray[0] = previousResult;
                numberArray[1] = 0;
                return;
        }
        if (i === 1 && !/[-+*//]/.test(buttonId) && !(previousResult === undefined)) {
                if (!/[-+*//]/.test(previousButtonId)) {
                        console.log('passed');
                        previousResult = undefined;
                        i = 0;
                        numberArray[0] = 0;
                        numberArray[0] = previousButtonId;
                        numberArray[1] = 0;
                        previousButtonId = buttonId;
                }
                console.log("didn't pass");
        }
        if (/[0-9]/.test(buttonId)) {
                if (!(previousResult === undefined)) {
                        i = 1;
                }
                previousButtonId = buttonId;
                numberArray[i] += buttonId;
                display.textContent = numberArray[i];
                console.log(numberArray[i]);
                console.log(numberArray);

                return;
        }
        // if (i = 1) {
        if (/[-+*//]/.test(buttonId)) {
                operator = buttonId;
                console.log(operator);
                if (!/[-+*//]/.test(previousButtonId)) {
                        i += 1;
                }
                console.log(i);
                previousButtonId = buttonId;
        }
        // }
        console.log('end cycle');
        // previousButtonId = buttonId;
}

const button = document.querySelectorAll('button');
button.forEach(x =>
        x.addEventListener('click', () => {
                main(x.id);
        })
);
