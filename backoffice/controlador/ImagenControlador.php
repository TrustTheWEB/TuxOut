<?php

require_once("../modelo/Imagen.php");

class ImagenControlador {

    public function subirImagenes($valores) {
        $modelo = new Imagen();
        $modelo->setImagen($valores[0]);
        $modelo->setId($valores[1]);
        $resultados = $modelo->subirImagenes();
    }

    public function buscarImagenes($valores) {
        $modelo = new Imagen();
        $modelo->setId($valores[0]);
        $resultados = $modelo->subirImagenes();

        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function eliminarImagenes($valores) {
        $modelo = new Imagen();
        $modelo->setId($valores[0]);
        $resultados = $modelo->eliminarImagenes();
    }

    public function eliminarImagenNum($valores) {
        $modelo = new Imagen();
        $modelo->setId($valores[0]);
        $modelo->setNum($valores[1]);
        $resultados = $modelo->eliminarImagenNum();
    }
}

?>