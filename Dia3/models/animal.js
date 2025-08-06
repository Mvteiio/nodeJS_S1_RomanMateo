class Animal {
    constructor(nombre){
        this.nombre=nombre;
    }
    hablar(){
        console.log(`${this.nombre} está haciendo un ruido.`)
    }
}

module.exports = Animal;