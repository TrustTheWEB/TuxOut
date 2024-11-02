<?php

require_once("../config/Conexion.php");

class Usuario {

    private $conn;
    private $tabla = "usuario";

    private $email;
    private $usuario;
    private $nombre;
    private $apellido;
    private $telefono;
    private $contra;
    private $fechaNac;
    private $ci;

    public function __construct() {
        $this->conn = Conexion::getInstance()->getDatabaseInstance();
    }

    // Getters y Setters
    public function getEmail() {
        return $this->email;
    }

    public function setEmail($email) {
        $this->email = $email;
    }

    public function getUsuario() {
        return $this->usuario;
    }

    public function setUsuario($usuario) {
        $this->usuario = $usuario;
    }

    public function getNombre() {
        return $this->nombre;
    }

    public function setNombre($nombre) {
        $this->nombre = $nombre;
    }

    public function getApellido() {
        return $this->apellido;
    }

    public function setApellido($apellido) {
        $this->apellido = $apellido;
    }

    public function getTelefono() {
        return $this->telefono;
    }

    public function setTelefono($telefono) {
        $this->telefono = $telefono;
    }

    public function getContra() {
        return $this->contra;
    }

    public function setContra($contra) {
        $this->contra = $contra;
    }

    public function getFechaNac() {
        return $this->fechaNac;
    }

    public function setFechaNac($fechaNac) {
        $this->fechaNac = $fechaNac;
    }

    public function getCI() {
        return $this->ci;
    }

    public function setCI($ci) {
        $this->ci = $ci;
    }

    // Métodos CRUD

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

