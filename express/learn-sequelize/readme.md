# sequelize in express w MySQL

## 새 sequelize 프로젝트 생성

### express-generator로 새 프로잭트 생성
```
express learn-sequelize
```
[express-generator설치](../learn-express/readme.md)

### 패키지 설치
```
cd learn-sequelize
npm i
```

### 시퀄라이즈와 필요한 패키지 설치
```
npm i sequelize mysql2
npm i -g sequelize-cli
sequelize init
```

## MySQL 연걸
[app.js](./app.js)에 추가
```js
var sequelize=require('./models').sequelize;
...
sequelize.sync();
```

## MySQL 에 생성한 테이블을 모델로 정의
대응되는 자료형을 [./models](./models)에 추가한다.  
여기서는 users와 comments테이블을 사용.

## 테이블을 모델로 정의한 파일을 추가
[./models/index.js](./models/index.js)에 추가한다.

## 접속하는 환경설정
[./config/config.json](./config/config.json)에 DB에 접속할때 필요한 id와 비빌번호같은 정보를 입력.


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

## datatype
|mysql |sequelize|
|-|-|
|varchar() |STRING()|
|int() unsigned| INTEGER.UNSIGNED|
|tinyint() |BOOLEAN|
|text |TEXT|
|datetime |DATE|

## sequelize의 특징
Javascript를 SQL로 바꿔줌.  
여기에 사용한 MySQL뿐만 아니라 다른 DB와도 쓸 수 있음.  

## 기타
연습 삼아서 [sequelize.js]('./public/sequelize.js')에서 XMLHttpRequest대신 fetch를 사용함.