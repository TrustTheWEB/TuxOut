<?php 

class Imagen {

    private $id;
    private $cant;
    private $num;
    private $imagen;

    public function subirImagenes() {

        $nombre = $this->id . "_" . $this->cant; 
        $directorioDestino = '../../tienda/assets/img_productos/';
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
    }

    public function buscarImagenes() {
        $urls = [];
            
        $directorio = '../../tienda/assets/img_productos/';
        $directorioArchivo = realpath($directorio) . '/';

        for ($i = 1; $i <= 5; $i++) {
            $patron = $directorioArchivo . $this->id . '_' . $i . '.jpg';
            $url = $directorio . $this->id . '_' . $i . '.jpg';
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

        return $urls;
    }

    public function eliminarImagenes() {
        $directorioDestino = realpath('../../tienda/assets/img_productos/') . '/';
        $extensiones = ['jpg', 'png', 'jpeg'];

        foreach ($extensiones as $extension) {
            $patron = $directorioDestino . $this->id . '_*.' . $extension;
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

    public function eliminarImagenNum() {
        $directorioDestino = realpath('../../tienda/assets/img_productos/') . '/';
        $extensiones = ['jpg', 'png', 'jpeg'];
        
            foreach ($extensiones as $extension) {
                $patron = $directorioDestino . $this->id . '_' . $this->num . '.' . $extension;
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

}

?>