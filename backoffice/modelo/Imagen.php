<?php 

class Imagen {

    private $nombre;
    private $imagen;

    public function setImagen($imagen) {
        $this->imagen = $imagen;
    }

    public function setNombre($nombre) {
        $this->nombre = $nombre;
    }

   /*  public function subirImagen() {

        $nombre = $this->nombre; 
        $directorioDestino = __DIR__.'/../../tienda/assets/img_productos/';
        $archivoDestino = $directorioDestino . $nombre . '.jpg';

        if ($this->imagen['error'] === UPLOAD_ERR_OK) {
            $extension = strtolower(pathinfo($this->imagen['name'], PATHINFO_EXTENSION));

            switch ($extension) {
                case 'jpg':
                case 'jpeg':
                    $img = imagecreatefromjpeg($this->imagen['tmp_name']);
                    break;
                case 'png':
                    $img = imagecreatefrompng($this->imagen['tmp_name']);
                    break;
                case 'gif':
                    $img = imagecreatefromgif($this->imagen['tmp_name']);
                    break;
                case 'webp':
                    $img = imagecreatefromwebp($this->imagen['tmp_name']);
                    break;
                default:
                    return false;
            }

            if ($extension === 'png') {
                $ancho = imagesx($img);
                $alto = imagesy($img);

                $this->imagenFinal = imagecreatetruecolor($ancho, $alto);

                $blanco = imagecolorallocate($this->imagenFinal, 255, 255, 255);
                imagefill($this->imagenFinal, 0, 0, $blanco);

                imagecopy($this->imagenFinal, $img, 0, 0, 0, 0, $ancho, $alto);

                imagejpeg($this->imagenFinal, $archivoDestino, 90);
                imagedestroy($this->imagenFinal);
            } else {
                imagejpeg($img, $archivoDestino, 90);
            }
        }
    } */

    public function subirImagen() {
        $nombre = $this->nombre; 
        $directorioDestino = __DIR__.'/../../tienda/assets/img_productos/';
        $archivoDestino = $directorioDestino . $nombre . '.jpg';
    
        try {
            if ($this->imagen['error'] === UPLOAD_ERR_OK) {
                $extension = strtolower(pathinfo($this->imagen['name'], PATHINFO_EXTENSION));
                $img = null;
    
                switch ($extension) {
                    case 'jpg':
                    case 'jpeg':
                        $img = imagecreatefromjpeg($this->imagen['tmp_name']);
                        break;
                    case 'png':
                        $img = imagecreatefrompng($this->imagen['tmp_name']);
                        break;
                    case 'gif':
                        $img = imagecreatefromgif($this->imagen['tmp_name']);
                        break;
                    case 'webp':
                        $img = imagecreatefromwebp($this->imagen['tmp_name']);
                        break;
                    default:
                        throw new Exception("Formato de imagen no soportado: $extension");
                }
    
                if ($img === false) {
                    throw new Exception("Error al crear la imagen desde el archivo temporal.");
                }
    
                if ($extension === 'png') {
                    $ancho = imagesx($img);
                    $alto = imagesy($img);
    
                    $this->imagenFinal = imagecreatetruecolor($ancho, $alto);
                    $blanco = imagecolorallocate($this->imagenFinal, 255, 255, 255);
                    imagefill($this->imagenFinal, 0, 0, $blanco);
                    imagecopy($this->imagenFinal, $img, 0, 0, 0, 0, $ancho, $alto);
    
                    if (!imagejpeg($this->imagenFinal, $archivoDestino, 90)) {
                        throw new Exception("Error al guardar la imagen en el directorio de destino.");
                    }
                    imagedestroy($this->imagenFinal);
                } else {
                    if (!imagejpeg($img, $archivoDestino, 90)) {
                        throw new Exception("Error al guardar la imagen en el directorio de destino.");
                    }
                }
    
                return "Imagen subida exitosamente."; // Mensaje de éxito
            } else {
                throw new Exception("Error en la carga del archivo: " . $this->imagen['error']);
            }
        } catch (Exception $e) {
            return "Error: " . $e->getMessage(); // Retorna el mensaje de error
        }
    }    

    public function eliminarImagenesId($id) {
        $directorioDestino = realpath('../../tienda/assets/img_productos/') . '/';
        $extensiones = ['jpg', 'png', 'jpeg'];

        foreach ($extensiones as $extension) {
            $patron = $directorioDestino . $id . '_*.' . $extension;
            $archivos = glob($patron);

            if (!empty($archivos)) {
                foreach ($archivos as $archivo) {
                    if (file_exists($archivo)) {
                        unlink($archivo);
                    }
                }
            }
        }
    }

    public function eliminarImagenNombre() {
        $directorioDestino = realpath('../../tienda/assets/img_productos/') . '/';
        $extensiones = ['jpg', 'png', 'jpeg'];
    
        foreach ($extensiones as $extension) {
            $archivo = $directorioDestino . $this->nombre . '.' . $extension;
    
            if (file_exists($archivo)) {
                unlink($archivo);
                break;
            }
        }
    }
    
}

?>