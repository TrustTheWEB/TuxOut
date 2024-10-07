<?php
class Subir {

    public function subirImagen($imagen, $nombre) {
        $directorioDestino = '../../tienda/assets/img_productos/';
        $extension = pathinfo($imagen['name'], PATHINFO_EXTENSION);
        $archivoDestino = $directorioDestino . $nombre . '.' . $extension;

        if ($imagen['error'] === UPLOAD_ERR_OK) {
            if (move_uploaded_file($imagen['tmp_name'], $archivoDestino)) {
                echo "Imagen subida exitosamente: " . $archivoDestino;
            } else {
                echo "Error al mover el archivo.";
            }
        } else {
            echo "Error al subir el archivo. Código de error: " . $imagen['error'];
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
