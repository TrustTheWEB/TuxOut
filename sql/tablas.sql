CREATE TABLE `caracteristica` (
  `idProducto` int(11) NOT NULL,
  `NomCaracteristica` varchar(20) NOT NULL,
  `ValorCaracteristica` varchar(40) NOT NULL,
  PRIMARY KEY (`idProducto`,`NomCaracteristica`,`ValorCaracteristica`),
  CONSTRAINT `caracteristica_ibfk_1` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `categoria` (
  `idProducto` int(11) NOT NULL,
  `Categoria` varchar(20) NOT NULL,
  PRIMARY KEY (`idProducto`,`Categoria`),
  CONSTRAINT `categoria_ibfk_1` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `contiene` (
  `idPedido` int(11) NOT NULL,
  `idProducto` int(11) NOT NULL,
  `Cantidad` int(10) unsigned NOT NULL,
  PRIMARY KEY (`idProducto`,`idPedido`) USING BTREE,
  KEY `idPedido` (`idPedido`),
  KEY `idProducto` (`idProducto`) USING BTREE,
  CONSTRAINT `contiene_ibfk_1` FOREIGN KEY (`idPedido`) REFERENCES `pedido` (`idPedido`),
  CONSTRAINT `contiene_ibfk_2` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `descuento` (
  `idDescuento` int(11) NOT NULL AUTO_INCREMENT,
  `Porcentaje` smallint(5) unsigned NOT NULL,
  `FechaInicio` date NOT NULL,
  `FechaFin` date NOT NULL,
  `Motivo` varchar(40) NOT NULL,
  PRIMARY KEY (`idDescuento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `direccion` (
  `Email` varchar(255) NOT NULL,
  `Direccion` varchar(60) NOT NULL,
  PRIMARY KEY (`Email`),
  CONSTRAINT `direccion_ibfk_1` FOREIGN KEY (`Email`) REFERENCES `usuario` (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `empresa` (
  `RUT` varchar(20) NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `Teléfono` varchar(9) NOT NULL,
  `Dirección` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Contraseña` varchar(255) NOT NULL,
  PRIMARY KEY (`RUT`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `favorito` (
  `Email` varchar(255) NOT NULL,
  `idProducto` int(11) NOT NULL,
  PRIMARY KEY (`Email`,`idProducto`),
  KEY `idProducto` (`idProducto`),
  CONSTRAINT `favorito_ibfk_1` FOREIGN KEY (`Email`) REFERENCES `usuario` (`Email`),
  CONSTRAINT `favorito_ibfk_2` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `pedido` (
  `idPedido` int(11) NOT NULL AUTO_INCREMENT,
  `Estado` enum('carrito','procesando','pagado','entregado') NOT NULL,
  `MedioPago` enum('PayPal','MercadoPago','','') NOT NULL,
  `MontoTotal` int(10) unsigned NOT NULL,
  `Fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `Email` varchar(255) NOT NULL,
  PRIMARY KEY (`idPedido`),
  KEY `Email` (`Email`),
  CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`Email`) REFERENCES `usuario` (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `producto` (
  `idProducto` int(11) NOT NULL AUTO_INCREMENT,
  `RUT` varchar(20) NOT NULL,
  `Nombre` varchar(150) NOT NULL,
  `Descripción` varchar(500) DEFAULT NULL,
  `Precio` int(10) unsigned NOT NULL,
  `Stock` int(10) unsigned NOT NULL,
  `Estado` enum('Nuevo','Renovado','Usado') NOT NULL,
  `Marca` varchar(100) NOT NULL,
  PRIMARY KEY (`idProducto`),
  KEY `RUT` (`RUT`),
  CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`RUT`) REFERENCES `empresa` (`RUT`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `tiene` (
  `idProducto` int(11) NOT NULL,
  `idDescuento` int(11) NOT NULL,
  PRIMARY KEY (`idDescuento`,`idProducto`) USING BTREE,
  KEY `idProducto` (`idProducto`),
  CONSTRAINT `tiene_ibfk_1` FOREIGN KEY (`idDescuento`) REFERENCES `descuento` (`idDescuento`),
  CONSTRAINT `tiene_ibfk_2` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `usuario` (
  `Email` varchar(255) NOT NULL,
  `Nickname` varchar(50) NOT NULL,
  `Nombre` varchar(30) NOT NULL,
  `Apellido` varchar(30) NOT NULL,
  `Teléfono` varchar(9) DEFAULT NULL,
  `FechaNac` date DEFAULT NULL,
  `CI` int(10) unsigned NOT NULL,
  `Contraseña` varchar(255) NOT NULL,
  PRIMARY KEY (`Email`),
  UNIQUE KEY `Nickname` (`Nickname`),
  UNIQUE KEY `CI` (`CI`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `visita` (
  `Email` varchar(255) NOT NULL,
  `idProducto` int(11) NOT NULL,
  `Fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`Email`,`idProducto`),
  KEY `idProducto` (`idProducto`),
  CONSTRAINT `visita_ibfk_1` FOREIGN KEY (`Email`) REFERENCES `usuario` (`Email`),
  CONSTRAINT `visita_ibfk_2` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


