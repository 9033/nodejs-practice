const express=require('express');

const Room=require('../schemas/room');
const Chat=require('../schemas/chat');

const router=express.Router();

router.get('/',async (req,res)=>{
    //res.render('index');
    try{
        const rooms=await Room.find({});
        res.render('main',{rooms, title:'gif 채팅방', error:req.flash('roomError')});
    }
    catch(e){
        console.error(e);
        next(e);
    }
});
router.get('/room', (req,res)=>{
    res.render('room',{title:'gif 채팅방 생성'});
});
router.post('/room',async (req,res,next)=>{
    try{
        const room=new Room({
            title:req.body.title,
            max:req.body.max,
            owner:req.session.color,
            password:req.body.password,
        });
        const newRoom=await room.save();
        const io=req.app.get('io');
        io.of('/room').emit('newRoom',newRoom);
        res.redirect(`/room/${newRoom._id}?password=${req.body.password}`);        
    }
    catch(e){
        console.error(e);
        next(e);
    }
});

router.get('/room/:id',async (req,res,next)=>{
    try{
        const room=await Room.findOne({_id:req.params.id});
        const io=req.app.get('io');
        if(!room){
            req.flash('roomError','읍는 방입니다');
            return res.redirect('/');
        }
        if(room.password&&room.password!==req.query.password){
            req.flash('roomError','비밀번호가 틀림');
            return res.redirect('/');
        }
        const {rooms}=io.of('/chat').adapter;
        if(rooms&&rooms[req.params.id]&&room.max<=rooms[req.params.id].length){
            req.flash('roomError','허용 인원을 초과함');
            return res.redirect('/');
        }
        const chats=await Chat.find({room:room._id}).sort('createdAt');
        return res.render('chat',{
            room,
            title:room.title,
            chats,
            user:req.session.color,
        });
    }
    catch(e){
        console.error(e);
        next(e);
    }
});
router.delete('/room/:id',async (req,res,next)=>{
    try{
        await Room.remove({_id:req.params.id});
        await Chat.remove({_id:req.params.id});
        res.send('ok');
        setTimeout(()=>{
            req.app.get('io').of('/room').emit('removeRoom', req.params.id);
        },2000);
    }
    catch(e){
        console.error(e);
        next(e);
    }
});
router.post('/room/:id/chat',async (req,res,next)=>{
    try{
        const chat=new Chat({
            room:req.params.id,
            user:req.session.color,
            chat:req.body.chat,
        });
        await chat.save();
        console.log(req.cookies.io);
        req.app.get('io').of('/chat').to(req.params.id).emit('chat',chat);
        // req.app.get('io').of('/chat').to(req.params.id).emit('exit',{chat:'흑우'});
        // req.app.get('io').to(req.cookies.io).emit('exit',{chat:'검은소'});
        res.send('ok');

      
        
    }
    catch(e){
        console.error(e);
        next(e);
    }
});

const multer=require('multer');

const path=require('path');
const fs=require('fs');
if( ! fs.existsSync('uploads') ){
    console.log('make directory "uploads"');
    fs.mkdirSync('uploads');
}
const upload=multer({
    storage:multer.diskStorage({
        destination(req, file, cb){
            cb(null,'uploads/');
        },
        filename(req,file,cb){
            const ext=path.extname(file.originalname);
            cb(null,path.basename(file.originalname, ext)+new Date().valueOf()+ext);            
        },        
    }),
    limits: {fileSize:5*1024*1024},
});
const upgif=function(req,res,next){
    upload.single('gif')(req,res,e=>{
            if(e){
                req.app.get('io').of('/chat').to(req.params.id).emit('exit',{
                    user:'system',
                    chat:'업로드 오류',
                });
                next(e);
                return false;
            }
            next();
        })
        
}

router.post('/room/:id/gif',upgif, async (req,res,next)=>{
    try{
        const chat=new Chat({
            room:req.params.id,
            user:req.session.color,
            //chat:req.body.chat,
            gif:req.file.filename,
        });
        await chat.save();
        req.app.get('io').of('/chat').to(req.params.id).emit('chat',chat);
        res.send('ok');
    }
    catch(e){
        console.error(e);
        next(e);
    }
});

module.exports=router;