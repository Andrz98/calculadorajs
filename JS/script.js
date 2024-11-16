const calculatorElement = document.getElementById('calculator-object')
//Método para el botón ON/OFF y la información en el display.//
const onOffbutton = document.querySelector('[data-value="ONN_OFF"]')
//Método para que los botones solo funcionen con a calculadora encendida.//
const buttons = document.querySelectorAll('[data-value="ONN_OFF"]')
const display = document.getElementById('display')

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
buttons.forEach(button => button.disable = true) //Se define el estado inicial como desactivado//

onOffbutton.addEventListener('click', () => {
    encendida = !encendida;

    if (encendida) {
        display.value = casioCalculator.getInfo()
        buttons.forEach(button => button.disable = false)
    } else {
        display.value = ''
        buttons.forEach(button => button.disable = true)
    }
});




