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

const server=http.createServer(function (req, res) {
    console.log('SERVER : res');
    if(req.method=='GET'){//cRud or serve static
        async function get(){
            try{
                let fields=[];
                const descusers=await db.sequelize.getQueryInterface().describeTable('users');
                for(i in descusers){
                    //console.log(r[i],i);        
                    // ren.push(u[i].get());
                    fields.push(i);
                }
                console.log(fields);          

                const o={};
                const users=await db.user.findAll(o);
                // console.log(users.array());
                let ren=[];
                for(i in users){
                    // console.log(u[i]);        
                    ren.push( users[i].get() );
                }
                console.log('SERVER : render',ren);

                res.writeHead(200, {'Content-Type':  'text/html' }); 
                // res.write(pug.renderFile('query.pug',{fields:JSON.stringify(fields),r:JSON.stringify(ren)}));
                // res.write(pug.renderFile('query.pug',{fields:JSON.stringify(fields),r: JSON.stringify(ren).replace(/'/g,"\\'")  }));
                res.write(pug.renderFile('query.pug',{fields,r:ren}));
                // res.end();
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
            o[b.field]=b.toval;
            // user.save({where:{id:b.id}})
            if(['id','createdAt','updatedAt','deletedAt'].every(v=>v!=b.field))
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
            
            const c=['id','createdAt','updatedAt','deletedAt'];
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
