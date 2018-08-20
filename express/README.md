## express framework

#### express-generator 전역설치
```
npm i -g express-generator
```

#### 새 express 프로젝트 생성
```
express learn-express --view=pug
```

#### express 프로젝트가 있는 폴더로 이동, 패키지 설치.
```
cd learn-express && npm i
```

#### express 프로젝트를 실행.
```
npm start
```

### 미들 웨어

#### 커스텀 미들 웨어
```
app.use(function(req,res,next){
  console.log(req.url, '나도 미들웨어이다.');
  next();    
});
```

#### morgan
```
...
var logger = require('morgan');
...
app.use(logger('dev'));
...
```

#### body-parser
```
...
app.use(express.json());
app.use(express.urlencoded({ extended: false }));//false:querystring, true:qs
...
```

#### cookie-parser
```
...
var cookieParser = require('cookie-parser');
...
app.use(cookieParser());
...
```

#### static
```
...
app.use(express.static(path.join(__dirname, 'public')));
...
```

#### express-session
```
npm i express-session
```
```
...
var session=require('express-session');
...
app.use(session({
  resave:false,
  saveUninitialized: false,
  secret: 'secret code',
  cookie:{
    httpOnly:true,
    secure:false,
  },
}));
...
```