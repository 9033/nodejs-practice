//mxhr('PUT','/users/'+key,JSON.stringify({name:name}),{'Content-Type':'application/json'});
function mxhr(method,url,send,header={}){
    return new Promise((res,rej)=>{
        let xhr=new XMLHttpRequest();
        xhr.onload=()=>{
            if(xhr.status==200||xhr.status==201){
                res(xhr);
            }
            else{
                rej(xhr);
            }
        };
        xhr.onerror=()=>{rej(xhr);};
        xhr.open(method,url);        
        for(let v in header){            
            xhr.setRequestHeader(v,header[v]);
        }
        xhr.send(send);
    });
}

function getUser(){
    function useronload(xhr){//refrash user list
        var users=JSON.parse(xhr.responseText);
        var list=document.getElementById('list');
        list.innerHTML='';
        Object.keys(users).map(function (key){
            var userDiv=document.createElement('div');
            var span=document.createElement('span');
            span.textContent=users[key];
            
            var edit=document.createElement('button');
            edit.textContent='수정';
            edit.addEventListener('click', function(){
                var name=prompt('바꿀 이름?');
                if(!name){
                    return alert('이름을 입력안해?');
                }
                mxhr('PUT','/users/'+key,JSON.stringify({name:name}),{'Content-Type':'application/json'})
                .then((res)=>{
                    console.log(res.responseText);
                    getUser();
                })
                .catch((rej)=>{
                    console.log(rej.responseText);
                });
            });
            
            var remove=document.createElement('button');
            remove.textContent='삭제';
            remove.addEventListener('click', function(){
                mxhr('DELETE','/users/'+key,'',{})
                .then((res)=>{
                    console.log(res.responseText);
                    getUser();
                })
                .catch((rej)=>{
                    console.log(rej.responseText);
                });
            });
            
            userDiv.appendChild(span);
            userDiv.appendChild(edit);
            userDiv.appendChild(remove);
            list.appendChild(userDiv);
        });
    }
    
    mxhr('GET','/users','',{})
    .then((res)=>{
        console.log(res.responseText);
        useronload(res);
    })
    .catch((rej)=>{
        console.error(rej.responseText);
    });
}
window.onload=getUser;

document.getElementById('from').addEventListener('submit',function(e){
    e.preventDefault();
    var name=e.target.username.value;
    if(!name){
        return alert('이름을 입력안해?');
    }
    mxhr('POST','/users',JSON.stringify({name:name}),{'Content-Type':'application/json'})
    .then((res)=>{
        console.log(res.responseText);
        getUser();
    })
    .catch((rej)=>{
        console.log(rej.responseText);
    });
    e.target.username.value='';
});