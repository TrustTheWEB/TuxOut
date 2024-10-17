<?php

require_once("../modelo/Imagen.php");

class ImagenControlador {

    public function imagenExiste($url) {
        $modelo = new Imagen();
        $modelo->setUrl($url);
        $resultados = $modelo->imagenExiste();

        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }
}

?>