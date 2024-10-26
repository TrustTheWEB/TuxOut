//

class Validaciones {

    validarNombreUsuario = (nombre) => {
        if (nombre == null || nombre == undefined || nombre == "") {
            return false;
        }

        const caracteresPermitidosNombre = "áéíóúabcdefghijklmnopqrstuvwxyzÁÉÍÓÚABCDEFGHIJKLMNOPQRSTUVWXYZ ";
        if (nombre.length > 20) {
            return false;
        }

        for (let i = 0; i < nombre.length; i++) {
            if (!caracteresPermitidosNombre.includes(nombre[i])) {
                return false;
            }
        }

        return true;
    };

    validarApellidoUsuario = (apellido) => {
        if (apellido == null || apellido == undefined || apellido == "") {
            return false;
        }

        const caracteresPermitidosApellido = "áéíóúabcdefghijklmnopqrstuvwxyzÁÉÍÓÚABCDEFGHIJKLMNOPQRSTUVWXYZ ";
        if (apellido.length > 20) {
            return false;
        }

        for (let i = 0; i < apellido.length; i++) {
            if (!caracteresPermitidosApellido.includes(apellido[i])) {
                return false;
            }
        }

        return true;
    };

    validarNickUsuario = (usuario) => {
        if (usuario == null || usuario == undefined) {
            return false;
        }

        const caracteresPermitidosUsuario = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.-';
        if (usuario.length > 25) {
            return false;
        }

        for (let i = 0; i < usuario.length; i++) {
            if (!caracteresPermitidosUsuario.includes(usuario[i])) {
                return false;
            }
        }

        return true;
    };

    validarTelefono = (telefono) => {
        const caracteresPermitidosTelefono = "0123456789-+";
        if (telefono.length > 20 || telefono.length < 8) {
            return false;
        }

        for (let i = 0; i < telefono.length; i++) {
            if (!caracteresPermitidosTelefono.includes(telefono[i])) {
                return false;
            }
        }

        return true;
    };

    validarTelefonoNull = (telefono) => {
        
        if(!telefono) {
            return true;
        }

        const caracteresPermitidosTelefono = "0123456789-+";
        if (telefono.length > 20 || telefono.length < 8) {
            return false;
        }

        for (let i = 0; i < telefono.length; i++) {
            if (!caracteresPermitidosTelefono.includes(telefono[i])) {
                return false;
            }
        }

        return true;
    };

    validarEmail = (email) => {
        if (email == null || email == undefined || email == "") {
            return false;
        }

        const caracteresPermitidosUsuario = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.-+%_';
        const caracteresPermitidosDominio = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.-';

        let partes = email.split('@');
        if (partes.length != 2) {
            return false;
        }

        let usuario = partes[0];
        let dominio = partes[1];

        if (usuario.length < 1 || usuario.length > 64 || dominio.length < 1 || dominio.length > 255) {
            return false;
        }

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

        let subDominios = dominio.split('.');

        if (subDominios.length <= 1) {
            return false;
        }

        if (subDominios[0].length == 0 || subDominios[subDominios.length - 1].length == 0) {
            return false;
        }

        return true;
    };

    validarFecha = (fecha) => {

        if(!fecha) {
            return true;
        }

        const caracteresPermitidosFecha = "0123456789-";

        let partes = fecha.split('-');
        if (partes.length != 3) {
            return false;
        }

        for (let i = 0; i < fecha.length; i++) {
            if (!caracteresPermitidosFecha.includes(fecha[i])) {
                return false;
            }
        }

        let año = Number(partes[0]);
        let mes = Number(partes[1]);
        let dia = Number(partes[2]);
        let bisiesto = false;

        if (año > 2999 || año < 1900) {
            return false;
        }

        if ((año % 4 == 0 && año % 100 != 0) || año % 400 == 0) {
            bisiesto = true;
        }

        if (mes > 12 || mes < 0) {
            return false;
        }

        if (mes == 2 && bisiesto) {
            if (dia > 30 || dia < 0) {
                return false;
            }
        } else if (mes == 2 && !bisiesto) {
            if (dia > 29 || dia < 0) {
                return false;
            }
        } else if (mes == 1 || mes == 3 || mes == 5 || mes == 7 || mes == 8 || mes == 10 || mes == 12) {
            if (dia > 31 || dia < 0) {
                return false;
            }
        } else {
            if (dia > 30 || dia < 0) {
                return false;
            }
        }

        return true;
    };

    validarFechaNac = (fecha) => {

        if(!fecha) {
            return true;
        }

        const caracteresPermitidosFecha = "0123456789-";

        let partes = fecha.split('-');
        if (partes.length != 3) {
            return false;
        }

        for (let i = 0; i < fecha.length; i++) {
            if (!caracteresPermitidosFecha.includes(fecha[i])) {
                return false;
            }
        }

        let año = Number(partes[0]);
        let mes = Number(partes[1]);
        let dia = Number(partes[2]);
        let bisiesto = false;

        if (año > 2023 || año < 1900) {
            return false;
        }

        if ((año % 4 == 0 && año % 100 != 0) || año % 400 == 0) {
            bisiesto = true;
        }

        if (mes > 12 || mes < 0) {
            return false;
        }

        if (mes == 2 && bisiesto) {
            if (dia > 30 || dia < 0) {
                return false;
            }
        } else if (mes == 2 && !bisiesto) {
            if (dia > 29 || dia < 0) {
                return false;
            }
        } else if (mes == 1 || mes == 3 || mes == 5 || mes == 7 || mes == 8 || mes == 10 || mes == 12) {
            if (dia > 31 || dia < 0) {
                return false;
            }
        } else {
            if (dia > 30 || dia < 0) {
                return false;
            }
        }

        return true;
    };

