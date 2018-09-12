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
| GET    |/        || main page |
| GET    |/profile ||내 정보|
| GET    |/join    ||회원가입 페이지|
| POST   |/join    |이메일 닉네임 비밀번호|회원가입|
| POST   |/auth/login    |메일주소, 비밀번호|로컬 로그인|
| GET    |/auth/logout    ||로그아웃|
| GET    |/auth/kakao    ||카카오 로그인|
| GET    |/auth/kakao/callback    |카카오 회원 정보 (유저id, 메일주소)|카카오 로그인 결과|
| POST   |/post    |게시글|업로드한 게시글 저장|
| POST   |/post/img    |이미지|업로드한 이미지 저장|
| GET    |/post/hashtag    |태그|태그가 들어간 게시글|
| POST   |/user/:id/follow    |다른 유저의 id|유저를 팔로우함|
| GET    |/img/\*.\*        |파일명|이미지를 읽어옴|
| GET    |/\*.\*        |파일명|파일을 읽어옴|