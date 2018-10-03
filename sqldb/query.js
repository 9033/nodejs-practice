const Sequelize = require('sequelize');
const sequelize=new Sequelize('database', 'username', 'password', {
    dialect: 'sqlite',
    //storage: 'db.sqlite',
    // logging: false,
});
const def={
    name:{
        type:Sequelize.STRING,
        allowNull:false,
        unique: true,
    },
    comment:{
        type:Sequelize.STRING,        
    },
};
const user=sequelize.define('user',def,{
    //timestamps:true,
});

r=async ()=>{
    let ret=await user.sync({force:true});
    //console.log(ret);
    ret=await user.create({
        name:'first',
    });
    ret=await user.create({
        name:'second',
    });
}
r();

var pug=require('pug');
var http=require('http');
const server=http.createServer(function (req, res) {
    console.log('SERVER : res');
    if(req.method=='GET'){
        async function get(){
            try{
                let fields=[];
                const descusers=await sequelize.getQueryInterface().describeTable('users');
                for(i in descusers){
                    //console.log(r[i],i);        
                    // ren.push(u[i].get());
                    fields.push(i);
                }
                console.log(fields);          

                const o={};
                const users=await user.findAll(o);
                // console.log(users.array());
                let ren=[];
                for(i in users){
                    // console.log(u[i]);        
                    ren.push(users[i].get());
                }
                console.log('SERVER : render',ren);

                res.writeHead(200, {'Content-Type':  'text/html' }); 
                res.write(pug.renderFile('query.pug',{fields:JSON.stringify(fields),r:JSON.stringify(ren)}));
                //res.write(pug.renderFile('query.pug',{fields,r:ren}));
                // res.end();
            }
            catch(e){
                console.error(e);
            }
            finally{
                res.end();
            }
        }
        get();
    }
    else if(req.method=='PATCH'){
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
                user.update(o,  {where:{id:b.id}})
                // user.update({ title: 'foooo', description: 'baaaaaar'},  {fields: [b.field],where:{id:b.id}})
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
    else if(req.method=='DELETE'){
        let body='';
        req.on('data',(d)=>{
            body+=d;
        });
        return req.on('end',()=>{
            const b=parseInt(JSON.parse(body),10);
            console.log('DELETE 본문(body):',b);
            user.destroy({where:{id:b}})
            .then(r=>{
                console.log('destroy ok');
                res.end('DELETE ok!');
            })
            .catch(e=>{
                console.error(e);
                res.end('DELETE not ok!');
            });
            res.end('DELETE ok!');
        });
    }
    else if(req.method=='POST'){
        let body='';
        req.on('data',(d)=>{
            body+=d;
        });
        return req.on('end',()=>{
            const b=JSON.parse(body);
            console.log('POST 본문(body):',b);
            
            const c=['id','createdAt','updatedAt','deletedAt'];
            //b=b.filter(t=>c.every(tt=>(tt!=t)));
            c.forEach(f=>{
                delete b[f];
            });
            console.log(b);
            // const o={};
            // o[b.field]=b.toval;

            user.create(b)
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
