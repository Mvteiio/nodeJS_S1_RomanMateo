const Animal = require('./animal.js')

class Perro extends Animal {
    hablar(){
        console.log(`${this.nombre} está ladrando`)
    }

}

module.exports=Perro;