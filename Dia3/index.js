// #####################
// P.O.O (Programación orientada a objetos)
// #####################

// ¿Qué es la P.O.O?
/*
Es un paradigma de programación que se basa en el uso
de "objetos".
*/

const cuentaBancaria = require('./models/cuentaBancaria.js')
// const Persona = require('./models/persona.js');
// const pedro = new Persona('Pedro', 25);
// pedro.saludar();

const cuenta = new cuentaBancaria('Pedro', 1000)
cuenta.depositar(5000);
console.log(cuenta.verSaldo())


const Perro = require('./models/perro.js')
const animal1 = new Perro("Paco");
animal1.hablar();