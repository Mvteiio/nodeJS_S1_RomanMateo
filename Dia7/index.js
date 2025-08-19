// app.js

const controller = require('./controllers/registroController');
const view = require('./views/registroView');

function main() {
    let salir = false;

    while (!salir) {
        view.mostrarMenu();
        const eleccion = view.obtenerEleccion();

        switch (eleccion) {
            case '1':
                controller.verRegistros();
                break;
            case '2':
                controller.crearRegistro();
                break;
            case '3':
                controller.actualizarRegistro();
                break;
            case '4':
                controller.eliminarRegistro();
                break;
            case '5':
                salir = true;
                view.mostrarMensaje("Chao pescado");
                break;
            default:
                view.mostrarMensaje("Inválido");
                break;
        }

    
    }
}

main();