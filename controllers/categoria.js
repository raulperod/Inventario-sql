/**
 * Created by Raul Perez on 12/04/2017.
 */
'use strict'

const CategoryModel = require('../models/categoria'),
      Utilidad = require('../ayuda/utilidad')

function categoriesGet(req, res) {
    // busco todas las categorias
    CategoryModel.getCategories( (error, categorias) => { // si no hubo error
        (error) ? (
            Utilidad.printError(res, { msg: `Error al obtener las categorias: ${error}`, tipo: 0})
        ) : (
            res.render('./categories/manager', { categorias, usuario: req.session.user })
        )
    })
}

function categoriesNewGet(req, res) {
    res.render('./categories/new', { usuario: req.session.user })
}

function categoriesNewPost(req, res) {
    // creo la nueva categoria
    let nuevaCategoria = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion
    }
    // guardo la nueva categoria
    CategoryModel.createCategory(nuevaCategoria, error => { // si no hubo error
        (error) ? (
            Utilidad.printError(res, { msg: `Error al agregar la nueva categoria: ${error}`, tipo: 1})
        ) : (
            res.json({msg:"",tipo:3})
        )
    })
}

function categoriesIdCategoryGet(req, res) {
    let idCategory = req.params.idCategoria
    // busco la categoria 
    CategoryModel.getCategoryById(idCategory, (error, categoryUpdate) => { // si no hubo error
        if(error){
            Utilidad.printError(res, { msg: `Error al obtener la categoria: ${error}`, tipo: 0})
        }else{
            ( comprobarCategoria(categoryUpdate) ) ? (
                res.render('./categories/update', { usuario: req.session.user, categoryUpdate })
            ) : (
                res.redirect('/categories')
            ) 
        }
    })
    
}

function categoriesIdCategoryPut(req, res) {
    let categoriaUpdate = {
        idCategoria: req.params.idCategoria,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion
    }
    // actualizo la categoria en la base de datos
    CategoryModel.updateCategory(categoriaUpdate, error => { // si no hubo error
        (error) ? (
            Utilidad.printError(res, { msg: `Error al actualizar la categoria: ${error}`, tipo: 1})
        ) : (
            //res.redirect('/categories')
            res.json({msg:"",tipo:3})
        )
    })
}

function categoriesIdCategoryDelete(req, res) {
    let idCategoria = req.params.idCategoria
    // borramos la categoria
    CategoryModel.deleteCategory(idCategoria, error => {
        if(error) Utilidad.printError(res, {msg:`Error al borrar la categoria`, tipo: 0})
        res.redirect('/categories')
    })
}

function comprobarCategoria(categoria){
    try {
        return categoria.idCategoria != null
    } catch (error) {
        return false
    }
    
}

module.exports = {
    categoriesGet,
    categoriesNewGet,
    categoriesNewPost,
    categoriesIdCategoryGet,
    categoriesIdCategoryPut,
    categoriesIdCategoryDelete
}