-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-11-2024 a las 11:44:14
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tuxout`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `caracteristica`
--

CREATE TABLE `caracteristica` (
  `idProducto` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `valor` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `caracteristica`
--

INSERT INTO `caracteristica` (`idProducto`, `nombre`, `valor`) VALUES
(1, 'Almacenamiento', '256 GB'),
(3, 'Almacenamiento', '256 GB');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito`
--

CREATE TABLE `carrito` (
  `email` varchar(255) NOT NULL,
  `idProducto` int(11) NOT NULL,
  `cantidad` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `carrito`
--

INSERT INTO `carrito` (`email`, `idProducto`, `cantidad`) VALUES
('mauro@gmail.com', 4, 1),
('mauro@gmail.com', 11, 3),
('mauro@gmail.com', 12, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `idCategoria` int(11) NOT NULL,
  `nombre` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`idCategoria`, `nombre`) VALUES
(1, 'Electrónica'),
(2, 'Limpieza'),
(3, 'Videojuegos'),
(4, 'Teléfonos'),
(5, 'Audio'),
(6, 'Ropa');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoriza`
--

CREATE TABLE `categoriza` (
  `idCategoria` int(11) NOT NULL,
  `idProducto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoriza`
--

INSERT INTO `categoriza` (`idCategoria`, `idProducto`) VALUES
(1, 1),
(1, 2),
(1, 3),
(3, 1),
(3, 3),
(4, 1),
(4, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comenta`
--

CREATE TABLE `comenta` (
  `email` varchar(255) NOT NULL,
  `idProducto` int(11) NOT NULL,
  `calificacion` decimal(2,1) NOT NULL,
  `comentario` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `comenta`
--

INSERT INTO `comenta` (`email`, `idProducto`, `calificacion`, `comentario`) VALUES
('juan@gmail.com', 1, 4.0, 'Buen producto');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contiene`
--

CREATE TABLE `contiene` (
  `idPedido` int(11) NOT NULL,
  `idProducto` int(11) NOT NULL,
  `cantidad` int(10) UNSIGNED NOT NULL,
  `precioHistorico` decimal(10,2) UNSIGNED NOT NULL,
  `estado` enum('preparando','entregado') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `contiene`
--

INSERT INTO `contiene` (`idPedido`, `idProducto`, `cantidad`, `precioHistorico`, `estado`) VALUES
(3, 1, 3, 4400.00, 'entregado'),
(4, 2, 1, 6000.00, 'preparando'),
(3, 3, 2, 29999.99, 'preparando'),
(4, 7, 1, 1500.00, 'preparando'),
(4, 8, 1, 250.00, 'preparando'),
(4, 11, 4, 500.00, 'preparando'),
(4, 14, 3, 80.00, 'preparando'),
(4, 17, 1, 250.00, 'preparando'),
(4, 19, 1, 25.00, 'preparando'),
(4, 20, 1, 100.00, 'preparando'),
(4, 22, 1, 120.00, 'preparando');

--
-- Disparadores `contiene`
--
DELIMITER $$
CREATE TRIGGER `actualizarStock` AFTER INSERT ON `contiene` FOR EACH ROW BEGIN
    UPDATE producto p
    SET p.stock = p.stock - NEW.cantidad
    WHERE p.idProducto = NEW.idProducto;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `descuento`
--

CREATE TABLE `descuento` (
  `idDescuento` int(11) NOT NULL,
  `porcentaje` smallint(5) UNSIGNED NOT NULL,
  `fechaInicio` date NOT NULL,
  `fechaFin` date NOT NULL,
  `motivo` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `descuento`
--

INSERT INTO `descuento` (`idDescuento`, `porcentaje`, `fechaInicio`, `fechaFin`, `motivo`) VALUES
(3, 20, '2024-10-20', '2025-10-20', 'CiberLunes'),
(4, 15, '2024-02-20', '2025-02-20', 'BlackFriday'),
(5, 10, '2024-11-01', '2024-11-30', 'Descuento por Black Friday'),
(6, 15, '2024-12-01', '2024-12-15', 'Promoción de fin de año'),
(7, 5, '2024-11-10', '2024-11-20', 'Descuento por compra anticipada'),
(8, 20, '2024-11-15', '2024-11-25', 'Descuento especial en electrónica'),
(9, 30, '2024-12-20', '2025-01-05', 'Promoción de verano'),
(10, 25, '2024-11-01', '2024-11-15', 'Descuento por aniversario de la tienda'),
(11, 10, '2024-11-05', '2024-11-12', 'Descuento por fidelidad'),
(12, 15, '2024-11-15', '2024-12-01', 'Descuento para nuevos clientes'),
(13, 50, '2024-11-25', '2024-12-01', 'Liquidación de stock'),
(14, 40, '2024-12-10', '2024-12-20', 'Descuento navideño'),
(15, 5, '2024-11-15', '2024-11-30', 'Promoción en artículos seleccionados'),
(16, 35, '2024-11-01', '2024-11-10', 'Día del vendedor'),
(17, 20, '2024-12-05', '2024-12-15', 'Black Friday extendido'),
(18, 15, '2024-12-15', '2025-01-01', 'Descuento de Año Nuevo'),
(19, 10, '2024-11-20', '2024-12-01', 'Descuento por combo de productos'),
(20, 5, '2024-12-01', '2024-12-10', 'Descuento en accesorios'),
(21, 30, '2024-11-10', '2024-11-30', 'Promoción de fin de mes'),
(22, 20, '2024-12-20', '2025-01-10', 'Descuento por compras en línea'),
(23, 10, '2024-12-01', '2024-12-05', 'Descuento en juguetes'),
(24, 15, '2024-12-10', '2024-12-25', 'Promoción de fiestas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `direccion`
--

CREATE TABLE `direccion` (
  `email` varchar(255) NOT NULL,
  `direccion` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `direccion`
--

INSERT INTO `direccion` (`email`, `direccion`) VALUES
('juan@gmail.com', 'Brazo Oriental 8888');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresa`
--

CREATE TABLE `empresa` (
  `RUT` varchar(20) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `direccion` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `suspendido` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empresa`
--

INSERT INTO `empresa` (`RUT`, `nombre`, `telefono`, `direccion`, `email`, `contraseña`, `suspendido`) VALUES
('12345676', 'Empresa Ejemplo', '9998887774', 'Calle 8000', 'emailempresita@empresa.com', '$2y$10$K.iTAiAWlan9.2D4GrAgfeyhahB.TGH6BBiQyBVbhb4KOFDY4I0O6', 0),
('12345678', 'Empresa Prueba', '9998887732', 'Calle 9952', 'emailempresa5@empresa.com', '$2y$10$owoiNRKZundUAAuRRkkibuuwK0gcv.7SQcX1Dj8EQV7mxRCfWvWQu', 0),
('76.123.456-7', 'Empresa Uno S.A.', '091234567', 'Av. Libertador 1234', 'contacto@empresauno.com', '$2y$10$eX...', 0),
('76.123.789-3', 'Empresa Ocho', '098765432', 'Calle Sarandí 101', 'info@empresaoto.com', '$2y$10$eX...', 0),
('76.321.654-2', 'Empresa Nueve', '091234567', 'Calle Uruguay 555', 'ventas@empresanueve.com', '$2y$10$eX...', 0),
('76.321.987-6', 'Empresa Cuatro S.A.', '092233445', 'Ruta 10 km 50', 'contacto@empresacuatro.com', '$2y$10$eX...', 1),
('76.456.123-9', 'Empresa Diez', '092334567', 'Avenida Brasil 999', 'contacto@empresadiez.com', '$2y$10$eX...', 0),
('76.456.789-1', 'Empresa Cinco', '091987654', 'Calle 25 de Agosto 345', 'info@empresacinco.com', '$2y$10$eX...', 0),
('76.543.210-5', 'Empresa Seis', '091234890', 'Bulevar Artigas 678', 'ventas@empresaseis.com', '$2y$10$eX...', 0),
('76.654.321-0', 'Empresa Tres S.R.L.', '091122334', 'Calle Secundaria 789', 'ventas@empresatres.com', '$2y$10$eX...', 0),
('76.987.123-4', 'Empresa Siete', '092345678', 'Av. 18 de Julio 234', 'contacto@empresasiete.com', '$2y$10$eX...', 1),
('76.987.654-3', 'Empresa Dos Ltda.', '098765432', 'Calle Principal 456', 'info@empresados.com', '$2y$10$eX...', 0),
('761234567', 'Empresa Uno S.A.', '091234567', 'Av. Libertador 1234', 'contacto@empresauno.com', '$2y$10$eX...', 0),
('761237893', 'Empresa Ocho', '098765432', 'Calle Sarandí 101', 'info@empresaoto.com', '$2y$10$eX...', 0),
('763216543', 'Empresa Nueve', '091234567', 'Calle Uruguay 555', 'ventas@empresanueve.com', '$2y$10$eX...', 0),
('763219876', 'Empresa Cuatro S.A.', '092233445', 'Ruta 10 km 50', 'contacto@empresacuatro.com', '$2y$10$eX...', 1),
('764561239', 'Empresa Diez', '092334567', 'Avenida Brasil 999', 'contacto@empresadiez.com', '$2y$10$eX...', 0),
('764567891', 'Empresa Cinco', '091987654', 'Calle 25 de Agosto 345', 'info@empresacinco.com', '$2y$10$eX...', 0),
('765432105', 'Empresa Seis', '091234890', 'Bulevar Artigas 678', 'ventas@empresaseis.com', '$2y$10$eX...', 0),
('766543210', 'Empresa Tres S.R.L.', '091122334', 'Calle Secundaria 789', 'ventas@empresatres.com', '$2y$10$eX...', 0),
('769871234', 'Empresa Siete', '092345678', 'Av. 18 de Julio 234', 'contacto@empresasiete.com', '$2y$10$eX...', 1),
('769876543', 'Empresa Dos Ltda.', '098765432', 'Calle Principal 456', 'info@empresados.com', '$2y$10$eX...', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favorito`
--

CREATE TABLE `favorito` (
  `email` varchar(255) NOT NULL,
  `idProducto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `favorito`
--

INSERT INTO `favorito` (`email`, `idProducto`) VALUES
('juan@gmail.com', 2),
('juan@gmail.com', 4),
('mauro@gmail.com', 7),
('mauro@gmail.com', 8),
('mauro@gmail.com', 10),
('mauro@gmail.com', 21),
('mauro@gmail.com', 22);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `idPedido` int(11) NOT NULL,
  `estado` enum('procesando','pagado','entregado') NOT NULL,
  `medioPago` enum('PayPal','MercadoPago','Local') NOT NULL,
  `direccion` varchar(60) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedido`
--

INSERT INTO `pedido` (`idPedido`, `estado`, `medioPago`, `direccion`, `fecha`, `email`) VALUES
(3, 'procesando', 'PayPal', 'Brazo Oriental 8888', '2024-11-05 10:05:31', 'juan@gmail.com'),
(4, 'procesando', 'PayPal', 'Brazo Oriental 8888', '2024-11-05 10:40:50', 'juan@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `idProducto` int(11) NOT NULL,
  `RUT` varchar(20) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  `precio` decimal(10,2) UNSIGNED NOT NULL,
  `stock` int(10) UNSIGNED NOT NULL,
  `estado` enum('Nuevo','Renovado','Usado') NOT NULL,
  `marca` varchar(100) NOT NULL,
  `oculto` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`idProducto`, `RUT`, `nombre`, `descripcion`, `precio`, `stock`, `estado`, `marca`, `oculto`) VALUES
(1, '12345678', 'Google Pixel 7', 'Celular de Google 2022', 5500.00, 34, 'Renovado', 'Google', 1),
(2, '12345678', 'iPhone 15 Blanco', 'Celular de Apple 2022', 6000.00, 20, 'Nuevo', 'Apple', 0),
(3, '12345678', 'Samsung Galaxy s22', 'Celular de Samsung 2022', 29999.99, 30, 'Usado', 'Samsung Galaxy', 0),
(4, '12345678', 'Google Pixel 9', 'Celular de Google 2025', 79999.00, 23, 'Renovado', 'Google', 0),
(5, '761234567', 'Laptop Gamer', 'Laptop de alta gama para gamers', 1200.00, 10, 'Nuevo', 'Alienware', 0),
(6, '769876543', 'Smartphone', 'Teléfono inteligente con pantalla de 6.5 pulgadas', 800.00, 25, 'Nuevo', 'Samsung', 0),
(7, '766543210', 'Cámara DSLR', 'Cámara digital con lentes intercambiables', 1500.00, 14, 'Renovado', 'Canon', 0),
(8, '763219876', 'Auriculares Inalámbricos', 'Auriculares bluetooth con cancelación de ruido', 250.00, 49, 'Nuevo', 'Sony', 0),
(9, '764567891', 'Reloj Inteligente', 'Reloj con funciones de seguimiento de salud', 300.00, 20, 'Usado', 'Apple', 0),
(10, '765432105', 'Teclado Mecánico', 'Teclado mecánico para jugadores', 150.00, 30, 'Nuevo', 'Logitech', 0),
(11, '769871234', 'Monitor 4K', 'Monitor de alta resolución de 27 pulgadas', 500.00, 1, 'Nuevo', 'Dell', 0),
(12, '761237893', 'Tablet', 'Tablet con 128 GB de almacenamiento', 400.00, 15, 'Nuevo', 'Huawei', 0),
(13, '763216543', 'Proyector', 'Proyector portátil para presentaciones', 700.00, 8, 'Renovado', 'Epson', 0),
(14, '764561239', 'Mochila para Laptop', 'Mochila resistente para laptops de 15.6 pulgadas', 80.00, 37, 'Nuevo', 'Targus', 0),
(15, '761234567', 'Router Wi-Fi', 'Router con tecnología de doble banda', 150.00, 60, 'Nuevo', 'TP-Link', 0),
(16, '769876543', 'Disco Duro Externo', 'Disco duro externo de 2TB', 100.00, 50, 'Usado', 'Western Digital', 0),
(17, '766543210', 'Silla Gaming', 'Silla ergonómica para gamers', 250.00, 9, 'Nuevo', 'DXRacer', 0),
(18, '763219876', 'Webcam HD', 'Cámara web con calidad de 1080p', 70.00, 20, 'Nuevo', 'Logitech', 0),
(19, '764567891', 'Pendrive 64GB', 'Pendrive USB 3.0 de 64 GB', 25.00, 99, 'Nuevo', 'Sandisk', 0),
(20, '765432105', 'Parlantes Bluetooth', 'Parlantes inalámbricos portátiles', 100.00, 29, 'Nuevo', 'JBL', 0),
(21, '769871234', 'Funda para Laptop', 'Funda de neopreno para laptops de 15 pulgadas', 30.00, 50, 'Nuevo', 'Case Logic', 0),
(22, '761237893', 'Estabilizador', 'Estabilizador de voltaje para electrodomésticos', 120.00, 14, 'Nuevo', 'APC', 0),
(23, '763216543', 'Cargador Inalámbrico', 'Cargador inalámbrico rápido', 40.00, 25, 'Nuevo', 'Anker', 0),
(24, '764561239', 'Luces LED', 'Luces LED para decoración', 20.00, 200, 'Nuevo', 'Philips', 0),
(25, '761234567', 'Smart TV', 'Televisor inteligente de 55 pulgadas', 900.00, 12, 'Nuevo', 'LG', 0);

--
-- Disparadores `producto`
--
DELIMITER $$
CREATE TRIGGER `actualizarCantidad` AFTER UPDATE ON `producto` FOR EACH ROW BEGIN
    IF NEW.stock < OLD.stock THEN
        UPDATE carrito c
        SET c.cantidad = NEW.stock
        WHERE c.idProducto = NEW.idProducto
        AND c.cantidad > NEW.stock;
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tiene`
--

CREATE TABLE `tiene` (
  `idProducto` int(11) NOT NULL,
  `idDescuento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tiene`
--

INSERT INTO `tiene` (`idProducto`, `idDescuento`) VALUES
(1, 3),
(3, 3),
(1, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `email` varchar(255) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `apellido` varchar(30) NOT NULL,
  `telefono` varchar(9) DEFAULT NULL,
  `fechaNac` date DEFAULT NULL,
  `ci` varchar(15) DEFAULT NULL,
  `contraseña` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`email`, `usuario`, `nombre`, `apellido`, `telefono`, `fechaNac`, `ci`, `contraseña`) VALUES
('ana.torres@example.com', 'anatorres', 'Ana', 'Torres', '092345678', '1993-07-15', '44556677', '$2y$10$eX...'),
('carlos.martinez@example.com', 'carlosmart', 'Carlos', 'Martínez', '091122334', '1992-01-30', '11223344', '$2y$10$eX...'),
('jorge.flores@example.com', 'jorgeflores', 'Jorge', 'Flores', '098765432', '1989-03-22', '22334455', '$2y$10$eX...'),
('juan.perez@example.com', 'juanperez', 'Juan', 'Pérez', '091234567', '1990-05-15', '12345678', '$2y$10$eX...'),
('juan@gmail.com', 'Jon788', 'Jon', 'Pettinari', '435435223', '2002-02-22', '56748026', '$2y$10$RzNhcdDYvIcYFLIvEg/YieJrDEc4yLf3Wika0QcYZ01tNgLlKbBWC'),
('laura.lopez@example.com', 'lauralopez', 'Laura', 'López', '092233445', '1988-04-10', '33445566', '$2y$10$eX...'),
('lina.castro@example.com', 'linacastro', 'Lina', 'Castro', '091234567', '1994-09-12', '65897412', '$2y$10$eX...'),
('maria.garcia@example.com', 'mariagarcia', 'María', 'García', '098765432', '1985-10-20', '87654321', '$2y$10$eX...'),
('mauro@gmail.com', 'MauroR333', 'Mauro', 'Riela', NULL, NULL, NULL, '$2y$10$s3MmzlmL1AO4rMWfV.x/UOEXUI.kKt1yvEkvP7J8BLvy1acrDVSny'),
('pedro.sanchez@example.com', 'pedrosanchez', 'Pedro', 'Sánchez', '091234890', '1991-12-05', '99887766', '$2y$10$eX...'),
('roberto.morales@example.com', 'robertomorales', 'Roberto', 'Morales', '092334567', '1987-06-30', '15975346', '$2y$10$eX...'),
('sofia.rodriguez@example.com', 'sofiarodri', 'Sofía', 'Rodríguez', '091987654', '1995-08-25', '55667788', '$2y$10$eX...');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `visita`
--

CREATE TABLE `visita` (
  `email` varchar(255) NOT NULL,
  `idProducto` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `visita`
--

INSERT INTO `visita` (`email`, `idProducto`, `fecha`) VALUES
('juan@gmail.com', 1, '2024-11-05 10:14:28'),
('juan@gmail.com', 2, '2024-11-05 10:05:05'),
('juan@gmail.com', 3, '2024-11-05 10:14:21'),
('juan@gmail.com', 4, '2024-11-05 10:14:25'),
('mauro@gmail.com', 2, '2024-11-05 10:41:39'),
('mauro@gmail.com', 3, '2024-11-05 10:41:46'),
('mauro@gmail.com', 12, '2024-11-05 10:41:40'),
('mauro@gmail.com', 17, '2024-11-05 10:41:47'),
('mauro@gmail.com', 20, '2024-11-05 10:41:38'),
('mauro@gmail.com', 22, '2024-11-05 10:41:51');

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vistacarritopreview`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vistacarritopreview` (
`idProducto` int(11)
,`nombre` varchar(150)
,`precio` decimal(10,2) unsigned
,`stock` int(10) unsigned
,`email` varchar(255)
,`cantidad` int(10) unsigned
,`descuento` decimal(5,0)
,`precioDescuento` decimal(10,2)
,`precioFinal` decimal(10,2)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vistadetalles`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vistadetalles` (
`idPedido` int(11)
,`idProducto` int(11)
,`cantidad` int(10) unsigned
,`precioHistorico` decimal(10,2) unsigned
,`estado` enum('preparando','entregado')
,`nombre` varchar(150)
,`email` varchar(255)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vistaestadisticasmes`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vistaestadisticasmes` (
`rut` varchar(20)
,`ventasMes` decimal(32,0)
,`ingresosMes` decimal(42,2)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vistapedidomonto`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vistapedidomonto` (
`idPedido` int(11)
,`estado` enum('procesando','pagado','entregado')
,`medioPago` enum('PayPal','MercadoPago','Local')
,`direccion` varchar(60)
,`fecha` timestamp
,`email` varchar(255)
,`montoTotal` decimal(42,2)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vistapedidosempresa`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vistapedidosempresa` (
`usuario` varchar(255)
,`idProducto` int(11)
,`nombre` varchar(150)
,`fecha` timestamp
,`cantidad` int(10) unsigned
,`montoTotal` decimal(20,2) unsigned
,`estado` enum('preparando','entregado')
,`rut` varchar(20)
,`idPedido` int(11)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vistapedidospendientes`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vistapedidospendientes` (
`rut` varchar(20)
,`pedidospendientes` bigint(21)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vistaproducto`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vistaproducto` (
`idProducto` int(11)
,`nombre` varchar(150)
,`descripcion` varchar(500)
,`precio` decimal(10,2) unsigned
,`stock` int(10) unsigned
,`estado` enum('Nuevo','Renovado','Usado')
,`marca` varchar(100)
,`oculto` tinyint(1)
,`cantidadVendida` decimal(32,0)
,`descuento` decimal(5,0)
,`promedioCalificacion` decimal(6,5)
,`precioDescuento` decimal(10,2)
);

-- --------------------------------------------------------

--
-- Estructura para la vista `vistacarritopreview`
--
DROP TABLE IF EXISTS `vistacarritopreview`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vistacarritopreview`  AS SELECT `p`.`idProducto` AS `idProducto`, `p`.`nombre` AS `nombre`, `p`.`precio` AS `precio`, `p`.`stock` AS `stock`, `c`.`email` AS `email`, `c`.`cantidad` AS `cantidad`, ifnull(max(`d`.`porcentaje`),0) AS `descuento`, cast(case when ifnull(max(`d`.`porcentaje`),0) > 0 then `p`.`precio` * (1 - max(`d`.`porcentaje`) / 100) else `p`.`precio` end as decimal(10,2)) AS `precioDescuento`, cast(case when ifnull(max(`d`.`porcentaje`),0) > 0 then `p`.`precio` * (1 - max(`d`.`porcentaje`) / 100) * `c`.`cantidad` else `p`.`precio` * `c`.`cantidad` end as decimal(10,2)) AS `precioFinal` FROM (((`producto` `p` left join `tiene` `t` on(`p`.`idProducto` = `t`.`idProducto`)) join `carrito` `c` on(`p`.`idProducto` = `c`.`idProducto`)) left join `descuento` `d` on(`t`.`idDescuento` = `d`.`idDescuento` and curdate() between `d`.`fechaInicio` and `d`.`fechaFin`)) WHERE `p`.`oculto` = 0 AND `p`.`stock` > 0 GROUP BY `p`.`idProducto`, `c`.`email` ;

-- --------------------------------------------------------

--
-- Estructura para la vista `vistadetalles`
--
DROP TABLE IF EXISTS `vistadetalles`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vistadetalles`  AS   (select `c`.`idPedido` AS `idPedido`,`c`.`idProducto` AS `idProducto`,`c`.`cantidad` AS `cantidad`,`c`.`precioHistorico` AS `precioHistorico`,`c`.`estado` AS `estado`,`p`.`nombre` AS `nombre`,`u`.`email` AS `email` from (((`contiene` `c` join `producto` `p` on(`p`.`idProducto` = `c`.`idProducto`)) join `pedido` `pe` on(`pe`.`idPedido` = `c`.`idPedido`)) join `usuario` `u` on(`pe`.`email` = `u`.`email`)))  ;

-- --------------------------------------------------------

--
-- Estructura para la vista `vistaestadisticasmes`
--
DROP TABLE IF EXISTS `vistaestadisticasmes`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vistaestadisticasmes`  AS SELECT `e`.`RUT` AS `rut`, ifnull(sum(`cont`.`cantidad`),0) AS `ventasMes`, ifnull(sum(`cont`.`cantidad` * `cont`.`precioHistorico`),0) AS `ingresosMes` FROM (((`empresa` `e` left join `producto` `p` on(`e`.`RUT` = `p`.`RUT`)) left join `contiene` `cont` on(`p`.`idProducto` = `cont`.`idProducto`)) left join `pedido` `d` on(`cont`.`idPedido` = `d`.`idPedido` and month(`d`.`fecha`) = month(curdate()) and year(`d`.`fecha`) = year(curdate()))) GROUP BY `e`.`RUT` ;

-- --------------------------------------------------------

--
-- Estructura para la vista `vistapedidomonto`
--
DROP TABLE IF EXISTS `vistapedidomonto`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vistapedidomonto`  AS SELECT `p`.`idPedido` AS `idPedido`, `p`.`estado` AS `estado`, `p`.`medioPago` AS `medioPago`, `p`.`direccion` AS `direccion`, `p`.`fecha` AS `fecha`, `p`.`email` AS `email`, sum(`c`.`precioHistorico` * `c`.`cantidad`) AS `montoTotal` FROM (`pedido` `p` left join `contiene` `c` on(`p`.`idPedido` = `c`.`idPedido`)) GROUP BY `p`.`idPedido` ;

-- --------------------------------------------------------

--
-- Estructura para la vista `vistapedidosempresa`
--
DROP TABLE IF EXISTS `vistapedidosempresa`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vistapedidosempresa`  AS SELECT `p`.`email` AS `usuario`, `cont`.`idProducto` AS `idProducto`, `prod`.`nombre` AS `nombre`, `p`.`fecha` AS `fecha`, `cont`.`cantidad` AS `cantidad`, `cont`.`precioHistorico`* `cont`.`cantidad` AS `montoTotal`, `cont`.`estado` AS `estado`, `prod`.`RUT` AS `rut`, `p`.`idPedido` AS `idPedido` FROM ((`contiene` `cont` join `pedido` `p` on(`cont`.`idPedido` = `p`.`idPedido`)) join `producto` `prod` on(`cont`.`idProducto` = `prod`.`idProducto`)) ;

-- --------------------------------------------------------

--
-- Estructura para la vista `vistapedidospendientes`
--
DROP TABLE IF EXISTS `vistapedidospendientes`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vistapedidospendientes`  AS SELECT `e`.`RUT` AS `rut`, ifnull(count(`cont`.`idProducto`),0) AS `pedidospendientes` FROM ((`empresa` `e` left join `producto` `p` on(`e`.`RUT` = `p`.`RUT`)) left join `contiene` `cont` on(`p`.`idProducto` = `cont`.`idProducto` and `cont`.`estado` = 'preparando')) GROUP BY `e`.`RUT` ;

-- --------------------------------------------------------

--
-- Estructura para la vista `vistaproducto`
--
DROP TABLE IF EXISTS `vistaproducto`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vistaproducto`  AS SELECT `p`.`idProducto` AS `idProducto`, `p`.`nombre` AS `nombre`, `p`.`descripcion` AS `descripcion`, `p`.`precio` AS `precio`, `p`.`stock` AS `stock`, `p`.`estado` AS `estado`, `p`.`marca` AS `marca`, `p`.`oculto` AS `oculto`, ifnull(sum(`cont`.`cantidad`),0) AS `cantidadVendida`, ifnull(max(`d`.`porcentaje`),0) AS `descuento`, ifnull(avg(`c`.`calificacion`),0) AS `promedioCalificacion`, cast(ifnull(`p`.`precio` * (1 - `d`.`porcentaje` / 100),`p`.`precio`) as decimal(10,2)) AS `precioDescuento` FROM ((((`producto` `p` left join `comenta` `c` on(`p`.`idProducto` = `c`.`idProducto`)) left join `contiene` `cont` on(`p`.`idProducto` = `cont`.`idProducto`)) left join `tiene` `t` on(`p`.`idProducto` = `t`.`idProducto`)) left join `descuento` `d` on(`t`.`idDescuento` = `d`.`idDescuento` and curdate() between `d`.`fechaInicio` and `d`.`fechaFin`)) GROUP BY `p`.`idProducto` ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `caracteristica`
--
ALTER TABLE `caracteristica`
  ADD PRIMARY KEY (`idProducto`,`nombre`,`valor`);

--
-- Indices de la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD PRIMARY KEY (`idProducto`,`email`),
  ADD KEY `email` (`email`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`idCategoria`);

--
-- Indices de la tabla `categoriza`
--
ALTER TABLE `categoriza`
  ADD PRIMARY KEY (`idCategoria`,`idProducto`),
  ADD KEY `categoriza_ibfk_2` (`idProducto`);

--
-- Indices de la tabla `comenta`
--
ALTER TABLE `comenta`
  ADD PRIMARY KEY (`email`,`idProducto`),
  ADD KEY `idProducto` (`idProducto`);

--
-- Indices de la tabla `contiene`
--
ALTER TABLE `contiene`
  ADD PRIMARY KEY (`idProducto`,`idPedido`) USING BTREE,
  ADD KEY `idProducto` (`idProducto`) USING BTREE,
  ADD KEY `contiene_ibfk_1` (`idPedido`);

--
-- Indices de la tabla `descuento`
--
ALTER TABLE `descuento`
  ADD PRIMARY KEY (`idDescuento`);

--
-- Indices de la tabla `direccion`
--
ALTER TABLE `direccion`
  ADD PRIMARY KEY (`email`,`direccion`) USING BTREE;

--
-- Indices de la tabla `empresa`
--
ALTER TABLE `empresa`
  ADD PRIMARY KEY (`RUT`);

--
-- Indices de la tabla `favorito`
--
ALTER TABLE `favorito`
  ADD PRIMARY KEY (`email`,`idProducto`),
  ADD KEY `favorito_ibfk_2` (`idProducto`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`idPedido`),
  ADD KEY `email` (`email`),
  ADD KEY `email_2` (`email`,`direccion`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`idProducto`),
  ADD KEY `RUT` (`RUT`);

--
-- Indices de la tabla `tiene`
--
ALTER TABLE `tiene`
  ADD PRIMARY KEY (`idDescuento`,`idProducto`) USING BTREE,
  ADD KEY `tiene_ibfk_2` (`idProducto`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`email`),
  ADD UNIQUE KEY `Nickname` (`usuario`),
  ADD UNIQUE KEY `CI` (`ci`);

--
-- Indices de la tabla `visita`
--
ALTER TABLE `visita`
  ADD PRIMARY KEY (`email`,`idProducto`),
  ADD KEY `visita_ibfk_2` (`idProducto`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `idCategoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `descuento`
--
ALTER TABLE `descuento`
  MODIFY `idDescuento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `idPedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `idProducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `caracteristica`
--
ALTER TABLE `caracteristica`
  ADD CONSTRAINT `caracteristica_ibfk_1` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `carrito_ibfk_2` FOREIGN KEY (`email`) REFERENCES `usuario` (`email`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `categoriza`
--
ALTER TABLE `categoriza`
  ADD CONSTRAINT `categoriza_ibfk_1` FOREIGN KEY (`idCategoria`) REFERENCES `categoria` (`idCategoria`) ON DELETE CASCADE,
  ADD CONSTRAINT `categoriza_ibfk_2` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`) ON DELETE CASCADE;

--
-- Filtros para la tabla `comenta`
--
ALTER TABLE `comenta`
  ADD CONSTRAINT `comenta_ibfk_1` FOREIGN KEY (`email`) REFERENCES `usuario` (`email`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comenta_ibfk_2` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `contiene`
--
ALTER TABLE `contiene`
  ADD CONSTRAINT `contiene_ibfk_1` FOREIGN KEY (`idPedido`) REFERENCES `pedido` (`idPedido`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `contiene_ibfk_2` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `direccion`
--
ALTER TABLE `direccion`
  ADD CONSTRAINT `direccion_ibfk_1` FOREIGN KEY (`email`) REFERENCES `usuario` (`email`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `favorito`
--
ALTER TABLE `favorito`
  ADD CONSTRAINT `favorito_ibfk_1` FOREIGN KEY (`email`) REFERENCES `usuario` (`email`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `favorito_ibfk_2` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`email`) REFERENCES `usuario` (`email`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pedido_ibfk_2` FOREIGN KEY (`email`,`direccion`) REFERENCES `direccion` (`email`, `direccion`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`RUT`) REFERENCES `empresa` (`RUT`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tiene`
--
ALTER TABLE `tiene`
  ADD CONSTRAINT `tiene_ibfk_1` FOREIGN KEY (`idDescuento`) REFERENCES `descuento` (`idDescuento`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tiene_ibfk_2` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `visita`
--
ALTER TABLE `visita`
  ADD CONSTRAINT `visita_ibfk_2` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `visita_ibfk_3` FOREIGN KEY (`email`) REFERENCES `usuario` (`email`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
