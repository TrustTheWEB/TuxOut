-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-10-2024 a las 21:54:12
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito`
--

CREATE TABLE `carrito` (
  `email` varchar(255) NOT NULL,
  `idProducto` int(11) NOT NULL,
  `cantidad` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `idCategoria` int(11) NOT NULL,
  `nombre` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoriza`
--

CREATE TABLE `categoriza` (
  `idCategoria` int(11) NOT NULL,
  `idProducto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `cantidad` int(10) UNSIGNED NOT NULL,
  `precioHistorico` decimal(10,2) UNSIGNED NOT NULL,
  `estado` enum('preparando','entregado') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `contiene`
--

INSERT INTO `contiene` (`idPedido`, `idProducto`, `cantidad`, `precioHistorico`, `estado`) VALUES
(11, 2, 1, 299.49, 'preparando'),
(12, 2, 1, 299.49, 'preparando'),
(13, 2, 1, 299.49, 'preparando'),
(14, 2, 1, 299.49, 'preparando'),
(11, 8, 1, 120.25, 'preparando'),
(12, 8, 1, 120.25, 'preparando'),
(13, 8, 1, 120.25, 'preparando'),
(14, 8, 1, 120.25, 'preparando'),
(11, 14, 2, 25.50, 'preparando'),
(12, 14, 2, 25.50, 'preparando'),
(13, 14, 2, 25.50, 'preparando'),
(14, 14, 2, 25.50, 'preparando'),
(11, 17, 2, 89.99, 'preparando'),
(12, 17, 2, 89.99, 'preparando'),
(13, 17, 2, 89.99, 'preparando'),
(14, 17, 2, 89.99, 'preparando'),
(10, 18, 1, 199.00, 'preparando');

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
) ;

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
('juan@gmail.com', 'Calle 8899'),
('juan@gmail.com', 'Rambla Sur 112');

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
('123412341', 'Empresa B', '22028090', 'Rambla Sur 668', 'empresita@gmail.com', '$2y$10$uNHaQKwbbcClcEs8pGbPLOTPHEsNbzm8zVaYT.yD8g6ITFAVRaxuG', 0);

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
('juan@gmail.com', 7),
('juan@gmail.com', 8),
('juan@gmail.com', 12),
('juan@gmail.com', 14),
('juan@gmail.com', 17);

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
(4, 'procesando', 'PayPal', 'Calle 8899', '2024-10-29 20:08:33', 'juan@gmail.com'),
(10, 'procesando', 'PayPal', 'Rambla Sur 112', '2024-10-29 20:42:49', 'juan@gmail.com'),
(11, 'procesando', 'MercadoPago', 'Rambla Sur 112', '2024-10-29 20:43:47', 'juan@gmail.com'),
(12, 'procesando', 'MercadoPago', 'Rambla Sur 112', '2024-10-29 20:49:30', 'juan@gmail.com'),
(13, 'procesando', 'PayPal', 'Rambla Sur 112', '2024-10-29 20:50:26', 'juan@gmail.com'),
(14, 'procesando', 'PayPal', 'Rambla Sur 112', '2024-10-29 20:51:20', 'juan@gmail.com');

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
(1, '123412341', 'Producto A', 'Descripción del Producto A', 199.99, 8, 'Nuevo', 'Marca A', 0),
(2, '123412341', 'Producto B', 'Descripción del Producto B que es un poco más larga pero dentro del límite.', 299.49, 7, 'Usado', 'Marca B', 0),
(3, '123412341', 'Producto C', NULL, 99.95, 200, 'Renovado', 'Marca C', 0),
(4, '123412341', 'Producto D', 'Este es un producto usado de buena calidad.', 59.00, 25, 'Usado', 'Marca D', 0),
(5, '123412341', 'Producto E', NULL, 1999.99, 5, 'Nuevo', 'Marca E', 0),
(6, '123412341', 'Producto F', 'Este es un producto nuevo, recién salido al mercado.', 499.50, 80, 'Nuevo', 'Marca F', 1),
(7, '123412341', 'Producto G', NULL, 29.99, 150, 'Renovado', 'Marca G', 0),
(8, '123412341', 'Producto H', 'Descripción detallada del Producto H, que tiene características únicas.', 120.25, 297, 'Usado', 'Marca H', 0),
(9, '123412341', 'Producto I', 'Un producto de alta calidad.', 10.99, 1000, 'Nuevo', 'Marca I', 0),
(10, '123412341', 'Producto J', NULL, 75.49, 500, 'Nuevo', 'Marca J', 1),
(11, '123412341', 'Producto K', 'Descripción muy detallada del Producto K.', 88.75, 20, 'Renovado', 'Marca K', 0),
(12, '123412341', 'Producto L', 'Un producto en excelente estado.', 500.00, 60, 'Usado', 'Marca L', 0),
(13, '123412341', 'Producto M', NULL, 750.00, 30, 'Nuevo', 'Marca M', 1),
(14, '123412341', 'Producto N', 'Producto renovado con garantía.', 25.50, 394, 'Renovado', 'Marca N', 0),
(15, '123412341', 'Producto O', 'Descripción breve del Producto O.', 450.00, 10, 'Usado', 'Marca O', 0),
(16, '123412341', 'Producto P', 'Un producto muy popular entre los clientes.', 100.00, 900, 'Nuevo', 'Marca P', 1),
(17, '123412341', 'Producto Q', NULL, 89.99, 94, 'Nuevo', 'Marca Q', 0),
(18, '123412341', 'Producto R', 'Descripción completa del Producto R.', 199.00, 45, 'Usado', 'Marca R', 0),
(19, '123412341', 'Producto S', 'Producto renovado con grandes descuentos.', 349.50, 75, 'Renovado', 'Marca S', 1),
(20, '123412341', 'Producto T', NULL, 499.99, 10, 'Nuevo', 'Marca T', 0);

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
('juan@gmail.com', 'Juan400', 'Juan', 'Pettinari', '099444555', '2003-02-21', '56748026', '$2y$10$x8Ehm1mLUAjzk825NoYV2.FcLsWAXiTmaS.gUyUOY8tMLyVBHEWLK');

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
('juan@gmail.com', 1, '2024-10-28 02:12:08'),
('juan@gmail.com', 2, '2024-10-28 01:31:16'),
('juan@gmail.com', 3, '2024-10-27 22:54:32'),
('juan@gmail.com', 4, '2024-10-29 12:05:59'),
('juan@gmail.com', 5, '2024-10-27 22:54:29'),
('juan@gmail.com', 8, '2024-10-27 23:05:18'),
('juan@gmail.com', 18, '2024-10-29 12:06:30');

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

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vistacarritopreview`  AS SELECT `p`.`idProducto` AS `idProducto`, `p`.`nombre` AS `nombre`, `p`.`precio` AS `precio`, `p`.`stock` AS `stock`, `c`.`email` AS `email`, `c`.`cantidad` AS `cantidad`, ifnull(max(`d`.`porcentaje`),0) AS `descuento`, cast(case when ifnull(max(`d`.`porcentaje`),0) > 0 then `p`.`precio` * (1 - max(`d`.`porcentaje`) / 100) * `c`.`cantidad` else `p`.`precio` * `c`.`cantidad` end as decimal(10,2)) AS `precioFinal` FROM (((`producto` `p` left join `tiene` `t` on(`p`.`idProducto` = `t`.`idProducto`)) left join `carrito` `c` on(`p`.`idProducto` = `c`.`idProducto`)) left join `descuento` `d` on(`t`.`idDescuento` = `d`.`idDescuento` and curdate() between `d`.`fechaInicio` and `d`.`fechaFin`)) WHERE `p`.`oculto` = 0 AND `p`.`stock` > 0 GROUP BY `p`.`idProducto`, `c`.`email` ;

-- --------------------------------------------------------

--
-- Estructura para la vista `vistadetalles`
--
DROP TABLE IF EXISTS `vistadetalles`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vistadetalles`  AS   (select `c`.`idPedido` AS `idPedido`,`c`.`idProducto` AS `idProducto`,`c`.`cantidad` AS `cantidad`,`c`.`precioHistorico` AS `precioHistorico`,`c`.`estado` AS `estado`,`p`.`nombre` AS `nombre`,`u`.`email` AS `email` from (((`contiene` `c` join `producto` `p` on(`p`.`idProducto` = `c`.`idProducto`)) join `pedido` `pe` on(`pe`.`idPedido` = `c`.`idPedido`)) join `usuario` `u` on(`pe`.`email` = `u`.`email`)))  ;

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
  MODIFY `idCategoria` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `descuento`
--
ALTER TABLE `descuento`
  MODIFY `idDescuento` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `idPedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `idProducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

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
