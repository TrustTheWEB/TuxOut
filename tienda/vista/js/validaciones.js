$("#btnGuardarCambios").click(guardarCambiosUsuario);
$("#btnLoginUsuario").click(loginUsuario);
$("#btnSignUpUsuario").click(registrarUsuario);
$("#btnSignUpEmpresa").click(registrarEmpresa);
$("#btnLoginEmpresa").click(loginEmpresa);

function registrarUsuario() {
    let usuario = $("#usuarioSignUpUsuario").val();
    let nombre = $("#nombreSignUpUsuario").val();
    let apellido =  $("#apellidoSignUpUsuario").val();
    let email = $("#emailSignUpUsuario").val();
    let contra = $("#contraSignUpUsuario").val();

    let usuarioValido = validarUsuario(usuario);
    let nombreValido = validarNombre(nombre);
    let apellidoValido = validarApellido(apellido);
    let emailValido = validarEmail(email);
    let contraValido = validarContra(contra);


    if(nombreValido) {
        //se efectuarían los cambios en la base de datos
    }else {
        mostrarError("El nombre ingresado no es válido (Solo puede contener letras y no puede ser mayor a 20 carcteres).");
    }

    if(apellidoValido) {
        //se efectuarían los cambios en la base de datos
    }else {
        mostrarError("El apellido ingresado no es válido (Solo puede contener letras y no puede ser mayor a 25 carcteres).");
    }

    if(usuarioValido) {
        //se efectuarían los cambios en la base de datos
    }else {
        mostrarError("El usuario ingresado no es válido (Solo puede contener letras, puntos y guíones y no puede ser mayor a 25 carcteres).");
    }

    if(emailValido) {
        //se efectuarían los cambios en la base de datos
    }else {
        mostrarError("El email ingresado no es válido.");
    }

    if(contraValido) {
        //se efectuarían los cambios en la base de datos
    }else {
        mostrarError("La contraseña ingresado no es válida (No puede ser mayor a 40 carcteres).");
    }

    if(emailValido && contraValido && usuarioValido && nombreValido && apellidoValido) {
        //iniciar sesión junto con la base de datos
        alert("Cuenta Registrada")
    }
}

function registrarEmpresa() {
    let rut = $("#rutSignUpEmpresa").val();
    let nombre = $("#nombreSignUpEmpresa").val();
    let email = $("#emailSignUpEmpresa").val();
    let contra = $("#contraSignUpEmpresa").val();
    let telefono = $("#telefonoSignUpEmpresa").val();
    let dir = $("#direccionSignUpEmpresa").val();

    let telefonoValido = validarTelefono(telefono);
    let dirValido = validarDireccion(dir);
    let rutValido = validarRUT(rut);
    let nombreValido = validarNombre(nombre);
    let emailValido = validarEmail(email);
    let contraValido = validarContra(contra);


    if(nombreValido) {
        //se efectuarían los cambios en la base de datos
    }else {
        mostrarError("El nombre ingresado no es válido (Solo puede contener letras y no puede ser mayor a 20 carcteres).");
    }

    if(telefonoValido) {
        //se efectuarían los cambios en la base de datos
    }else {
        mostrarError("El telefono ingresado no es válido");
    }

    if(dirValido) {
        //se efectuarían los cambios en la base de datos
    }else {
        mostrarError("La dirección ingresada no es válida");
    }

    if(rutValido) {
        //se efectuarían los cambios en la base de datos
    }else {
        mostrarError("El RUT ingresado no es válido")    
    }

    if(emailValido) {
        //se efectuarían los cambios en la base de datos
    }else {
        mostrarError("El email ingresado no es válido.");
    }

    if(contraValido) {
        //se efectuarían los cambios en la base de datos
    }else {
        mostrarError("La contraseña ingresado no es válida (No puede ser mayor a 40 carcteres).");
    }

    if(emailValido && contraValido && usuarioValido && nombreValido && apellidoValido) {
        //iniciar sesión junto con la base de datos
        alert("Cuenta Registrada")
    }
}

