import Alerta from './Alerta.js';
const alerta = new Alerta();

const tomarDatosUsuario = () => {
    let logueado = localStorage.getItem("logueado");
    if(logueado) {
        let email = localStorage.getItem("email");
        $.ajax({
            url: 'http://localhost/TuxOut/tienda/core/Enrutador.php', 
            method: 'POST', 
            dataType: 'json', 
            data: {accion: "show", controlador: "UsuarioControlador", valores: ["email", email]},
            success: function(response) {
                if (response.error) {
                    console.error('Error:', response.error);
                } else {
                    if(response) { 
                        imprimirDatosUsuario(response);
                    }
                }
            },
            error: function(xhr, status, error) {
                console.error('Error en la solicitud:', xhr, error, status);
            }
        });   
    }
}

const imprimirDatosUsuario = (resultado) => {
    let usuario = resultado[0];
    
    console.log(usuario['email'], usuario['nombre'], usuario['apellido'], usuario['usuario'], usuario['telefono'], usuario['fechaNac'], usuario['contraseña']);
}



$(document).ready(tomarDatosUsuario);