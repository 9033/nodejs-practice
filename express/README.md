## express framework 를 이용

### [learn-express](learn-express)
express-generator를 이용해서 웹서버를 만든다.
익스프레스의 구조  
미들웨어, 라우팅  
템플릿 엔진 사용 (PUG)

### [learn-sequelize](learn-sequelize)
db를 통해서 사용자의 comment를 추가하고 삭제한다.
MySQL과 sequelize로 쿼리 수행

### [learn-mongoose](learn-mongoose)
MongoDB와 mongoose로 쿼리 수행

#### 사용자 등록 코드
* mongoose.pug  
사용자를 등록하는 html폼  
```pug
// 사용자 등록 form
form#user-form
    fieldset
        legend 사용자 등록
        div
            input#username(type="text" placeholder="이름")
        div
            input#age(type="number" placeholder="나이")
        div
            input#married(type="checkbox")
            label(for="married") 결혼 여부
        button(type="submit") 등록
```
* mongoose.js  
등록할 사용자의 데이터를 받아 전달.  
```js
// as AJAX
function f(req,callback){
    return fetch(req)
    .then(res=>(res.status==200||res.status==201)?res:res.statusText)    
    .then(callback)
    .catch(e=>console.error('error',e));
}
// 사용자 등록 시
document.getElementById('user-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var name = e.target.username.value;
    var age = e.target.age.value;
    var married = e.target.married.checked;
    if (!name) {
        return alert('이름을 입력하세요');
    }
    if (!age) {
        return alert('나이를 입력하세요');
    }
    let typejson=new Headers({'Content-Type': 'application/json'});
    let fvar={
        method:'POST',
        headers:typejson,
        body:JSON.stringify({ name: name, age: age, married: married }),
    };
    let nreq=new Request('/users',fvar);
    f(nreq,async res=>{
        let text=await res.text();
        console.log(text);
        getUser();
    });
    e.target.username.value = '';
    e.target.age.value = '';
    e.target.married.checked = false;
});
```
* users.js  
입력을 받아서 schema로 전달. 그리고 결과를 출력.  
```js
// 사용자 등록 메소드
router.post('/', function(req, res, next) {
    const user = new User({
        name:req.body.name,
        age:req.body.age,
        married:req.body.married,
    });
    user.save()
    .then(result=>{
        console.log(result);
        res.status(201).json(result);    
    })
    .catch(e=>{
        console.error(e);
        next(e);
    });
});
```
* user.js  
db에 들어갈 데이터를 정의
```js
// 사용자 등록 schema
const userSchema=new Schema({
    name:{
        type:String,
        required:true,
        unique: true,
    },
    age:{
        type: Number,
        required: false,
    },
    married:{
        type: Boolean,
        required: false,
    },
    comment:String,
    createdAt:{
        type: Date,
        default:Date.now,
    },        
});
```
* chrome webdriver, python  
홈페이지 테스트용
```py
# webdriver
def reguser(username,age,married):
    e=c.find_element_by_id('username')
    e.clear()
    e.send_keys(username)

    e=c.find_element_by_id('age')
    e.clear()
    e.send_keys(age)

    e=c.find_element_by_id('married')#checkbox
    if(e.is_selected()!=married):
        e.click()

    b=c.find_element_by_css_selector('#user-form button')
    
    b.submit()
    
testusers=[
    ['토르비온',59,'미혼'],
    ['노바',39,'미혼'],
    ['디바',19,'미혼'],
]
#reguser('결혼',59,True)
#reguser('결혼2',59,False)

#사용자목록을 리스트로 변환
rows=[]
users=c.find_elements_by_css_selector('#user-list tbody tr')
for user in users:
    cols=user.find_elements_by_css_selector('td')
    row=list(map(lambda col:col.text,cols))[1:4] #except ObjectId
    row[1]=int(row[1])
    rows.append(row)

#사용자목록에 추가한 사용자가 있는지 확인
for tu in testusers:
    if tu in rows:
        print( tu,' at ',rows.index(tu) )
    else:
        print( tu,' not in rows ')    
```