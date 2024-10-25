/* $(document).ready(function() {
    const verificarAutenticacion = () => {
        $.ajax({
            url: 'http://localhost/TuxOut/backoffice/controlador/AdminControlador.php',
            method: 'POST',
            dataType: 'json',
            data: { metodoControlador: 'cargarPagina' },
            success: function(response) {
                if (response[0]) {
                    if (window.location.pathname.includes('login.html')) {
                        window.location.href = 'index.html';
                    }
                } else {
                    if (!window.location.pathname.includes('login.html')) {
                        window.location.href = 'login.html';
                    }
                }
            },
            error: function(xhr, status, error) {
                console.error('Error en la solicitud:', error);
            }
        });
    };

    const iniciarSesion = () => {
        const usuario = $("#inputUsuarioAdminLogin").val();
        const contraseña = $("#inputContraseñaAdminLogin").val();

        $.ajax({
            url: 'http://localhost/TuxOut/backoffice/controlador/AdminControlador.php',
            method: 'POST',
            dataType: 'json',
            data: { metodoControlador: 'login', usuario: usuario, contraseña: contraseña },
            success: function(response) {
                if (response[0]) {
                    window.location.href = 'index.html';
                } else {
                    alert("Usuario o contraseña incorrectos.");
                }
            },
            error: function(xhr, status, error) {
                console.error('Error en la solicitud:', error);
            }
        });
    };

    const cerrarSesion = () => {
        $.ajax({
            url: 'http://localhost/TuxOut/backoffice/controlador/AdminControlador.php',
            method: 'POST',
            dataType: 'json',
            data: { metodoControlador: 'cerrarSesion' },
            success: function() {
                window.location.href = 'login.html';
            },
            error: function(xhr, status, error) {
                console.error('Error en la solicitud:', error);
            }
        });
    };

    verificarAutenticacion();

    $("#btnLoginAdmin").click(iniciarSesion);
    $(".cerrarSesion").click(cerrarSesion);
});
 */

const loginAdmin = (usuario, contra) => {
    $.ajax({
        url: 'http://localhost/TuxOut/backoffice/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "login", controlador: "AdminControlador", valores: [usuario, contra]},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                if(response) { 
                    localStorage.setItem("logueadoAdmin", true);
                    localStorage.setItem("usuarioAdmin", response);
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

const tomarDatosLoginAdmin = () => {
    const usuario = $("#inputUsuarioAdminLogin").val();
    const contraseña = $("#inputContraseñaAdminLogin").val();

    loginAdmin(usuario, contraseña);
}

const tomarAdminLogueado = () => {
    let logueado = localStorage.getItem("logueadoAdmin");
    if(logueado != "true") {
        if(!window.location.pathname.includes('login.html')) {
            window.location.href = 'login.html';
        }
    }else {
        if(window.location.pathname.includes('login.html')) {
            window.location.href = 'index.html';
        }
    }
}

const cerrarSesion = () => {
    localStorage.setItem("logueadoAdmin", false);
    localStorage.setItem("usuarioAdmin", null);
    if(!window.location.pathname.includes('login.html')) {
        window.location.href = 'login.html';
    }
}

$(document).ready(tomarAdminLogueado);
$(".cerrarSesion").click(cerrarSesion);
$("#btnLoginAdmin").click(tomarDatosLoginAdmin)