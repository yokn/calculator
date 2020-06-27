let numberArray = [];
let i = 0;
let operator;
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
        return x / y;
}

function operate(operator, number1, number2) {
        switch (operator) {
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
        if (buttonId == 'equals') {
                display.textContent = operate(operator, numberArray[0], numberArray[1]);
                i = 0;
                numberArray = [];
        }
        if (i > 1) {
                i = 0;
                numberArray = [];
        }
        if (/[0-9]/.test(buttonId)) {
                numberArray[i] = buttonId;
                console.log(numberArray[i]);
                console.log(numberArray);
                // console.log(`i-1: ${numberArray[i - 1]}`);
                i++;
                console.log(i);
                return;
        }
        if (/[-+*//]/.test(buttonId)) {
                operator = buttonId;
                console.log(operator);
        }
}

const button = document.querySelectorAll('button');
button.forEach(x =>
        x.addEventListener('click', () => {
                main(x.id);
        })
);
