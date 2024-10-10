<?php
header('Content-Type: application/json');

class Eliminar {
    public function eliminarImagen($id) {
        $directorioDestino = realpath('../../tienda/assets/img_productos/') . '/';
        $extensiones = ['jpg', 'png', 'jpeg'];

        foreach ($extensiones as $extension) {
            $patron = $directorioDestino . $id . '_*.' . $extension;
            $archivos = glob($patron);

            if ($archivos) {
                foreach ($archivos as $archivo) {
                    unlink($archivo);
                }
            }
        }
    }
}

$eliminar = new Eliminar();
$id = $_POST['idProducto'] ?? null;

if ($id) {
    $eliminar->eliminarImagen($id);
}
?>
