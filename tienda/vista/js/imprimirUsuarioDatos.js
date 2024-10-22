import Alerta from './Alerta.js';
import Validaciones from './Validaciones.js';
const alerta = new Alerta();
const validaciones = new Validaciones();

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

const actualizarUsuario = (usuario,nombre,apellido,telefono,ci,fechaNac) => {
    let email = localStorage.getItem("email");
    $.ajax({
        url: 'http://localhost/TuxOut/tienda/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "updateSinContra", controlador: "UsuarioControlador", valores: [email, usuario, nombre, apellido, telefono, ci, fechaNac]},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                if(response) { 
                    alerta.confirmar("Datos actualizados correctamente.");  
                }else {
                    alerta.alertar("Correo o contraseña incorrectos.")
                }
            }
        },
        error: function(xhr, status, error) {
            console.error('Error en la solicitud:', xhr, error, status);
        }
    });   
}

const imprimirDatosUsuario = (resultado) => {
    let usuario = resultado[0];
    
    $("#emailUsuario").attr("value", usuario['email']);
    $("#usuarioEditarUsuario").attr("value", usuario['usuario']);
    $("#nombreEditarUsuario").attr("value", usuario['nombre']);
    $("#apellidoEditarUsuario").attr("value", usuario['apellido']);
    $("#telefonoEditarUsuario").attr("value", usuario['telefono']);
    $("#ciEditarUsuario").attr("value", usuario['ci']);
    $("#fechaEditarUsuario").attr("value", usuario['fechaNac']);
}

const tomarDatosActualizar = () => {
    let usuario = $("#usuarioEditarUsuario").val();
    let nombre = $("#nombreEditarUsuario").val();
    let apellido = $("#apellidoEditarUsuario").val();
    let telefono = $("#telefonoEditarUsuario").val();
    let ci = $("#ciEditarUsuario").val();
    let fechaNac = $("#fechaEditarUsuario").val();

    try {
        if(!validaciones.validarNickUsuario(usuario)) {
            throw new Error("el nombre de usuario ingresado no es válido");
        }

        if(!validaciones.validarNombreUsuario(nombre)) {
            throw new Error("el nombre ingresado no es válido");
        }
        
        if(!validaciones.validarApellidoUsuario(apellido)) {
            throw new Error("el apellido ingresado no es válido");
        }

        if(!validaciones.validarTelefonoNull(telefono)) {
            throw new Error("el teléfono ingresado no es válido");
        }

        if(!validaciones.validarCiNull(ci)) {
            throw new Error("la cédula de identidad ingresada no es válida");
        }

        if(!validaciones.validarFechaNac(fechaNac)) {
            throw new Error("la fecha de nacimiento ingresada no es válida");
        }

        actualizarUsuario(usuario, nombre, apellido, telefono, ci, fechaNac);
        
    }catch(e) {
        alerta.alertar(e)
    }
}


$(document).ready(tomarDatosUsuario);
$("#btnGuardarCambios").click(tomarDatosActualizar)