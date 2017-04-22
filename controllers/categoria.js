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
            res.redirect('/categories')
        )
    })
}

function categoriesIdCategoryGet(req, res) {
    let idCategory = req.params.idCategory
    // busco la categoria
    CategoryModel.getCategoryById(idCategory, (error, categoryUpdate) => { // si no hubo error
        (error) ? (
            Utilidad.printError(res, { msg: `Error al obtener la categoria: ${error}`, tipo: 0})
        ) : (
            res.render('./categories/update', { usuario: req.session.user, categoryUpdate })
        )
    })
}

function categoriesIdCategoryPut(req, res) {
    let categoriaUpdate = {
        idCategoria: req.params.idCategory,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion
    }
    // actualizo la categoria en la base de datos
    CategoryModel.updateCategory(categoriaUpdate, error => { // si no hubo error
        (error) ? (
            Utilidad.printError(res, { msg: `Error al actualizar la categoria: ${error}`, tipo: 1})
        ) : (
            res.redirect('/categories')
        )
    })
}

function categoriesIdCategoryDelete(req, res) {

}

module.exports = {
    categoriesGet,
    categoriesNewGet,
    categoriesNewPost,
    categoriesIdCategoryGet,
    categoriesIdCategoryPut,
    categoriesIdCategoryDelete
}