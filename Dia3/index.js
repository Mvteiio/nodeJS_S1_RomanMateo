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

const Pajaro = require('./models/pajaro.js');
const animal3 = new Pajaro('Piolin', 'Canario');
animal3.hablar()

// Asociación
const Pedido = require('./models/pedido');
const LineItem = require('./models/lineItem');

const pedido1 = new Pedido('P-001');
pedido1.addItem(new LineItem('Manzanas',3,1.2));
pedido1.addItem(new LineItem('Peras',2,1.5));

console.log('Total Pedido:',pedido1.total());

//Un LineItem NO sabe de su pedido
const item= pedido1.items[0];
console.log('Item conoce el ID del pedido?:','id' in item);

//Bidireccional
const Autor = require('./models/autor');
const Libro = require('./models/libro');

const autor1 = new Autor(1,'Gabriel Garcia Marquez');
const libro1= new Libro('9786287641587','100 años de soledad');
const libro2= new Libro('9789580600015','Amor en los tiempos de cólera');


autor1.agregarLibro(libro1);
autor1.agregarLibro(libro2);
console.log(autor1);
console.log(libro1);