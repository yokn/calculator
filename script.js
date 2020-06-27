const numberArray = [];
let i = 0;
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
                case 'plus':
                        return add(number1, number2);
                case 'minus':
                        return subtract(number1, number2);
                case 'asterisk':
                        return multiply(number1, number2);
                case 'slash':
                        return divide(number1, number2);
                default:
                        console.log(`Can't find case`);
        }
}

function main(buttonId) {
        if (/[0-9]/.test(buttonId)) {
                numberArray[i] = buttonId;
                console.log(numberArray[i]);
                console.log(numberArray);
                // console.log(`i-1: ${numberArray[i - 1]}`);
                i++;
                console.log(i);
                return;
        }
        const operator = buttonId;
        const display = document.querySelector('#display');
        display.textContent = operate(operator, numberArray[i - 1], numberArray[i]);
}

const button = document.querySelectorAll('button');
button.forEach(x =>
        x.addEventListener('click', () => {
                main(x.id);
        })
);
