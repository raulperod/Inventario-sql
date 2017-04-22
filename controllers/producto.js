/**
 * Created by Raul Perez on 21/04/2017.
 */
'use strict'

const ProductModel = require('../models/producto'),
      CategoryModel = require('../models/categoria')

function productsGet(req, res) {
    // buscas todos los productos
    ProductModel.getProducts( productos => { // si no hubo error
        res.render('./products/manager', { productos, usuario: req.session.user })
    }, error => { // si ocurrio un error
        console.log(`Error al obtener los productos: ${error}`)
        res.json({ msg: `Error al obtener los productos: ${error}`, tipo: 0})
    })
}

function productsNewGet(req, res) {
    // busca el nombre de las categorias
    CategoryModel.getNamesOfCategories( categorias => { // si no hubo error
        res.render("./products/new",{ usuario: req.session.user, categorias })
    }, error => { // si hubo error
        console.log(`Error al obtener las categorias: ${error}`)
        res.json({ msg: `Error al obtener las categorias: ${error}`, tipo: 0})
    })
}

function productsNewPost(req, res) {

}

function productsIdProductoGet(req, res) {

}

function productsIdProductoPut(req, res) {

}

function productsIdProductoDelete(req, res) {

}

function excelGet(req, res) {
}

function excelPost(req, res) {

}

module.exports = {
    productsGet,
    productsNewGet,
    productsNewPost,
    productsIdProductoGet,
    productsIdProductoPut,
    productsIdProductoDelete,
    excelGet,
    excelPost
}