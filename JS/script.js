// Display
const display = document.getElementById('display');
display.readOnly = true;  // Evita la edición manual del display.

// Move-Section
const btnUp = document.querySelector('[data-value="up"]');
const btnDown = document.querySelector('[data-value="down"]');
const btnRight = document.querySelector('[data-value="right"]');
const btnLeft = document.querySelector('[data-value="left"]');

// Funciones adicionales
const onOffbutton = document.querySelector('[data-value="on_off"]');
const btnAC = document.querySelector('[data-value="AC"]');
const btnDel = document.querySelector('[data-value="DEL"]');
const btnAns = document.querySelector('[data-value="ANS"]');
let encendida = false; // se define el estado inicial como apagado.
let enPantallaCarga = false;
let ultimoResultado = ''; // La variable que guardará el resultado de la última operación.
let cursorPosition = 0;

// Botón de encendido/apagado
const buttons = document.querySelectorAll('button:not([data-value="on_off"])');
buttons.forEach(button => button.disabled = true); // Se define el estado inicial como desactivado.

// Botones de números
const btnNumbers = document.querySelectorAll('.number-buttons .btn');

// Operadores matemáticos
const btnAdd = document.querySelector('[data-value="+"]');
const btnSubtract = document.querySelector('[data-value="-"]');
const btnMultiply = document.querySelector('[data-value="*"]');
const btnDivide = document.querySelector('[data-value="/"]');
const btnExponent = document.querySelector('[data-value="exp"]');
const btnSqrt = document.querySelector('[data-value="sqrt"]');
const btnParenthesisOpen = document.querySelector('[data-value="("]');
const btnParenthesisClose = document.querySelector('[data-value=")"]');
const btnEqual = document.querySelector('[data-value="="]');
const btnDecimal = document.querySelector('[data-value="."]');

// Clase Calculator
class Calculator {
    constructor(name, brand, model) {
        this.name = name;
        this.brand = brand;
        this.model = model;
    }

    // Aquí mostramos la información de la calculadora.
    getInfo() {
        return `Name: ${this.name}\nBrand: ${this.brand}\nModel: ${this.model}`; // utilizo return para mostrar la información en el display.
    }
}

// Se crea la instancia de la calculadora Casio, que debe seguir los parámetros indicados en el constructor.
const casioCalculator = new Calculator('Calculadora', 'Casio', 'FX-82MS');

// Encendido y apagado de la calculadora y la visualización de la información en el display.
onOffbutton.addEventListener('click', () => {
    encendida = !encendida;

    if (encendida) {
        display.value = casioCalculator.getInfo();
        enPantallaCarga = true;

        buttons.forEach(button => button.disabled = true);

        // Para que no se solapen los parámetros del constructor con las operaciones, se limpiará el display después de 2000 milisegundos.
        setTimeout(() => {
            display.value = '';
            enPantallaCarga = false;
            buttons.forEach(button => button.disabled = false); // Y se habilitan los botones después de la pantalla de carga.
        }, 2000);

    } else {
        display.value = '';
        buttons.forEach(button => button.disabled = true);
    }
});

// Función para determinar si un carácter es un operador.
function esOperador(char) {
    return ['+', '-', '*', '/', '^'].includes(char);
}

// Funciones de movimiento
// Función Incrementar (con botón Up).
btnUp.addEventListener('click', () => {
    if (encendida && !enPantallaCarga && display.value.length > 0) {
        display.focus();  // Asegurarse de que el cursor esté enfocado en el display.

        if (cursorPosition < display.value.length) {
            // Convertir el número actual en la posición del cursor
            let currentNumber = parseInt(display.value[cursorPosition])
            if (!isNaN(currentNumber)) {
                currentNumber++;  // Incrementar el número
                if (currentNumber > 9) currentNumber = 0; // Opcional, reinicia si sobrepasa 9

                // Dividir el contenido y reemplazar el número en la posición del cursor.
                const beforeCursor = display.value.slice(0, cursorPosition)
                const afterCursor = display.value.slice(cursorPosition + 1)
                display.value = beforeCursor + currentNumber + afterCursor;

                // Mover el cursor a la siguiente posición
                display.setSelectionRange(cursorPosition, cursorPosition + 1)
            }
        }
    }
});

// Función Decrementar (con botón Down).
btnDown.addEventListener('click', () => {
    if (encendida && !enPantallaCarga && display.value.length > 0) {
        display.focus();  // Asegurarse de que el cursor esté enfocado en el display.

        if (cursorPosition < display.value.length) {
            // Convertir el número actual en la posición del cursor
            let currentNumber = parseInt(display.value[cursorPosition])
            if (!isNaN(currentNumber)) {
                currentNumber--;  // Decrementar el número
                if (currentNumber < 0) currentNumber = 9; // Opcional, reinicia si baja de 0

                // Dividir el contenido y reemplazar el número en la posición del cursor.
                const beforeCursor = display.value.slice(0, cursorPosition)
                const afterCursor = display.value.slice(cursorPosition + 1)
                display.value = beforeCursor + currentNumber + afterCursor;

                // Mover el cursor a la siguiente posición
                display.setSelectionRange(cursorPosition, cursorPosition + 1)
            }
        }
    }
});


