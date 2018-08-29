# express framework

## 새 express 프로젝트 생성

### express-generator 전역설치
```
npm i -g express-generator
```

### 새 express 프로젝트 생성
```
express learn-express --view=pug
```

### express 프로젝트가 있는 폴더로 이동, 패키지 설치.
```
cd learn-express && npm i
```

### express 프로젝트를 실행.
```
npm start
```

## 미들 웨어

### 커스텀 미들 웨어
콘솔에 존재감을 표시함.
```javascript
app.use(function(req,res,next){
  console.log(req.url, '나도 미들웨어이다.');
  next();    
});
```

### morgan
로그를 출력함.
```javascript
...
var logger = require('morgan');
...
app.use(logger('dev'));
...
```

### body-parser
요청을 하는 본문의 데이터 형식을 해석.
```javascript
...
app.use(express.json());
app.use(express.urlencoded({ extended: false }));//false:querystring, true:qs
...
```

### cookie-parser
요청에 같이있는 쿠키를 해석.
```javascript
...
var cookieParser = require('cookie-parser');
...
app.use(cookieParser());
...
```

### static
정적인 파일을 제공. express에 포함.
```javascript
...
app.use(express.static(path.join(__dirname, 'public')));
...
```

### express-session
셰션 관리.
```
npm i express-session
```
```javascript
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

### connect-flash
일회성 메시지를 보여줌. 브라우저에서 한번 보면 없어짐.
```
npm i connect-flash
```
```javascript
...
var flash=require('connect-flash');
...
app.use(flash());
...
```

## 템플릿 엔진
```js
//app.js
app.set('view engine','pug');//pug사용시
```
```js
//app.js
app.set('view engine','ejs');//ejs사용시
```
PUG와 EJS 둘다 자바스크립트를 내부에 넣을 수 있다.

### PUG
html태그의 열고 닫힘을 위해 들여쓰기가 중요함.  
문법이 python, yaml과 비슷.

### EJS
html안에 구분자로 코드를 넣음. 마치 php같음.
```html
<!--PHP in HTML-->
<h1><?php echo $msg; ?></h1>
```
```html
<!--EJS in HTML-->
<h1><%= msg%></h1>
```
