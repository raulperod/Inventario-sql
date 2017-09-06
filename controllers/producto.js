/**
 * Created by Raul Perez on 21/04/2017.
 */
'use strict'

const ProductModel = require('../models/producto'),
      CategoryModel = require('../models/categoria'),
      SucursalModel = require('../models/sucursal'),
      AlmacenModel = require('../models/almacen'),
      TecnicaModel = require('../models/tecnica'),
      BasicoModel = require('../models/basico'),
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
                generarAlmacenes(req, res, nuevoProducto.codigo)
                // si el producto es basico, se generan los basicos en uso para las tecnicas
                if(nuevoProducto.esbasico) generarBasicosEnUso(req, res, nuevoProducto.codigo)
                // cuando termine de generar los almacenes
                //res.redirect('/products')
                res.json({msg:"",tipo:3})
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
                req.session.productoUpdate = productoUpdate,
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
            if(error) {
                Utilidad.printError(res, {msg: `Error al editar el producto: ${error}`, tipo: 1})
            } else {
                if(productoUpdate.esbasico && req.session.productoUpdate.esBasico == 0) generarBasicosEnUso(req, res, productoUpdate.nombre)
                // restablesco el productoUpdate
                req.session.productoUpdate = null
                //res.redirect('/products')
                res.json({msg:"",tipo:3})
            }
        })
    })
}

function productsIdProductoDelete(req, res) {
    let idProducto = req.params.idProducto
    // borras el producto
    ProductModel.deleteProduct(idProducto, error => {
        if(error) Utilidad.printError(res, {msg:`Error al borrar producto: ${error}`, tipo: 0})
        res.redirect('/products')
    })
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
            exceltojson = xlsxtojson
        }else{
            exceltojson = xlstojson
        }

        exceltojson({ input: req.file.path,  output: null, lowerCaseHeaders :true }, (err, productos) => {
            if( err ) { // si hubo error
                Utilidad.printError(res, { msg: "Error inesperado", tipo: 1})
                return
            }
            // borro el archivo excel
            fs.unlinkSync(req.file.path)

            let contador = 0,
                longitud = productos.length
            for( let i=0 ; i < longitud ; i++ ){
                // variables necesarias
                let producto = productos[i],
                    nombreCategoria = producto.categoria
                // busca la categoria elegida
                CategoryModel.getIdCategoryByName(nombreCategoria, (error, idCategoria) => {
                    if(error || !idCategoria){ // si hubo error
                        i = longitud // detengo el ciclo
                        Utilidad.printError(res, {msg: "Hubo error al agregar alguno de los productos", tipo: 2} )
                        res = null
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
                                i = longitud // detengo el ciclo
                                // mando una alerta
                                Utilidad.printError(res, {msg: `Hubo error al agregar alguno de los productos: ${error}`, tipo: 2} )
                                res = null
                            } else {
                                // genera los almacenes
                                generarAlmacenes(req, res, nuevoProducto.nombre)
                                // si el producto es basico, se generan los basicos en uso para las tecnicas
                                if(nuevoProducto.esbasico) generarBasicosEnUso(req, res, nuevoProducto.nombre)
                                console.log(`se agrego correctamente el producto: ${nuevoProducto.nombre}`)
                                contador++
                                // checa si hay error
                                if ( i === (longitud - 1) ){
                                    if(contador === 5){
                                        Utilidad.printError(res, {msg: "Se agregaron correctamente los productos", tipo: 3})
                                    }else{
                                        Utilidad.printError(res, { msg: "Hubo error al agregar alguno de los productos", tipo: 2})
                                    }
                                }
                            }
                        })
                    }
                })
            }
        })
    })
}

function generarAlmacenes(req, res, productCode) {
    // cuando se crea un producto, ese producto se registra en el almacen de cada sucursal
    // busco el producto agregado para obtener el id
    ProductModel.getIdProductoAndIdCategoriaByCode(productCode, (error, producto) => {
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
            sucursales.forEach(sucursal => generalAlmacen(req, res, sucursal.idSucursal, producto))
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

function generarBasicosEnUso(req, res, productCode) {
    // busco el producto
    ProductModel.getIdProductoAndIdCategoriaByCode(productCode, (error, producto) => {
        if(error){ // si no error
            Utilidad.printError(res, {msg:`Error al obtener el producto: ${error}`, tipo: 0})
        } else { // si no hubo error
            // obtengo el id de las tecnicas
            TecnicaModel.getIdTecnicasAndIdSucursales((error, tecnicas) => {
                if(error){ // si hubo error
                    Utilidad.printError(res, {msg:`Error al obtener las tecnicas: ${error}`, tipo: 0})
                } else { // si no hubo error
                    tecnicas.forEach(tecnica => generarBasicoEnUso(req, res, tecnica, producto.idProducto))
                }
            })
        }
    })
}

function generarBasicoEnUso(req, res, tecnica, idProducto) {
    let basico = {
        idSucursal: tecnica.idSucursal,
        idTecnica: tecnica.idTecnica ,
        idProducto,
        enUso: false
    }
    // guardo el basico en uso
    BasicoModel.createBasico(basico, error => {
        if(error) Utilidad.printError(res, {msg:`Error al crear el basico en uso: ${error}`, tipo: 0})
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
