function f(req,callback){
  return fetch(req)
  .then(res=>(res.status==200||res.status==201)?res:res.statusText)    
  .then(callback)
  .catch(e=>console.error('error',e));
}
// 사용자 이름 눌렀을 때 댓글 로딩
[].forEach.call(document.querySelectorAll('#user-list tr'), function (el) {
    el.addEventListener('click', function () {
      var id = el.querySelector('td').textContent;
      getComment(id);
    });
  });
  // 사용자 로딩
  function getUser() {
    f('/users', async res=>{
      var users = await res.json();
      console.log(users);
      var tbody = document.querySelector('#user-list tbody');
      tbody.innerHTML = '';
      users.map(function (user) {
        var row = document.createElement('tr');
        row.addEventListener('click', function () {
          getComment(user.id);
        });
        var td = document.createElement('td');
        td.textContent = user.id;
        row.appendChild(td);
        td = document.createElement('td');
        td.textContent = user.name;
        row.appendChild(td);
        td = document.createElement('td');
        td.textContent = user.age;
        row.appendChild(td);
        td = document.createElement('td');
        td.textContent = user.married ? '기혼' : '미혼';
        row.appendChild(td);
        tbody.appendChild(row);
      });
    });
  }
  // 댓글 로딩
  function getComment(id) {
    f('/comments/' + id, async res=>{
      var comments = await res.json();
      var tbody = document.querySelector('#comment-list tbody');
      tbody.innerHTML = '';
      comments.map(function (comment) {
        var row = document.createElement('tr');
        var td = document.createElement('td');
        td.textContent = comment.id;
        row.appendChild(td);
        td = document.createElement('td');
        td.textContent = comment.user.name;
        row.appendChild(td);
        td = document.createElement('td');
        td.textContent = comment.comment;
        row.appendChild(td);
        var edit = document.createElement('button');
        edit.textContent = '수정';
        edit.addEventListener('click', function () { // 수정 클릭 시
          var newComment = prompt('바꿀 내용을 입력하세요');
          if (!newComment) {
            return alert('내용을 반드시 입력하셔야 합니다');
          }
          let typejson=new Headers({'Content-Type': 'application/json'});
          let fvar={
            method:'PATCH',
            headers:typejson,
            body:JSON.stringify({ comment: newComment }),
          };
          let nreq=new Request('/comments/' + comment.id,fvar);
          f(nreq,async res=>{
            let text=await res.text();
            console.log(text);
            getComment(id);
          });
        });
        var remove = document.createElement('button');
        remove.textContent = '삭제';
        remove.addEventListener('click', function () { // 삭제 클릭 시
          let fvar={
            method:'DELETE',
          };
          let nreq=new Request('/comments/' + comment.id,fvar);
          f(nreq,async res=>{
            let text=await res.text();
            console.log(text);
            getComment(id);
          });
        });
        td = document.createElement('td');
        td.appendChild(edit);
        row.appendChild(td);
        td = document.createElement('td');
        td.appendChild(remove);
        row.appendChild(td);
        tbody.appendChild(row);
      });      
    });
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
  // 댓글 등록 시
  document.getElementById('comment-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var id = e.target.userid.value;
    var comment = e.target.comment.value;
    if (!id) {
      return alert('아이디를 입력하세요');
    }
    if (!comment) {
      return alert('댓글을 입력하세요');
    }
    let typejson=new Headers({'Content-Type': 'application/json'});
    let fvar={
      method:'POST',
      headers:typejson,
      body:JSON.stringify({ id: id, comment: comment }),
    };
    let nreq=new Request('/comments',fvar);
    f(nreq,async res=>{
      let text=await res.text();
      console.log(text);
      getComment(id);
    });
    e.target.userid.value = '';
    e.target.comment.value = '';
  });