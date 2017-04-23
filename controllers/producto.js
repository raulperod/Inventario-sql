/**
 * Created by Raul Perez on 21/04/2017.
 */
'use strict'

const ProductModel = require('../models/producto'),
      CategoryModel = require('../models/categoria'),
      Utilidad = require('../ayuda/utilidad'),
      fs = require('fs'),
      xlstojson = require("xls-to-json-lc"),
      xlsxtojson = require("xlsx-to-json-lc"),
      excel = require('./excel')

function productsGet(req, res) {
    // buscas todos los productos
    ProductModel.getProducts( (error, productos) => { // si no hubo error
        (error) ? (
            Utilidad.printError(res, { msg: `Error al obtener los productos: ${error}`, tipo: 0})
        ) : (
            res.render('./products/manager', { productos, usuario: req.session.user })
        )
    })
}

function productsNewGet(req, res) {
    // busca el nombre de las categorias
    CategoryModel.getNamesOfCategories( (error, categorias) => { // si no hubo error
        (error) ? (
            Utilidad.printError(res, { msg: `Error al obtener las categorias: ${error}`, tipo: 0})
        ) : (
            res.render("./products/new",{ usuario: req.session.user, categorias })
        )
    })
}

function productsNewPost(req, res) {
    // variables necesarias
    let nombreCategoria = req.body.categoria
    // busco la categoria
    CategoryModel.getIdCategoryByName(nombreCategoria, (error, idCategoria) => {
        if(error){
            Utilidad.printError(res, { msg: `Error al buscar el id de la categoria: ${error}`, tipo: 0})
            return
        }
        // crea el nuevo producto
        let nuevoProducto = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            codigo: req.body.codigo,
            minimo: req.body.minimo,
            esbasico: req.body.basico === 'Si',
            idCategoria
        }
        // guarda el nuevo producto en la base de datos
        ProductModel.createProduct(nuevoProducto, error => { // si no hubo error al guardarlo
            return(error) ? (
                Utilidad.printError(res, { msg: `Error al guardar el nuevo producto: ${error}`, tipo: 1})
            ) : (
                res.redirect('/products')
            )
        })
    })
}

function productsIdProductoGet(req, res) {
    // declaro variables necesarias
    let usuario = req.session.user,
        idProducto = req.params.idProducto
    // busca el nombre de las categorias
    CategoryModel.getNamesOfCategories( (error, categorias) => { // si no hubo error
        if(error){
            Utilidad.printError(res, { msg: `Error al obtener las categorias: ${error}`, tipo: 0})
            return
        }
        // busco el producto a editar
        ProductModel.getProductById(idProducto, (error, productoUpdate) => { // si no hubo error
            (error) ? (
                Utilidad.printError(res, { msg: `Error al obtener el producto: ${error}`, tipo: 0})
            ) : (
                res.render("./products/update",{ usuario, categorias, productoUpdate })
            )
        })
    })
}

function productsIdProductoPut(req, res) {
    // variables necesarias
    let nombreCategoria = req.body.categoria,
        idProducto = req.params.idProducto
    // busca la categoria elegida
    CategoryModel.getIdCategoryByName(nombreCategoria, (error, idCategoria) => { // si no hubo error
        if(error){
            Utilidad.printError(res, { msg: `Error al buscar el id de la categoria: ${error}`, tipo: 0})
            return
        }
        // crea el producto ya editado
        let productoUpdate = {
            idProducto,
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            codigo: req.body.codigo,
            minimo: req.body.minimo,
            esbasico: req.body.basico === 'Si',
            idCategoria
        }
        // guarda el nuevo producto en la base de datos
        ProductModel.updateProduct(productoUpdate, error => { // si no hubo error al guardarlo
            (error) ? (
                Utilidad.printError(res, { msg: `Error al editar el producto: ${error}`, tipo: 1})
            ) : (
                res.redirect('/products')
            )
        })
    })
}

function productsIdProductoDelete(req, res) {

}

function excelGet(req, res) {
    res.render("./products/excel",{ usuario: req.session.user })
}

function excelPost(req, res) {
    let exceltojson

    excel.upload(req, res, err => {
        if(err){
            Utilidad.printError(res, { msg: `error inesperado: ${err}`, tipo: 1})
            return
        }
        if(!req.file){
            Utilidad.printError(res, { msg: `error inesperado: ${err}`, tipo: 1})
            return
        }
        // verifico la extencion del excel
        if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
            exceltojson = xlsxtojson;
        }else{
            exceltojson = xlstojson;
        }

        exceltojson({ input: req.file.path,  output: null, lowerCaseHeaders :true }, (err, productos) => {
            if( !err ) { // si no hubo error
                Utilidad.printError(res, { msg: err, tipo: 1})
                return
            }
            for (let producto of productos) {
                // variables necesarias
                let nombreCategoria = producto.categoria
                // busca la categoria elegida
                CategoryModel.getIdCategoryByName(nombreCategoria, (error, idCategoria) => { // si no hubo error
                    if(error){
                        Utilidad.printError(res, {msg: `Error al buscar el id de la categoria: ${error}`, tipo: 0})
                        return
                    }
                    // crea el nuevo producto
                    let nuevoProducto = {
                        nombre: producto.nombre,
                        descripcion: producto.descripcion,
                        codigo: producto.codigo,
                        minimo: producto.minimo,
                        esbasico: producto.basico.toLowerCase() === 'si',
                        idCategoria
                    }
                    // guarda el nuevo producto en la base de datos
                    ProductModel.createProduct(nuevoProducto, error => { // si no hubo error al guardarlo
                        if(error){
                            Utilidad.printError(res, {msg: `Error al guardar el nuevo producto: ${error}`, tipo: 2})
                            return
                        }
                    })
                })
            }
            res.json({ msg: 'Productos agregados correctamente', tipo: 3})
        })
    })
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