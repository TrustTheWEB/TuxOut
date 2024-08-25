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
            $consulta = $this->conn->prepare("SELECT * FROM producto;");
            $consulta->execute();
            $resultados = $consulta->fetchAll(PDO::FETCH_ASSOC);

            return $resultados;
            /* header('Content-Type: application/json');
            echo json_encode($resultados); */
            
            exit;
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }

    public function create() { //create - store
        try {
            $query = "INSER INTO " . $this->tabla . "SET RUT=?, nombre=?, descripcion=?, precio=?, stock=?, estado=?, marca=?";

            $stmt = $this->conn->prepare($query);

            $stmt->bind_param("sssiiss", $this->rut, $this->nombre, $this->descripcion, $this->precio, $this->stock, $this->estado, $this->marca);

            if($stmt->execute()) {
                return true;
            } else {
                //echo "Error: " . $stmt->error;
                return false;
            }

        }catch (PDOException $e) {

        }
    }

    public function show() {
        $query = "SELECT * FROM " . $this->tabla . "WHERE idProducto = ?";

        $stmt = $this->conn->prepare($query);

        $stmt->bind_param("i", $this->idProducto);

        $stmt->execute();

        $resultados = $stmt->get_result();
        return $resultados->fetch_assoc();
    }

    public function showCondicion($tipoCondicion) {

        switch($tipoCondicion) {
            case "RUT":
                $parametro = $this->rut;
                $tipoDato = "s";
                break;
            case "nombre":
                $parametro = $this->nombre;
                $tipoDato = "s";
                break;
            case "descripcion":
                $parametro = $this->descripcion;
                $tipoDato = "s";
                break;
            case "precio":
                $parametro = $this->precio;
                $tipoDato = "i";
                break;
            case "stock":
                $parametro = $this->stock;
                $tipoDato = "i";
                break;
            case "estado":
                $parametro = $this->estado;
                $tipoDato = "s";
                break;
            case "marca":
                $parametro = $this->marca;
                $tipoDato = "s";
                break;
            }

        $query = "SELECT * FROM " . $parametro . "WHERE " . $tipoCondicion . " = ?";

        $stmt = $this->conn->prepare($query);

        $stmt->bind_param($tipoDato, $parametro);

        $stmt->execute();

        $resultados = $stmt->get_result();
        return $resultados->fetch_assoc();
    }

    public function update() { //edit - update
        $query = "UPDATE " . $this->table_name . " SET nombre=?, descripcion=?, precio=?, stock=?, estado=?, marca=?";

        $stmt = $this->conn->prepare($query);

        $stmt->bind_param("ississ", $this->nombre, $this->descripcion, $this->precio, $this->stock ,$this->estado, $this->marca);

        if($stmt->execute()) {
            return true;
        } else {
            //echo "Error: " . $stmt->error;
            return false;
        }
    }

    public function destroy() {
        $query = "DELETE FROM " . $this->tabla . "WHERE idProducto = ?";

        $stmt = $this->conn->prepare($query);

        $stmt->bind_param("i", $this->idProduto);

        $stmt->execute();

        if($stmt->execute()) {
            return true;
        } else {
            //echo "Error: " . $stmt->error;
            return false;
        }
    }
    
}