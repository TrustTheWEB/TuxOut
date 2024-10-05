<?php
class Enrutador {

    public function cargarControlador($controlador, $accion, $valores) {
        require_once '../controlador/' . $controlador . '.php';
        $controlador = new $controlador();

        if($valores == null) {
            $controlador->$accion();
        }else {
            $controlador->$accion($valores);
        }
    }
}

$enrutador = new Enrutador();
$controlador = $_POST["controlador"];
$accion = $_POST["accion"];
$valores = $_POST["valores"];
$enrutador->cargarControlador($controlador, $accion, $valores);

?>
