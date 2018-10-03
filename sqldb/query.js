/*
const { User }=require('./models');
//User.findAll({}).then((r)=>{console.log(r);});

async function a(){
    let r;
    //r=await User.findAll({});
    //console.log(r);

    r=await User.findAll({
        attributes:['name','married'],
    });
    // console.log(r);
    console.log((r[0].name));

};
a();
*/

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
    //console.log(ret);
    // ret=await user.findAll();
    // for(k in def)
    //     console.log(k);
    // console.log(ret[0].get('users'));
    //ret[0].get('users');
    // for(u in ret){
    //     console.log(JSON.stringify(ret[u]));
    // }
    // let ren=[];
    // for(i in ret){
    //     ren.push(ret[i].get());
    // }
    // console.log(JSON.stringify(ren));
    // ret=await user.find({where:{name:'느금마'}});
    // console.log(ret);
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
        // // const o={attributes:['id','name']};
        // let fields=[];
        // sequelize.getQueryInterface().describeTable('users')
        // .then(r=>{
        //     for(i in r){
        //         //console.log(r[i],i);        
        //         // ren.push(u[i].get());
        //         fields.push(i);
        //     }
        //     console.log(fields);
        // })
        // .catch(e=>{console.error(e);});
        
        // const o={};
        // user.findAll(o)
        // .then((u)=>{
        //     let ren=[];
        //     for(i in u){
        //         // console.log(u[i]);        
        //         ren.push(u[i].get());
        //     }
        //     console.log('SERVER : render',ren);
        //     res.writeHead(200, {'Content-Type':  'text/html' }); 
        //     res.write(pug.renderFile('query.pug',{r:JSON.stringify(ren)}));
        //     res.end();
        // }).catch(e=>{console.error(e);});
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
            // const id=+new Date();
            // users[id]=name;
            // res.writeHead(201);
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

    }
    else if(req.method=='POST'){

    }
});
server.listen(80, ()=>{
     console.log('SERVER : listen');
});


// await user.sync({force:true});

// await user.create({
//     name:'req.body.name',
//   })
//   .then(result=>{
//     console.log(result);
//     //res.status(201).json(result);    
//   })
//   .catch(e=>{
//     console.error(e);
//     //next(e);
//   });
// /*
// user.findAll()
// .then(users=>{
//     console.log(users);
//   //res.json(users)
// })
// .catch(e=>{
//   console.error(e);
//   //next(e);
// });
// */
