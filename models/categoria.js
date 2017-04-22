/**
 * Created by Raul Perez on 12/04/2017.
 */
'use strict'

const CategoryModel = require('./coneccion')

function getCategoryById(idCategory, render, printError) {
    CategoryModel.query('SELECT * FROM categorias WHERE idCategoria = ?', idCategory, (error, resultado, fields) => {
        return(error) ? printError(error): render(resultado)
    })
}

function getIdCategoryByName(name, render, printError) {
    CategoryModel.query('SELECT c.idCategoria FROM categorias c WHERE c.nombre = ?', name, (error, resultado, fields) => {
        if(error) printError(error)
        else if(typeof resultado[0] === 'undefined') printError('no se encuentra')
        else render(resultado[0].idCategoria)
    })
}

function getCategories( render, printError) {
    CategoryModel.query('SELECT * FROM categorias' , (error, resultado, fields) => {
        return(error) ? printError(error): render(resultado)
    })
}

function getNamesOfCategories(render, printError) {
    CategoryModel.query('SELECT nombre FROM categorias' , (error, resultado, fields) => {
        return(error) ? printError(error): render(resultado)
    })
}

function createCategory(category, render, printError) {
    CategoryModel.query('INSERT INTO categorias SET ?', category, (error, resultado, fields) => {
        return(error) ? printError(error): render()
    })
}

function updateCategory(category, render, printError) {
    CategoryModel.query('UPDATE categorias SET ? WHERE idCategoria = ?', [category,category.idCategoria], (error, resultado, fields) => {
        return(error) ? printError(error): render()
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