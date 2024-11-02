-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 31-10-2024 a las 15:42:41
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
(2, 7, 1, 344.00, 'preparando');

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
('example@gmail.com', 'Paloma Tompkinson 7777 esq. Palomo');

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
('12345678', 'Empresa', '9998887774', 'Calle 8000', 'emailempresa5@empresa.com', '$2y$10$j2rbZiUHtaFBATQXYsA06.bSvCahPwu3pY18X1im2TMJrJYd8Zo1i', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favorito`
--

CREATE TABLE `favorito` (
  `email` varchar(255) NOT NULL,
  `idProducto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(2, 'procesando', 'PayPal', 'Paloma Tompkinson 7777 esq. Palomo', '2024-10-31 13:04:10', 'example@gmail.com');

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
(7, '12345678', 'Google Pixel', 'Celular de Google 2022', 344.00, 32, 'Nuevo', 'Google', 0);

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
('example@gmail.com', 'JuanP', 'Juan', 'Pettinari', '098766554', '2002-02-20', '56605252', '$2y$10$ETEnfz4WFPnsPo/7RDvyj.kWOBmpOHtNqwNO79cqGlusz2np9qbL.');

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
('example@gmail.com', 7, '2024-10-31 14:07:07');

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
  MODIFY `idPedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `idProducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

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
