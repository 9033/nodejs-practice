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
    logging: false,
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
    user.findAll({attributes:['id','name']}).then((u)=>{
        let ren=[];
        for(i in u){
            // console.log(u[i]);        
            ren.push(u[i].get());
        }
        console.log('SERVER : render',ren);
        res.writeHead(200, {'Content-Type':  'text/html' }); 
        res.write(pug.renderFile('query.pug',{r:JSON.stringify(ren)}));
        res.end();
    }).catch(e=>{console.error(e);});
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
