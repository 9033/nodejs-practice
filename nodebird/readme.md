# sns
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
+ multer

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

## db tables
posts, hashtags, users, postHashtags, Follows  
+ users:posts 1:N  
사용자는 여러 포스트를 올림, 포스트는 한명의 사용자가 올림.  
+ posts:hashtags N:M, by postHashtags  
포스트는 여려개의 태그가 있음, 태그를 쓴 포스트는 여려개.  
+ users:users N:M, by Follows  
유저가 팔로잉하는 유저는 여렷, 유저를 팔로워하는 유저는 여럿.  

## 설명
유저 정보는 DB에 저장. 비밀번호는 암호화함.  
로컬로 로그인시 아이디와 비밀번호를 저장.  
카카오 로그인시 숫자로 된 유저의 id와 메일주소를 저장.  

## 기타
e-mail주소로 사용자를 구분한다. 그래서 로컬 로그인할때와 카카오 로그인할때 메일주소가 같으면 안됨.  
