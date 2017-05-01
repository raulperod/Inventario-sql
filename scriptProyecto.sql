DROP DATABASE IF EXISTS inventario;

CREATE DATABASE IF NOT EXISTS inventario;

USE inventario;

CREATE TABLE sucursales (
  idSucursal INTEGER UNSIGNED AUTO_INCREMENT,
  plaza VARCHAR(30) NOT NULL,
  ciudad VARCHAR(30) NOT NULL,
  PRIMARY KEY(idSucursal),
  UNIQUE(plaza)
);

CREATE TABLE categorias (
  idCategoria INTEGER UNSIGNED AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  descripcion VARCHAR(50) NOT NULL,
  PRIMARY KEY(idCategoria),
  UNIQUE(nombre)
);

CREATE TABLE productos (
  idProducto INTEGER UNSIGNED AUTO_INCREMENT,
  idCategoria INTEGER UNSIGNED,
  nombre VARCHAR(50) NOT NULL,
  descripcion VARCHAR(50) NOT NULL,
  codigo VARCHAR(20) NOT NULL,
  minimo INTEGER UNSIGNED NOT NULL,
  esBasico BOOL NOT NULL,
  PRIMARY KEY(idProducto, idCategoria),
  UNIQUE(nombre, codigo),
  INDEX productos_FKIndex1(idCategoria),
  FOREIGN KEY(idCategoria)
    REFERENCES categorias(idCategoria)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
);

CREATE TABLE usuarios (
  idUsuario INTEGER UNSIGNED AUTO_INCREMENT,
  idSucursal INTEGER UNSIGNED,
  username VARCHAR(20) NOT NULL,
  password VARCHAR(20) NOT NULL,
  permisos INTEGER UNSIGNED NOT NULL,
  nombre VARCHAR(20) NOT NULL,
  apellido VARCHAR(20) NOT NULL,
  status BOOL DEFAULT true,
  PRIMARY KEY(idUsuario, idSucursal),
  UNIQUE(username),
  INDEX usuarios_FKIndex1(idSucursal),
  FOREIGN KEY(idSucursal)
    REFERENCES sucursales(idSucursal)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
);

CREATE TABLE tecnicas (
  idTecnica INTEGER UNSIGNED AUTO_INCREMENT,
  idSucursal INTEGER UNSIGNED,
  nombre VARCHAR(20) NOT NULL,
  apellido VARCHAR(20) NOT NULL,
  PRIMARY KEY(idTecnica, idSucursal),
  INDEX tecnicas_FKIndex1( idSucursal),
  FOREIGN KEY(idSucursal)
    REFERENCES sucursales(idSucursal)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
);

CREATE TABLE almacen (
  idAlmacen INTEGER UNSIGNED AUTO_INCREMENT,
  idSucursal INTEGER UNSIGNED,
  idCategoria INTEGER UNSIGNED,
  idProducto INTEGER UNSIGNED,
  cantidadAlmacen INTEGER UNSIGNED NOT NULL DEFAULT 0,
  cantidadConsumo INTEGER UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY(idAlmacen, idSucursal, idCategoria, idProducto),
  INDEX almacen_FKIndex1(idSucursal),
  INDEX almacen_FKIndex2(idProducto, idCategoria),
  FOREIGN KEY( idSucursal)
    REFERENCES sucursales(idSucursal)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
  FOREIGN KEY(idProducto, idCategoria)
    REFERENCES productos(idProducto, idCategoria)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
);

CREATE TABLE basicosenuso (
  idSucursal INTEGER UNSIGNED NOT NULL,
  idTecnica INTEGER UNSIGNED NOT NULL,
  idProducto INTEGER UNSIGNED NOT NULL,
  enUso BOOL NOT NULL,
  PRIMARY KEY(idProducto, idSucursal, idTecnica),
  INDEX basicos_FKIndex1(idProducto),
  INDEX basicos_FKIndex2(idTecnica, idSucursal),
  FOREIGN KEY(idProducto)
    REFERENCES productos(idProducto)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
  FOREIGN KEY( idTecnica, idSucursal)
    REFERENCES tecnicas(idTecnica, idSucursal)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
);

