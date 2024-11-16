const calculatorElement = document.getElementById('calculator-object')
//Método para el botón ON/OFF y la información en el display.//
const onOffbutton = document.querySelector('[data-value="on_off"]')
//Método para que los botones solo funcionen con a calculadora encendida.//
const buttons = document.querySelectorAll('[data-value="on_Off"]')
const display = document.getElementById('display')
//Método para que los botones Up & Down funcionen.//
const btnUp = document.querySelector('[data-value="Up"]')
const btnDown = document.querySelector('[data-value="down"]')
//Método para que los boones left & Right funcionen.//
const btnRight = document.querySelector('[data-value="right"]')
const btnLeft = document.querySelector('[data-value="left"]')

class Calculator {
    constructor(name, brand, model) {
        this.name = name
        this.brand = brand
        this.model = model
    }


    //Aquí mostramos la información de la calculculadora.//

    getInfo() {
        return `Name: ${this.name}\nBrand: ${this.brand}\nModel: ${this.model}`; //utilizo return para mostrar la información en el display//
    }
}

//Se crea la instancia de la calculadora Casio, que debe de seguir los parámetros indicados en el constructor.//

const casioCalculator = new Calculator('Calculadora', 'Casio', 'FX-82MS')

//Programación del display de la calculadora.//
//Encendido y apagado de la calculadora y la visualización de la información en el display.//

let encendida = false //se define el estado inicial cómo apagado//
buttons.forEach(button => button.disabled = true) //Se define el estado inicial como desactivado//

onOffbutton.addEventListener('click', () => {
    encendida = !encendida;

    if (encendida) {
        display.value = casioCalculator.getInfo()
        buttons.forEach(button => button.disabled = false)
    } else {
        display.value = ''
        buttons.forEach(button => button.disabled = true)
    }
});

//Función Incremento.//
btnDown.addEventListener('click', () => {
    if (encendida && display.value !== '') {
        let currentValue = parseInt(display.value)
        if (!isNaN(currentValue)) {
            currentValue++,
                display.value = currentValue
        }
    }
})

//Función Decremento.// 
btnUp.addEventListener('click', () => {
    if (encendida && display.value !== '') {
        let currentValue = parseInt(display.value)
        if (!isNaN(currentValue)) {
            currentValue--,
                display.value = currentValue
        }
    }
})

//función cursorPosition Right & Left.//

btnRight.addEventListener('click', () => {
    if (encendido && display.value !== '') {

    }
})



