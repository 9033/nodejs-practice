const db=require('./models');
const XLSX=require('xlsx')

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
        await db.car.sync();
    }
};
r();

const pug=require('pug');
const http=require('http');
const fs=require('fs');

const getAllData = (table) => async () =>{
    let columns=[];
    const descTable=await table.describe();
    for(i in descTable){
        columns.push(i);
    }
    console.log(columns);          

    const o={};
    const datas=await table.findAll(o);
    let rows=[];
    for(i in datas){
        rows.push( datas[i].get() );
    }
    return {columns, rows}
}

const getUsers = async ()=>{
    const {columns, rows} = await getAllData(db.user)()
    return {columns, ren:rows}
}

const getRead = (res) => (func, callback) => {
    return func().then(callback)
    .catch(e=>{console.error(e);res.writeHead(404,'NOT FOUND')}).finally(()=>{res.end()})
}
/*
db를 수정하거나 삭제나 추가한후 새로고침 한다. 그외에 방법으로 응답으로 json을 받아서 다시 front에서 그려주는 방법이 있다.
*/
const server=http.createServer(function (req, res) {
    console.log('SERVER : res');
    if(req.method=='GET'){//cRud or serve static
        if(req.url=='/'){
            getRead(res)(getUsers, ({columns, ren})=>{
                    console.log('SERVER : render',ren);
                    res.writeHead(200, {'Content-Type':  'text/html' }); 
                    res.write(pug.renderFile('query.pug',{columns,r:ren}));
                }
            )
        }
        else if(req.url=='/json'){// json파일 출력.
            getRead(res)(getUsers, ({columns, ren})=>{
                    console.log('SERVER : render',ren);
                    res.writeHead(200, {'Content-Type':  'application/json' });                 
                    res.write( JSON.stringify(ren) );
                }
            )
        }
        else if(/^\/[^/\\:*?"<>|]+\.ods$/.test(req.url)){// ods파일 출력. // 윈도우 기준.
            getRead(res)(getUsers, ({columns, ren})=>{
                    console.log('SERVER : render',ren);
                    res.writeHead(200, {'Content-Type':  'application/vnd.oasis.opendocument.spreadsheet' });                 

                    let wb = XLSX.utils.book_new();
                    wb.SheetNames.push("user");
                    wb.Sheets['user'] = XLSX.utils.json_to_sheet(ren, {header:columns})
                    let ods = XLSX.write(wb, { bookType: 'ods', type: 'binary' });
                    // console.log(columns);
                    res.write( ods ,'binary');
                }
            )
        }
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
            if( b.hasOwnProperty('length') ){ //excel 업로드에 사용.
                for(let i = 0;i<b.length;i++){
                    c.forEach(f=>{
                        delete b[i][f];
                    });
                }
                console.log(b);
                db.user.bulkCreate(b)
                .then(r=>{
                    console.log('create ok');
                    res.end('POST ok!');
                })
                .catch(e=>{
                    console.error(e);
                    res.end('POST not ok!');
                });
            }
            else{
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
            }
        });
    }
});
server.listen(80, ()=>{
     console.log('SERVER : listen');
});