// Función cursorPosition Right & Left.

btnRight.addEventListener('click', () => {
    if (encendida && !enPantallaCarga && display.value.length > 0) {
        display.focus() // Mover el enfoque al display.

        if (cursorPosition < display.value.length) {
            cursorPosition++
        }
        display.setSelectionRange(cursorPosition, cursorPosition)
    }
});

btnLeft.addEventListener('click', () => {
    if (encendida && !enPantallaCarga && display.value.length > 0) {
        display.focus()// Mover el enfoque al display.

        if (cursorPosition > 0) {
            cursorPosition--
        }
        display.setSelectionRange(cursorPosition, cursorPosition)
    }
});

// Funcionalidades adicionales
btnAC.addEventListener('click', () => {
    if (encendida && !enPantallaCarga) {
        display.value = '';
        cursorPosition = 0;
    }
});

btnDel.addEventListener('click', () => {
    if (encendida && !enPantallaCarga) {
        display.value = display.value.slice(0, -1);
        cursorPosition = display.value.length;
        display.setSelectionRange(cursorPosition, cursorPosition);
    }
});

btnAns.addEventListener('click', () => {
    if (encendida && !enPantallaCarga && ultimoResultado.length > 0) {
        display.value += ultimoResultado;
        cursorPosition = display.value.length;
        display.setSelectionRange(cursorPosition, cursorPosition);
    }
});

// Funciones para los números
btnNumbers.forEach(button => {
    button.addEventListener('click', () => {
        if (encendida && !enPantallaCarga) {
            display.value += button.getAttribute('data-value');
            cursorPosition = display.value.length;
            display.setSelectionRange(cursorPosition, cursorPosition);
        }
    });
});

// Operaciones matemáticas
const operadores = [
    { button: btnAdd, operador: '+' },
    { button: btnSubtract, operador: '-' },
    { button: btnMultiply, operador: '*' },
    { button: btnDivide, operador: '/' },
    { button: btnExponent, operador: '^' }
];

operadores.forEach(({ button, operador }) => {
    button.addEventListener('click', () => {
        if (encendida && !enPantallaCarga) {
            const lastCharacter = display.value.slice(-1);
            if (esOperador(lastCharacter)) {
                display.value = display.value.slice(0, -1) + ` ${operador} `;
            } else if (display.value.length > 0) {
                display.value += ` ${operador} `;
            }
            cursorPosition = display.value.length;
            display.setSelectionRange(cursorPosition, cursorPosition);
        }
    });
});

// Botón de raíz cuadrada
btnSqrt.addEventListener('click', () => {
    if (encendida && !enPantallaCarga) {
        if (display.value.length > 0) {
            const numero = parseFloat(display.value);
            if (numero >= 0) {
                const resultado = Math.sqrt(numero);
                display.value = resultado.toString();
            } else {
                display.value = 'Error';
            }
        }
        cursorPosition = display.value.length;
        display.setSelectionRange(cursorPosition, cursorPosition);
    }
});

// Botón de paréntesis
btnParenthesisOpen.addEventListener('click', () => {
    if (encendida && !enPantallaCarga) {
        display.value += '(';
        cursorPosition = display.value.length;
        display.setSelectionRange(cursorPosition, cursorPosition);
    }
});

btnParenthesisClose.addEventListener('click', () => {
    if (encendida && !enPantallaCarga) {
        display.value += ')';
        cursorPosition = display.value.length;
        display.setSelectionRange(cursorPosition, cursorPosition);
    }
});

// Botón decimal (.)
btnDecimal.addEventListener('click', () => {
    if (encendida && !enPantallaCarga) {
        const partes = display.value.split(/[\+\-\*\/\^]/);
        const ultimaParte = partes[partes.length - 1];

        if (!ultimaParte.includes('.')) {
            display.value += '.';
            cursorPosition = display.value.length;
            display.setSelectionRange(cursorPosition, cursorPosition);
        }
    }
});

// Botón igual
btnEqual.addEventListener('click', () => {
    if (encendida && !enPantallaCarga) {
        try {
            const displayValue = display.value.replace(/\s/g, '');

            const resultado = evaluateExpression(displayValue);

            if (resultado === Infinity || isNaN(resultado)) {
                display.value = 'Error';
            } else {
                display.value = resultado.toString();
            }

            cursorPosition = display.value.length;
            display.setSelectionRange(cursorPosition, cursorPosition);
            ultimoResultado = display.value;

        } catch (error) {
            display.value = 'Error';
            cursorPosition = display.value.length;
            display.setSelectionRange(cursorPosition, cursorPosition);
        }
    }
});

function evaluateExpression(expression) {
    return Function('"use strict";return (' + expression + ')')();
}
