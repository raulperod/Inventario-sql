/**
 * Created by Raul Perez on 21/04/2017.
 */
'use strict'

const ProductModel = require('./coneccion')

function getProductById(idProduct, next) {
    ProductModel.query(`SELECT * FROM productos p WHERE p.idProducto = ?`, idProduct ,(error, resultado, fields) => {
        next(error, resultado[0])
    })
}

function getProducts(next) {
    let seleccion = 'p.idProducto, p.nombre, p.descripcion, p.codigo, p.minimo, p.esBasico, c.nombre nombrec'
    ProductModel.query(`SELECT ${seleccion} FROM productos p INNER JOIN categorias c ON p.idCategoria = c.idCategoria` ,(error, resultado, fields) => {
        next(error, resultado)
    })
}

function createProduct(product, next) {
    ProductModel.query('INSERT INTO productos SET ?', product, (error, resultado, fields) => {
        next(error)
    })
}

function updateProduct(product, next) {
    ProductModel.query('UPDATE productos p SET ? WHERE p.idProducto = ?', [product,product.idProducto], (error, resultado, fields) => {
        next(error)
    })
}

module.exports = {
    getProductById,
    getProducts,
    createProduct,
    updateProduct
}