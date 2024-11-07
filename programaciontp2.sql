-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-11-2024 a las 20:47:04
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
-- Base de datos: `programaciontp2`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `articulos`
--

CREATE TABLE `articulos` (
  `codigo` int(11) NOT NULL,
  `descripcion` varchar(50) DEFAULT NULL,
  `precio` float DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `articulos`
--

INSERT INTO `articulos` (`codigo`, `descripcion`, `precio`) VALUES
(1, 'papas fritas', 2300),
(2, 'Naranjas', 450),
(3, 'Manzanas', 100),
(4, 'Mandarin', 10),
(10, 'Prueba ', 120),
(19, 'Mandarinas', 1010);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `Apellido` varchar(50) NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `Saldo` int(11) NOT NULL,
  `Status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`Apellido`, `Nombre`, `Saldo`, `Status`) VALUES
('Aguirre', 'Nicolas Elias', 87000, 0),
('Bianchi', 'Germán', 92000, 1),
('Costa', 'María Laura', 45000, 1),
('Donzelli', 'Nicolas Emanuel', 92000, 0),
('Giavedoni', 'Augusto', 82000, 0),
('Girod', 'Ignacio', 82000, 0),
('Imhoff', 'Marianela', 80000, 0),
('Kouefati', 'Jacques', 80000, 1),
('Pallavidini', 'Nahuel', 80000, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `meses`
--

CREATE TABLE `meses` (
  `Nro` int(2) NOT NULL,
  `Mes` varchar(50) NOT NULL,
  `CDias` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `meses`
--

INSERT INTO `meses` (`Nro`, `Mes`, `CDias`) VALUES
(1, 'Enero', 31),
(2, 'Febrero', 28),
(3, 'Marzo', 31),
(4, 'Abril', 30),
(5, 'Mayo', 31),
(6, 'Junio', 30),
(7, 'Julio', 31),
(8, 'Agosto', 31),
(9, 'Septiembre', 30),
(10, 'Octubre', 31),
(11, 'Noviembre', 30),
(12, 'Diciembre', 31);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sucursales`
--

CREATE TABLE `sucursales` (
  `Id_Suc` int(11) NOT NULL,
  `Nombre_Suc` varchar(50) NOT NULL,
  `Dir_Suc` varchar(50) NOT NULL,
  `Cant_Emp_Suc` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sucursales`
--

INSERT INTO `sucursales` (`Id_Suc`, `Nombre_Suc`, `Dir_Suc`, `Cant_Emp_Suc`) VALUES
(1, 'Santa Fe', 'San  Martin 1111', 11),
(2, 'Rosario', 'Belgrano 2222', 22),
(3, 'Santo tome', '9 de Julio 3333', 16),
(4, 'Rafaela', 'Roca 4444', 4),
(5, 'Paraná', 'Tunel 555', 12);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `username`, `password`, `email`) VALUES
(1, 'vale', '$2y$10$gfrLhynrS4.pF3sSHV4BbuNDC96moOQgCC3m9EHgjop/bbZfN/Iiy', 'valentino@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `venta`
--

CREATE TABLE `venta` (
  `id` int(11) NOT NULL,
  `Suc1` float NOT NULL,
  `Suc2` float NOT NULL,
  `Suc3` float NOT NULL,
  `Suc4` float NOT NULL,
  `Suc5` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `venta`
--

INSERT INTO `venta` (`id`, `Suc1`, `Suc2`, `Suc3`, `Suc4`, `Suc5`) VALUES
(1, 8386, 8679, 6853, 5111, 8019),
(2, 7024, 9289, 7299, 5612, 7721),
(3, 5329, 7019, 5203, 9400, 9291),
(4, 45718, 9151, 6667, 9836, 8054),
(5, 5154, 9487, 6084, 8365, 9942),
(6, 8528, 5101, 8775, 9921, 7077),
(7, 6603, 5962, 9845, 6703, 5561),
(8, 5881, 7857, 6640, 9669, 6169),
(9, 7952, 8372, 5312, 6248, 6714),
(10, 7249, 5031, 9476, 9434, 6759),
(11, 5393, 7977, 6925, 7619, 8966),
(12, 8366, 5008, 5193, 8093, 8000);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `articulos`
--
ALTER TABLE `articulos`
  ADD PRIMARY KEY (`codigo`);

--
-- Indices de la tabla `meses`
--
ALTER TABLE `meses`
  ADD PRIMARY KEY (`Nro`);

--
-- Indices de la tabla `sucursales`
--
ALTER TABLE `sucursales`
  ADD PRIMARY KEY (`Id_Suc`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indices de la tabla `venta`
--
ALTER TABLE `venta`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `articulos`
--
ALTER TABLE `articulos`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `meses`
--
ALTER TABLE `meses`
  MODIFY `Nro` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `venta`
--
ALTER TABLE `venta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
