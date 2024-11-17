const calculatorElement = document.getElementById('calculator-object');

// Método para el botón ON/OFF y la información en el display.
const onOffbutton = document.querySelector('[data-value="on_off"]');

// Método para que los botones solo funcionen con la calculadora encendida.
const buttons = document.querySelectorAll('button:not([data-value="on_off"])');

const display = document.getElementById('display');

// Método para que los botones Up & Down funcionen.
const btnUp = document.querySelector('[data-value="up"]');
const btnDown = document.querySelector('[data-value="down"]');

// Método para que los botones left & right funcionen.
const btnRight = document.querySelector('[data-value="right"]');
const btnLeft = document.querySelector('[data-value="left"]');

// Método para que los number-buttons funcionen.
const btnNumbers = document.querySelectorAll('.number-buttons .btn');

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

// Se crea la instancia de la calculadora Casio, que debe de seguir los parámetros indicados en el constructor.
const casioCalculator = new Calculator('Calculadora', 'Casio', 'FX-82MS');

// Programación del display de la calculadora.
// Encendido y apagado de la calculadora y la visualización de la información en el display.

let encendida = false; // se define el estado inicial como apagado.
let enPantallaCarga = false;

buttons.forEach(button => button.disabled = true); // Se define el estado inicial como desactivado.

onOffbutton.addEventListener('click', () => {
    encendida = !encendida;

    if (encendida) {
        display.value = casioCalculator.getInfo();
        enPantallaCarga = true;

        buttons.forEach(button => button.disabled = true);

        // Para que no se solapen los parámetros del constructor con las operaciones, se limpiará el display después de 5000 milisegundos.
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

// Función Incrementar (con botón Up).
btnUp.addEventListener('click', () => {
    if (encendida && !enPantallaCarga && display.value.length > 0) {
        display.focus();  // Asegurarse de que el cursor esté enfocado en el display.

        if (cursorPosition < display.value.length) {
            // Convertir el número actual en la posición del cursor
            let currentNumber = parseInt(display.value[cursorPosition]);
            if (!isNaN(currentNumber)) {
                currentNumber++;  // Incrementar el número
                if (currentNumber > 9) currentNumber = 0; // Opcional, reinicia si sobrepasa 9

                // Dividir el contenido y reemplazar el número en la posición del cursor.
                const beforeCursor = display.value.slice(0, cursorPosition);
                const afterCursor = display.value.slice(cursorPosition + 1);
                display.value = beforeCursor + currentNumber + afterCursor;

                // Mover el cursor a la siguiente posición
                display.setSelectionRange(cursorPosition, cursorPosition + 1);
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
            let currentNumber = parseInt(display.value[cursorPosition]);
            if (!isNaN(currentNumber)) {
                currentNumber--;  // Decrementar el número
                if (currentNumber < 0) currentNumber = 9; // Opcional, reinicia si baja de 0

                // Dividir el contenido y reemplazar el número en la posición del cursor.
                const beforeCursor = display.value.slice(0, cursorPosition);
                const afterCursor = display.value.slice(cursorPosition + 1);
                display.value = beforeCursor + currentNumber + afterCursor;

                // Mover el cursor a la siguiente posición
                display.setSelectionRange(cursorPosition, cursorPosition + 1);
            }
        }
    }
});


// Función cursorPosition Right & Left.
let cursorPosition = 0;

btnRight.addEventListener('click', () => {
    if (encendida && !enPantallaCarga && display.value.length > 0) {
        display.focus(); // Mover el enfoque al display.

        if (cursorPosition < display.value.length) {
            cursorPosition++;
        }
        display.setSelectionRange(cursorPosition, cursorPosition);
    }
});

btnLeft.addEventListener('click', () => {
    if (encendida && !enPantallaCarga && display.value.length > 0) {
        display.focus(); // Mover el enfoque al display.

        if (cursorPosition > 0) {
            cursorPosition--;
        }
        display.setSelectionRange(cursorPosition, cursorPosition);
    }
});


// Funciones para los numbers-buttons.
btnNumbers.forEach(button => {
    button.addEventListener('click', () => {
        if (encendida && !enPantallaCarga) {
            display.value += button.getAttribute('data-value');
        }
    });
});
