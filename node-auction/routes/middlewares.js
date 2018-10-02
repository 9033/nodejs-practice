exports.isLoggedIn=(req,res,next)=>{
    if(req.isAuthenticated()){
        next();
    }
    else{
        req.flash('loginError','로그인 필요');
        res.redirect('/');
    }
};

exports.isNotLoggedIn=(req,res,next)=>{
    !req.isAuthenticated()?next():res.redirect('/');
};
