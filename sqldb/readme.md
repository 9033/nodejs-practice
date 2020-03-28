# Sequelize CUID on web
## 기능
브라우저로 db를 조작 가능.  
## 조작
- 추가 : 추가하기 버튼을 누르면 입력칸이 등장. 입력하고 추가를 누른다.  
- 수정 : 해당 값을 더블클릭하면 입력칸에 해당 값이 입력된 체로 나옴. 값을 고치고 수정 버튼을 누르면 값이 바뀜.  
- 삭제 : 오른쪽의 삭제 버튼을 누르면 해당 데이터가 삭제됨.  
## 동작
db의 내용을 JSON으로 받아서 변수에 저장.  
테이블의 컬럼에 각 레코드의 index와 필드명을 속성으로 넣음.  
변수에서 index를 활용해서 id같은 필드의 값을 읽음.  
id, createdAt, updateAt, deleteAt필드는 사용자가 값을 새로 넣거나 수정하지 못함.  

## http methods
| http메서드   |      주소      |입력|  역할(출력) |
|-|-|-|-|
| GET    |/ ||조회|
| GET    |/json ||조회(json)|
| GET    |/*.ods |파일명|조회(ods)|
| PATCH   |/    |json: {id, toval, fromval}|수정|
| POST    |/    |json: {컬럼명:값} |추가|
| DELETE    |/    |id|삭제|

## 실행
`node query.js`  
`nodemon query.js`  
