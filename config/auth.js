module.exports.authenticate = function(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("errorMessage","Please Login");
    res.redirect('/users/login');
}

module.exports.notAuthenticate = function(req,res,next){
    if(!req.isAuthenticated()){
        return next();
    }
    res.redirect('/dashboard');
}
