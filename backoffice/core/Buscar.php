<?php

class Buscar {
    public function buscarImagenes($id) {
        $urls = [];
            
        $directorio = '../../tienda/assets/img_productos/';
        $directorioArchivo = realpath($directorio) . '/';

        for ($i = 1; $i <= 5; $i++) {
            $patron = $directorioArchivo . $id . '_' . $i . '.jpg';
            $url = $directorio . $id . '_' . $i . '.jpg';
            $archivos = glob($patron);
    
            if (!empty($archivos)) {
                foreach ($archivos as $archivo) {
                    if (file_exists($archivo)) {
                        array_push($urls, $url);
                    }
                }
            }
        }
        

        if (empty($urls)) {
            array_push($urls, "");
        }

        header('Content-Type: application/json');
        echo json_encode($urls);
        exit;
    }
}

$buscar = new Buscar();
$id = $_POST['id'];
$buscar->buscarImagenes($id);
?>
