window.addEventListener("pageshow", function() {
    let logueado = localStorage.getItem("logueadoAdmin");
    if (logueado !== "true") {
        if (!window.location.pathname.includes('login.html')) {
            window.location.href = 'login.html';
        }
    } else {
        if (window.location.pathname.includes('login.html')) {
            window.location.href = 'index.html';
        }
    }
});


const loginAdmin = (usuario, contra) => {
    $.ajax({
        url: '/TuxOut/backoffice/core/Enrutador.php', 
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


const cerrarSesion = () => {
    localStorage.setItem("logueadoAdmin", false);
    localStorage.setItem("usuarioAdmin", null);
    if(!window.location.pathname.includes('login.html')) {
        window.location.href = 'login.html';
    }
}

$(".cerrarSesion").click(cerrarSesion);
$("#btnLoginAdmin").click(tomarDatosLoginAdmin)