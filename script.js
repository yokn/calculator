/* eslint-disable no-console */
let numberArray = [];
let operatorDisplay;
let i = 0;
let firstNumber;
let operator;
let secondNumber;
const firstNumberInvisible = false;
let secondNumberInvisible = true;
let operatorInvisible = true;
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
                alert("Can't divide by zero");
                return 'DIVBYZERO';
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

const firstNumberSelection = document.querySelector('#firstNumber');
const operatorSelection = document.querySelector('#operator');
const secondNumberSelection = document.querySelector('#secondNumber');

function updateDisplay() {
        [firstNumber] = [numberArray[0]];
        operatorDisplay = operator;
        [secondNumber] = [numberArray[1]];
        firstNumberSelection.textContent = firstNumber;
        operatorSelection.textContent = operatorDisplay;
        secondNumberSelection.textContent = secondNumber;

        if (firstNumberInvisible === true) {
                firstNumberSelection.style = 'display:none';
        } else if (firstNumberInvisible === false) {
                firstNumberSelection.style = 'display:flex';
        }
        if (operatorInvisible === true) {
                operatorSelection.style = 'display:none';
        } else if (operatorInvisible === false) {
                operatorSelection.style = 'display:flex';
        }
        if (secondNumberInvisible === true) {
                secondNumberSelection.style = 'display:none';
        } else if (secondNumberInvisible === false) {
                secondNumberSelection.style = 'display:flex';
        }
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
                operatorInvisible = true;
                secondNumberInvisible = true;
                updateDisplay();
                firstNumberSelection.textContent = '0';
                return;
        }
        if (buttonId === 'equals') {
                if (i === 0 || /[-+*/]/.test(previousButtonId)) {
                        return;
                }
                override = false;
                previousButtonId = buttonId;
                previousResult = operate(operator, numberArray[0], numberArray[1]);
                numberArray = [];
                if (!(previousResult === 'DIVBYZERO')) {
                        previousResult = previousResult.toFixed(1);
                        numberArray[0] = previousResult;
                }
                i = 0;
                operatorInvisible = true;
                secondNumberInvisible = true;
                updateDisplay();
                return;
        }
        if (i === 1 && !/[-+*/]/.test(buttonId) && !(previousResult === undefined)) {
                if (!/[-+*/]/.test(previousButtonId) && override === false) {
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
                        if (!(previousResult === undefined)) {
                                hasDecimal = true;
                        }
                        if (!(numberArray[1] === undefined)) {
                                if (!numberArray[1].includes('.')) {
                                        hasDecimal = false;
                                }
                        }
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
                secondNumberInvisible = false;
                updateDisplay();
                console.log(numberArray[i]);
                console.log(numberArray);
                return;
        }
        if (/[-+*/]/.test(buttonId)) {
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
                operatorInvisible = false;
                updateDisplay();
                console.log(operator);
                if (!/[-+*/]/.test(previousButtonId)) {
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
