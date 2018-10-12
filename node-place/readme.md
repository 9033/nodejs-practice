# auction
google map api  
## 환경
### Web server
+ node.js  
### Framework
+ express  
### API
+ Google places API  
+ Google maps API  
## http methods
| http메서드   |      주소      |입력|  역할(출력) |
|-|-|-|-|
| GET    |/ ||메인|
| GET    |/autocomplete/:query ||검색어 자동완성|
| GET    |/search/:query ||검색 결과 페이지|

## db tables
### favorite  
|필드명|역할|
|-|-|
|placeId||
|name|장소명|
|location|위치|
|createdAt|생성 시간|
### history
|필드명|역할|
|-|-|
|query|검색어|
|createdAt|생성 시간|

## 기타
result.pug에서 api키를 변수로 입력 받음.  
google cloud platform을 사용한다.  
