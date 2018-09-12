const jwt=require('jsonwebtoken');

exports.isLoggedIn=(req,res,next)=>{
    req.isAuthenticated()?next():res.status(403).send('로그인 필요');
};

exports.isNotLoggedIn=(req,res,next)=>{
    !req.isAuthenticated()?next():res.redirect('/');
};

exports.verifyToken=(req,res,next)=>{
    try{
        req.decoded=jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        return next();
    }
    catch(e){
        if(e.name==='TokenExpiredError'){
            return res.status(419).json({
                code:419,
                message:'토큰이 만료.',
            });
        }
        return res.status(401).json({
            code:401,
            message:'유효하지 않은 토큰.',
        });
    }
};