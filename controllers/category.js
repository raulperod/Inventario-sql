/**
 * Created by Raul Perez on 12/04/2017.
 */
'use strict'

const CategoryModel = require('../models/category')

function categoriesGet(req, res) {
    // busco todas las categorias
    CategoryModel.getCategories( categorias => { // si no hubo error
        res.render('./categories/manager', { categorias, usuario: req.session.user })
    }, error => { // si ocurrio un error
        console.log(`Error al obtener las categorias: ${error}`)
        res.json({ msg: `Error al obtener las categorias: ${error}`, tipo: 0})
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
    CategoryModel.createCategory(nuevaCategoria, () => { // si no hubo error
        res.redirect('/categories')
    }, error => { // si ocurrio un error
        console.log(`Error al agregar la nueva categoria: ${error}`)
        // mando una alerta que ya existe ese nombre
        res.json({ msg: `Error al agregar la nueva categoria: ${error}`, tipo: 1})
    })
}

function categoriesIdCategoryGet(req, res) {
    let idCategory = req.params.idCategory
    // busco la categoria
    CategoryModel.getCategoryById(idCategory, categoriaUpdate => { // si no hubo error
        res.render('./categories/update', { usuario: req.session.user, categoryUpdate: categoriaUpdate[0] })
    }, error => { // si hubo un error
        console.log(`Error al obtener la categoria: ${error}`)
        res.json({ msg: `Error al obtener la categoria: ${error}`, tipo: 0})
    })
}

function categoriesIdCategoryPut(req, res) {
    let categoriaUpdate = {
        idCategoria: req.params.idCategory,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion
    }
    // actualizo la categoria en la base de datos
    CategoryModel.updateCategory(categoriaUpdate, () => { // si no hubo error
        res.redirect('/categories')
    }, error => { // si hubo error
        console.log(`Error al actualizar la categoria: ${error}`)
        // como se repite el nombre, se manda una alerta
        res.json({ msg: `Error al actualizar la categoria: ${error}`, tipo: 1})
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