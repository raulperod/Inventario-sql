/**
 * Created by Raul Perez on 11/04/2017.
 */
module.exports = function(req,res,next){
    let user = req.session.user
    if( user ){
        if( user.permisos < 2){
            next()
        }else{
            res.redirect("/almacen")
        }
    }else{
        res.redirect("/login")
    }
}
