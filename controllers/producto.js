/**
 * Created by Raul Perez on 21/04/2017.
 */
'use strict'

const ProductModel = require('../models/producto'),
      CategoryModel = require('../models/categoria'),
      SucursalModel = require('../models/sucursal'),
      AlmacenModel = require('../models/almacen'),
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
            if(error) {
                Utilidad.printError(res, {msg: `Error al guardar el nuevo producto: ${error}`, tipo: 1})
            } else {
                generarAlmacenes(req, res, nuevoProducto.nombre)
            }
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
            Utilidad.printError(res, { msg: `no hay archivo`, tipo: 1})
            return
        }
        // verifico la extencion del excel
        if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
            exceltojson = xlsxtojson;
        }else{
            exceltojson = xlstojson;
        }

        exceltojson({ input: req.file.path,  output: null, lowerCaseHeaders :true }, (err, productos) => {
            if( err ) { // si hubo error
                Utilidad.printError(res, { msg: "Error inesperado", tipo: 1})
                return
            }
            let contador = 0
            for( let i=0 ; i < productos.length ; i++ ){
                // variables necesarias
                let producto = productos[i],
                    nombreCategoria = producto.categoria
                // busca la categoria elegida
                CategoryModel.getIdCategoryByName(nombreCategoria, (error, idCategoria) => {
                    if(error || !idCategoria ){ // si hubo error
                        console.log(`Error al buscar el id de la categoria`)
                    } else {// si no hubo error
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
                                console.log(`Error al guardar el nuevo producto: ${error}`)
                            } else {
                                console.log(`se agrego correctamente el producto: ${nuevoProducto.nombre}`)
                                contador++
                            }
                            //( i === productos.length-1 && contador) ? :
                        })
                    }
                })
            }
        })
    })
}

function generarAlmacenes(req, res, productName) {
    // cuando se crea un producto, ese producto se registra en el almacen de cada sucursal
    // busco el producto agregado para obtener el id
    ProductModel.getIdProductoAndIdCategoriaByName(productName, (error, producto) => {
        if(error){ // si hubo error
            Utilidad.printError(res, { msg: `Error al obtener el id del producto: ${error}`, tipo: 0})
            return
        }
        // agregar el producto a las sucursales
        SucursalModel.getIdSucursalOfSucursales( (error, sucursales) => {
            if(error){ // si hubo error
                Utilidad.printError(res, {msg:`Error al obtener el id de las sucursales: ${error}`, tipo: 0})
                return
            }
            // genero un ciclo para generar el almacen de ese producto en cada sucursal
            for (let sucursal of sucursales){
                generalAlmacen(req, res, sucursal.idSucursal, producto)
            }
            // cuando termine de generar los almacenes
            res.redirect('/products')
        })
    })
}

function generalAlmacen(req, res, idSucursal, producto) {
    // genera el almacen para la sucursal y el producto
    let nuevoAlmacen = {
        idProducto: producto.idProducto,
        idCategoria: producto.idCategoria,
        idSucursal
    }
    AlmacenModel.createAlmacen(nuevoAlmacen, error => {
        if(error) Utilidad.printError(res, {msg:`Error al crear el almacen: ${error}`, tipo: 1})
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