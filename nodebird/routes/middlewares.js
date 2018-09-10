exports.isLoggedIn=(req,res,next)=>{
    req.isAuthenticated()?next():res.status(403).send('로그인 필요');
};

exports.isNotLoggedIn=(req,res,next)=>{
    !req.isAuthenticated()?next():res.redirect('/');
};