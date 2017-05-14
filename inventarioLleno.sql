DROP DATABASE IF EXISTS `inventario`;

CREATE DATABASE `inventario` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `inventario`;

-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: May 14, 2017 at 09:03 PM
-- Server version: 10.1.19-MariaDB
-- PHP Version: 7.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `inventario`
--

-- --------------------------------------------------------

--
-- Table structure for table `almacen`
--

CREATE TABLE `almacen` (
  `idAlmacen` int(10) UNSIGNED NOT NULL,
  `idSucursal` int(10) UNSIGNED NOT NULL,
  `idCategoria` int(10) UNSIGNED NOT NULL,
  `idProducto` int(10) UNSIGNED NOT NULL,
  `cantidadAlmacen` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `cantidadConsumo` int(10) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `almacen`
--

INSERT INTO `almacen` (`idAlmacen`, `idSucursal`, `idCategoria`, `idProducto`, `cantidadAlmacen`, `cantidadConsumo`) VALUES
(1, 2, 1, 1, 275, 20),
(2, 1, 1, 1, 240, 20),
(3, 2, 2, 2, 194, 20),
(4, 1, 2, 2, 240, 20),
(5, 2, 3, 3, 80, 30),
(6, 1, 3, 3, 240, 20),
(7, 2, 1, 4, 140, 40),
(8, 1, 1, 4, 240, 20),
(9, 2, 1, 5, 300, 40),
(10, 1, 1, 5, 240, 20),
(11, 2, 4, 6, 470, 40),
(12, 1, 4, 6, 240, 20),
(13, 2, 5, 7, 180, 30),
(14, 1, 5, 7, 240, 20),
(15, 2, 1, 8, 150, 20),
(16, 1, 1, 8, 240, 20),
(17, 2, 5, 9, 150, 30),
(18, 1, 5, 9, 240, 20),
(19, 2, 1, 10, 165, 30),
(20, 1, 1, 10, 240, 20),
(21, 2, 2, 11, 117, 0),
(22, 1, 2, 11, 114, 3),
(23, 2, 5, 12, 117, 0),
(24, 1, 5, 12, 114, 3);

-- --------------------------------------------------------

--
-- Table structure for table `asignacionbasicos`
--

CREATE TABLE `asignacionbasicos` (
  `idSucursal` int(10) UNSIGNED NOT NULL,
  `idUsuario` int(10) UNSIGNED NOT NULL,
  `idTecnica` int(10) UNSIGNED NOT NULL,
  `idProducto` int(10) UNSIGNED NOT NULL,
  `idCategoria` int(10) UNSIGNED NOT NULL,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `asignacionbasicos`
--

INSERT INTO `asignacionbasicos` (`idSucursal`, `idUsuario`, `idTecnica`, `idProducto`, `idCategoria`, `fecha`) VALUES
(1, 2, 1, 11, 2, '2017-05-14 11:39:30'),
(1, 2, 1, 12, 5, '2017-05-14 11:39:35'),
(1, 2, 2, 11, 2, '2017-05-14 11:39:44'),
(1, 2, 2, 12, 5, '2017-05-14 11:39:51'),
(1, 2, 3, 11, 2, '2017-05-14 11:39:58'),
(1, 2, 3, 12, 5, '2017-05-14 11:40:02'),
(1, 5, 1, 11, 2, '2017-05-14 11:42:47'),
(1, 5, 2, 11, 2, '2017-05-14 11:42:52'),
(1, 5, 3, 11, 2, '2017-05-14 11:42:57'),
(1, 5, 3, 12, 5, '2017-05-14 11:43:02'),
(1, 5, 2, 12, 5, '2017-05-14 11:43:07'),
(1, 5, 1, 12, 5, '2017-05-14 11:43:12'),
(1, 4, 1, 11, 2, '2017-05-14 11:44:35'),
(1, 4, 2, 11, 2, '2017-05-14 11:44:41'),
(1, 4, 3, 11, 2, '2017-05-14 11:44:45'),
(1, 4, 3, 12, 5, '2017-05-14 11:44:49'),
(1, 4, 2, 12, 5, '2017-05-14 11:44:53'),
(1, 4, 1, 12, 5, '2017-05-14 11:44:57'),
(1, 4, 1, 11, 2, '2017-05-14 11:46:29'),
(1, 4, 2, 11, 2, '2017-05-14 11:46:34'),
(1, 4, 3, 11, 2, '2017-05-14 11:46:38'),
(1, 4, 3, 12, 5, '2017-05-14 11:46:43'),
(1, 4, 2, 12, 5, '2017-05-14 11:46:47'),
(1, 4, 1, 12, 5, '2017-05-14 11:46:51'),
(2, 3, 4, 11, 2, '2017-05-14 12:00:01'),
(2, 3, 5, 11, 2, '2017-05-14 12:00:08'),
(2, 3, 6, 11, 2, '2017-05-14 12:00:12'),
(2, 3, 6, 12, 5, '2017-05-14 12:00:17'),
(2, 3, 5, 12, 5, '2017-05-14 12:00:22'),
(2, 3, 4, 12, 5, '2017-05-14 12:00:27'),
(2, 6, 4, 11, 2, '2017-05-14 12:01:31'),
(2, 6, 5, 11, 2, '2017-05-14 12:01:37'),
(2, 6, 6, 11, 2, '2017-05-14 12:01:41'),
(2, 6, 6, 12, 5, '2017-05-14 12:01:46'),
(2, 6, 4, 12, 5, '2017-05-14 12:01:50'),
(2, 6, 5, 12, 5, '2017-05-14 12:01:58');

-- --------------------------------------------------------

--
-- Table structure for table `bajas`
--

CREATE TABLE `bajas` (
  `idSucursal` int(10) UNSIGNED NOT NULL,
  `idUsuario` int(10) UNSIGNED NOT NULL,
  `idProducto` int(10) UNSIGNED NOT NULL,
  `idCategoria` int(10) UNSIGNED NOT NULL,
  `cantidad` int(10) UNSIGNED NOT NULL,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bajas`
--

INSERT INTO `bajas` (`idSucursal`, `idUsuario`, `idProducto`, `idCategoria`, `cantidad`, `fecha`) VALUES
(2, 3, 9, 5, 5, '2017-05-14 11:14:06'),
(2, 3, 7, 5, 5, '2017-05-14 11:14:09'),
(2, 3, 1, 1, 5, '2017-05-14 11:14:12'),
(2, 3, 2, 2, 10, '2017-05-14 11:14:16'),
(2, 3, 3, 3, 4, '2017-05-14 11:14:21'),
(2, 3, 8, 1, 7, '2017-05-14 11:14:25'),
(2, 3, 6, 4, 8, '2017-05-14 11:14:30'),
(2, 3, 5, 1, 6, '2017-05-14 11:14:34'),
(2, 3, 4, 1, 5, '2017-05-14 11:14:38'),
(2, 3, 10, 1, 8, '2017-05-14 11:17:03'),
(2, 6, 9, 5, 15, '2017-05-14 11:21:03'),
(2, 6, 7, 5, 10, '2017-05-14 11:21:07'),
(2, 6, 1, 1, 15, '2017-05-14 11:21:10'),
(2, 6, 2, 2, 16, '2017-05-14 11:21:13'),
(2, 6, 10, 1, 12, '2017-05-14 11:21:17'),
(2, 6, 3, 3, 11, '2017-05-14 11:21:20'),
(2, 6, 8, 1, 8, '2017-05-14 11:21:25'),
(2, 6, 6, 4, 8, '2017-05-14 11:21:28'),
(2, 6, 5, 1, 9, '2017-05-14 11:21:32'),
(2, 6, 4, 1, 4, '2017-05-14 11:21:35'),
(1, 2, 9, 5, 5, '2017-05-14 11:24:12'),
(1, 2, 7, 5, 5, '2017-05-14 11:24:14'),
(1, 2, 1, 1, 5, '2017-05-14 11:24:17'),
(1, 2, 2, 2, 5, '2017-05-14 11:24:19'),
(1, 2, 10, 1, 5, '2017-05-14 11:24:22'),
(1, 2, 3, 3, 5, '2017-05-14 11:24:25'),
(1, 2, 8, 1, 5, '2017-05-14 11:24:28'),
(1, 2, 6, 4, 5, '2017-05-14 11:24:30'),
(1, 2, 5, 1, 5, '2017-05-14 11:24:33'),
(1, 2, 4, 1, 5, '2017-05-14 11:24:36'),
(1, 4, 9, 5, 3, '2017-05-14 11:26:33'),
(1, 4, 7, 5, 4, '2017-05-14 11:26:36'),
(1, 4, 1, 1, 3, '2017-05-14 11:26:39'),
(1, 4, 2, 2, 4, '2017-05-14 11:26:41'),
(1, 4, 10, 1, 3, '2017-05-14 11:26:43'),
(1, 4, 3, 3, 4, '2017-05-14 11:26:46'),
(1, 4, 8, 1, 3, '2017-05-14 11:26:49'),
(1, 4, 6, 4, 4, '2017-05-14 11:26:54'),
(1, 4, 5, 1, 3, '2017-05-14 11:26:57'),
(1, 4, 4, 1, 4, '2017-05-14 11:26:59'),
(1, 2, 9, 5, 2, '2017-05-14 11:27:18'),
(1, 2, 7, 5, 1, '2017-05-14 11:27:21'),
(1, 2, 1, 1, 2, '2017-05-14 11:27:24'),
(1, 2, 2, 2, 1, '2017-05-14 11:27:27'),
(1, 2, 10, 1, 2, '2017-05-14 11:27:30'),
(1, 2, 3, 3, 1, '2017-05-14 11:27:34'),
(1, 2, 8, 1, 2, '2017-05-14 11:27:40'),
(1, 2, 5, 1, 2, '2017-05-14 11:27:43'),
(1, 2, 4, 1, 1, '2017-05-14 11:27:46'),
(1, 5, 9, 5, 5, '2017-05-14 11:29:25'),
(1, 5, 7, 5, 5, '2017-05-14 11:29:27'),
(1, 5, 1, 1, 5, '2017-05-14 11:29:29'),
(1, 5, 2, 2, 5, '2017-05-14 11:29:32'),
(1, 5, 10, 1, 5, '2017-05-14 11:29:35'),
(1, 5, 3, 3, 5, '2017-05-14 11:29:38'),
(1, 5, 8, 1, 5, '2017-05-14 11:29:41'),
(1, 5, 6, 4, 6, '2017-05-14 11:29:44'),
(1, 5, 5, 1, 5, '2017-05-14 11:29:47'),
(1, 5, 4, 1, 5, '2017-05-14 11:29:49');

-- --------------------------------------------------------

--
-- Table structure for table `bajasbasicos`
--

CREATE TABLE `bajasbasicos` (
  `idSucursal` int(10) UNSIGNED NOT NULL,
  `idUsuario` int(10) UNSIGNED NOT NULL,
  `idTecnica` int(10) UNSIGNED NOT NULL,
  `idProducto` int(10) UNSIGNED NOT NULL,
  `idCategoria` int(10) UNSIGNED NOT NULL,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bajasbasicos`
--

INSERT INTO `bajasbasicos` (`idSucursal`, `idUsuario`, `idTecnica`, `idProducto`, `idCategoria`, `fecha`) VALUES
(1, 2, 1, 11, 2, '2017-05-14 11:41:07'),
(1, 2, 2, 11, 2, '2017-05-14 11:41:12'),
(1, 2, 3, 11, 2, '2017-05-14 11:41:17'),
(1, 2, 3, 12, 5, '2017-05-14 11:41:25'),
(1, 2, 2, 12, 5, '2017-05-14 11:41:29'),
(1, 2, 1, 12, 5, '2017-05-14 11:41:34'),
(1, 5, 1, 11, 2, '2017-05-14 11:43:34'),
(1, 5, 2, 11, 2, '2017-05-14 11:43:40'),
(1, 5, 3, 11, 2, '2017-05-14 11:43:45'),
(1, 5, 3, 12, 5, '2017-05-14 11:43:50'),
(1, 5, 2, 12, 5, '2017-05-14 11:43:54'),
(1, 5, 1, 12, 5, '2017-05-14 11:43:58'),
(1, 4, 1, 11, 2, '2017-05-14 11:45:30'),
(1, 4, 2, 11, 2, '2017-05-14 11:45:35'),
(1, 4, 3, 11, 2, '2017-05-14 11:45:40'),
(1, 4, 3, 12, 5, '2017-05-14 11:45:50'),
(1, 4, 2, 12, 5, '2017-05-14 11:45:54'),
(1, 4, 1, 12, 5, '2017-05-14 11:45:58'),
(2, 3, 4, 11, 2, '2017-05-14 12:00:32'),
(2, 3, 5, 11, 2, '2017-05-14 12:00:37'),
(2, 3, 6, 11, 2, '2017-05-14 12:00:42'),
(2, 3, 6, 12, 5, '2017-05-14 12:00:46'),
(2, 3, 5, 12, 5, '2017-05-14 12:00:51'),
(2, 3, 4, 12, 5, '2017-05-14 12:00:56'),
(2, 6, 4, 11, 2, '2017-05-14 12:02:03'),
(2, 6, 5, 11, 2, '2017-05-14 12:02:08'),
(2, 6, 6, 11, 2, '2017-05-14 12:02:12'),
(2, 6, 6, 12, 5, '2017-05-14 12:02:18'),
(2, 6, 5, 12, 5, '2017-05-14 12:02:30'),
(2, 6, 4, 12, 5, '2017-05-14 12:02:35');

-- --------------------------------------------------------

--
-- Table structure for table `basicosenuso`
--

CREATE TABLE `basicosenuso` (
  `idSucursal` int(10) UNSIGNED NOT NULL,
  `idTecnica` int(10) UNSIGNED NOT NULL,
  `idProducto` int(10) UNSIGNED NOT NULL,
  `enUso` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `basicosenuso`
--

INSERT INTO `basicosenuso` (`idSucursal`, `idTecnica`, `idProducto`, `enUso`) VALUES
(1, 1, 12, 1),
(1, 2, 12, 1),
(1, 3, 12, 1),
(2, 4, 12, 0),
(2, 5, 12, 0),
(2, 6, 12, 0),
(1, 1, 11, 1),
(1, 2, 11, 1),
(1, 3, 11, 1),
(2, 4, 11, 0),
(2, 5, 11, 0),
(2, 6, 11, 0);

-- --------------------------------------------------------

--
-- Table structure for table `categorias`
--

CREATE TABLE `categorias` (
  `idCategoria` int(10) UNSIGNED NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categorias`
--

INSERT INTO `categorias` (`idCategoria`, `nombre`, `descripcion`) VALUES
(1, 'Gelish', 'Categoria Gelish'),
(2, 'S2', 'Categoria S2'),
(3, 'Jdenis', 'Categoria Jdenis'),
(4, 'Goldwell', 'Categoria Goldwell'),
(5, 'Nioxin', 'Categoria Nioxin');

-- --------------------------------------------------------

--
-- Table structure for table `movimientos`
--

CREATE TABLE `movimientos` (
  `idSucursal` int(10) UNSIGNED NOT NULL,
  `idUsuario` int(10) UNSIGNED NOT NULL,
  `idProducto` int(10) UNSIGNED NOT NULL,
  `idCategoria` int(10) UNSIGNED NOT NULL,
  `cantidad` int(10) UNSIGNED NOT NULL,
  `tipo` tinyint(1) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `movimientos`
--

INSERT INTO `movimientos` (`idSucursal`, `idUsuario`, `idProducto`, `idCategoria`, `cantidad`, `tipo`, `fecha`) VALUES
(2, 3, 9, 5, 150, 1, '2017-05-14 11:11:58'),
(2, 3, 7, 5, 200, 1, '2017-05-14 11:12:03'),
(2, 3, 1, 1, 300, 1, '2017-05-14 11:12:09'),
(2, 3, 2, 2, 200, 1, '2017-05-14 11:12:14'),
(2, 3, 3, 3, 100, 1, '2017-05-14 11:12:18'),
(2, 3, 8, 1, 150, 1, '2017-05-14 11:12:23'),
(2, 3, 6, 4, 500, 1, '2017-05-14 11:12:27'),
(2, 3, 5, 1, 200, 1, '2017-05-14 11:12:32'),
(2, 3, 4, 1, 150, 1, '2017-05-14 11:12:36'),
(2, 3, 9, 5, 25, 0, '2017-05-14 11:12:51'),
(2, 3, 7, 5, 25, 0, '2017-05-14 11:12:55'),
(2, 3, 1, 1, 15, 0, '2017-05-14 11:12:59'),
(2, 3, 2, 2, 30, 0, '2017-05-14 11:13:04'),
(2, 3, 3, 3, 25, 0, '2017-05-14 11:13:08'),
(2, 3, 8, 1, 15, 0, '2017-05-14 11:13:14'),
(2, 3, 6, 4, 26, 0, '2017-05-14 11:13:19'),
(2, 3, 5, 1, 15, 0, '2017-05-14 11:13:26'),
(2, 3, 4, 1, 30, 0, '2017-05-14 11:13:30'),
(2, 3, 10, 1, 200, 1, '2017-05-14 11:16:47'),
(2, 3, 10, 1, 25, 0, '2017-05-14 11:16:51'),
(2, 6, 9, 5, 50, 1, '2017-05-14 11:17:31'),
(2, 6, 7, 5, 25, 1, '2017-05-14 11:17:35'),
(2, 6, 1, 1, 15, 1, '2017-05-14 11:17:39'),
(2, 6, 2, 2, 40, 1, '2017-05-14 11:17:43'),
(2, 6, 10, 1, 15, 1, '2017-05-14 11:17:47'),
(2, 6, 3, 3, 25, 1, '2017-05-14 11:17:50'),
(2, 6, 8, 1, 35, 1, '2017-05-14 11:17:55'),
(2, 6, 6, 4, 26, 1, '2017-05-14 11:17:59'),
(2, 6, 5, 1, 155, 1, '2017-05-14 11:18:03'),
(2, 6, 4, 1, 39, 1, '2017-05-14 11:18:07'),
(2, 6, 9, 5, 25, 0, '2017-05-14 11:20:10'),
(2, 6, 7, 5, 20, 0, '2017-05-14 11:20:14'),
(2, 6, 1, 1, 25, 0, '2017-05-14 11:20:19'),
(2, 6, 2, 2, 16, 0, '2017-05-14 11:20:23'),
(2, 6, 10, 1, 25, 0, '2017-05-14 11:20:28'),
(2, 6, 3, 3, 20, 0, '2017-05-14 11:20:33'),
(2, 6, 8, 1, 20, 0, '2017-05-14 11:20:38'),
(2, 6, 6, 4, 30, 0, '2017-05-14 11:20:45'),
(2, 6, 5, 1, 40, 0, '2017-05-14 11:20:49'),
(2, 6, 4, 1, 19, 0, '2017-05-14 11:20:54'),
(1, 2, 9, 5, 200, 1, '2017-05-14 11:23:04'),
(1, 2, 7, 5, 200, 1, '2017-05-14 11:23:07'),
(1, 2, 1, 1, 200, 1, '2017-05-14 11:23:12'),
(1, 2, 2, 2, 200, 1, '2017-05-14 11:23:17'),
(1, 2, 10, 1, 200, 1, '2017-05-14 11:23:19'),
(1, 2, 3, 3, 200, 1, '2017-05-14 11:23:23'),
(1, 2, 8, 1, 200, 1, '2017-05-14 11:23:26'),
(1, 2, 6, 4, 200, 1, '2017-05-14 11:23:29'),
(1, 2, 5, 1, 200, 1, '2017-05-14 11:23:32'),
(1, 2, 4, 1, 200, 1, '2017-05-14 11:23:34'),
(1, 2, 9, 5, 20, 0, '2017-05-14 11:23:38'),
(1, 2, 7, 5, 20, 0, '2017-05-14 11:23:42'),
(1, 2, 1, 1, 20, 0, '2017-05-14 11:23:45'),
(1, 2, 2, 2, 20, 0, '2017-05-14 11:23:47'),
(1, 2, 10, 1, 20, 0, '2017-05-14 11:23:50'),
(1, 2, 3, 3, 20, 0, '2017-05-14 11:23:52'),
(1, 2, 8, 1, 20, 0, '2017-05-14 11:23:55'),
(1, 2, 6, 4, 20, 0, '2017-05-14 11:23:58'),
(1, 2, 5, 1, 20, 0, '2017-05-14 11:24:01'),
(1, 2, 4, 1, 20, 0, '2017-05-14 11:24:03'),
(1, 4, 9, 5, 25, 1, '2017-05-14 11:24:59'),
(1, 4, 7, 5, 25, 1, '2017-05-14 11:25:02'),
(1, 4, 1, 1, 25, 1, '2017-05-14 11:25:04'),
(1, 4, 2, 2, 25, 1, '2017-05-14 11:25:07'),
(1, 4, 10, 1, 25, 1, '2017-05-14 11:25:09'),
(1, 4, 3, 3, 25, 1, '2017-05-14 11:25:12'),
(1, 4, 8, 1, 25, 1, '2017-05-14 11:25:15'),
(1, 4, 6, 4, 25, 1, '2017-05-14 11:25:19'),
(1, 4, 5, 1, 25, 1, '2017-05-14 11:25:21'),
(1, 4, 4, 1, 25, 1, '2017-05-14 11:25:25'),
(1, 4, 9, 5, 5, 0, '2017-05-14 11:25:55'),
(1, 4, 7, 5, 5, 0, '2017-05-14 11:25:58'),
(1, 4, 1, 1, 5, 0, '2017-05-14 11:26:00'),
(1, 4, 2, 2, 5, 0, '2017-05-14 11:26:03'),
(1, 4, 10, 1, 5, 0, '2017-05-14 11:26:06'),
(1, 4, 3, 3, 5, 0, '2017-05-14 11:26:09'),
(1, 4, 8, 1, 5, 0, '2017-05-14 11:26:11'),
(1, 4, 6, 4, 5, 0, '2017-05-14 11:26:14'),
(1, 4, 5, 1, 5, 0, '2017-05-14 11:26:17'),
(1, 4, 4, 1, 5, 0, '2017-05-14 11:26:19'),
(1, 5, 9, 5, 50, 1, '2017-05-14 11:28:15'),
(1, 5, 7, 5, 50, 1, '2017-05-14 11:28:18'),
(1, 5, 1, 1, 50, 1, '2017-05-14 11:28:20'),
(1, 5, 2, 2, 50, 1, '2017-05-14 11:28:24'),
(1, 5, 10, 1, 50, 1, '2017-05-14 11:28:27'),
(1, 5, 3, 3, 50, 1, '2017-05-14 11:28:30'),
(1, 5, 8, 1, 50, 1, '2017-05-14 11:28:33'),
(1, 5, 6, 4, 50, 1, '2017-05-14 11:28:35'),
(1, 5, 5, 1, 50, 1, '2017-05-14 11:28:38'),
(1, 5, 4, 1, 50, 1, '2017-05-14 11:28:41'),
(1, 5, 9, 5, 10, 0, '2017-05-14 11:28:49'),
(1, 5, 7, 5, 10, 0, '2017-05-14 11:28:51'),
(1, 5, 1, 1, 10, 0, '2017-05-14 11:28:54'),
(1, 5, 2, 2, 10, 0, '2017-05-14 11:28:56'),
(1, 5, 10, 1, 10, 0, '2017-05-14 11:28:59'),
(1, 5, 3, 3, 10, 0, '2017-05-14 11:29:02'),
(1, 5, 8, 1, 10, 0, '2017-05-14 11:29:04'),
(1, 5, 6, 4, 10, 0, '2017-05-14 11:29:07'),
(1, 5, 5, 1, 10, 0, '2017-05-14 11:29:10'),
(1, 5, 4, 1, 10, 0, '2017-05-14 11:29:13'),
(1, 2, 11, 2, 100, 1, '2017-05-14 11:33:43'),
(1, 2, 12, 5, 100, 1, '2017-05-14 11:33:47'),
(1, 5, 11, 2, 15, 1, '2017-05-14 11:42:35'),
(1, 5, 12, 5, 15, 1, '2017-05-14 11:42:37'),
(1, 4, 11, 2, 11, 1, '2017-05-14 11:44:26'),
(1, 4, 12, 5, 11, 1, '2017-05-14 11:44:28'),
(2, 3, 11, 2, 100, 1, '2017-05-14 11:59:53'),
(2, 3, 12, 5, 100, 1, '2017-05-14 11:59:57'),
(2, 6, 11, 2, 23, 1, '2017-05-14 12:01:17'),
(2, 6, 12, 5, 23, 1, '2017-05-14 12:01:22');

-- --------------------------------------------------------

--
-- Table structure for table `productos`
--

CREATE TABLE `productos` (
  `idProducto` int(10) UNSIGNED NOT NULL,
  `idCategoria` int(10) UNSIGNED NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(50) NOT NULL,
  `codigo` varchar(20) NOT NULL,
  `minimo` int(10) UNSIGNED NOT NULL,
  `esBasico` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `productos`
--

INSERT INTO `productos` (`idProducto`, `idCategoria`, `nombre`, `descripcion`, `codigo`, `minimo`, `esBasico`) VALUES
(1, 1, 'Foundation', '15 ml', '200032', 150, 0),
(2, 2, 'Mascarilla humectante', '250gr', '200033', 200, 0),
(3, 3, 'Pestañas J .15 #10', 'Sin descripcion', '200034', 300, 0),
(4, 1, 'Top it off', '15 ml', '1246', 200, 0),
(5, 1, 'Sheek White', '15 ml', '81280301', 150, 0),
(6, 4, 'Rich Repair Shampoo', '300 ml', '202593', 250, 0),
(7, 5, 'Cleanser Shampoo', '300 ml', '301', 350, 0),
(8, 1, 'Ph Bond', '15 ml', '1206', 200, 0),
(9, 5, '#1 Estuche de cuidado para cabello', '150 ml', '1212', 160, 0),
(10, 1, 'Passion', '15 ml', '1213', 200, 0),
(11, 2, 'Alcohol', '20 ml', '123456', 200, 1),
(12, 5, 'Algodon', '10 gr', '456123', 200, 1);

-- --------------------------------------------------------

--
-- Table structure for table `sucursales`
--

CREATE TABLE `sucursales` (
  `idSucursal` int(10) UNSIGNED NOT NULL,
  `plaza` varchar(30) NOT NULL,
  `ciudad` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sucursales`
--

INSERT INTO `sucursales` (`idSucursal`, `plaza`, `ciudad`) VALUES
(1, 'Dila', 'Hermosillo'),
(2, 'Cantabria', 'Hermosillo');

-- --------------------------------------------------------

--
-- Table structure for table `tecnicas`
--

CREATE TABLE `tecnicas` (
  `idTecnica` int(10) UNSIGNED NOT NULL,
  `idSucursal` int(10) UNSIGNED NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `apellido` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tecnicas`
--

INSERT INTO `tecnicas` (`idTecnica`, `idSucursal`, `nombre`, `apellido`) VALUES
(1, 1, 'Giovana', 'Flores'),
(2, 1, 'Miriam', 'Lagarda'),
(3, 1, 'Karla', 'Ripalda'),
(4, 2, 'Norma', 'Ramirez'),
(5, 2, 'Mayela', 'Lagarda'),
(6, 2, 'Adriana', 'Morales');

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuario` int(10) UNSIGNED NOT NULL,
  `idSucursal` int(10) UNSIGNED NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `permisos` int(10) UNSIGNED NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `apellido` varchar(20) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`idUsuario`, `idSucursal`, `username`, `password`, `permisos`, `nombre`, `apellido`, `status`) VALUES
(1, 1, 'admin', '12345678', 2, 'Raul', 'Perez', 1),
(2, 1, 'duniam', '12345678', 1, 'Dunia', 'Morales', 1),
(3, 2, 'lourdesa', '12345678', 1, 'Lourdes', 'Archuleta', 1),
(4, 1, 'yadirar', '12345678', 0, 'Yadira', 'Rodriguez', 1),
(5, 1, 'berenicev', '12345678', 0, 'Berenice', 'Vega', 1),
(6, 2, 'irman', '12345678', 0, 'Irma', 'Navarro', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `almacen`
--
ALTER TABLE `almacen`
  ADD PRIMARY KEY (`idAlmacen`),
  ADD KEY `idSucursal` (`idSucursal`),
  ADD KEY `idProducto` (`idProducto`),
  ADD KEY `idCategoria` (`idCategoria`);

--
-- Indexes for table `asignacionbasicos`
--
ALTER TABLE `asignacionbasicos`
  ADD KEY `idUsuario` (`idUsuario`),
  ADD KEY `idTecnica` (`idTecnica`),
  ADD KEY `idProducto` (`idProducto`),
  ADD KEY `idCategoria` (`idCategoria`),
  ADD KEY `idSucursal` (`idSucursal`);

--
-- Indexes for table `bajas`
--
ALTER TABLE `bajas`
  ADD KEY `idUsuario` (`idUsuario`),
  ADD KEY `idProducto` (`idProducto`),
  ADD KEY `idCategoria` (`idCategoria`),
  ADD KEY `idSucursal` (`idSucursal`);

--
-- Indexes for table `bajasbasicos`
--
ALTER TABLE `bajasbasicos`
  ADD KEY `idUsuario` (`idUsuario`),
  ADD KEY `idTecnica` (`idTecnica`),
  ADD KEY `idProducto` (`idProducto`),
  ADD KEY `idCategoria` (`idCategoria`),
  ADD KEY `idSucursal` (`idSucursal`);

--
-- Indexes for table `basicosenuso`
--
ALTER TABLE `basicosenuso`
  ADD KEY `idProducto` (`idProducto`),
  ADD KEY `idTecnica` (`idTecnica`),
  ADD KEY `idSucursal` (`idSucursal`);

--
-- Indexes for table `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`idCategoria`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indexes for table `movimientos`
--
ALTER TABLE `movimientos`
  ADD KEY `idUsuario` (`idUsuario`),
  ADD KEY `idProducto` (`idProducto`),
  ADD KEY `idCategoria` (`idCategoria`),
  ADD KEY `idSucursal` (`idSucursal`);

--
-- Indexes for table `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`idProducto`),
  ADD UNIQUE KEY `nombre` (`nombre`),
  ADD UNIQUE KEY `codigo` (`codigo`),
  ADD KEY `idCategoria` (`idCategoria`);

--
-- Indexes for table `sucursales`
--
ALTER TABLE `sucursales`
  ADD PRIMARY KEY (`idSucursal`),
  ADD UNIQUE KEY `plaza` (`plaza`);

--
-- Indexes for table `tecnicas`
--
ALTER TABLE `tecnicas`
  ADD PRIMARY KEY (`idTecnica`),
  ADD KEY `idSucursal` (`idSucursal`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuario`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `idSucursal` (`idSucursal`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `almacen`
--
ALTER TABLE `almacen`
  MODIFY `idAlmacen` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT for table `categorias`
--
ALTER TABLE `categorias`
  MODIFY `idCategoria` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `productos`
--
ALTER TABLE `productos`
  MODIFY `idProducto` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `sucursales`
--
ALTER TABLE `sucursales`
  MODIFY `idSucursal` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `tecnicas`
--
ALTER TABLE `tecnicas`
  MODIFY `idTecnica` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuario` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `almacen`
--
ALTER TABLE `almacen`
  ADD CONSTRAINT `almacen_ibfk_1` FOREIGN KEY (`idSucursal`) REFERENCES `sucursales` (`idSucursal`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `almacen_ibfk_2` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`idProducto`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `almacen_ibfk_3` FOREIGN KEY (`idCategoria`) REFERENCES `categorias` (`idCategoria`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `asignacionbasicos`
--
ALTER TABLE `asignacionbasicos`
  ADD CONSTRAINT `asignacionbasicos_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `asignacionbasicos_ibfk_2` FOREIGN KEY (`idTecnica`) REFERENCES `tecnicas` (`idTecnica`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `asignacionbasicos_ibfk_3` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`idProducto`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `asignacionbasicos_ibfk_4` FOREIGN KEY (`idCategoria`) REFERENCES `categorias` (`idCategoria`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `asignacionbasicos_ibfk_5` FOREIGN KEY (`idSucursal`) REFERENCES `sucursales` (`idSucursal`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `bajas`
--
ALTER TABLE `bajas`
  ADD CONSTRAINT `bajas_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `bajas_ibfk_2` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`idProducto`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `bajas_ibfk_3` FOREIGN KEY (`idCategoria`) REFERENCES `categorias` (`idCategoria`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `bajas_ibfk_4` FOREIGN KEY (`idSucursal`) REFERENCES `sucursales` (`idSucursal`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `bajasbasicos`
--
ALTER TABLE `bajasbasicos`
  ADD CONSTRAINT `bajasbasicos_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `bajasbasicos_ibfk_2` FOREIGN KEY (`idTecnica`) REFERENCES `tecnicas` (`idTecnica`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `bajasbasicos_ibfk_3` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`idProducto`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `bajasbasicos_ibfk_4` FOREIGN KEY (`idCategoria`) REFERENCES `categorias` (`idCategoria`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `bajasbasicos_ibfk_5` FOREIGN KEY (`idSucursal`) REFERENCES `sucursales` (`idSucursal`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `basicosenuso`
--
ALTER TABLE `basicosenuso`
  ADD CONSTRAINT `basicosenuso_ibfk_1` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`idProducto`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `basicosenuso_ibfk_2` FOREIGN KEY (`idTecnica`) REFERENCES `tecnicas` (`idTecnica`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `basicosenuso_ibfk_3` FOREIGN KEY (`idSucursal`) REFERENCES `sucursales` (`idSucursal`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `movimientos`
--
ALTER TABLE `movimientos`
  ADD CONSTRAINT `movimientos_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `movimientos_ibfk_2` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`idProducto`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `movimientos_ibfk_3` FOREIGN KEY (`idCategoria`) REFERENCES `categorias` (`idCategoria`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `movimientos_ibfk_4` FOREIGN KEY (`idSucursal`) REFERENCES `sucursales` (`idSucursal`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`idCategoria`) REFERENCES `categorias` (`idCategoria`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `tecnicas`
--
ALTER TABLE `tecnicas`
  ADD CONSTRAINT `tecnicas_ibfk_1` FOREIGN KEY (`idSucursal`) REFERENCES `sucursales` (`idSucursal`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`idSucursal`) REFERENCES `sucursales` (`idSucursal`) ON DELETE CASCADE ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
