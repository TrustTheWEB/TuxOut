<?php

class Buscar {
    public function buscarImagenes($id) {
        $urls = [];

        for ($i = 1; $i <= 5; $i++) {
            $extensiones = ['jpg', 'jpeg', 'png'];
            $imagenEncontrada = false;

            foreach ($extensiones as $extension) {
                $nombreImagen = "{$id}_{$i}.{$extension}";
                $urlImagen = "http://localhost/TuxOut/tienda/assets/img_productos/{$nombreImagen}";
                $file_headers = @get_headers($urlImagen);    
                if (stripos($file_headers[0],"404 Not Found") >0  || (stripos($file_headers[0], "302 Found") > 0 && stripos($file_headers[7],"404 Not Found") > 0)) {
                
                }else {
                    array_push($urls, $urlImagen);
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
