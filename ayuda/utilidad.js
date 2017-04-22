/**
 * Created by Raul Perez on 22/04/2017.
 */
'use strict'

function printError(res, error) {
    console.log(error.msg)
    res.json(error)
}

function returnPromise(condicion, verdadero, falso) {
    return new Promise((resolve, reject) =>{
        return(condicion) ? resolve(verdadero) : reject(falso)
    })
}

module.exports = {
    printError,
    returnPromise
}