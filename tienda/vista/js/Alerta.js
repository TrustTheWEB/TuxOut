//
class Alerta {
    alertar = (mensaje) => {
        
        $('.alerta-error').show();
        $(".alerta-error-texto").html(mensaje);
        
        setTimeout(function() {
            $('.alerta-error').fadeOut(400);
        }, 700);
    };

    confirmar = (mensaje) => {
        
        $('.alerta-principal').show();
        $(".alerta-principal-texto").html(mensaje);
        
        setTimeout(function() {
            $('.alerta-principal').fadeOut(400);
        }, 700);
    };

    ocultarPrincipal = () => {
        $('.alerta-principal').hide();
    };

    ocultarError = () => {
        $('.alerta-error').hide();
    };
}

export default Alerta;