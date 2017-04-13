/**
 * Created by Raul Perez on 12/04/2017.
 */
'use strict'

const CategoryModel = require('../models/category')

function categoriesGet(req, res) {
    let seleccion = ['*']
    // busco todas las categorias
    CategoryModel.getCategories(seleccion, categorias => { // si no hubo error
        res.render('./categories/manager', { categorias, usuario: req.session.user })
    }, error => { // si ocurrio un error
        console.log(`Error al obtener las categorias: ${error}`)
        res.redirect('/error')
    })
}

function categoriesNewGet(req, res) {
    res.render('./categories/new', { usuario: req.session.user })
}

function categoriesNewPost(req, res) {
    // creo la nueva categoria
    let nuevaCategoria = {
        nombre: req.body.nombre,
        description: req.body.description
    }
    // guardo la nueva categoria
    CategoryModel.createCategory(nuevaCategoria, () => { // si no hubo error
        res.redirect('/categorias')
    }, error => { // si ocurrio un error
        console.log(`Error al agregar la nueva categoria: ${error}`)
        // mando una alerta que ya existe ese nombre
        res.send('0')
    })
}

function categoriesIdCategoryGet(req, res) {
    let seleccion = ['*'],
        idCategory = req.params.idCategory
    // busco la categoria
    CategoryModel.getCategoryById(idCategory, seleccion, categoriaUpdate => { // si no hubo error
        res.render('./categories/update', { usuario: req.session.user, categoriaUpdate: categoriaUpdate[0] })
    }, error => { // si hubo un error
        console.log(`Error al obtener la categoria: ${error}`)
        res.redirect('/error')
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
        res.send('0')
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