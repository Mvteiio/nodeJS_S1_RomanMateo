// models/registroModel.js

const fs = require('fs');
const RUTA_ARCHIVO = './data.json';

// Lee todos los registros del archivo y nos da el JSON
function leerTodos() {
    try {
        const datosCrudos = fs.readFileSync(RUTA_ARCHIVO, 'utf-8');
        return JSON.parse(datosCrudos);
    } catch (error) {
        if (error.code === 'ENOENT') return []; // Si no existe nada, nos da una lista vacia
        throw error;
    }
}

// Guarda todos los registros en el archivo
function escribirTodos(registros) {
    const datosParaEscribir = JSON.stringify(registros, null, 2);
    fs.writeFileSync(RUTA_ARCHIVO, datosParaEscribir, 'utf-8');
}

// Genera un nuevo ID basado en el maximo ID existente
function generarNuevoId() {
    const registros = leerTodos();
    if (registros.length === 0) return 1;
    const maxId = Math.max(...registros.map(reg => reg.id));
    return maxId + 1;
}

// Crea un nuevo registro
function crear(nuevoRegistro) {
    const registros = leerTodos();
    nuevoRegistro.id = generarNuevoId(); // Asigna el ID aqui
    registros.push(nuevoRegistro);
    escribirTodos(registros);
    return nuevoRegistro; // Devuelve el registro creado
}

// Actualiza un registro por su ID
function actualizar(id, datosActualizados) {
    const registros = leerTodos();
    const indice = registros.findIndex(reg => reg.id == id);
    if (indice === -1) return null; // No encontrado

    registros[indice] = Object.assign(registros[indice], datosActualizados);
    
    escribirTodos(registros);
    return registros[indice]; // Devuelve el registro actualizado
}

// Elimina un registro por su ID
function eliminar(id) {
    let registros = leerTodos();
    const registrosFiltrados = registros.filter(reg => reg.id != id);
    if (registros.length === registrosFiltrados.length) return false; // No se eliminó nada

    escribirTodos(registrosFiltrados);
    return true; // Exito
}

// Exportamos todas las funciones para que el Controlador pueda usarlas.
module.exports = {
    leerTodos,
    crear,
    actualizar,
    eliminar
};