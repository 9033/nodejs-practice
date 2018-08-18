const [http,fs]=[require( 'http'),require( 'fs')];

const users={};

http.createServer((req, res)=>{
    const a=(p)=>
        fs.readFile(p,(e,d)=>{
            if(e){
                throw e;
            }
            res.end(d);
        });
        
    if(req.method==='GET'){
        if(req.url==='/'){
            return a('./restFront.html');
        }else if(req.url==='/about'){
            return a('./about.html');
        }else if(req.url==='/users'){
            return res.end(JSON.stringify(users));
        }
        return fs.readFile(`.${req.url}`,(e,d)=>{
            if(e){
                res.writeHead(404,'NOT FOUND');
                return res.end('NOT FOUND');
            }
            res.end(d);
        });
    } else if(req.method==='POST'){//사용자 추가
        if(req.url==='/users'){
            let body='';
            req.on('data',(d)=>{
                body+=d;
            });
            return req.on('end',()=>{
                console.log('POST 본문(body):',body);
                const {name}=JSON.parse(body);
                const id=+new Date();
                users[id]=name;
                res.writeHead(201);
                res.end('등록성공');
            });
        }
    } else if(req.method==='PUT'){//사용자 수정
        if(req.url.startsWith('/users/')){
            const key=req.url.split('/')[2];
            let body='';
            req.on('data',(d)=>{
                body+=d;
            });
            return req.on('end',()=>{
                console.log('POST 본문(body):',body);
                users[key]=JSON.parse(body).name;
                return res.end(JSON.stringify(users));
            });
        }
    } else if(req.method==='DELETE'){//사용자 제거
        if(req.url.startsWith('/users/')){
            const key=req.url.split('/')[2];
            delete users[key];
            return res.end(JSON.stringify(users));
        }
    }
    res.writeHead(404,'NOT FOUND');
    return res.end('NOT FOUND');    
})
.listen(8085,()=>{
    console.log('8085 port');
});

