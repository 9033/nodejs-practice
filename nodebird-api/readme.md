# sns api server
웹 API 서버
## 환경
### Web server
+ node.js
### Framework
+ express
### DB
+ MySQL
### 설치가 필요햔 모듈
+ sequelize
+ mysql2
+ express
+ cookie-parser
+ express-session
+ morgan
+ connect-flash
+ pug
+ nodemon
+ dotenv
+ passport
+ passport-local
+ passport-kakao
+ bcrypt
+ uuid
+ jsonwebtoken
+ express-rate-limit
+ cors

## http methods
| http메서드   |      주소      |입력|  역할(출력) |
|-|-|-|-|
| GET    |/        |||
| GET    |/v1/token           ||(deprecated) |
| GET    |/v1/test            ||(deprecated)  |
| GET    |/v1/posts/my        ||(deprecated)  |
| GET    |/v1/posts/hashtag/:title        ||(deprecated)|
| GET    |/v2/token               ||토큰 발급|
| GET    |/v2/test                ||발급 된 토큰 테스트|
| GET    |/v2/posts/my            ||게시글 (JSON)|
| GET    |/v2/posts/hashtag/:title||태크를 넣은 게시글 (JSON)|
| GET    |/domain ||API call 서버의 도메인 등록|
| POST   |/auth/join    |이메일 닉네임 비밀번호|회원가입|
| POST   |/auth/login    |메일주소, 비밀번호|로컬 로그인|
| GET    |/auth/logout    ||로그아웃|
| GET    |/\*.\*        |파일명|파일을 읽어옴|