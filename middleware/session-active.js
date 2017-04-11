/**
 * Created by Raul Perez on 11/04/2017.
 */
module.exports = function(req,res,next){
    if(req.session.user){
        next()
    }else{
        res.redirect("/login")
    }
}