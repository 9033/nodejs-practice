function mxhr(method,url,send,headers={}){
    return fetch(url,{
        method,
        headers,
        body:send,
    })
    .then(res=>res);
}
function xmxhr(method,send,headers={}){
    mxhr(method,document.location.href,send,headers)
    .then(r=>{
        //서버에서 응답이 온 후에 리프레시
        console.log(r);
        document.location=document.location;
    }).catch(e=>{
        console.error(e);
    });
}


let modify=false;//추가 혹은 수정중?

//수정 버튼을 클릭
function clickupdate(e){
    const idx=e.target.parentNode.getAttribute('i')
    const id=r[idx]['id'];
    const field=e.target.parentNode.getAttribute('f');                
    const fromval=r[idx][field];
    const toval=e.target.previousSibling.value;

    xmxhr('PATCH',JSON.stringify({id,field,fromval,toval}));
}

//삭제 버튼을 클릭
function clickdel(e){
    if(modify)return modify;
    modify=true;
    document.querySelectorAll("button.add, button.del").forEach(c=>{c.disabled=true;});

    const id=e.target.parentNode.nextSibling.innerText;
    console.log(id);
    xmxhr('DELETE',JSON.stringify(id));
}
document.querySelectorAll("button.del").forEach(c=>{c.onclick=clickdel;});

//추가 버튼을 클릭
function adddata(e){
    e.target.disabled=true;

    let p={};
    document.querySelectorAll("input.add").forEach(c=>{p[c.name]=c.value;});
    xmxhr('POST',JSON.stringify(p));
}
//추가하기 버튼을 클릭
function clickadd(e){
    if(modify)return modify;
    modify=true;
    document.querySelectorAll("button.add, button.del").forEach(c=>{c.disabled=true;});
    document.querySelectorAll("input.add").forEach(c=>{c.disabled=false;});

    //추가 버튼
    const btn=document.createElement('button');
    btn.innerText='추가';
    btn.onclick=adddata;
    e.target.innerText='';
    e.target.appendChild(btn);
}
document.querySelectorAll("button.add").forEach(c=>{c.onclick=clickadd;});

//본문을 더블 클릭 -> 수정
function createinput(e){
    if(modify)return modify;
    modify=true;
    document.querySelectorAll("button.add, button.del").forEach(c=>{c.disabled=true;});
    
    e.target.ondblclick=null;

    //입력 박스
    const input=document.createElement('input');
    input.value=e.target.innerText;
    input.id="modify"
    e.target.innerText='';
    e.target.appendChild(input);

    //수정 버튼
    const btn=document.createElement('button');
    btn.innerText='수정';
    btn.onclick=clickupdate;
    e.target.appendChild(btn);

}
document.querySelectorAll(".cell").forEach(c=>{c.ondblclick=createinput;});
