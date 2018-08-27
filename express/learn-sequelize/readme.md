## sequelize in express w MySQL

### 새 sequelize 프로젝트 생성

#### express-generator로 새 프로잭트 생성
```
express learn-sequelize
```
[express-generator설치](../readme.md)

#### 패키지 설치
```
cd learn-sequelize
npm i
```

#### 시퀄라이즈와 필요한 패키지 설치
```
npm i sequelize mysql2
npm i -g sequelize-cli
sequelize init
```

### MySQL 연걸
[app.js](./app.js)에 추가
```javascript
var sequelize=require('./models').sequelize;
...
sequelize.sync();
```

### MySQL 에 생성한 테이블을 모델로 정의
대응되는 자료형을 [./models](./models)에 추가한다.

### 정의한 파일을 추가
[./models/index.js](./models/index.js)에 추가한다.