function loginUsuario() {

    let email = $("#emailLoginUsuario").val();
    let contra = $("#contraLoginUsuario").val();

    let emailValido = validarEmail(email);
    let contraValido = validarContra(contra);

    if(emailValido) {
        //se efectuarían los cambios en la base de datos
    }else {
        mostrarError("El email ingresado no es válido.");
    }

    if(contraValido) {
        //se efectuarían los cambios en la base de datos
    }else {
        mostrarError("La contraseña ingresado no es válida (No puede ser mayor a 40 carcteres).");
    }

    if(emailValido && contraValido) {
        //iniciar sesión junto con la base de datos
        alert("Sesión iniciada")
    }

}

function loginEmpresa() {

    let email = $("#emailLoginEmpresa").val();
    let contra = $("#contraLoginEmpresa").val();

    let emailValido = validarEmail(email);
    let contraValido = validarContra(contra);

    if(emailValido) {
        //se efectuarían los cambios en la base de datos
    }else {
        mostrarError("El email ingresado no es válido.");
    }

    if(contraValido) {
        //se efectuarían los cambios en la base de datos
    }else {
        mostrarError("La contraseña ingresado no es válida (No puede ser mayor a 40 carcteres).");
    }

    if(emailValido && contraValido) {
        //iniciar sesión junto con la base de datos
        alert("Sesión iniciada")
    }

}

function guardarCambiosUsuario() {

    let nombre = $("#nombreEditarUsuario").val();
    let apellido = $("#apellidoEditarUsuario").val();
    let usuario = $("#usuarioEditarUsuario").val();
    let telefono = $("#telefonoEditarUsuario").val();
    let fechaNac = $("#fechaEditarUsuario").val();

    let nombreValido = validarNombre(nombre);
    let apellidoValido = validarApellido(apellido);
    let usuarioValido = validarUsuario(usuario);
    let telefonoValido = validarTelefono(telefono);
    let fechaNacValido = validarFecha(fechaNac);


    if(nombreValido) {
        //se efectuarían los cambios en la base de datos
    }else {
        mostrarError("El nombre ingresado no es válido (Solo puede contener letras y no puede ser mayor a 20 carcteres).");
    }

    if(apellidoValido) {
        //se efectuarían los cambios en la base de datos
    }else {
        mostrarError("El apellido ingresado no es válido (Solo puede contener letras y no puede ser mayor a 25 carcteres).");
    }

    if(usuarioValido) {
        //se efectuarían los cambios en la base de datos
    }else {
        mostrarError("El usuario ingresado no es válido (Solo puede contener letras, puntos y guíones y no puede ser mayor a 25 carcteres).");
    }

    if(telefonoValido) {
        //se efectuarían los cambios en la base de datos
    }else {
        mostrarError('El teléfono ingresado no es válido (solo puede contener números y "-" o "+" al principio).');
    }

    if(fechaNacValido) {
        //se efectuarían los cambios en la base de datos
    }else {
        mostrarError("La fecha ingresada no es válida");
    }

    if(nombreValido && apellidoValido && telefonoValido && fechaNacValido) {
        //Cambiar a futuro por cartel de alerta personalizado con html, css y js
        alert("Los cambios fueron efectuados correctamente.")
    }

}

function mostrarError(mensaje) {
    //Cambiar a futuro por cartel de alerta personalizado con html, css y js
    alert(mensaje);
}

function validarContra (contra) {
    if(contra == null || contra == "" || contra == undefined) {
        return false;
    }

    const caracteresPermitidosContra = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[{]}\\|;:\'",<.>/?';
    if(contra.length > 40) {
        return false;
    }

    for (let i = 0; i < contra.length; i++) {
        if (!caracteresPermitidosContra.includes(contra[i])) {
            return false;
        }
    }

    return true;
}

function validarNombre (nombre) {

    if(nombre == null || nombre == undefined || nombre == "") {
        return false;
    }

    const caracteresPermitidosNombre = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ";
    if(nombre.length >20) {
        return false;
    }

    for (let i = 0; i < nombre.length; i++) {
        if (!caracteresPermitidosNombre.includes(nombre[i])) {
            return false;
        }
    }

    return true;
}

function validarApellido (apellido) {

    if(apellido == null || apellido == undefined || apellido == "") {
        return false;
    }

    const caracteresPermitidosApellido = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ";
    if(apellido.length >20) {
        return false;
    }

    for (let i = 0; i < apellido.length; i++) {
        if (!caracteresPermitidosApellido.includes(apellido[i])) {
            return false;
        }
    }

    return true;
}

