CREATE DATABASE IF NOT EXISTS tuxout_backoffice;
USE tuxout_backoffice;

CREATE TABLE `admin` (
  `usuario` varchar(30) NOT NULL,
  `contraseña` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `admin` (`usuario`, `contraseña`) VALUES
('Administrador1', '$2y$10$oUzSq9q1dKnJm1RkJHvt0.hiJcoGagvQur7xHAfsdi.N2yBTU1A4O');

ALTER TABLE `admin`
  ADD PRIMARY KEY (`usuario`);
