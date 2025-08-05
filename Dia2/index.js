let prompt = require('prompt-sync')();

//Conexión a MongoDB
const { MongoClient,ObjectId } = require('mongodb');
const uri = 'mongodb+srv://romancamargo02:TxcijpfOYeDfaRR4@cluster0.vmq8c0v.mongodb.net/';
const dbName = 'crud_db';
const collectionName = 'personas';

let db, collection;
async function leerPersonas() {
    const client = new MongoClient(uri);


    try {
        await client.connect();
        db = client.db(dbName);
        collection = db.collection(collectionName);
        console.log("Conectado a la base de datos 🎉");
        const personas = await collection.find().toArray();
        for(let i=0;i<personas.length;i++){
            console.log(" ")
            console.log("Persona #",i+1)
            console.log("ID:",personas[i]["_id"]);
            console.log("Nombre:",personas[i]["nombre"]);
            console.log("Ruta:",personas[i]["ruta"]);
        }
        console.log(" ");
        
    }
    catch (e) {
        console.log("Error:", e);
    }
    finally {
        await client.close();
        console.log("Cerrado la sesión de la base de datos");
    }
};
async function actualizarPersonas() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        db = client.db(dbName);
        collection = db.collection(collectionName);
        const idObjeto = prompt("Ingresar el ObjectID de la persona:");
        if(!ObjectId.isValid(idObjeto)){
            console.log("Este ID no es valido ❌");
            return;
        }else{
            const nuevoNombre = prompt("Ingresa el nuevo nombre:");
            const nuevaRuta = prompt("Ingresa la nueva ruta:");
            const result = await collection.updateOne(
                {_id:new ObjectId(idObjeto)},
                {$set:{nombre:nuevoNombre,ruta:nuevaRuta}}
            )
            if (result.matchedCount==0){
                console.log("Persona no encontrada");

            }else{
                console.log("Persona Actualizada!");
            }
        }
    }
    catch (e) {
        console.log("Error:", e);
    }
    finally {
        await client.close();
        console.log("Cerrado la sesión de la base de datos");
    }
}


async function menu() {
    booleanito = true;

    while (booleanito == true) {
        console.log("Escoge una opción:");
        console.log("1. Imprimir Personas");
        console.log("1. Actualizar Personas");
        console.log("5. Salir");
        let opcion = prompt(':');
        switch (opcion.trim()) {
            case '1':
                //recorrerLista(personas);
                await leerPersonas();
                break;
            case '2':
                await actualizarPersonas();
                break;

            case '5':
                booleanito = false;
                break;
        }
    }
};
menu();