# auction
실시간 경매
## 환경
### Web server
+ node.js
### Framework
+ express

## http methods
| http메서드   |      주소      |입력|  역할(출력) |
|-|-|-|-|
| GET    |/ ||메인 (경매 목록, 로그인)|
| GET    |/join    ||회원가입 페이지|
| GET    |/good    ||물건등록 페이지|
| POST   |/good    |상품명, 상품사진, 시작가격|물건등록|
| POST   |/auth/join    |이메일 닉네임 비밀번호 돈|회원가입|
| POST   |/auth/login    |메일주소, 비밀번호|로컬 로그인|
| GET    |/auth/logout    ||로그아웃|
| GET    |/\*.\*    |파일명|파일|
| GET    |/img/\*.\*    |파일명|상품 사진|

## socket-io event
| 소켓이벤트   |      발생      |  역할(출력) |
|-|-|-|

## 기타
