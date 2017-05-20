/**
 * Created by Raul Perez on 22/04/2017.
 */
'use strict'

function printError(res, error) {
    try{
        console.log(error.msg)
        res.json(error)
    } catch (error){
        // no pasa nada
    }

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