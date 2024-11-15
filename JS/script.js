const calculatorElement = document.getElementById('calculator-object')

class Calculator {
    constructor(name, brand, model) {
        this.name = name
        this.brand = brand
        this.model = model
    }


    //Aquí mostramos la información de la calculculadora.//

    getInfo() {
        console.log(`Name: ${this.name}, Brand: ${this.brand}, Model: ${this.model}`);
    }
}

//Se crea el objeto, que debe de seguir los parámetros indicados en el constructor.//

const casioCalculator = new Calculator('Calculadora', 'Casio', 'FX-82MS')

casioCalculator.getInfo();
