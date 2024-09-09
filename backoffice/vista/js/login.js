$(document).ready(function() {
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
