# gif chatting with web socket
웹소켓을 이용한 gif채팅
## 환경
### Web server
+ node.js
### Framework
+ express
### 설치가 필요햔 모듈
+ express
+ connect-flash
+ express-session
+ pug
+ nodemon
+ dotenv
+ morgan
+ cookie-parser
+ ws
+ socket-io
+ mongoose
+ multer
+ axios
+ color-hash

## http methods
| http메서드   |      주소      |입력|  역할(출력) |
|-|-|-|-|
| GET    |/ ||메인 (방 목록)|
| GET    |/room ||방 생성 페이지|
| POST   |/room |제목, 인원[, 비번]|방 생성|
| GET    |/room/:id |[비번]|방 입장|
| DELETE |/room/:id ||방 삭제|
| POST   |/room/:id/chat |대화||
| POST   |/room/:id/gif |그림(gif)||

## socket-io event
| 소켓이벤트   |      발생      |  역할(출력) |
|-|-|-|
| newRoom    |서버|방이 새로 생성되면 발생|
| removeRoom    |서버|방을 제거하면 발생|
| chat    |서버|누가 그림이나 글을 올렸을때|
| exit    |서버|퇴장 알림|
| join    |서버|입장 알림|

## 기타
gif외에 다른 그림파일도 업로드가 가능.  
같은 이미지가 연속으로 안올라감.  
사용자의 아이디는 접속할때마다 임의로 생성됨.  
