<?php 

class Imagen {

    private $url;

    public function getUrl() {
        return $this->url;
    }

    public function setUrl($url) {
        $this->url = $url;
    }

    public function imagenExiste() {
        $patron = realpath($this->url);
        $archivos = glob($patron);

        if (!empty($archivos)) {
            foreach ($archivos as $archivo) {
                if (file_exists($archivo)) {
                    return true;
                }else {
                    return false;
                }
            }
        }
    }

}

?>