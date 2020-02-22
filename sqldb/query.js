const db=require('./models');

const r=async (init=false)=>{//db초기화
    if(init){/* db의 데이터를 초기화 */
        let ret=await db.user.sync({force:true});
        // // db에 초기값 지정.
        ret=await db.user.create({
            name:'first',
        });
        ret=await db.user.create({
            name:'second',
        });
    }
    else{/* db의 데이터를 그대로 사용. */        
        await db.user.sync();
    }
};
r();

const pug=require('pug');
const http=require('http');
const fs=require('fs');
/*
db를 수정하거나 삭제나 추가한후 새로고침 한다. 그외에 방법으로 응답으로 json을 받아서 다시 front에서 그려주는 방법이 있다.
*/
const server=http.createServer(function (req, res) {
    console.log('SERVER : res');
    if(req.method=='GET'){//cRud or serve static
        async function get(){
            try{
                let columns=[];
                const descusers=await db.sequelize.getQueryInterface().describeTable('users');
                for(i in descusers){
                    columns.push(i);
                }
                console.log(columns);          

                const o={};
                const users=await db.user.findAll(o);
                let ren=[];
                for(i in users){
                    ren.push( users[i].get() );
                }
                console.log('SERVER : render',ren);

                res.writeHead(200, {'Content-Type':  'text/html' }); 
                res.write(pug.renderFile('query.pug',{columns,r:ren}));
            }
            catch(e){
                console.error(e);
            }
            finally{
                res.end();
            }
        }
        if(req.url=='/')
            get();
        else {//serve file
            fs.readFile(`./public${req.url}`, (e,d)=>{
                if(e){
                    res.writeHead(404,'NOT FOUND');
                    return res.end('NOT FOUND');
                }
                res.end(d);
            });
        }
    }
    else if(req.method=='PATCH'){//crUd
        //수정
        // user.update        
        let body='';
        req.on('data',(d)=>{
            body+=d;
        });
        return req.on('end',()=>{
            const b=JSON.parse(body);
            console.log('PATCH 본문(body):',b);

            const o={};
            o[b.field]=b.toval;//한번에 한가지 컬럼만 수정이 가능.
            if(['id','createdAt','updatedAt','deletedAt'].every(v=>v!=b.field))//수정하려는 필드가 특정 필드가 아닐때
                db.user.update(o,  {where:{id:b.id}})
                .then(r=>{
                    console.log('update ok');
                    res.end('PATCH ok!');
                })
                .catch(e=>{
                    console.error(e);
                    res.end('PATCH not ok!');
                });
            else
                res.end('PATCH not ok!');
        });
    }
    else if(req.method=='DELETE'){//cruD
        let body='';
        req.on('data',(d)=>{
            body+=d;
        });
        return req.on('end',()=>{
            const b=parseInt(JSON.parse(body),10);
            console.log('DELETE 본문(body):',b);
            db.user.destroy({where:{id:b}})
            .then(r=>{
                console.log('destroy ok');
                res.end('DELETE ok!');
            })
            .catch(e=>{
                console.error(e);
                res.end('DELETE not ok!');
            });
        });
    }
    else if(req.method=='POST'){//Crud
        let body='';
        req.on('data',(d)=>{
            body+=d;
        });
        return req.on('end',()=>{
            const b=JSON.parse(body);
            console.log('POST 본문(body):',b);
            
            const c=['id','createdAt','updatedAt','deletedAt'];//삭제할 필드
            c.forEach(f=>{
                delete b[f];
            });
            console.log(b);
            db.user.create(b)
            .then(r=>{
                console.log('create ok');
                res.end('POST ok!');
            })
            .catch(e=>{
                console.error(e);
                res.end('POST not ok!');
            });
        });
    }
});
server.listen(80, ()=>{
     console.log('SERVER : listen');
});
