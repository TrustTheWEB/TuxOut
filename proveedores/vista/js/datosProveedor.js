
import Validaciones from './Validaciones.js';
const validaciones = new Validaciones();

import Alerta from './Alerta.js';
const alerta = new Alerta();

const tomarDatosEmpresa = () => {
    let rut = localStorage.getItem('rutEmpresa');
    $.ajax({
        url: '/TuxOut/proveedores/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "show", controlador: "EmpresaControlador", valores: ["rut", rut]},
        success: function(response) {
            if (response.error) {
                alerta.alertar('Error al cargar los datos de la empresa');
            } else {
                if(response) { 
                    imprimirDatosEmpresa(response, rut);
                }
            }
        },
        error: function() {
            alerta.alertar("Error al cargar los datos de la empresa")
        }
    });   
}

const imprimirDatosEmpresa = (datos, rut) => {
    let empresa = datos[0];
    let nombre = empresa['nombre'];
    let email = empresa['email'];
    let telefono = empresa['telefono'];
    let direccion = empresa['direccion'];
    $("#rutEditarEmpresa").val(rut);
    $("#nombreEditarEmpresa").val(nombre);
    $("#emailEditarEmpresa").val(email);
    $("#telefonoEditarEmpresa").val(telefono);
    $("#direccionEditarEmpresa").val(direccion);
}

const tomarDatosFormulario = () => {
    let rut = localStorage.getItem('rutEmpresa');
    let email = localStorage.getItem('emailEmpresa');
    let nombre = $("#nombreEditarEmpresa").val();
    let telefono = $("#telefonoEditarEmpresa").val();
    let direccion = $("#direccionEditarEmpresa").val();

    let rutValido = validaciones.validarRUT(rut);
    let nombreValido = validaciones.validarNombreUsuario(nombre);
    let emailValido = validaciones.validarEmail(email);
    let telefonoValido = validaciones.validarTelefono(telefono);
    let direccionValido = validaciones.validarDireccion(direccion);

    try {

        if(!rutValido) {
            throw new Error("tu RUT no es válido.");
        }
    
        if(!nombreValido) {
            throw new Error("la nombre ingresado no es válido");
        }

        if(!emailValido) {
            throw new Error("tu email no es válido.");
        }

        if(!telefonoValido) {
            throw new Error("el teléfono ingresado no es válido.");
        }
    
        if(!direccionValido) {
            throw new Error("la dirección ingresada no es válido");
        }

        updateEmpresa(rut, nombre, telefono, direccion, email); 
    }catch (e) {
        alerta.alertar(e);
    }
}

const updateEmpresa = (rut, nombre, telefono, direccion, email) => {
    $.ajax({
        url: '/TuxOut/proveedores/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "update", controlador: "EmpresaControlador", valores: [rut, nombre, telefono, direccion, email]},
        success: function(response) {
            if (response.error) {
                alerta.alertar('Error al modificar los datos de la empresa');
            } else {
                if(response) { // se usa el == true porque el if(response) se puede interpetar como si existe o no y para evitar que pasen errores de sql como respuesta correcta se usa == true 
                    if(response == true) {
                        alerta.confirmar("Datos modificados correctamente")
                    }else {
                        alerta.alertar("Error al modificar los datos de la empresa")
                    }
                }
            }
        },
        error: function() {
            alerta.alertar("Error al modificar los datos de la empresa")
        }
    }); 
}

const cambiarContra = (rut, contra) => {
    $.ajax({
        url: '/TuxOut/proveedores/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "updateContra", controlador: "EmpresaControlador", valores: [rut, contra]},
        success: function(response) {
            if (response.error) {
                alerta.alertar('Error al modificar la contraseña de la empresa');
            } else {
                if(response) {
                    if(response == true) {
                        alerta.confirmar("Contraseña modificada correctamente")
                    }else {
                        alerta.alertar("Error al modificar la contraseña de la empresa")
                    }
                }
            }
        },
        error: function() {
            alerta.alertar("Error al modificar los datos de la empresa")
        }
    }); 
}

const tomarDatosContraNueva = () => {
    let contraNueva = $("#contraseñaEditarEmpresa").val();
    let contraRepetir = $("#contraseñaRepetirEditarEmpresa").val();
    let rut = localStorage.getItem('rutEmpresa');

    try {
        if(contraNueva != contraRepetir) {
            throw new Error("Las contraseñas no coinciden");
        }

        if(!validaciones.validarContra(contraNueva)) {
            throw new Error("La nueva contraseña no es válida");
        }

        cambiarContra(rut, contraNueva);
    }catch(e) {
        alerta.alertar(e)
    }
}

$(document).ready(tomarDatosEmpresa);
$("#btnGuardarCambios").click(tomarDatosFormulario);
$("#btnGuardarContra").click(tomarDatosContraNueva);