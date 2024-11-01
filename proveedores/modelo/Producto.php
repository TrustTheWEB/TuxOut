<?php

require_once("../config/Conexion.php");

class Producto {

    private $conn;
    private $tabla = "producto";

    private $idProducto;
    private $rut;
    private $nombre;
    private $descripcion;
    private $precio;
    private $stock;
    private $estado;
    private $marca;
    private $oculto;
    private $busqueda;

    public function __construct() {
        $this->conn = Conexion::getInstance()->getDatabaseInstance();
    }

    //id
    public function getIdProducto() {
        return $this->idProducto;
    }

    public function setIdProducto($idProducto) {
        $this->idProducto = $idProducto;
    }

    //rut
    public function getRut() {
        return $this->rut;
    }

    public function setRut($rut) {
        $this->rut = $rut;
    }

    //nombre
    public function getNombre() {
        return $this->nombre;
    }

    public function setNombre($nombre) {
        $this->nombre = $nombre;
    }

    //descripcion
    public function getDescripcion() {
        return $this->descripcion;
    }

    public function setDescripcion($descripcion) {
        $this->descripcion = $descripcion;
    }

    //precio
    public function getPrecio() {
        return $this->precio;
    }

    public function setPrecio($precio) {
        $this->precio = $precio;
    }

    //stock
    public function getStock() {
        return $this->stock;
    }

    public function setStock($stock) {
        $this->stock = $stock;
    }

    //estado
    public function getEstado() {
        return $this->estado;
    }

    public function setEstado($estado) {
        $this->estado = $estado;
    }

    //marca
    public function getMarca() {
        return $this->marca;
    }

    public function setMarca($marca) {
        $this->marca = $marca;
    }

    //marca
    public function getOculto() {
        return $this->oculto;
    }

    public function setOculto($oculto) {
        $this->oculto = $oculto;
    }

    //busqueda
    public function getBusqueda() {
        return $this->busqueda;
    }

    public function setBusqueda($busqueda) {
        $this->busqueda = $busqueda;
    }

    //metodos principales