    public function store() {
        try {
            $query = "INSERT INTO " . $this->tabla . " (email, usuario, nombre, apellido, telefono, contraseña, fechaNac, ci) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

            $stmt = $this->conn->prepare($query);

            $stmt->bindValue(1, $this->email, PDO::PARAM_STR);
            $stmt->bindValue(2, $this->usuario, PDO::PARAM_STR);
            $stmt->bindValue(3, $this->nombre, PDO::PARAM_STR);
            $stmt->bindValue(4, $this->apellido, PDO::PARAM_STR);
            $stmt->bindValue(5, $this->telefono, PDO::PARAM_STR);
            $hashedPassword = password_hash($this->contra, PASSWORD_DEFAULT);
            $stmt->bindValue(6, $hashedPassword, PDO::PARAM_STR);
            $stmt->bindValue(7, $this->fechaNac, PDO::PARAM_STR);
            $stmt->bindValue(8, $this->ci, PDO::PARAM_STR);

            return $stmt->execute();
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }

    public function show($tipoCondicion) {
        switch ($tipoCondicion) {
            case "email":
                $parametro = $this->email;
                $tipoDato = PDO::PARAM_STR;
                break;
            case "usuario":
                $parametro = $this->usuario;
                $tipoDato = PDO::PARAM_STR;
                break;
            case "nombre":
                $parametro = $this->nombre;
                $tipoDato = PDO::PARAM_STR;
                break;
            case "apellido":
                $parametro = $this->apellido;
                $tipoDato = PDO::PARAM_STR;
                break;
            case "telefono":
                $parametro = $this->telefono;
                $tipoDato = PDO::PARAM_STR;
                break;
            case "contraseña":
                $parametro = $this->contra;
                $tipoDato = PDO::PARAM_STR;
                break;
            case "fechaNac":
                $parametro = $this->fechaNac;
                $tipoDato = PDO::PARAM_STR;
                break;
            case "ci":
                $parametro = $this->ci;
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

    public function update() {
        try {
            $query = "UPDATE " . $this->tabla . " SET usuario=?, nombre=?, apellido=?, telefono=?, contraseña=?, fechaNac=?, ci=? WHERE email=?";

            $stmt = $this->conn->prepare($query);

            $stmt->bindValue(1, $this->usuario, PDO::PARAM_STR);
            $stmt->bindValue(2, $this->nombre, PDO::PARAM_STR);
            $stmt->bindValue(3, $this->apellido, PDO::PARAM_STR);
            $stmt->bindValue(4, $this->telefono, PDO::PARAM_STR);
            $hashedPassword = password_hash($this->contra, PASSWORD_DEFAULT);
            $stmt->bindValue(5, $hashedPassword, PDO::PARAM_STR);
            $stmt->bindValue(6, $this->fechaNac, PDO::PARAM_STR);
            $stmt->bindValue(7, $this->ci, PDO::PARAM_STR);
            $stmt->bindValue(8, $this->email, PDO::PARAM_STR);

            return $stmt->execute();
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }

    public function destroy() {
        try {
            $query = "DELETE FROM " . $this->tabla . " WHERE email = ?";

            $stmt = $this->conn->prepare($query);

            $stmt->bindValue(1, $this->email, PDO::PARAM_STR);

            if ($stmt->execute()) {
                return true;
            } else {
                return false;
            }
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }

    public function registro() {
        try {
            $query = "SELECT COUNT(*) FROM " . $this->tabla . " WHERE email = ? OR usuario = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(1, $this->email, PDO::PARAM_STR);
            $stmt->bindValue(2, $this->usuario, PDO::PARAM_STR);
            $stmt->execute();
    
            $count = $stmt->fetchColumn();
            if ($count > 0) {
                $checkQuery = "SELECT email, usuario FROM " . $this->tabla . " WHERE email = ? OR usuario = ?";
                $stmtCheck = $this->conn->prepare($checkQuery);
                $stmtCheck->bindValue(1, $this->email, PDO::PARAM_STR);
                $stmtCheck->bindValue(2, $this->usuario, PDO::PARAM_STR);
                $stmtCheck->execute();
                $result = $stmtCheck->fetch(PDO::FETCH_ASSOC);
    
                if ($result['email'] == $this->email) {
                    return "email";
                } 
                if ($result['usuario'] == $this->usuario) {
                    return "usuario";
                }
            }
    
            $query = "INSERT INTO " . $this->tabla . " (email, usuario, nombre, apellido, contraseña) VALUES (?, ?, ?, ?, ?)";
            $stmt = $this->conn->prepare($query);
    
            $stmt->bindValue(1, $this->email, PDO::PARAM_STR);
            $stmt->bindValue(2, $this->usuario, PDO::PARAM_STR);
            $stmt->bindValue(3, $this->nombre, PDO::PARAM_STR);
            $stmt->bindValue(4, $this->apellido, PDO::PARAM_STR);
            $hashedPassword = password_hash($this->contra, PASSWORD_DEFAULT);
            $stmt->bindValue(5, $hashedPassword, PDO::PARAM_STR);

            return $stmt->execute();
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }

    public function login() {
        try {
            $query = "SELECT usuario, contraseña FROM " . $this->tabla . " WHERE email = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(1, $this->email);
            $stmt->execute();
            $resultado = $stmt->fetch(PDO::FETCH_ASSOC);
        
            if ($resultado && password_verify($this->contra, $resultado['contraseña'])) {
                return $resultado['usuario']; 
            }
            return false;
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }

    public function updateSinContra() {
        try {
            $query = "UPDATE " . $this->tabla . " SET usuario=?, nombre=?, apellido=?, telefono=?, ci=?, fechaNac=? WHERE email=?";

            $stmt = $this->conn->prepare($query);
            
            $stmt->bindValue(1, $this->usuario, PDO::PARAM_STR);
            $stmt->bindValue(2, $this->nombre, PDO::PARAM_STR);
            $stmt->bindValue(3, $this->apellido, PDO::PARAM_STR);
            $stmt->bindValue(4, $this->telefono, PDO::PARAM_STR);
            $stmt->bindValue(5, $this->ci, PDO::PARAM_STR);
            $stmt->bindValue(6, $this->fechaNac, PDO::PARAM_STR);
            $stmt->bindValue(7, $this->email, PDO::PARAM_STR);

            return $stmt->execute();
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }

    public function busquedaFavoritos($filtro) {

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
            $consulta = $this->conn->prepare("SELECT v.* FROM vistaproducto v 
                JOIN producto p
                ON p.idProducto = v.idProducto
                JOIN favorito f
                ON f.idProducto = p.idProducto
                WHERE f.email = ? 
                ORDER BY " . $filtro);
            $consulta->bindValue(1, $this->email, PDO::PARAM_STR);
            $consulta->execute();
            $resultados = $consulta->fetchAll(PDO::FETCH_ASSOC);

            return $resultados;
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }

    public function busquedaHistorial($filtro) {

        switch($filtro) {
            case "recientes":
                $filtro = "h.fecha DESC";
                break;
            case "antiguos":
                $filtro = "h.fecha";
                break;
            default:
                $filtro = "h.fecha DESC";
                break;
        }

        try {
            $consulta = $this->conn->prepare("SELECT v.*, h.fecha FROM vistaproducto v 
                JOIN producto p
                ON p.idProducto = v.idProducto
                JOIN visita h
                ON h.idProducto = p.idProducto
                WHERE h.email = ? 
                ORDER BY " . $filtro);
            $consulta->bindValue(1, $this->email, PDO::PARAM_STR);
            $consulta->execute();
            $resultados = $consulta->fetchAll(PDO::FETCH_ASSOC);

            return $resultados;
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }

    public function buscarValoresNull() {
        try {
            $consulta = $this->conn->prepare("SELECT * FROM usuario WHERE email = ? AND (telefono IS NULL OR fechaNac IS NULL OR ci IS NULL OR telefono = '' OR fechaNac = '' OR ci = '');");
            $consulta->bindValue(1, $this->email, PDO::PARAM_STR);
            $consulta->execute();

            $consulta2 = $this->conn->prepare("SELECT * FROM direccion WHERE email = ?;");
            $consulta2->bindValue(1, $this->email, PDO::PARAM_STR);
            $consulta2->execute();
            
            if ($consulta->rowCount() > 0) {
                return "datos";
            }else if($consulta2->rowCount() == 0) {
                return "direcciones";
            }else {
                return true;
            }
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }

    public function updateContra() {
        try {
            $query = "UPDATE " . $this->tabla . " SET contraseña=? WHERE email=?";

            $stmt = $this->conn->prepare($query);
            $hashedPassword = password_hash($this->contra, PASSWORD_DEFAULT);
            $stmt->bindValue(1, $hashedPassword, PDO::PARAM_STR);
            $stmt->bindValue(2, $this->email, PDO::PARAM_STR);

            return $stmt->execute();
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }
     
    
}

?>