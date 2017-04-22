/**
 * Created by Raul Perez on 21/04/2017.
 */
'use strict'

const ProductModel = require('./coneccion')

function getProducts(render, printError) {
    let seleccion = 'p.idProducto, p.nombre, p.descripcion, p.codigo, p.minimo, p.esBasico, c.nombre'
    ProductModel.query(`SELECT ${seleccion} FROM productos p INNER JOIN categoria c ON p.idCategoria = c.idCategoria` ,(error, resultado, fields) => {
        return(error) ? printError(error): render(resultado)
    })
}


module.exports = {
    getProducts
}