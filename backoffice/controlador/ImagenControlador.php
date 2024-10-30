<?php

require_once("../modelo/Imagen.php");

class ImagenControlador {

    public function subirImagen($valores) {
        $modelo = new Imagen();
        $modelo->setNombre($valores[0]);
        $modelo->setImagen($valores[1]);
        $resultados = $modelo->subirImagen();

        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function eliminarImagenesId($valores) {
        $modelo = new Imagen();
        $modelo->eliminarImagenesId($valores[0]);
    }

    public function eliminarImagenNombre($valores) {
        $modelo = new Imagen();
        $modelo->setNombre($valores[0]);
        $modelo->eliminarImagenNombre();
    }
} 

?>