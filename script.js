let number1;
let number2;

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
                        alert(`Can't find case`);
        }
}

function main(buttonId) {
        operate(buttonId, number1, number2);
}

const button = document.querySelectorAll('button');
button.forEach(() =>
        document.addEventListener('click', () => {
                main(button.id);
        })
);