function validarUsuario (usuario) {

    if(usuario == null || usuario == undefined) {
        return false;
    }

    const caracteresPermitidosUsuario = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.-';;
    if(usuario.length > 25) {
        return false;
    }

    for (let i = 0; i < usuario.length; i++) {
        if (!caracteresPermitidosUsuario.includes(usuario[i])) {
            return false;
        }
    }

    return true;
}

function validarTelefono (telefono) {
    const caracteresPermitidosTelefono = "0123456789-+"
    if(telefono.length > 15 || telefono.length < 8) {
        return false;
    }

    for (let i = 0; i < telefono.length; i++) {
        if (!caracteresPermitidosTelefono.includes(telefono[i])) {
            return false;
        }
    }

    return true;
}

function validarEmail (email) {

    if(email == null || email == undefined || email == "") {
        return false;
    }
    
    //Se usa un string con los caracteres permitidos por los email para luego recorrer estos y verificar
    //que el email solo contenga estos
    const caracteresPermitidosUsuario = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.-+%_';
    const caracteresPermitidosDominio = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.-';
    

    //Para verificar el uso de un solo @ en el email, se divide el email en substring con el @
    //como delimitador y si no se generan únicamente dos substrings el email es inválido
    let partes = email.split('@');
    if (partes.length != 2) {
        return false;
    }

    let usuario = partes[0];
    let dominio = partes[1];

    //Se verifica si tanto el usuario como como el dominio cumplen con la cantidad de caracteres establecida
    if (usuario.length < 1 || usuario.length > 64 || dominio.length < 1 || dominio.length > 255) {
        return false;
    }

    //Se verifica si el usuario y dominio utilizan los caracteres permitidos
    for (let i = 0; i < usuario.length; i++) {
        if (!caracteresPermitidosUsuario.includes(usuario[i])) {
            return false;
        }
    }

    for (let i = 0; i < dominio.length; i++) {
        if (!caracteresPermitidosDominio.includes(dominio[i])) {
            return false;
        }
    }
    
    //Función para verificar que el email tenga al menos un . en su dominio
    //para esto separa el dominio en substrings, usando como delimitador el punto
    //si hay menos de 2 de estos substrings el dominio del email no es válido
    
    let subDominios = dominio.split('.');

    if (subDominios.length <= 1) {
        return false;
    }

    if (subDominios[0].length == 0 || subDominios[subDominios.length - 1].length == 0) {
        return false;
    }

    return true;
}

function validarFecha (fecha) {

    const caracteresPermitidosFecha = "0123456789-"

    let partes = fecha.split('-');
    if (partes.length != 3) {
        return false;
    }

    for (let i = 0; i < fecha.length; i++) {
        if (!caracteresPermitidosFecha.includes(fecha[i])) {
            return false;
        }
    }

    let anio = Number(partes[0]);
    let mes = Number(partes[1]);
    let dia= Number(partes[2]);
    let bisiesto = false;

    if(anio > 2999 || anio < 1900) {
        return false
    }

    if((anio % 4 == 0 && anio % 100 != 0) || anio % 400 == 0) {
        bisiesto = true;
    }

    if(mes > 12 || mes < 0 ) {
        return false;
    }

    if(mes == 2 && bisiesto) {
        if(dia > 30 || dia < 0) {
            return false;
        }
    }else if(mes == 2 && !bisiesto) {
        if(dia > 29 || dia < 0) {
            return false;
        }
    }else if(mes == 1 || mes == 3 || mes == 5 || mes == 7 || mes == 8 || mes == 10 || mes == 12) {
        if(dia > 31 || dia < 0) {
            return false;
        }
    }else {
        if(dia > 30 || dia < 0) {
            return false;
        }
    }

    return true;
}

function validarRUT (rut) {
    const caracteresPermitidosRUT = "0123456789"
    if(rut.length > 8 || rut.length < 8) {
        return false;
    }

    for (let i = 0; i < telefono.length; i++) {
        if (!caracteresPermitidosRUT.includes(rut[i])) {
            return false;
        }
    }

    return true;
}

function validarDireccion (dir) {

    const caracteresPermitidosDir = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.-0123456789';;
    if(dir.length > 40) {
        return false;
    }

    for (let i = 0; i < dir.length; i++) {
        if (!caracteresPermitidosDir.includes(dir[i])) {
            return false;
        }
    }

    return true;
}
