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

    //7 metodos principales

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
            $query = "INSERT INTO " . $this->tabla . " (RUT, nombre, descripcion, precio, stock, estado, marca) VALUES (?, ?, ?, ?, ?, ?, ?)";

            $stmt = $this->conn->prepare($query);

            $stmt->bindValue(1, $this->rut, PDO::PARAM_STR);
            $stmt->bindValue(2, $this->nombre, PDO::PARAM_STR);
            $stmt->bindValue(3, $this->descripcion, PDO::PARAM_STR);
            $stmt->bindValue(4, $this->precio, PDO::PARAM_INT);
            $stmt->bindValue(5, $this->stock, PDO::PARAM_INT);
            $stmt->bindValue(6, $this->estado, PDO::PARAM_STR);
            $stmt->bindValue(7, $this->marca, PDO::PARAM_STR);

            if ($stmt->execute()) {
                return true;
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
            default:
                throw new Exception("Tipo de condición no reconocida");
        }
    
        $query = "SELECT * FROM " . $this->tabla . " WHERE " . $tipoCondicion . " = ?;";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindValue(1, $parametro, $tipoDato);
        
        $stmt->execute();
        
        $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
        if (!$resultados) {
            throw new Exception("No se encontraron resultados para la consulta: " . $query . " con el valor: " . $parametro);
        }
    
        return $resultados;
    }

    public function update() { //edit - update
        $query = "UPDATE " . $this->tabla . " SET RUT=?, nombre=?, descripcion=?, precio=?, stock=?, estado=?, marca=? WHERE idProducto=?";

        $stmt = $this->conn->prepare($query);

        $stmt->bindValue(1, $this->rut, PDO::PARAM_STR);
        $stmt->bindValue(2, $this->nombre, PDO::PARAM_STR);
        $stmt->bindValue(3, $this->descripcion, PDO::PARAM_STR);
        $stmt->bindValue(4, $this->precio, PDO::PARAM_INT);
        $stmt->bindValue(5, $this->stock, PDO::PARAM_INT);
        $stmt->bindValue(6, $this->estado, PDO::PARAM_STR);
        $stmt->bindValue(7, $this->marca, PDO::PARAM_STR);
        $stmt->bindValue(8, $this->idProducto, PDO::PARAM_INT);

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function destroy() {
        $query = "DELETE FROM " . $this->tabla . " WHERE idProducto = ?";

        $stmt = $this->conn->prepare($query);

        $stmt->bindValue(1, $this->idProducto, PDO::PARAM_INT);

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }

    //funciones extra

    public function indexInicio() {
        try {
            // Preparar la consulta SQL
            $consulta = $this->conn->prepare("
                SELECT p.idProducto, p.nombre, p.precio, 
                CASE WHEN d.porcentaje = 0 THEN NULL ELSE d.porcentaje END AS descuento
                FROM producto p
                LEFT JOIN contiene c ON p.idProducto = c.idProducto
                LEFT JOIN tiene t ON p.idProducto = t.idProducto
                LEFT JOIN descuento d ON t.idDescuento = d.idDescuento
                GROUP BY p.idProducto, p.nombre, p.precio, d.porcentaje
                ORDER BY 
                    CASE WHEN SUM(c.cantidad) IS NOT NULL THEN 0 ELSE 1 END, 
                    CASE WHEN d.porcentaje IS NOT NULL THEN 0 ELSE 1 END, 
                    RAND()
                LIMIT 20;
            ");
        
            // Ejecutar la consulta
            $consulta->execute();
        
            // Obtener los resultados
            $resultados = $consulta->fetchAll(PDO::FETCH_ASSOC);
        
            return $resultados; // Devolver los resultados
        
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }
    
}

?>