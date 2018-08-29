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