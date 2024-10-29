<?php

require_once("../config/Conexion.php");

class Carrito {
    private $email;
    private $idProducto;
    private $cantidad;
    private $tabla = "carrito";
    private $conn;

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

    public function getIdProducto() {
        return $this->idProducto;
    }

    public function setIdProducto($idProducto) {
        $this->idProducto = $idProducto;
    }

    public function getCantidad() {
        return $this->cantidad;
    }

    public function setCantidad($cantidad) {
        $this->cantidad = $cantidad;
    }

    // Métodos CRUD
    public function index() {
        try {
            $query = "SELECT * FROM " . $this->tabla;
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }

    public function store() {
        try {
            $query = "INSERT INTO " . $this->tabla . " (email, idProducto, cantidad) VALUES (?, ?, ?)";
            $stmt = $this->conn->prepare($query);

            $stmt->bindValue(1, $this->email, PDO::PARAM_STR);
            $stmt->bindValue(2, $this->idProducto, PDO::PARAM_INT);
            $stmt->bindValue(3, $this->cantidad, PDO::PARAM_INT);

            return $stmt->execute();
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }

    public function show($tipoCondicion) {
        try {
            switch ($tipoCondicion) {
                case "email":
                    $parametro = $this->email;
                    $tipoDato = PDO::PARAM_STR;
                    break;
                case "idProducto":
                    $parametro = $this->idProducto;
                    $tipoDato = PDO::PARAM_INT;
                    break;
                case "cantidad":
                    $parametro = $this->cantidad;
                    $tipoDato = PDO::PARAM_INT;
                    break;
                default:
                    throw new Exception("Tipo de condición no reconocida");
            }

            $query = "SELECT * FROM " . $this->tabla . " WHERE " . $tipoCondicion . " = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(1, $parametro, $tipoDato);

            $stmt->execute();

            $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if (!$resultados) {
                throw new Exception("No se encontraron resultados para la consulta.");
            }

            return $resultados;
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }

    public function update() {
        try {
            $query = "UPDATE " . $this->tabla . " SET cantidad = ? WHERE email = ? AND idProducto = ?";
            $stmt = $this->conn->prepare($query);

            $stmt->bindValue(1, $this->cantidad, PDO::PARAM_INT);
            $stmt->bindValue(2, $this->email, PDO::PARAM_STR);
            $stmt->bindValue(3, $this->idProducto, PDO::PARAM_INT);

            return $stmt->execute();
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }

    public function destroy() {
        try {
            $query = "DELETE FROM " . $this->tabla . " WHERE email = ? AND idProducto = ?";
            $stmt = $this->conn->prepare($query);

            $stmt->bindValue(1, $this->email, PDO::PARAM_STR);
            $stmt->bindValue(2, $this->idProducto, PDO::PARAM_INT);

            return $stmt->execute();
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }

    public function destroyEmail() {
        try {
            $query = "DELETE FROM " . $this->tabla . " WHERE email = ?";
            $stmt = $this->conn->prepare($query);

            $stmt->bindValue(1, $this->email, PDO::PARAM_STR);

            return $stmt->execute();
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }

    public function verificarCarrito() {
        try {
            $query = "SELECT cantidad FROM " . $this->tabla . " WHERE email = ? AND idProducto = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(1, $this->email);
            $stmt->bindValue(2, $this->idProducto);
            $stmt->execute();
            $resultado = $stmt->fetch(PDO::FETCH_ASSOC);
        
            if ($resultado) {
                return $resultado["cantidad"]; 
            }
            return false;
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }

    public function showCarritoPreview() {
        try {
            $query = "SELECT * FROM vistacarritopreview WHERE email = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(1, $this->email);
            $stmt->execute();

            return $stmt->fetchAll(PDO::FETCH_ASSOC);

        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }

    public function sumarCantidad() {
        try {
            $query = "
                UPDATE " . $this->tabla . " c
                JOIN producto p ON c.idProducto = p.idProducto
                SET c.cantidad = 
                    CASE 
                        WHEN c.cantidad + 1 > p.stock THEN p.stock
                        ELSE c.cantidad + 1
                    END
                WHERE c.email = ? AND c.idProducto = ?";
    
            $stmt = $this->conn->prepare($query);
    
            $stmt->bindValue(1, $this->email, PDO::PARAM_STR);
            $stmt->bindValue(2, $this->idProducto, PDO::PARAM_INT);
    
            $stmt->execute();
    
            if ($stmt->rowCount() > 0) {
                $query = "SELECT cantidad FROM " . $this->tabla . " WHERE email = ? AND idProducto = ?";
                $stmt = $this->conn->prepare($query);
                $stmt->bindValue(1, $this->email, PDO::PARAM_STR);
                $stmt->bindValue(2, $this->idProducto, PDO::PARAM_INT);
                $stmt->execute();
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                return $result['cantidad'];
            } else {
                return false;
            }
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }    

    public function restarCantidad() {
        try {
            $query = "
                UPDATE " . $this->tabla . " c
                SET c.cantidad = 
                    CASE 
                        WHEN c.cantidad - 1 < 1 THEN 1
                        ELSE c.cantidad - 1
                    END
                WHERE c.email = ? AND c.idProducto = ?";
    
            $stmt = $this->conn->prepare($query);
    
            $stmt->bindValue(1, $this->email, PDO::PARAM_STR);
            $stmt->bindValue(2, $this->idProducto, PDO::PARAM_INT);
    
            $stmt->execute();
    
            if ($stmt->rowCount() > 0) {
                $query = "SELECT cantidad FROM " . $this->tabla . " WHERE email = ? AND idProducto = ?";
                $stmt = $this->conn->prepare($query);
                $stmt->bindValue(1, $this->email, PDO::PARAM_STR);
                $stmt->bindValue(2, $this->idProducto, PDO::PARAM_INT);
                $stmt->execute();
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                return $result['cantidad'];
            } else {
                return false;
            }
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }
    
    
}

?>
