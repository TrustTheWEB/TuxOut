-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-10-2024 a las 12:33:57
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

CREATE DATABASE IF NOT EXISTS tuxout;
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
('juan@gmail.com', 31, 2);

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
(2, 'Ropa');

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
(1, 25),
(1, 26),
(1, 28),
(1, 30),
(1, 31),
(2, 24),
(2, 27),
(2, 29);

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contiene`
--

CREATE TABLE `contiene` (
  `idPedido` int(11) NOT NULL,
  `idProducto` int(11) NOT NULL,
  `cantidad` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(1, 80, '2024-10-10', '2025-10-10', 'Descuento');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `direccion`
--

CREATE TABLE `direccion` (
  `email` varchar(255) NOT NULL,
  `direccion` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
('123412341', 'Empresa', '099888333', 'Rambla Sur 668', 'empresita@gmail.com', '$2y$10$1DdcU2xZeYG79snHuhkqfetIcTF8/N6vZod.AeB.BJuQn0HuKEGIO', 1);

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
('juan@gmail.com', 34),
('juan@gmail.com', 37);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `idPedido` int(11) NOT NULL,
  `estado` enum('procesando','pagado','entregado') NOT NULL,
  `medioPago` enum('PayPal','MercadoPago','','') NOT NULL,
  `montoTotal` int(10) UNSIGNED NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(24, '123412341', 'Producto B', 'Descripción del Producto B que es un poco más larga pero dentro del límite.', 299.49, 50, 'Usado', 'Marca B', 0),
(25, '123412341', 'Producto C', NULL, 99.95, 200, 'Renovado', 'Marca C', 0),
(26, '123412341', 'Producto D', 'Este es un producto usado de buena calidad.', 59.00, 25, 'Usado', 'Marca D', 0),
(27, '123412341', 'Producto E', NULL, 1999.99, 5, 'Nuevo', 'Marca E', 0),
(28, '123412341', 'Producto F', 'Este es un producto nuevo, recién salido al mercado.', 499.50, 80, 'Nuevo', 'Marca F', 0),
(29, '123412341', 'Producto G', NULL, 29.99, 150, 'Renovado', 'Marca G', 0),
(30, '123412341', 'Producto H', 'Descripción detallada del Producto H, que tiene características únicas.', 120.25, 300, 'Usado', 'Marca H', 0),
(31, '123412341', 'Producto I', 'Un producto de alta calidad.', 10.99, 1000, 'Nuevo', 'Marca I', 0),
(32, '123412341', 'Producto J', NULL, 75.49, 500, 'Nuevo', 'Marca J', 0),
(33, '123412341', 'Producto K', 'Descripción muy detallada del Producto K.', 88.75, 20, 'Renovado', 'Marca K', 0),
(34, '123412341', 'Producto L', 'Un producto en excelente estado.', 500.00, 60, 'Usado', 'Marca L', 0),
(35, '123412341', 'Producto M', NULL, 750.00, 30, 'Nuevo', 'Marca M', 0),
(36, '123412341', 'Producto N', 'Producto renovado con garantía.', 25.50, 400, 'Renovado', 'Marca N', 0),
(37, '123412341', 'Producto O', 'Descripción breve del Producto O.', 450.00, 10, 'Usado', 'Marca O', 0),
(38, '123412341', 'Producto P', 'Un producto muy popular entre los clientes.', 100.00, 900, 'Nuevo', 'Marca P', 0),
(39, '123412341', 'Producto Q', NULL, 89.99, 100, 'Nuevo', 'Marca Q', 0),
(40, '123412341', 'Producto R', 'Descripción completa del Producto R.', 199.00, 45, 'Usado', 'Marca R', 0),
(41, '123412341', 'Producto S', 'Producto renovado con grandes descuentos.', 349.50, 75, 'Renovado', 'Marca S', 0),
(42, '123412341', 'Producto T', NULL, 499.99, 10, 'Nuevo', 'Marca T', 0);

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
(26, 1);

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
('a@a.com', 'Mesi', 'Freso', 'Leso', NULL, NULL, NULL, '$2y$10$h4fm3noQoInMdpM9JoFyUuL8Ae8OJjrGDiykao3udQw6IeGTeEiHy'),
('juan@gmail.com', 'Juan6', 'Juan', 'Pettinari', '099888555', '2002-02-21', '12345672', '$2y$10$X9vsKLEuj8Eb7.IDdPGSzugr3jTDtXYTbFZBAUSzqESuxDMFj.tlK'),
('laura.martinez@example.com', 'FFlores9', 'Florencia', 'Flores', '099333444', '2003-02-22', '12345678', '$2y$10$zU9ga/L3K7PHWQw8wvxPWui0sKYeVBD5G38BhMM9dLxIsN.PIljiu'),
('mauro@gmail.com', 'MauroR33', 'Mauro', 'Riela', NULL, NULL, NULL, '$2y$10$s0m5UU3WTDeaYVejYOiTQeA1kQ5S6MKzfaqeSDVfa7zL/jPO.MYqG'),
('rodrigo@gmail.com', 'KazRevan', 'Rodrigo', 'Estevez', NULL, NULL, NULL, '$2y$10$m8VGoCvZ2xJehdyFh1AEjOe6xqxCfjAhdyr2raA4jfmtI7Sfr3A2q');

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
('juan@gmail.com', 27, '2024-10-23 01:58:06'),
('juan@gmail.com', 29, '2024-10-23 02:03:25'),
('juan@gmail.com', 39, '2024-10-24 04:36:11'),
('juan@gmail.com', 40, '2024-10-23 01:40:20');

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
,`cantidadVendida` decimal(32,0)
,`descuento` decimal(5,0)
,`promedioCalificacion` decimal(6,5)
);

-- --------------------------------------------------------

--
-- Estructura para la vista `vistacarritopreview`
--
DROP TABLE IF EXISTS `vistacarritopreview`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vistacarritopreview`  AS SELECT `p`.`idProducto` AS `idProducto`, `p`.`nombre` AS `nombre`, `p`.`precio` AS `precio`, `p`.`stock` AS `stock`, `c`.`email` AS `email`, `c`.`cantidad` AS `cantidad`, ifnull(max(`d`.`porcentaje`),0) AS `descuento` FROM (((`producto` `p` left join `tiene` `t` on(`p`.`idProducto` = `t`.`idProducto`)) left join `carrito` `c` on(`p`.`idProducto` = `c`.`idProducto`)) left join `descuento` `d` on(`t`.`idDescuento` = `d`.`idDescuento` and curdate() between `d`.`fechaInicio` and `d`.`fechaFin`)) WHERE `p`.`oculto` = 0 AND `p`.`stock` > 0 GROUP BY `p`.`idProducto`, `c`.`email` ;

