<?php
require_once("../modelo/Admin.php");

class AdminControlador {

    public function login($valores) {
        $modelo = new Admin();
        $modelo->setUsuario($valores[0]);
        $modelo->setContra($valores[1]);
    
        $resultados = $modelo->login();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

}
        
?>