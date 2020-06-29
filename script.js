/* eslint-disable no-console */
// TODO: Fix overflow
// TODO: Display every input
let numberArray = [];
let i = 0;
let operator;
let previousResult;
let previousButtonId;
let override = false;
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

function main(buttonId) {
        console.log('start cycle');
        const display = document.querySelector('#display');
        console.log(`previous button id: ${previousButtonId}`);

        if (buttonId === 'clear') {
                override = false;
                previousButtonId = buttonId;
                previousResult = undefined;
                i = 0;
                numberArray = [];
                display.textContent = 0;
                return;
        }
        if (buttonId === 'equals') {
                if (i === 0 || /[-+*//]/.test(previousButtonId)) {
                        return;
                }
                override = false;
                previousButtonId = buttonId;
                previousResult = operate(operator, numberArray[0], numberArray[1]);
                display.textContent = previousResult;
                i = 0;
                numberArray = [];
                numberArray[0] = previousResult;
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
                if (!(previousResult === undefined)) {
                        i = 1;
                }
                previousButtonId = buttonId;

                if (numberArray[i] === undefined) {
                        numberArray[i] = buttonId;
                } else if (numberArray[i] !== undefined) {
                        numberArray[i] += buttonId;
                }

                display.textContent = numberArray[i];
                console.log(numberArray[i]);
                console.log(numberArray);
                return;
        }
        if (/[-+*//]/.test(buttonId)) {
                if (numberArray[0] === undefined) {
                        alert('Click a number first');
                        return;
                }
                if (!(previousResult === undefined)) {
                        override = true;
                        console.log('override:true');
                }
                operator = buttonId;
                display.textContent = operator;
                console.log(operator);
                if (!/[-+*//]/.test(previousButtonId)) {
                        i += 1;
                }
                console.log(i);
                previousButtonId = buttonId;
        }
        console.log('end cycle');
}

const button = document.querySelectorAll('button');
button.forEach(x =>
        x.addEventListener('click', () => {
                main(x.id);
        })
);
