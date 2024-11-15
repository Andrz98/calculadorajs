const calculatorElement = document.getElementById('calculator-object')

class Calculator {
    constructor(name, brand, model) {
        this.name = 'Calculadora'
        this.brand = 'Casio'
        this.model = 'FX-82ms'
    }


    //Aquí mostramos la información de la calculculadora.//

    getInfo() {
        console.log('Name: ${this.name}, Brand: ${this.brand}, Model: ${this.model}');
    }
}

