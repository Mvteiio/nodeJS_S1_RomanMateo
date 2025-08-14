// controllers/registroController.js

const model = require('../models/registroModel');
const view = require('../views/registroView');

class RegistroController {
    
    // Método para ver todos los registros
    verRegistros() {
        const registros = model.leerTodos();
        view.mostrarRegistros(registros);
    }

    // Método para crear un registro
    crearRegistro() {
        const nuevoRegistro = view.obtenerDatosNuevoRegistro();
        const registroCreado = model.crear(nuevoRegistro);
        view.mostrarMensaje(`\n✅ Registro con id ${registroCreado.id} creado exitosamente.`);
    }

    // Método para actualizar un registro
    actualizarRegistro() {
        const { id, datosActualizados } = view.obtenerDatosActualizacion();
        const registroActualizado = model.actualizar(id, datosActualizados);
        if (registroActualizado) {
            view.mostrarMensaje(`\n✅ Registro con id ${id} actualizado.`);
        } else {
            view.mostrarMensaje(`\n❌ Error: No se encontró ningún registro con el id ${id}.`);
        }
    }
    
    // Método para eliminar un registro
    eliminarRegistro() {
        const id = view.obtenerIdParaEliminar();
        const exito = model.eliminar(id);
        if (exito) {
            view.mostrarMensaje(`\n✅ Registro con id ${id} eliminado.`);
        } else {
            view.mostrarMensaje(`\n❌ Error: No se encontró ningún registro con el id ${id}.`);
        }
    }
}

module.exports = new RegistroController();