CREATE TABLE movimientosnobasicos (
  idMovimientoNoBasico INTEGER UNSIGNED AUTO_INCREMENT,
  idSucursal INTEGER UNSIGNED,
  idUsuario INTEGER UNSIGNED,
  idProducto INTEGER UNSIGNED,
  idCategoria INTEGER UNSIGNED,
  cantidad INTEGER UNSIGNED NOT NULL,
  tipo BOOL NOT NULL,
  fecha datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(idMovimientoNoBasico, idSucursal, idUsuario, idProducto, idCategoria),
  INDEX movimientosnobasicos_FKIndex1( idUsuario, idSucursal),
  INDEX movimientosnobasicos_FKIndex2( idProducto, idCategoria),
  FOREIGN KEY( idUsuario, idSucursal)
    REFERENCES usuarios(idUsuario, idSucursal)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
  FOREIGN KEY(idProducto, idCategoria)
    REFERENCES productos(idProducto, idCategoria)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
);

CREATE TABLE movimientosbasicos (
  idMovimientoBasico INTEGER UNSIGNED AUTO_INCREMENT,
  idSucursal INTEGER UNSIGNED,
  idUsuario INTEGER UNSIGNED,
  idTecnica INTEGER UNSIGNED,
  idProducto INTEGER UNSIGNED,
  idCategoria INTEGER UNSIGNED,
  cantidad INTEGER UNSIGNED NOT NULL,
  tipo BOOL NOT NULL,
  fecha datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(idMovimientoBasico, idSucursal, idUsuario, idTecnica, idProducto, idCategoria),
  INDEX movimientosbasicos_FKIndex1( idUsuario, idSucursal),
  INDEX movimientosbasicos_FKIndex2( idTecnica ),
  INDEX movimientosnobasicos_FKIndex3( idProducto, idCategoria),
  FOREIGN KEY( idUsuario, idSucursal)
    REFERENCES usuarios(idUsuario, idSucursal)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
  FOREIGN KEY( idTecnica )
    REFERENCES tecnicas(idTecnica)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
  FOREIGN KEY(idProducto, idCategoria)
    REFERENCES productos(idProducto, idCategoria)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
);

CREATE TABLE bajasbasicos (
  idBajaBasico INTEGER UNSIGNED AUTO_INCREMENT,
  idSucursal INTEGER UNSIGNED,
  idUsuario INTEGER UNSIGNED,
  idTecnica INTEGER UNSIGNED,
  idProducto INTEGER UNSIGNED,
  idCategoria INTEGER UNSIGNED,
  cantidad INTEGER UNSIGNED NOT NULL,
  fecha datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(idBajaBasico, idSucursal, idUsuario, idTecnica, idProducto, idCategoria),
  INDEX bajasbasicos_FKIndex1( idUsuario, idSucursal),
  INDEX bajasbasicos_FKIndex2( idTecnica ),
  INDEX bajasbasicos_FKIndex3( idProducto, idCategoria),
  FOREIGN KEY( idUsuario, idSucursal)
    REFERENCES usuarios( idUsuario, idSucursal)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
  FOREIGN KEY( idTecnica )
    REFERENCES tecnicas(idTecnica )
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
  FOREIGN KEY( idProducto, idCategoria)
    REFERENCES productos(idProducto, idCategoria)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
);

CREATE TABLE bajasnobasicos (
  idBajaNoBasico INTEGER UNSIGNED AUTO_INCREMENT,
  idSucursal INTEGER UNSIGNED,
  idUsuario INTEGER UNSIGNED,
  idProducto INTEGER UNSIGNED,
  idCategoria INTEGER UNSIGNED,
  cantidad INTEGER UNSIGNED NOT NULL,
  fecha datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(idBajaNoBasico, idSucursal, idUsuario, idProducto, idCategoria),
  INDEX bajasbasicos_FKIndex1( idUsuario, idSucursal),
  INDEX bajasbasicos_FKIndex2( idProducto, idCategoria),
  FOREIGN KEY( idUsuario, idSucursal)
    REFERENCES usuarios( idUsuario, idSucursal)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
  FOREIGN KEY( idProducto, idCategoria)
    REFERENCES productos(idProducto, idCategoria)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
);