    validarFechaHora = (timestamp) => {
        // Separa la fecha y la hora
        const [fecha, hora] = timestamp.split('T');
        if (!fecha || !hora) {
            return false;
        }

    
        // Separa fecha en año, mes y día
        const [año, mes, dia] = fecha.split('-').map(Number);
        // Separa hora en horas, minutos y segundos
        const [horas, minutos, segundos] = hora.split(':').map(Number);
    
        // Validación del año
        if (año < 1900 || año > 2999) {
            return false;
        }
    
        // Validación del mes
        if (mes < 1 || mes > 12) {
            return false;
        }
    
        // Determina si el año es bisiesto
        const esBisiesto = (año % 4 === 0 && año % 100 !== 0) || (año % 400 === 0);
    
        // Validación del día
        if (mes === 2) {
            if (esBisiesto) {
                if (dia < 1 || dia > 29) {
                    return false;
                }
            } else {
                if (dia < 1 || dia > 28) {
                    return false;
                }
            }
        } else if ([4, 6, 9, 11].includes(mes)) {
            if (dia < 1 || dia > 30) {
                return false;
            }
        } else {
            if (dia < 1 || dia > 31) {
                return false;
            }
        }
    

        // Validación de la hora
        if (horas < 0 || horas > 23) {
            return false;
        }
    
        // Validación de los minutos
        if (minutos < 0 || minutos > 59) {
            return false;
        }
    
        // Validación de los segundos
        if (segundos < 0 || segundos > 59) {
            return false;
        }
    
        
        return true;
    };

    validarRUT = (rut) => {
        const caracteresPermitidosRUT = "0123456789.-";
        if (rut.length < 8) {
            return false;
        }

        for (let i = 0; i < rut.length; i++) {
            if (!caracteresPermitidosRUT.includes(rut[i])) {
                return false;
            }
        }

        return true;
    };

    validarDireccion = (dir) => {
        const caracteresPermitidosDir = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,- ';
        if (dir.length > 40 || dir.length < 4) {
            return false;
        }

        for (let i = 0; i < dir.length; i++) {
            if (!caracteresPermitidosDir.includes(dir[i])) {
                return false;
            }
        }

        return true;
    };

    validarContra = (contra) => {
        if (contra == null || contra === "" || contra === undefined) {
            return false;
        }

        const caracteresPermitidosContra = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[{]}\\|;:\'",<.>/?';
        if (contra.length > 40) {
            return false;
        }

        for (let i = 0; i < contra.length; i++) {
            if (!caracteresPermitidosContra.includes(contra[i])) {
                return false;
            }
        }

        return true;
    };

    validarId = (id) => {
        if (Number.isInteger(Number(id)) && Number(id) > 0) {
            return true;
          } else {
            return false;
          }
    };

    validarCantidad = (cantidad) => {
        if (Number.isInteger(Number(cantidad)) && Number(cantidad) > 0) {
            return true;
          } else {
            return false;
          }
    };

    validarNumero = (numero) => {
        if (Number.isInteger(Number(numero)) && Number(numero) > 0) {
            return true;
          } else {
            return false;
          }
    };

    validarStock = (numero) => {
        if (Number.isInteger(Number(numero)) && Number(numero) >= 0) {
            return true;
          } else {
            return false;
          }
    };

    validarPrecio = (numero) => {
        numero = Number(numero);
        
        if (numero > 0 && Number.isFinite(numero) && Math.round(numero * 100) === numero * 100) {
            return true;
        } else {
            return false;
        }
    };

    validarPorcentaje = (numero) => {
        if (Number.isInteger(Number(numero)) && Number(numero) > 0 && Number(numero) < 100) {
            return true;
          } else {
            return false;
          }
    };

    validarMedioPago = (medioPago) => {
        if (medioPago === "MercadoPago" || medioPago === "PayPal") {
           return true;
          } else {
            return false;
          }
    };

    validarNombreCategoria = (nombre) => {
        if (nombre == null || nombre == undefined || nombre == "") {
            return false;
        }

        const caracteresPermitidosNombre = "áéíóúabcdefghijklmnopqrstuvwxyzÁÉÍÓÚABCDEFGHIJKLMNOPQRSTUVWXYZ ";
        if (nombre.length > 20) {
            return false;
        }

        for (let i = 0; i < nombre.length; i++) {
            if (!caracteresPermitidosNombre.includes(nombre[i])) {
                return false;
            }
        }

        return true;
    };

