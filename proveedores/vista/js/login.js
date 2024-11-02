window.addEventListener("pageshow", function() {
    let logueado = localStorage.getItem("logueadoEmpresa");
    if (logueado !== "true") {
        if (!window.location.pathname.includes('login.html')) {
            window.location.href = 'login.html';
        }
    } else {
        tomarSuspendido();
    }
});

const tomarSuspendido = () => {
    let rut = localStorage.getItem("rutEmpresa");
    $.ajax({
        url: '/TuxOut/proveedores/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json',
        data: {accion: "tomarSuspendido", controlador: "EmpresaControlador", valores: [rut]},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                if(response) { 
                    if(response[0]['suspendido'] == 0) {
                        if (window.location.pathname.includes('login.html') || window.location.pathname.includes('deshabilitado.html')) {
                            window.location.href = 'index.html';
                        }
                    }else {
                        if(!window.location.pathname.includes('deshabilitado.html')) {
                            window.location.href = 'deshabilitado.html';
                        }
                    }
                }else {
                    console.error("response")
                }
            }
        },
        error: function(xhr, status, error) {
            console.error('Error en la solicitud:', xhr, error, status);
        }
    }); 
}

import Alerta from './Alerta.js';
const alerta = new Alerta();

import Validaciones from './Validaciones.js';
const validaciones = new Validaciones();

const tomarDatosRegistroEmpresa = () => {
    
    let rut = $("#rutSignUpEmpresa").val();
    let nombre = $("#nombreSignUpEmpresa").val();
    let email = $("#emailSignUpEmpresa").val();
    let contra = $("#contraSignUpEmpresa").val();
    let contraRep = $("#contraSignUpEmpresaRepetir").val();
    let telefono = $("#telefonoSignUpEmpresa").val();
    let direccion = $("#direccionSignUpEmpresa").val();

    let rutValido = validaciones.validarRUT(rut);
    let nombreValido = validaciones.validarNombreUsuario(nombre);
    let emailValido = validaciones.validarEmail(email);
    let contraValido = validaciones.validarContra(contra);
    let telefonoValido = validaciones.validarTelefono(telefono);
    let direccionValido = validaciones.validarDireccion(direccion);

    try {
        if(contra != contraRep) {
            throw new Error("Las contraseñas no coinciden");
        }

        if(!rutValido) {
            throw new Error("el RUT ingresado no es válido.");
        }
    
        if(!nombreValido) {
            throw new Error("la nombre ingresado no es válido");
        }

        if(!emailValido) {
            throw new Error("el email ingresado no es válido.");
        }
    
        if(!contraValido) {
            throw new Error("la contraseña ingresado no es válido");
        }

        if(!telefonoValido) {
            throw new Error("el teléfono ingresado no es válido.");
        }
    
        if(!direccionValido) {
            throw new Error("la dirección ingresada no es válido");
        }

        registrarEmpresa(rut, nombre, telefono, direccion, email, contra); 
    }catch (e) {
        alerta.alertar(e);
    }
}

const tomarDatosLoginEmpresa = () => {
    let email = $("#emailLoginEmpresa").val();
    let contra = $("#contraLoginEmpresa").val();
    
    let emailValido = validaciones.validarEmail(email);
    let contraValido = validaciones.validarContra(contra);

    try {
    
        if(!emailValido) {
            throw new Error("el email ingresado no es válido.");
        }
    
        if(!contraValido) {
            throw new Error("la contraseña ingresado no es válido");
        }

        loginEmpresa(email, contra); 
    }catch (e) {
        alerta.alertar(e);
    }
}

const registrarEmpresa = (rut, nombre, telefono, direccion, email, contra) => {
    $.ajax({
        url: '/TuxOut/proveedores/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "registro", controlador: "EmpresaControlador", valores: [rut, nombre, telefono, direccion, email, contra]},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                if(response) { 
                    if(response == "email") {
                        alerta.alertar("Ese correo ya está en uso")
                    }else if (response == "usuario") {
                        alerta.alertar("Ese usuario ya existe")
                    }else if (response == true) {
                        localStorage.setItem("logueadoEmpresa", true);
                        localStorage.setItem("emailEmpresa", email);
                        localStorage.setItem("rutEmpresa", rut);
                        localStorage.setItem("nombreEmpresa", nombre)
                        window.location.href = 'index.html'; 
                    }else {
                        alerta.alertar("Registro fallido")
                        console.log(response)
                    }
                }
            }
        },
        error: function(xhr, status, error) {
            console.error('Error en la solicitud:', xhr, error, status);
        }
    });   
}

const loginEmpresa = (email, contra) => {
    $.ajax({
        url: '/TuxOut/proveedores/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json',
        data: {accion: "login", controlador: "EmpresaControlador", valores: [email, contra]},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                if(response) { 
                    localStorage.setItem("logueadoEmpresa", true);
                    localStorage.setItem("emailEmpresa", email);
                    localStorage.setItem("rutEmpresa", response[0]);
                    localStorage.setItem("nombreEmpresa", response[1])
                    window.location.href = 'index.html';
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

const cerrarSesion = () => {
    localStorage.setItem("logueadoEmpresa", false);
    localStorage.setItem("emailEmpresa", undefined);
    localStorage.setItem("rutEmpresa", undefined);
    localStorage.setItem("nombreEmpresa", undefined);
    if(!window.location.pathname.includes('login.html')) {
        window.location.href = 'login.html';
    }
}


$("#btnSignUpEmpresa").click(tomarDatosRegistroEmpresa);
$("#btnLoginEmpresa").click(tomarDatosLoginEmpresa);
$(".cerrarSesion").click(cerrarSesion);
