# mongoose in express w MongoDB

## 새 mongoose 프로젝트 생성

### express-generator로 새 프로잭트 생성
```
express learn-mongoose
```
[express-generator설치](../learn-express/readme.md)

### 패키지 설치
```
cd learn-mongoose
npm i
npm i mongoose
```

## MongoDB 연걸
[index.js](schemas/index.js)작성

## [app.js](app.js)와 연걸
```js
var connect=require('./schemas');
...
connect();
```

## 스키마 정의
[schemas](/schemas)에 정의한다.


## 기능

| http메서드   |      주소      |입력|  역할(출력) |
|-|-|-|-|
| GET |  / || main page |
| GET |  /users || 사용자 목록 (JSON)|
| POST | /users |이름,나이[,혼인] (JSON)| 사용자 등록 |
| GET |  /comments/:id || 사용자의 comment|
| POST |/comments  |사용자의 id, 내용 (JSON)|comment추가 |
| PATCH |/comments/:id  |바꿀 내용 (JSON)|comment수정 |
| DELETE |/comments/:id  ||comment제거 |
| GET |  기타 || 기타 파일 |

## 기타