    validarNombreCaracteristica = (nombre) => {
        if (nombre == null || nombre == undefined || nombre == "") {
            return false;
        }

        const caracteresPermitidosNombre = "áéíóúabcdefghijklmnopqrstuvwxyzÁÉÍÓÚABCDEFGHIJKLMNOPQRSTUVWXYZ ";
        if (nombre.length > 20) {
            return false;
        }

        for (let i = 0; i < nombre.length; i++) {
            if (!caracteresPermitidosNombre.includes(nombre[i])) {
                return false;
            }
        }

        return true;
    };

    validarNombreProducto = (nombre) => {
        if (nombre == null || nombre == undefined || nombre == "") {
            return false;
        }

        const caracteresPermitidosNombre = "áéíóúabcdefghijklmnopqrstuvwxyzÁÉÍÓÚABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-.,:;+ ";
        if (nombre.length > 150) {
            return false;
        }

        for (let i = 0; i < nombre.length; i++) {
            if (!caracteresPermitidosNombre.includes(nombre[i])) {
                return false;
            }
        }

        return true;
    };

    validarMarcaProducto = (nombre) => {
        if (nombre == null || nombre == undefined || nombre == "") {
            return false;
        }

        const caracteresPermitidosNombre = "áéíóúabcdefghijklmnopqrstuvwxyzÁÉÍÓÚABCDEFGHIJKLMNOPQRSTUVWXYZ ";
        if (nombre.length > 20) {
            return false;
        }

        for (let i = 0; i < nombre.length; i++) {
            if (!caracteresPermitidosNombre.includes(nombre[i])) {
                return false;
            }
        }

        return true;
    };

    validarDescripcionProducto = (nombre) => {
        if (nombre == null || nombre == undefined || nombre == "") {
            return false;
        }

        const caracteresPermitidosNombre = "áéíóúabcdefghijklmnopqrstuvwxyzÁÉÍÓÚABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789-.;:_+%";
        if (nombre.length > 320) {
            return false;
        }

        for (let i = 0; i < nombre.length; i++) {
            if (!caracteresPermitidosNombre.includes(nombre[i])) {
                return false;
            }
        }

        return true;
    };

    validarMotivoDescuento = (nombre) => {
        if (nombre == null || nombre == undefined || nombre == "") {
            return false;
        }

        const caracteresPermitidosNombre = "áéíóúabcdefghijklmnopqrstuvwxyzÁÉÍÓÚABCDEFGHIJKLMNOPQRSTUVWXYZ ";
        if (nombre.length > 20) {
            return false;
        }

        for (let i = 0; i < nombre.length; i++) {
            if (!caracteresPermitidosNombre.includes(nombre[i])) {
                return false;
            }
        }

        return true;
    };

    validarValor = (nombre) => {
        if (nombre == null || nombre == undefined || nombre == "") {
            return false;
        }

        const caracteresPermitidosNombre = "0123456789.-:_,áéíóúabcdefghijklmnopqrstuvwxyzÁÉÍÓÚABCDEFGHIJKLMNOPQRSTUVWXYZ ";
        if (nombre.length > 20) {
            return false;
        }

        for (let i = 0; i < nombre.length; i++) {
            if (!caracteresPermitidosNombre.includes(nombre[i])) {
                return false;
            }
        }

        return true;
    };

    validarEstadoPedido = (estado) => {
        estado = estado.toLowerCase();
        if (estado === "carrito" || estado === "procesando" || estado === "pagado" || estado === "entregado") {
          return true;
        } else {
          return false;
        }
      };

      validarEstadoProducto = (estado) => {
        estado = estado.toLowerCase();
        if (estado === "nuevo" || estado === "usado" || estado === "renovado") {
          return true;
        } else {
          return false;
        }
      };

      validarBooleano = (booleano) => {
        if(booleano || !booleano) {
            return true;
        }else {
            return false;
        }
      };

      validarCheck = (check) => {
        if(check == "on" || check == "off") {
            return true;
        }else {
            return false;
        }
      };

      validation_digit = (ci) => {
        var a = 0;
        var i = 0;
        if(ci.length <= 6){
          for(i = ci.length; i < 7; i++){
            ci = '0' + ci;
          }
        }
        for(i = 0; i < 7; i++){
          a += (parseInt("2987634"[i]) * parseInt(ci[i])) % 10;
        }
        if(a%10 === 0){
          return 0;
        }else{
          return 10 - a % 10;
        }
      };
      
    validate_ci = (ci) => {
        ci = this.clean_ci(ci);
        var dig = ci[ci.length - 1];
        ci = ci.replace(/[0-9]$/, '');
        return (dig == this.validation_digit(ci));
      };

      
      clean_ci = (ci) => {
        return ci.replace(/\D/g, '');
      };

      validarCiNull = (ci) => {
        if(!ci) {
            return true;
        }else {
            let valido = this.validate_ci(ci);
            return valido;
        }
      };

      validarCalificacion = (numero) => {
        let num = Number(numero);
        if (num >= 0 && num <= 5 && (Number.isInteger(num) || num % 1 === 0.5)) {
            return true;
        } else {
            return false;
        }
    };

};

export default Validaciones;
