/*
super()

sirve para llamar al constructor de la clase padre.
*/
const Animal = require('./animal.js')


class Pajaro extends Animal {
    constructor(nombre, raza){
        super(nombre);
        this.raza=raza;
    }

    hablar(){
        console.log(`El ${this.nombre} es un ${this.raza}!`)
    }
    
}

module.exports = Pajaro