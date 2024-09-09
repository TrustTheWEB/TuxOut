-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-09-2024 a las 22:55:39
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
(1, 'Color', 'Negro'),
(2, 'RAM', '16GB');

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
(2, 'Ropa'),
(3, 'Hogar');

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
(2, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contiene`
--

CREATE TABLE `contiene` (
  `idPedido` int(11) NOT NULL,
  `idProducto` int(11) NOT NULL,
  `cantidad` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `contiene`
--

INSERT INTO `contiene` (`idPedido`, `idProducto`, `cantidad`) VALUES
(1, 1, 1);

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
) ;

--
-- Volcado de datos para la tabla `descuento`
--

INSERT INTO `descuento` (`idDescuento`, `porcentaje`, `fechaInicio`, `fechaFin`, `motivo`) VALUES
(1, 10, '2024-09-01', '2024-09-30', 'Descuento por lanzamiento'),
(2, 20, '2024-09-01', '2024-09-15', 'Descuento por fin de temporada');

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
('juan.perez@example.com', 'Calle Falsa 123'),
('laura.martinez@example.com', 'Rambla Sur 678, Montevideo'),
('luis.fernandez@example.com', 'Calle 45, Esquina 23, Montevideo'),
('maria.gonzalez@example.com', 'Av. Libertador 123, Montevideo'),
('pedro.silva@example.com', 'Plaza Independencia 456, Montevideo'),
('sofia.ramos@example.com', 'Av. 18 de Julio 789, Montevideo');

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
  `contraseña` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empresa`
--

INSERT INTO `empresa` (`RUT`, `nombre`, `telefono`, `direccion`, `email`, `contraseña`) VALUES
('12345678-9', 'Tech Solutions', '123456789', 'Av. Principal 123', 'contacto@techsolutions.com', '$2y$10$EjXblslzWz/HM8YjWZKm5Ov/KNhP1RzG4/UZH6sRM2Xv09FdcVnBi');

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
('juan.perez@example.com', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `idPedido` int(11) NOT NULL,
  `estado` enum('carrito','procesando','pagado','entregado') NOT NULL,
  `medioPago` enum('PayPal','MercadoPago','','') NOT NULL,
  `montoTotal` int(10) UNSIGNED NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedido`
--

INSERT INTO `pedido` (`idPedido`, `estado`, `medioPago`, `montoTotal`, `fecha`, `email`) VALUES
(1, 'carrito', 'PayPal', 29999, '2024-09-09 15:00:00', 'juan.perez@example.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `idProducto` int(11) NOT NULL,
  `RUT` varchar(20) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  `precio` int(10) UNSIGNED NOT NULL,
  `stock` int(10) UNSIGNED NOT NULL,
  `estado` enum('Nuevo','Renovado','Usado') NOT NULL,
  `marca` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`idProducto`, `RUT`, `nombre`, `descripcion`, `precio`, `stock`, `estado`, `marca`) VALUES
(1, '12345678-9', 'Smartphone XYZ', 'Smartphone con 64GB de almacenamiento', 29999, 50, 'Nuevo', 'TechBrand'),
(2, '12345678-9', 'Laptop ABC', 'Laptop con 16GB RAM y 512GB SSD', 79999, 30, 'Nuevo', 'TechBrand');

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
(1, 1),
(2, 2);

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
  `ci` varchar(15) NOT NULL,
  `contraseña` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`email`, `usuario`, `nombre`, `apellido`, `telefono`, `fechaNac`, `ci`, `contraseña`) VALUES
('juan.perez@example.com', 'juanp', 'Juan', 'Pérez', '091234567', '1985-07-12', '12345678', '$2y$10$E2sVY30q.V8Ti1yOpkGFqOQ7GlfwudBp8oo8ZdZpVxUZWXIXB3AXi'),
('laura.martinez@example.com', 'lauramartinez', 'Laura', 'Martínez', '097123456', '1995-05-25', '22334455', '$2y$10$huRz5c3QW7EZ69YgD8hHj.H7RZyIAjS7P3S79GR9TXGFU4LBKvqK'),
('luis.fernandez@example.com', 'luisfernandez', 'Luis', 'Fernández', '098765432', '1982-12-10', '11223344', '$2y$10$eKEmY6D4tlbo1mB5X9XYu.tVRQs1aLJp6cOxWaXrOxCpz0uqjpzNO'),
('maria.gonzalez@example.com', 'mariagonzalez', 'María', 'González', '099654321', '1990-07-20', '87654321', '$2y$10$KjHImHGcyYgRMkjkIJ02QOi/aFqNkm/2Bs2OmeFG3zjpYTVK8y6MS'),
('pedro.silva@example.com', 'pedrosilva', 'Pedro', 'Silva', '096543210', '1988-09-30', '33445566', '$2y$10$h3BVmIL1sR4ZAGLoD2ohdO/9txayHqznwUB8CnQbwl74e6J3PTcO'),
('sofia.ramos@example.com', 'sofiaramos', 'Sofía', 'Ramos', '095678901', '1992-04-10', '44556677', '$2y$10$6LWhXvSh5DP6sF7g2tjFhO6X0M0Bh8lsb.kV2/jG2PvOC2tFlZP0G');

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
('juan.perez@example.com', 1, '2024-09-09 15:00:00');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `caracteristica`
--
ALTER TABLE `caracteristica`
  ADD PRIMARY KEY (`idProducto`,`nombre`,`valor`);

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
  ADD KEY `email` (`email`);

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
  MODIFY `idCategoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `descuento`
--
ALTER TABLE `descuento`
  MODIFY `idDescuento` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `idPedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `idProducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `caracteristica`
--
ALTER TABLE `caracteristica`
  ADD CONSTRAINT `caracteristica_ibfk_1` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `categoriza`
--
ALTER TABLE `categoriza`
  ADD CONSTRAINT `categoriza_ibfk_1` FOREIGN KEY (`idCategoria`) REFERENCES `categoria` (`idCategoria`) ON DELETE CASCADE,
  ADD CONSTRAINT `categoriza_ibfk_2` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`) ON DELETE CASCADE;

--
-- Filtros para la tabla `contiene`
--
ALTER TABLE `contiene`
  ADD CONSTRAINT `contiene_ibfk_1` FOREIGN KEY (`idPedido`) REFERENCES `pedido` (`idPedido`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `contiene_ibfk_2` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`) ON DELETE NO ACTION ON UPDATE NO ACTION;

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
  ADD CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`email`) REFERENCES `usuario` (`email`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`RUT`) REFERENCES `empresa` (`RUT`) ON DELETE NO ACTION ON UPDATE NO ACTION;

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
