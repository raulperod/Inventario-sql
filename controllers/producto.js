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
    CategoryModel.getNamesOfCategories((error, categorias) => {
        if(!error){
            res.render('./products/manager', { usuario: req.session.user, categorias })        
        }
    })
}

function productsPost(req, res){
    let usuario = req.session.user,
        categoria = req.body.categoria
    // buscas todos los productos
    ProductModel.getProductsByCategory( categoria, (error, productos) => { // si no hubo error
        if(!error) res.send(productos)
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
            if(error){
                Utilidad.printError(res, { msg: `Error al obtener el producto: ${error}`, tipo: 0})
            }else{  
                req.session.productoUpdate = productoUpdate
                res.render("./products/update",{ usuario, categorias, productoUpdate })
            }
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
                if(productoUpdate.esbasico && !req.session.productoUpdate.esBasico){ 
                    generarBasicosEnUso(req, res, productoUpdate.codigo)
                }
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

            for( let i=0,contador=1331 ; i < productos.length ; i++,contador++ ){

                //console.log(`( ${i+1}, ${i+1}, ${1} ),`)
                //console.log(`( ${contador}, ${i+1}, ${2} ),`)    

                // variables necesarias
                let producto = productos[i],
                    nombreCategoria = producto.categoria
                // busca la categoria elegida
                CategoryModel.getIdCategoryByName(nombreCategoria, (error, idCategoria) => {
                    if(error || !idCategoria){ // si hubo error
                        Utilidad.printError(res, {msg: "Hubo error al agregar alguno de los productos", tipo: 2} )
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
                                // mando una alerta
                                Utilidad.printError(res, {msg: `Hubo error al agregar alguno de los productos: ${error}`, tipo: 2} )
                            } else {
                                // genera los almacenes
                                generarAlmacenes(req, res, producto.codigo)
                                // si el producto es basico, se generan los basicos en uso para las tecnicas
                                if(nuevoProducto.esbasico) generarBasicosEnUso(req, res, producto.codigo)
                                //console.log(`se agrego correctamente el producto: ${producto.codigo}`)
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
    ProductModel.getIdProductoByCode(productCode, (error, producto) => {
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
            sucursales.forEach(sucursal => generalAlmacen(req, res, sucursal.idSucursal, producto.idProducto))
        })
    })
}

function generalAlmacen(req, res, idSucursal, idProducto) {
    // genera el almacen para la sucursal y el producto
    let nuevoAlmacen = {
        idProducto,
        idSucursal
    }
    AlmacenModel.createAlmacen(nuevoAlmacen, error => {
        if(error) Utilidad.printError(res, {msg:`Error al crear el almacen: ${error}`, tipo: 1})
    })
}

function generarBasicosEnUso(req, res, productCode) {
    // busco el producto
    ProductModel.getIdProductoByCode(productCode, (error, producto) => {
        if(error){ // si no error
            Utilidad.printError(res, {msg:`Error al obtener el producto: ${error}`, tipo: 0})
        } else { // si no hubo error
            // obtengo el id de las tecnicas
            TecnicaModel.getAllIdTecnica((error, tecnicas) => {
                if(error){ // si hubo error
                    Utilidad.printError(res, {msg:`Error al obtener las tecsnicas: ${error}`, tipo: 0})
                } else { // si no hubo error
                    tecnicas.forEach(tecnica => generarBasicoEnUso(req, res, tecnica.idTecnica, producto.idProducto))
                }
            })
        }
    })
}

function generarBasicoEnUso(req, res, idTecnica, idProducto) {
    let basico = {
        idTecnica,
        idProducto,
        enUso: false
    }
    // compruebo que no haya basicoenuso repetido
    BasicoModel.getBasicoByProductAndTecnica(basico.idProducto, basico.idTecnica, (error, bas) => {
        if(bas || error){
            // no hago nada, ya existe    
            console.log(`Error, ya existe basico en uso`)
        }else{
            // guardo el basico en uso
            BasicoModel.createBasico(basico, error => {
                if(error) Utilidad.printError(res, {msg:`Error al crear el basico en uso: ${error}`, tipo: 0})
            })
        }
    })
}

module.exports = {
    productsGet,
    productsPost,
    productsNewGet,
    productsNewPost,
    productsIdProductoGet,
    productsIdProductoPut,
    productsIdProductoDelete,
    excelGet,
    excelPost
}
