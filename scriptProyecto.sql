/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE */;
/*!40101 SET SQL_MODE='NO_ENGINE_SUBSTITUTION' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES */;
/*!40103 SET SQL_NOTES='ON' */;

DROP DATABASE IF EXISTS `inventario`;

CREATE DATABASE `inventario` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `inventario`;

CREATE TABLE `sucursales` (
  `idSucursal` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `plaza` varchar(30) NOT NULL,
  `ciudad` varchar(30) NOT NULL,
  PRIMARY KEY (`idSucursal`),
  UNIQUE KEY `plaza` (`plaza`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `usuarios` (
  `idUsuario` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `idSucursal` int(10) unsigned NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `permisos` int(10) unsigned NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`idUsuario`),
  UNIQUE KEY `username` (`username`),
  KEY `idSucursal` (`idSucursal`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `tecnicas` (
  `idTecnica` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `idSucursal` int(10) unsigned NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  PRIMARY KEY (`idTecnica`),
  KEY `idSucursal` (`idSucursal`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `categorias` (
  `idCategoria` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(50) NOT NULL,
  PRIMARY KEY (`idCategoria`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `productos` (
  `idProducto` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `idCategoria` int(10) unsigned NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(50) NOT NULL,
  `codigo` varchar(20) NOT NULL,
  `minimo` int(10) unsigned NOT NULL,
  `esBasico` tinyint(1) NOT NULL,
  PRIMARY KEY (`idProducto`),
  UNIQUE KEY `nombre` (`nombre`),
  UNIQUE KEY `codigo` (`codigo`),
  KEY `idCategoria` (`idCategoria`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `almacen` (
  `idAlmacen` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `idSucursal` int(10) unsigned NOT NULL,
  `idCategoria` int(10) unsigned NOT NULL,
  `idProducto` int(10) unsigned NOT NULL,
  `cantidadAlmacen` int(10) unsigned NOT NULL DEFAULT '0',
  `cantidadConsumo` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`idAlmacen`),
  KEY `idSucursal` (`idSucursal`),
  KEY `idProducto` (`idProducto`),
  KEY `idCategoria` (`idCategoria`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `movimientos` (
  `idSucursal` int(10) unsigned NOT NULL,
  `idUsuario` int(10) unsigned NOT NULL,
  `idProducto` int(10) unsigned NOT NULL,
  `idCategoria` int(10) unsigned NOT NULL,
  `cantidad` int(10) unsigned NOT NULL,
  `tipo` tinyint(1) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `idUsuario` (`idUsuario`),
  KEY `idProducto` (`idProducto`),
  KEY `idCategoria` (`idCategoria`),
  KEY `idSucursal` (`idSucursal`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `asignacionbasicos` (
  `idSucursal` int(10) unsigned NOT NULL,
  `idUsuario` int(10) unsigned NOT NULL,
  `idTecnica` int(10) unsigned NOT NULL,
  `idProducto` int(10) unsigned NOT NULL,
  `idCategoria` int(10) unsigned NOT NULL,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `idUsuario` (`idUsuario`),
  KEY `idTecnica` (`idTecnica`),
  KEY `idProducto` (`idProducto`),
  KEY `idCategoria` (`idCategoria`),
  KEY `idSucursal` (`idSucursal`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `bajas` (
  `idSucursal` int(10) unsigned NOT NULL,
  `idUsuario` int(10) unsigned NOT NULL,
  `idProducto` int(10) unsigned NOT NULL,
  `idCategoria` int(10) unsigned NOT NULL,
  `cantidad` int(10) unsigned NOT NULL,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `idUsuario` (`idUsuario`),
  KEY `idProducto` (`idProducto`),
  KEY `idCategoria` (`idCategoria`),
  KEY `idSucursal` (`idSucursal`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `bajasbasicos` (
  `idSucursal` int(10) unsigned NOT NULL,
  `idUsuario` int(10) unsigned NOT NULL,
  `idTecnica` int(10) unsigned NOT NULL,
  `idProducto` int(10) unsigned NOT NULL,
  `idCategoria` int(10) unsigned NOT NULL,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `idUsuario` (`idUsuario`),
  KEY `idTecnica` (`idTecnica`),
  KEY `idProducto` (`idProducto`),
  KEY `idCategoria` (`idCategoria`),
  KEY `idSucursal` (`idSucursal`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `basicosenuso` (
  `idSucursal` int(10) unsigned NOT NULL,
  `idTecnica` int(10) unsigned NOT NULL,
  `idProducto` int(10) unsigned NOT NULL,
  `enUso` tinyint(1) NOT NULL,
  KEY `idProducto` (`idProducto`),
  KEY `idTecnica` (`idTecnica`),
  KEY `idSucursal` (`idSucursal`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `tecnicas`
ADD CONSTRAINT `tecnicas_ibfk_1` FOREIGN KEY (`idSucursal`) REFERENCES `sucursales` (`idSucursal`) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE `usuarios`
ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`idSucursal`) REFERENCES `sucursales` (`idSucursal`) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE `productos`
ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`idCategoria`) REFERENCES `categorias` (`idCategoria`) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE `almacen`
ADD CONSTRAINT `almacen_ibfk_1` FOREIGN KEY (`idSucursal`) REFERENCES `sucursales` (`idSucursal`) ON DELETE CASCADE ON UPDATE NO ACTION,
ADD CONSTRAINT `almacen_ibfk_2` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`idProducto`) ON DELETE CASCADE ON UPDATE NO ACTION,
ADD CONSTRAINT `almacen_ibfk_3` FOREIGN KEY (`idCategoria`) REFERENCES `categorias` (`idCategoria`) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE `movimientos`
ADD CONSTRAINT `movimientos_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE ON UPDATE NO ACTION,
ADD CONSTRAINT `movimientos_ibfk_2` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`idProducto`) ON DELETE CASCADE ON UPDATE NO ACTION,
ADD CONSTRAINT `movimientos_ibfk_3` FOREIGN KEY (`idCategoria`) REFERENCES `categorias` (`idCategoria`) ON DELETE CASCADE ON UPDATE NO ACTION,
ADD CONSTRAINT `movimientos_ibfk_4` FOREIGN KEY (`idSucursal`) REFERENCES `sucursales` (`idSucursal`) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE `asignacionbasicos`
ADD CONSTRAINT `asignacionbasicos_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE ON UPDATE NO ACTION,
ADD CONSTRAINT `asignacionbasicos_ibfk_2` FOREIGN KEY (`idTecnica`) REFERENCES `tecnicas` (`idTecnica`) ON DELETE CASCADE ON UPDATE NO ACTION,
ADD CONSTRAINT `asignacionbasicos_ibfk_3` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`idProducto`) ON DELETE CASCADE ON UPDATE NO ACTION,
ADD CONSTRAINT `asignacionbasicos_ibfk_4` FOREIGN KEY (`idCategoria`) REFERENCES `categorias` (`idCategoria`) ON DELETE CASCADE ON UPDATE NO ACTION,
ADD CONSTRAINT `asignacionbasicos_ibfk_5` FOREIGN KEY (`idSucursal`) REFERENCES `sucursales` (`idSucursal`) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE `bajasbasicos`
ADD CONSTRAINT `bajasbasicos_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE ON UPDATE NO ACTION,
ADD CONSTRAINT `bajasbasicos_ibfk_2` FOREIGN KEY (`idTecnica`) REFERENCES `tecnicas` (`idTecnica`) ON DELETE CASCADE ON UPDATE NO ACTION,
ADD CONSTRAINT `bajasbasicos_ibfk_3` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`idProducto`) ON DELETE CASCADE ON UPDATE NO ACTION,
ADD CONSTRAINT `bajasbasicos_ibfk_4` FOREIGN KEY (`idCategoria`) REFERENCES `categorias` (`idCategoria`) ON DELETE CASCADE ON UPDATE NO ACTION,
ADD CONSTRAINT `bajasbasicos_ibfk_5` FOREIGN KEY (`idSucursal`) REFERENCES `sucursales` (`idSucursal`) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE `bajas`
ADD CONSTRAINT `bajas_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE ON UPDATE NO ACTION,
ADD CONSTRAINT `bajas_ibfk_2` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`idProducto`) ON DELETE CASCADE ON UPDATE NO ACTION,
ADD CONSTRAINT `bajas_ibfk_3` FOREIGN KEY (`idCategoria`) REFERENCES `categorias` (`idCategoria`) ON DELETE CASCADE ON UPDATE NO ACTION,
ADD CONSTRAINT `bajas_ibfk_4` FOREIGN KEY (`idSucursal`) REFERENCES `sucursales` (`idSucursal`) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE `basicosenuso`
ADD CONSTRAINT `basicosenuso_ibfk_1` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`idProducto`) ON DELETE CASCADE ON UPDATE NO ACTION,
ADD CONSTRAINT `basicosenuso_ibfk_2` FOREIGN KEY (`idTecnica`) REFERENCES `tecnicas` (`idTecnica`) ON DELETE CASCADE ON UPDATE NO ACTION,
ADD CONSTRAINT `basicosenuso_ibfk_3` FOREIGN KEY (`idSucursal`) REFERENCES `sucursales` (`idSucursal`) ON DELETE CASCADE ON UPDATE NO ACTION;

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;