<?php
class Subir {
    public function subirImagen($imagen, $nombre) {
        $directorioDestino = '../../tienda/assets/img_productos/';
        $extension = pathinfo($imagen['name'], PATHINFO_EXTENSION);
        $archivoDestino = $directorioDestino . $nombre . '.' . $extension;

        if ($imagen['error'] === UPLOAD_ERR_OK) {
            move_uploaded_file($imagen['tmp_name'], $archivoDestino);
        }
    }
}

$subir = new Subir();
$imagen = $_FILES['file'];
$id = $_POST['idProducto'];
$num = $_POST['numeroImagen'];
$nombre = $id . "_" . $num;
$subir->subirImagen($imagen, $nombre);
?>