    public function index() {
        try {
            $consulta = $this->conn->prepare("SELECT * FROM " . $this->tabla . ";");
            $consulta->execute();
            $resultados = $consulta->fetchAll(PDO::FETCH_ASSOC);

            return $resultados;
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }

    public function store() { //create - store
        try {
            $query = "INSERT INTO " . $this->tabla . " (RUT, nombre, descripcion, precio, stock, estado, marca, oculto) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

            $stmt = $this->conn->prepare($query);

            $stmt->bindValue(1, $this->rut, PDO::PARAM_STR);
            $stmt->bindValue(2, $this->nombre, PDO::PARAM_STR);
            $stmt->bindValue(3, $this->descripcion, PDO::PARAM_STR);
            $stmt->bindValue(4, $this->precio, PDO::PARAM_INT);
            $stmt->bindValue(5, $this->stock, PDO::PARAM_INT);
            $stmt->bindValue(6, $this->estado, PDO::PARAM_STR);
            $stmt->bindValue(7, $this->marca, PDO::PARAM_STR);
            $stmt->bindValue(8, $this->oculto, PDO::PARAM_INT);

            if ($stmt->execute()) {
                $id = $this->conn->lastInsertId(); 
                return $id;
            } else {
                return false;
            }

        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }

    public function show($tipoCondicion) {
        switch ($tipoCondicion) {
            case "idProducto":
                $parametro = $this->idProducto;
                $tipoDato = PDO::PARAM_INT;
                break;
            case "rut":
                $parametro = $this->rut;
                $tipoDato = PDO::PARAM_STR;
                break;
            case "nombre":
                $parametro = $this->nombre;
                $tipoDato = PDO::PARAM_STR;
                break;
            case "descripcion":
                $parametro = $this->descripcion;
                $tipoDato = PDO::PARAM_STR;
                break;
            case "precio":
                $parametro = $this->precio;
                $tipoDato = PDO::PARAM_INT;
                break;
            case "stock":
                $parametro = $this->stock;
                $tipoDato = PDO::PARAM_INT;
                break;
            case "estado":
                $parametro = $this->estado;
                $tipoDato = PDO::PARAM_STR;
                break;
            case "marca":
                $parametro = $this->marca;
                $tipoDato = PDO::PARAM_STR;
                break;
            case "oculto":
                $parametro = $this->oculto;
                $tipoDato = PDO::PARAM_INT;
                break;
            default:
                throw new Exception("Tipo de condición no reconocida");
        }
    
        try {
            $query = "SELECT * FROM " . $this->tabla . " WHERE " . $tipoCondicion . " = ?;";
            
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(1, $parametro, $tipoDato);
            
            $stmt->execute();
            
            $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
            if (!$resultados) {
                throw new Exception("No se encontraron resultados para la consulta: " . $query . " con el valor: " . $parametro);
            }
        
            return $resultados;
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }

    public function update() { //edit - update
        try {
            $query = "UPDATE " . $this->tabla . " SET RUT=?, nombre=?, descripcion=?, precio=?, stock=?, estado=?, marca=?, oculto=? WHERE idProducto=?";

            $stmt = $this->conn->prepare($query);

            $stmt->bindValue(1, $this->rut, PDO::PARAM_STR);
            $stmt->bindValue(2, $this->nombre, PDO::PARAM_STR);
            $stmt->bindValue(3, $this->descripcion, PDO::PARAM_STR);
            $stmt->bindValue(4, $this->precio, PDO::PARAM_INT);
            $stmt->bindValue(5, $this->stock, PDO::PARAM_INT);
            $stmt->bindValue(6, $this->estado, PDO::PARAM_STR);
            $stmt->bindValue(7, $this->marca, PDO::PARAM_STR);
            $stmt->bindValue(8, $this->oculto, PDO::PARAM_INT);
            $stmt->bindValue(9, $this->idProducto, PDO::PARAM_INT);

            if ($stmt->execute()) {
                return true;
            } else {
                return false;
            }
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }

    public function destroy() {
        try {
            $query = "DELETE FROM " . $this->tabla . " WHERE idProducto = ?";

            $stmt = $this->conn->prepare($query);

            $stmt->bindValue(1, $this->idProducto, PDO::PARAM_INT);

            if ($stmt->execute()) {
                $id = $this->idProducto; 
                return $id;
            } else {
                return false;
            }
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }

    public function indexInicio() {
        try {
            $consulta = $this->conn->prepare("SELECT v.* FROM vistaproducto v
                JOIN producto p
                ON p.idProducto = v.idProducto
                WHERE p.RUT = ?
                ORDER BY v.cantidadVendida DESC
                LIMIT 10;");

            $consulta->bindValue(1, $this->rut, PDO::PARAM_STR);
            $consulta->execute();
            $resultados = $consulta->fetchAll(PDO::FETCH_ASSOC);

            return $resultados;
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }

    public function showAbrir() {
        try {
            $consulta = $this->conn->prepare("SELECT * FROM vistaproducto WHERE idProducto = ?;");
            $consulta->bindValue(1, $this->idProducto, PDO::PARAM_INT);
            $consulta->execute();
            $resultados = $consulta->fetchAll(PDO::FETCH_ASSOC);

            return $resultados;
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }

    public function indexFiltro($filtro) {
        switch($filtro) {
            case "menorPrecio":
                $filtro = "precio";
                break;
            case "mayorPrecio":
                $filtro = "precio DESC";
                break;
            default:
                $filtro = "precio";
                break;
        }

        try {
            $consulta = $this->conn->prepare("SELECT * FROM producto WHERE rut = ? ORDER BY $filtro;");
            $consulta->bindValue(1, $this->rut, PDO::PARAM_STR);
            $consulta->execute();
            $resultados = $consulta->fetchAll(PDO::FETCH_ASSOC);

            return $resultados;
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }

    public function busquedaProducto($filtro) {
        header('Content-Type: application/json');
        switch($filtro) {
            case "populares":
                $filtro = "cantidadVendida DESC";
                break;
            case "menorPrecio":
                $filtro = "(p.precio - (p.precio * descuento / 100))";
                break;
            case "mayorPrecio":
                $filtro = "(p.precio - (p.precio * descuento / 100)) DESC";
                break;
            case "calificados":
                $filtro = "promedioCalificacion";
                break;
            default:
                $filtro = "cantidadVendida DESC";
                break;
        }

        try {
            $consulta = $this->conn->prepare("SELECT p.* FROM vistaproducto v 
                JOIN producto p
                ON p.idProducto = v.idProducto
                LEFT JOIN categoriza z
                ON z.idProducto = p.idProducto
                LEFT JOIN categoria c
                ON c.idCategoria = z.idCategoria 
                WHERE p.nombre LIKE ? 
                OR p.descripcion LIKE ? 
                OR p.marca LIKE ? 
                OR c.nombre LIKE ?
                AND p.rut = ?
                ORDER BY " . $filtro);
            $consulta->bindValue(1, "%{$this->busqueda}%", PDO::PARAM_STR);
            $consulta->bindValue(2, "%{$this->busqueda}%", PDO::PARAM_STR);
            $consulta->bindValue(3, "%{$this->busqueda}%", PDO::PARAM_STR);
            $consulta->bindValue(4, "%{$this->busqueda}%", PDO::PARAM_STR);
            $consulta->bindValue(5, $this->rut, PDO::PARAM_STR);
            $consulta->execute();
            $resultados = $consulta->fetchAll(PDO::FETCH_ASSOC);

            return $resultados;
        } catch (Exception $e) {
            return [
                "success" => false,
                "error" => "Error en la consulta: " . $e->getMessage()
            ];
        }
    }

    public function showFiltro($tipoCondicion, $filtro) {
        try {

        header('Content-Type: application/json');
        switch($filtro) {
            case "menorPrecio":
                $filtro = "precio";
                break;
            case "mayorPrecio":
                $filtro = "precio DESC";
                break;
            default:
                $filtro = "precio";
                break;
        }

        switch ($tipoCondicion) {
            case "idProducto":
                $parametro = $this->idProducto;
                $tipoDato = PDO::PARAM_INT;
                break;
            case "nombre":
                $parametro = $this->nombre;
                $tipoDato = PDO::PARAM_STR;
                break;
            case "descripcion":
                $parametro = $this->descripcion;
                $tipoDato = PDO::PARAM_STR;
                break;
            case "precio":
                $parametro = $this->precio;
                $tipoDato = PDO::PARAM_INT;
                break;
            case "stock":
                $parametro = $this->stock;
                $tipoDato = PDO::PARAM_INT;
                break;
            case "estado":
                $parametro = $this->estado;
                $tipoDato = PDO::PARAM_STR;
                break;
            case "marca":
                $parametro = $this->marca;
                $tipoDato = PDO::PARAM_STR;
                break;
            case "oculto":
                $parametro = $this->oculto;
                $tipoDato = PDO::PARAM_INT;
                break;
            default:
                throw new Exception("Tipo de condición no reconocida");
        }
    
            $query = "SELECT * FROM " . $this->tabla . " WHERE " . $tipoCondicion . " = ? AND rut = ? ORDER BY $filtro;";
            
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(1, $parametro, $tipoDato);
            $stmt->bindValue(2, $this->rut, PDO::PARAM_STR);
            
            $stmt->execute();
            
            $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
            if (!$resultados) {
                return "vacio";
            }else {
                return $resultados;
            }
            
        } catch (Exception $e) {
            return ["error" => $e->getMessage()];
        }
    }
    
}

?>