<?php
class Subir {
    public function subirImagen($imagen, $nombre) {
        $directorioDestino = '../../tienda/assets/img_productos/';
        $archivoDestino = $directorioDestino . $nombre . '.jpg';

        if ($imagen['error'] === UPLOAD_ERR_OK) {
            $extension = strtolower(pathinfo($imagen['name'], PATHINFO_EXTENSION));

            switch ($extension) {
                case 'jpg':
                case 'jpeg':
                    $img = imagecreatefromjpeg($imagen['tmp_name']);
                    break;
                case 'png':
                    $img = imagecreatefrompng($imagen['tmp_name']);
                    break;
                case 'gif':
                    $img = imagecreatefromgif($imagen['tmp_name']);
                    break;
                case 'webp':
                    $img = imagecreatefromwebp($imagen['tmp_name']);
                    break;
                default:
                    return false;
            }

            if ($extension === 'png') {
                $ancho = imagesx($img);
                $alto = imagesy($img);

                $imagenFinal = imagecreatetruecolor($ancho, $alto);

                $blanco = imagecolorallocate($imagenFinal, 255, 255, 255);
                imagefill($imagenFinal, 0, 0, $blanco);

                imagecopy($imagenFinal, $img, 0, 0, 0, 0, $ancho, $alto);

                imagejpeg($imagenFinal, $archivoDestino, 90);
                imagedestroy($imagenFinal);
            } else {
                imagejpeg($img, $archivoDestino, 90);
            }

            imagedestroy($img);
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
