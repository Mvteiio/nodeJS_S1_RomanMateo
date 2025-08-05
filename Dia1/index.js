// Esto es para poder leer o escribir los datos del JSON, es algo nativo de node
const fs = require('fs');
const RUTA_ARCHIVO = './data.json';

// Esto es un paquete que sirve como la funcion prompt d python, o sea para uno como usuario poder ingresar datos a node
const prompt = require('prompt-sync')();

function leerRegistros() {
  try {
    // 1. Le decimos que lea todo el JSON como un string
    const datosCrudos = fs.readFileSync(RUTA_ARCHIVO, 'utf-8');
    
    // 2. Convertimos ese string en un JSON 
    const registros = JSON.parse(datosCrudos);
    
    console.log("Registros encontrados:", registros);
    return registros; // al ejecutar esta funcion, y si todo es correcto nos dara como return el JSON
  } catch (error) {
    // Si el archivo no existe o no tiene datos, le decimos que nos devuelva un array vacio
    if (error.code === 'ENOENT') {
      return []; 
    }
    // Esto es por si es otro tipo de error
    throw error;
  }
}

function crearRegistro(nuevoRegistro) {
  // Primero, obtenemos todos los registros existentes.
  const registros = leerRegistros();
  
  // 3. Agregamos el nuevo objeto al JSON
  registros.push(nuevoRegistro);
  
  // 4. Ese JSON lo pasamos a un string.
  // El 'null, 2' es para que lo formatee bonito con 2 espacios de indentación.
  const datosParaEscribir = JSON.stringify(registros, null, 2);
  
  // 5. Y el string anterior lo sobreescribimos en data.json o la ruta q sea
  fs.writeFileSync(RUTA_ARCHIVO, datosParaEscribir, 'utf-8');
  
  console.log(`Registro con id ${nuevoRegistro.id} creado exitosamente.`);
}
// Objeto de guia que se debe agregar al JSON 
/*
const nuevoObj = {
  "id": 3, 
  "nombre": "Carlos",
  "telefono": "3009998877",
  "activo": true,
  "ruta": "vue"
};
*/

function actualizarRegistro(id, datosActualizados) {
  const registros = leerRegistros();
  
  // 3. convertimos el id en el indice del objeto, digamos buscamos al sujeto con id 3, pero ese indice es 2, entonces esto convierte el id 3 en el indice 2
  const indice = registros.findIndex(reg => reg.id == id);
  
  if (indice === -1) {
    console.log(`Error: No se encontró ningún registro con el id ${id}.`);
    return;
  }
  
  // Actualizamos unicamente el objeto con el indice que buscamos anteriormente.
  // Spread Syntax (...) combina los objetos, sobreescribiendo las propiedades viejas.
  registros[indice] = { ...registros[indice], ...datosActualizados };

  // La otra forma con object.assing (es lo mismo, pero me parece mas sencillo con los tres puntos)
  // registros[indice] = Object.assign(registros[indice], datosActualizados);
  
  // 4 y 5. Convertir el JSON actualizado a un string y sobrescribirlo en la data.
  const datosParaEscribir = JSON.stringify(registros, null, 2);
  fs.writeFileSync(RUTA_ARCHIVO, datosParaEscribir, 'utf-8');
  
  console.log(`Registro con id ${id} actualizado.`);
}

function eliminarRegistro(id) {
  let registros = leerRegistros();
  
  // 3. MANIPULAR: Usamos .filter() para crear un NUEVO array
  // que contenga solo los registros cuyo 'id' NO coincida con el que queremos borrar.
  const registrosFiltrados = registros.filter(reg => reg.id !== id);
  
  // Verificamos si realmente se eliminó algo.
  if (registros.length === registrosFiltrados.length) {
    console.log(`Error: No se encontró ningún registro con el id ${id}.`);
    return;
  }
  
  // 4 y 5. Convertir el JSON actualizado a un string y sobrescribirlo en la data.
  const datosParaEscribir = JSON.stringify(registrosFiltrados, null, 2);
  fs.writeFileSync(RUTA_ARCHIVO, datosParaEscribir, 'utf-8');
  
  console.log(`Registro con id ${id} eliminado.`);
}

// Funcion para generar el id de los nuevos objetos del array o JSON
function generarNuevoId() {
  // guardamos el JSON en la variable
  const registros = leerRegistros(); 

  // Caso base: Si no hay registros, empezamos en 1
  if (registros.length === 0) {
    return 1;
  }

  // 1. Creamos un array pero solo con los numeros de los IDs 
  const ids = registros.map(registro => registro.id);
  
  // 2. Ese array lo desempaquetamos con los 3 puntos, y de todos los numeros, 
  // cogemos el mas grande
  const maxId = Math.max(...ids);
  
  // 3. Devolvemos el ID mas alto + 1
  return maxId + 1;
}

function mostrarMenu(){
    console.log("--- BIENVENIDO CAMPER ---");
    console.log("Por favor, elige una opción:\n1. Ver todos los registros\n2. Crear un registro\n3. Actualizar un registro\n4. Eliminar un registro\n5. Salir");
    console.log("---------------------------");
}

mostrarMenu();

const eleccion = prompt("Elegir: ")

if (eleccion === "1") {
  leerRegistros();
}
else if (eleccion === "2") {
    const nuevoNombre = prompt("Nombre: ");
    const nuevoTelefono = prompt("Telefono: ");
    const nuevoActivo = prompt("Está activo? (escribe true o false): ");
    const nuevoActivoBooleano = (nuevoActivo === "true");
    const nuevoRuta = prompt("Ruta: ");

    const nuevoObj = {
            "id": generarNuevoId(),
            "nombre": nuevoNombre,
            "telefono": nuevoTelefono,
            "activo": nuevoActivoBooleano,
            "ruta": nuevoRuta
    }
    crearRegistro(nuevoObj);
}
else if (eleccion === "3") {
    const idActualizar = prompt("Indica el ID de la persona a actualizar: ")
    const actualizarNombre = prompt("Nombre: ");
    const actualizarTelefono = prompt("Telefono: ");
    const actualizarActivo = prompt("Está activo? (escribe true o false): ");
    const actualizarActivoBooleano = (actualizarActivo === "true");
    const actualizarRuta = prompt("Ruta: ")

    const actualizarObj = {
            "id": idActualizar,
            "nombre": actualizarNombre,
            "telefono": actualizarTelefono,
            "activo": actualizarActivoBooleano,
            "ruta": actualizarRuta
    }

    actualizarRegistro(idActualizar, actualizarObj)
}
else if (eleccion === "4") {
    const idEliminar = prompt("Indica el ID de la persona a eliminar: ")
    eliminarRegistro(idEliminar)
}
else {
    console.log("Vuelve pronto")
};
