/**
 * Created by Raul Perez on 12/04/2017.
 */
'use strict'

const express = require('express'),
    CategoryController = require('../controllers/category'),
    category = express.Router()

category
    .get('/', CategoryController.categoriesGet )

category
    .route('/new')
    .get( CategoryController.categoriesNewGet )
    .post( CategoryController.categoriesNewPost )

category
    .route('/:idCategory')
    .get( CategoryController.categoriesIdCategoryGet() )
    .put( CategoryController.categoriesIdCategoryPut() )
    .delete( CategoryController.categoriesIdCategoryDelete() )

module.exports = category