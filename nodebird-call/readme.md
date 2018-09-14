# sns api call server
웹 API 호출 서버
## 환경
### Web server
+ node.js
### Framework
+ express
### 설치가 필요햔 모듈
+ express
+ cookie-parser
+ express-session
+ pug
+ nodemon
+ dotenv
+ bcrypt
+ axios

## http methods
| http메서드   |      주소      |입력|  역할(출력) |
|-|-|-|-|
| GET    |/ |||
| GET    |/mypost ||게시글을 출력|
| GET    |/search/:hashtag    ||해당하는 태그를 가진 게시물|
