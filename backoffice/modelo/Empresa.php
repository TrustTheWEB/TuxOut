<?php

require_once("../config/Conexion.php");

class Producto {

    private $conn;
    private $tabla = "empresa";

    private $rut;
    private $nombre;
    private $telefono;
    private $direccion;
    private $email;
    private $contraseña;

    public function __construct() {
        $this->conn = Conexion::getInstance()->getDatabaseInstance();
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

    // teléfono
    public function getTelefono() {
        return $this->telefono;
    }

    public function setTelefono($telefono) {
        $this->telefono = $telefono;
    }

    // dirección
    public function getDireccion() {
        return $this->direccion;
    }

    public function setDireccion($direccion) {
        $this->direccion = $direccion;
    }

    // email
    public function getEmail() {
        return $this->email;
    }

    public function setEmail($email) {
        $this->email = $email;
    }

    // contraseña
    public function getContraseña() {
        return $this->contraseña;
    }

    public function setContraseña($contraseña) {
        $this->contraseña = $contraseña;
    }

    //7 metodos principales

    public function index() {
        try {
            $consulta = $this->conn->prepare("SELECT * FROM " . $this->tabla . ";");
            $consulta->execute();
            $resultados = $consulta->fetchAll(PDO::FETCH_ASSOC);

            return $resultados;
            
            exit;
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }

    public function create() { //create - store
        try {
            $query = "INSER INTO " . $this->tabla . "SET RUT=?, nombre=?, telefono=?, direccion=?, email=?, contraseña=?";

            $stmt = $this->conn->prepare($query);

            $stmt->bind_param("ssssss", $this->rut, $this->nombre, $this->telefono, $this->direccion, $this->email, $this->contraseña);

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
        $query = "SELECT * FROM " . $this->tabla . "WHERE RUT = ?";

        $stmt = $this->conn->prepare($query);

        $stmt->bind_param("s", $this->idProducto);

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
            case "telefono":
                $parametro = $this->telefono;
                $tipoDato = "s";
                break;
            case "direccion":
                $parametro = $this->direccion;
                $tipoDato = "s";
                break;
            case "email":
                $parametro = $this->email;
                $tipoDato = "s";
                break;
            case "contraseña":
                $parametro = $this->contraseña;
                $tipoDato = "s";
                break;
            }

        $query = "SELECT * FROM " . $this->tabla . "WHERE " . $tipoCondicion . " = ?";

        $stmt = $this->conn->prepare($query);

        $stmt->bind_param($tipoDato, $parametro);

        $stmt->execute();

        $resultados = $stmt->get_result();
        return $resultados->fetch_assoc();
    }

    public function update() { //edit - update
        $query = "UPDATE " . $this->table_name . " SET nombre=?, telefono=?, direccion=?, email=?, contraseña=?";

        $stmt = $this->conn->prepare($query);

        $stmt->bind_param("sssss", $this->nombre, $this->descripcion, $this->precio, $this->stock ,$this->estado, $this->marca);

        if($stmt->execute()) {
            return true;
        } else {
            //echo "Error: " . $stmt->error;
            return false;
        }
    }

    public function destroy() {
        $query = "DELETE FROM " . $this->tabla . "WHERE RUT = ?";

        $stmt = $this->conn->prepare($query);

        $stmt->bind_param("s", $this->idProduto);

        $stmt->execute();

        if($stmt->execute()) {
            return true;
        } else {
            //echo "Error: " . $stmt->error;
            return false;
        }
    }
    
}