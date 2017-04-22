/**
 * Created by Raul Perez on 21/04/2017.
 */
'use strict'

const ProductModel = require('./coneccion')

function getProductById(idProduct, render, printError) {
    UserModel.query(`SELECT * FROM productos p WHERE p.idProducto = ?`, idProduct ,(error, resultado, fields) => {
        return(error) ? printError(error): render(resultado[0])
    })
}

function getProducts(render, printError) {
    let seleccion = 'p.idProducto, p.nombre, p.descripcion, p.codigo, p.minimo, p.esBasico, c.nombre nombrec'
    ProductModel.query(`SELECT ${seleccion} FROM productos p INNER JOIN categoria c ON p.idCategoria = c.idCategoria` ,(error, resultado, fields) => {
        return(error) ? printError(error): render(resultado)
    })
}

function createProduct(product, render, printError) {
    ProductModel.query('INSERT INTO productos SET ?', product, (error, resultado, fields) => {
        return(error) ? printError(error): render()
    })
}

function updateProduct(product, render, printError) {
    UserModel.query('UPDATE productos p SET ? WHERE p.idProducto = ?', [product,product.idProducto], (error, resultado, fields) => {
        return(error) ? printError(error): render()
    })
}

module.exports = {
    getProductById,
    getProducts,
    createProduct,
    updateProduct
}