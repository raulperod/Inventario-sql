/**
 * Created by Raul Perez on 12/04/2017.
 */
'use strict'

const CategoryModel = require('./coneccion')

function getCategoryById(idCategory, next) {
    CategoryModel.query('SELECT * FROM categorias WHERE idCategoria = ?', idCategory, (error, resultado, fields) => {
        next(error, resultado[0])
    })
}

function getIdCategoryByName(name, next) {
    CategoryModel.query('SELECT c.idCategoria FROM categorias c WHERE c.nombre = ?', name, (error, resultado, fields) => {
        next(error, resultado[0].idCategoria)
    })
}

function getCategories(next) {
    CategoryModel.query('SELECT * FROM categorias' , (error, resultado, fields) => {
        next(error, resultado)
    })
}

function getNamesOfCategories(next) {
    CategoryModel.query('SELECT nombre FROM categorias' , (error, resultado, fields) => {
        next(error, resultado)
    })
}

function createCategory(category, next) {
    CategoryModel.query('INSERT INTO categorias SET ?', category, (error, resultado, fields) => {
        next(error)
    })
}

function updateCategory(category, next) {
    CategoryModel.query('UPDATE categorias SET ? WHERE idCategoria = ?', [category,category.idCategoria], (error, resultado, fields) => {
        next(error)
    })
}

module.exports = {
    getCategoryById,
    getIdCategoryByName,
    getCategories,
    getNamesOfCategories,
    createCategory,
    updateCategory
}