import Alerta from './Alerta.js';
const alerta = new Alerta();

import Validaciones from './Validaciones.js';
const validaciones = new Validaciones();

const tomarDatosRegistroUsuario = () => {
    let usuario = $("#usuarioSignUpUsuario").val();
    let nombre = $("#nombreSignUpUsuario").val();
    let apellido =  $("#apellidoSignUpUsuario").val();
    let email = $("#emailSignUpUsuario").val();
    let contra = $("#contraSignUpUsuario").val();

    let usuarioValido = validaciones.validarNickUsuario(usuario);
    let nombreValido = validaciones.validarNombreUsuario(nombre);
    let apellidoValido = validaciones.validarApellidoUsuario(apellido);
    let emailValido = validaciones.validarEmail(email);
    let contraValido = validaciones.validarContra(contra);

    try {
        if(!usuarioValido) {
            throw new Error("el nombre de usuario ingresado no es válido.");
        }

        if(!nombreValido) {
            throw new Error("el nombre ingresado no es válido.");
        }
    
        if(!apellidoValido) {
            throw new Error("el apellido ingresado no es válido.");
        }
    
        if(!emailValido) {
            throw new Error("el email ingresado no es válido.");
        }
    
        if(!contraValido) {
            throw new Error("la contraseña ingresado no es válido.");
        }

        registrarUsuario(email, usuario, nombre, apellido, contra); 
    }catch (e) {
        alerta.alertar(e);
    }
  
}

const registrarUsuario = (email, usuario, nombre, apellido, contra) => {
    $.ajax({
        url: '/TuxOut/tienda/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "registro", controlador: "UsuarioControlador", valores: [email, usuario, nombre, apellido, contra]},
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
                        localStorage.setItem("logueado", true);
                        localStorage.setItem("email", email);
                        localStorage.setItem("usuario", usuario)
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

const loginUsuario = (email, contra) => {
    $.ajax({
        url: '/TuxOut/tienda/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "login", controlador: "UsuarioControlador", valores: [email, contra]},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                if(response) { 
                    localStorage.setItem("logueado", true);
                    localStorage.setItem("email", email);
                    localStorage.setItem("usuario", response)
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

const tomarDatosLoginUsuario = () => {
    let email = $("#emailLoginUsuario").val();
    let contra = $("#contraLoginUsuario").val();

    let emailValido = validaciones.validarEmail(email);
    let contraValido = validaciones.validarContra(contra);

    try {
    
        if(!emailValido) {
            throw new Error("el email ingresado no es válido.");
        }
    
        if(!contraValido) {
            throw new Error("la contraseña ingresado no es válido");
        }

        loginUsuario(email, contra); 
    }catch (e) {
        alerta.alertar(e);
    }
  
}


const cargarPanelUsuario = (email) => {
    $(".barra-header").after(
        `
    <div class="nav-item dropdown ms-auto">
            <button class="btn btn-secondary dropdown-toggle usuario mt-3 mb-2 mb-lg-0 mt-lg-0" type="button" data-bs-toggle="dropdown" aria-expanded="false"></button>
            <ul class="dropdown-menu dropdown-menu contenidoUsuario">
              <li class="p-1"><a class="dropdown-item" href="usuario.html">Mis datos</a></li>
              <li class="p-1"><a class="dropdown-item" href="direcciones.html">Direcciones</a></li>
              <li class="p-1"><a class="dropdown-item" href="pedidos.html">Pedidos</a></li>
              <li class="p-1"><a class="dropdown-item" href="productos.html?tipo=favoritos">Favoritos</a></li>
              <li class="p-1"><a class="dropdown-item" href="historial.html">Historial</a></li>
              <li><hr></li>
              <li class="p-1"><button class="dropdown-item" id="cerrar-sesion">Cerrar sesión</button></li>
            </ul>
    </div>
    <span class="mx-4 d-block d-lg-inline nombre-usuario-header">${localStorage.getItem("usuario")}</span>
    `
    )
    
}

const cargarFormulariosLogin = () => {
    $(".barra-header").after(
    `
    <ul class="navbar-nav mb-2 mb-lg-0">
        <li class="nav-item dropdown">
              <button type="button" class="btn botn-primary dropdown-toggle dropdown-toggle-none-caret" id="crear" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">Crear una cuenta</button>
              <ul class="dropdown-menu dropdown-menu-login dropdown-menu-end" aria-labelledby="crear">
                <li>
                  <form class="p-4">
                    <label for="usuarioSignUpUsuario" class="form-label">Usuario</label>
                    <input type="text" class="form-control mb-2" id="usuarioSignUpUsuario" placeholder="Ingresa tu usuario">

                    <label for="nombreSignUpUsuario" class="form-label">Nombre</label>
                    <input type="text" class="form-control mb-2" id="nombreSignUpUsuario" placeholder="Ingresa tu nombre">

                    <label for="apellidoSignUpUsuario" class="form-label">Apellido</label>
                    <input type="text" class="form-control mb-2" id="apellidoSignUpUsuario" placeholder="Ingresa tu apellido">

                    <label for="emailSignUpUsuario" class="form-label">Email</label>
                    <input type="email" class="form-control mb-3" id="emailSignUpUsuario" placeholder="email@example.com">

                    <label for="contraSignUpUsuario" class="form-label">Contraseña</label>
                    <input type="password" class="form-control mb-3" id="contraSignUpUsuario" placeholder="Password">

                    <button type="button" class="btn btn-primary" id="btnSignUpUsuario">Registrar</button>
                  </form>
                </li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <button type="button" class="btn botn-primary dropdown-toggle" id="ingresar" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">Ingresar</button>
              <ul class="dropdown-menu dropdown-menu-login dropdown-menu-end" aria-labelledby="ingresar">
                <li>
                  <form class="p-4">
                    <label for="emailLoginUsuario" class="form-label">Email</label>
                    <input type="email" class="form-control mb-2" id="emailLoginUsuario" placeholder="email@example.com">

                    <label for="contraLoginUsuario" class="form-label">Contraseña</label>
                    <input type="password" class="form-control mb-3" id="contraLoginUsuario" placeholder="Password">

                    <button type="button" class="btn btn-primary" id="btnLoginUsuario">Ingresar</button>
                  </form>
                </li>
              </ul>
            </li>
        </ul>
    `
    );
}

const tomarUsuarioLogueado = () => {
    let logueado = localStorage.getItem("logueado");
    if(logueado == "true") {
        cargarPanelUsuario(localStorage.getItem("email"));
    }else {
        localStorage.setItem("logueado", false);
        cargarFormulariosLogin();
    }
}

const cerrarSesion = () => {
    localStorage.setItem("logueado", false);
    localStorage.setItem("email", undefined);
    localStorage.setItem("usuario", undefined);
    window.location.href = 'index.html';
}

$(document).ready(function() {
    tomarUsuarioLogueado();
    $("#btnSignUpUsuario").click(tomarDatosRegistroUsuario);
    $("#btnLoginUsuario").click(tomarDatosLoginUsuario);
    $("#cerrar-sesion").click(cerrarSesion);
});