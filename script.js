document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.button').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const value = button.value;
            if (['+', '-', '*', '/', '%'].includes(value)) {
                handleOperator(value);
            } else {
                insert(value);
            }
        });
    });

    document.addEventListener('keydown', function (event) {
        const key = event.key;
        if (/\d/.test(key)) {
            insert(key);
        } else if (['+', '-', '*', '/', '%'].includes(key)) {
            handleOperator(key);
        } else if (key === 'Backspace') {
            back();
        } else if (key === 'Enter') {
            event.preventDefault();
            equals();
        } else if (key === 'Delete') {
            clean();
        } else if (key === '.') {
            if (!document.querySelector('.textview').value.includes('.')) {
                insert(key);
            }
        } else {
            alert('Only Numbers and Arithmetic Operators are allowed');
        }
    });

    document.getElementById('clear').addEventListener('click', clean);

    document.getElementById('equal').addEventListener('click', equals);
});

function insert(value) {
    document.querySelector('.textview').value += value;
}

function clean() {
    document.querySelector('.textview').value = '';
}

function back() {
    const value = document.querySelector('.textview').value;
    document.querySelector('.textview').value = value.substring(0, value.length - 1);
}

function equals() {
    const expression = document.querySelector('.textview').value;
    try {
        const result = eval(expression);
        document.querySelector('.textview').value = result;
    } catch (error) {
        document.querySelector('.textview').value = 'Error';
    }
}

function handleOperator(operator) {
    const value = document.querySelector('.textview').value;
    const lastChar = value.charAt(value.length - 1);
    if (['+', '-', '*', '/', '%'].includes(lastChar)) {
        document.querySelector('.textview').value = value.substring(0, value.length - 1) + operator;
    } else {
        insert(operator);
    }
}