-- --------------------------------------------------------

--
-- Estructura para la vista `vistaproducto`
--
DROP TABLE IF EXISTS `vistaproducto`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vistaproducto`  AS SELECT `p`.`idProducto` AS `idProducto`, `p`.`nombre` AS `nombre`, `p`.`descripcion` AS `descripcion`, `p`.`precio` AS `precio`, `p`.`stock` AS `stock`, `p`.`estado` AS `estado`, `p`.`marca` AS `marca`, ifnull(sum(`cont`.`cantidad`),0) AS `cantidadVendida`, ifnull(max(`d`.`porcentaje`),0) AS `descuento`, ifnull(avg(`c`.`calificacion`),0) AS `promedioCalificacion` FROM ((((`producto` `p` left join `comenta` `c` on(`p`.`idProducto` = `c`.`idProducto`)) left join `contiene` `cont` on(`p`.`idProducto` = `cont`.`idProducto`)) left join `tiene` `t` on(`p`.`idProducto` = `t`.`idProducto`)) left join `descuento` `d` on(`t`.`idDescuento` = `d`.`idDescuento` and curdate() between `d`.`fechaInicio` and `d`.`fechaFin`)) WHERE `p`.`oculto` = 0 AND `p`.`stock` > 0 GROUP BY `p`.`idProducto` ;

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
  MODIFY `idCategoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `descuento`
--
ALTER TABLE `descuento`
  MODIFY `idDescuento` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `idPedido` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `idProducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

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
  ADD CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`email`) REFERENCES `usuario` (`email`) ON DELETE CASCADE ON UPDATE CASCADE;

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
