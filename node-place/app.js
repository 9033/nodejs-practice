const express=require('express');
const app=express();

const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const session=require('express-session');
const flash=require('connect-flash');
require('dotenv').config();

const indexRouters=require('./routes');

const connect=require('./schemas');

connect();

const sessionMiddleware=session({
    resave:false,
    saveUninitialized:false,
    secret:process.env.COOKIE_SECRET,
    cookie:{
        httpOnly:true,
        secure:false,
    },
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 8015);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(sessionMiddleware);
app.use(flash());

// app.use((req,res,next)=>{
//     if(!req.session.color){
//         const colorHash=new ColorHash();
//         req.session.color=colorHash.hex(req.sessionID);
//     }
//     next();
// });

app.use('/',indexRouters);

app.use((req,res,next)=>{
    const err=new Error('Not found');
    err.status=404;
    next(err);
});
app.use((err,req,res)=>{
    res.locals.message=err.message;
    res.locals.error=req.app.get('env') === 'development'?err:{};
    res.status(err.status || 500);
    res.render('error');
});

const server=app.listen(app.get('port'), ()=>{
    console.log(app.get('port'),'번 포트에서 대기 중');
});