// views/registroView.js

const prompt = require('prompt-sync')();

function mostrarMenu() {
    console.log(`
---------------------------
--- BIENVENIDO CAMPER ---
Por favor, elige una opcion:
1. Ver todos los registros
2. Crear un registro
3. Actualizar un registro
4. Eliminar un registro
5. Salir
---------------------------
    `);
}

function obtenerEleccion() {
    return prompt("Elegir: ");
}

function mostrarRegistros(registros) {
    console.log("--- Registros Encontrados ---");
    if (registros.length === 0) {
        console.log("No hay registros para mostrar");
    } else {
        console.table(registros);
    }
    console.log("----------------------------");
}

function obtenerDatosNuevoRegistro() {
    console.log("--- Crear Nuevo Registro ---");
    const nombre = prompt("Nombre: ");
    const telefono = prompt("Telefono: ");
    const activo = prompt("Está activo? (true/false): ") === "true";
    const ruta = prompt("Ruta: ");
    return { nombre, telefono, activo, ruta };
}

function obtenerDatosActualizacion() {
    console.log("--- Actualizar Registro ---");
    const id = prompt("Indica el ID a actualizar: ");
    const nombre = prompt("Nuevo Nombre (deja en blanco para no cambiar): ");
    const telefono = prompt("Nuevo Telefono (deja en blanco para no cambiar): ");
    const activoInput = prompt("Está activo? (true/false, deja en blanco para no cambiar): ");
    const ruta = prompt("Nueva Ruta (deja en blanco para no cambiar): ");

    const datosActualizados = {};
    if (nombre) datosActualizados.nombre = nombre;
    if (telefono) datosActualizados.telefono = telefono;
    if (activoInput) datosActualizados.activo = activoInput === "true";
    if (ruta) datosActualizados.ruta = ruta;

    return { id, datosActualizados };
}

function obtenerIdParaEliminar() {
    console.log("--- Eliminar Registro ---");
    return prompt("Indica el ID de la persona a eliminar: ");
}

function mostrarMensaje(mensaje) {
    console.log(mensaje);
}

module.exports = {
    mostrarMenu,
    obtenerEleccion,
    mostrarRegistros,
    obtenerDatosNuevoRegistro,
    obtenerDatosActualizacion,
    obtenerIdParaEliminar,
    mostrarMensaje
};