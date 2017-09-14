/**
 * Created by Raul Perez on 21/04/2017.
 */
'use strict'

const ProductModel = require('./coneccion')

function getProductById(idProduct, next) {
    ProductModel
        .query(`SELECT p.idProducto, p.nombre, p.codigo, p.descripcion, p.minimo, c.nombre nombreCategoria
                FROM productos p
                JOIN categorias c ON p.idCategoria = c.idCategoria
                WHERE p.idProducto = ?`, idProduct ,(error, resultado, fields) => {

            next(error, resultado[0])
        })
}

function getIdProductoByCode(code, next) {
    ProductModel
        .query(`SELECT p.idProducto
                FROM productos p
                WHERE p.codigo = ?`, code ,(error, resultado, fields) => {

            next(error, resultado[0])
        })
}

function getAllIdProducto(next) {
    ProductModel
        .query(`SELECT p.idProducto
                FROM productos p`, (error, resultado, fields) => {

            next(error, resultado)
        })
}

function getProductsByCategory(categoria, next) {
    ProductModel
        .query(`SELECT p.idProducto, p.nombre, p.descripcion, p.codigo, p.minimo, p.esBasico
                FROM productos p
                JOIN categorias c ON p.idCategoria = c.idCategoria AND c.nombre = ?` , categoria, (error, resultado, fields) => {

            next(error, resultado)
        })
}

function getProductsBasicos(next) {
    ProductModel
        .query(`SELECT p.nombre, p.codigo
                FROM productos p
                WHERE p.esBasico = 1` ,(error, resultado, fields) => {

            next(error, resultado)
        })
}

function getIdProductsBasicos(next) {
    ProductModel
        .query(`SELECT p.idProducto
                FROM productos p
                WHERE p.esBasico = 1` ,(error, resultado, fields) => {

            next(error, resultado)
        })
}

function createProduct(product, next) {
    ProductModel
        .query(`INSERT INTO productos
                SET ?`, product, (error, resultado, fields) => {

            next(error)
        })
}

function updateProduct(product, next) {
    ProductModel
        .query(`UPDATE productos p
                SET ?
                WHERE p.idProducto = ?`, [product,product.idProducto], (error, resultado, fields) => {

            next(error)
        })
}

function deleteProduct(idProducto, next) {
    ProductModel
        .query(`DELETE FROM productos
                WHERE idProducto = ?`, idProducto, (error, resultado, fields) => {

            next(error)
        })
}

module.exports = {
    getProductById,
    getIdProductoByCode,
    getAllIdProducto,
    getProductsByCategory,
    getProductsBasicos,
    getIdProductsBasicos,
    createProduct,
    updateProduct,
    deleteProduct
}
