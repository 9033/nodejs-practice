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
| GET    |/good/:id||물건입찰 페이지|
| POST   |/good/:id/bid|물건, 입찰가격[, 메시지]|물건입찰|
| GET    |/list ||낙찰받은 내역|
| POST   |/auth/join    |이메일, 닉네임, 비밀번호, 돈|회원가입|
| POST   |/auth/login    |메일주소, 비밀번호|로컬 로그인|
| GET    |/auth/logout    ||로그아웃|
| GET    |/\*.\*    |파일명|파일|
| GET    |/img/\*.\*    |파일명|상품 사진|

## socket-io event
| 소켓이벤트   |      발생      |  역할(출력) |
|-|-|-|
|bid|입찰 했을때|입찰한 사람과 가격과 메시지|

## db tables
### users  
|필드명|역할|
|-|-|
|id|id|
|email|이메일|
|nick|닉네임|
|password|로그인 암호|
|money|가진 돈|
|createdAt|timestamps|
|updateAt|timestamps|
|deleteAt|timestamps|

### goods  
|필드명|역할|
|-|-|
|id|id|
|name|물건 이름|
|img|물건 사진의 파일명|
|price|시작 가격|
|createdAt|timestamps|
|updateAt|timestamps|
|deleteAt|timestamps|
|ownerId|등록자|
|soldId|낙찰자|

### auctions  
|필드명|역할|
|-|-|
|id|id|
|bid|입찰한 가격|
|msg|메시지|
|createdAt|timestamps|
|updateAt|timestamps|
|deleteAt|timestamps|
|userId|입찰자|
|goodId|입찰한 물품|

## 기타
