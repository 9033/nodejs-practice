const SocketIO=require('socket.io');
const axios=require('axios');

module.exports=(server, app, sessionMiddleware)=>{
    const io=SocketIO(server,{path:'/socket.io'});

    // io.on('connection',(socket)=>{
    //     const req=socket.request;
    //     const ip=req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    //     console.log(`${new Date()} 새로운 클라이언트 접속 ${ip} ${socket.id} ${req.ip}`);
    //     socket.on('reply',d=>{
    //         console.log(`${new Date()} ${d}`);
    //     });
    //     socket.on('error',e=>{
    //         console.error(`${new Date()} ${e}`);
    //     });
    //     socket.on('disconnect',()=>{
    //         console.log(`${new Date()} 클라이언트 접속 해제 ${ip} ${socket.id}`);
    //         clearInterval(socket.interval);
    //     });
    //     socket.interval=setInterval(()=>{
    //         socket.emit('news','hello socketio');
    //     },3000);
    // });

    app.set('io',io);
    const room=io.of('/room');
    const chat=io.of('/chat');
    io.use((s,next)=>{
        sessionMiddleware(s.request,s.request.res,next);
    });
    room.on('connection',s=>{
        console.log(s.id, 'room에 접속');
        s.on('disconnect',()=>{
            console.log(s.id, 'room에 접속 해제');
        });
    });
    chat.on('connection',s=>{
        console.log(s.id, 'chat에 접속');
        const req=s.request;
        const {headers:{referer}}=req;
        const roomId=referer.split('/')[referer.split('/').length-1].replace(/\?.+/,'');
        console.log(s.id);
        s.join(roomId);
        s.to(roomId).emit('join',{
            user:'system',
            chat:`${req.session.color}님이 입장하셨습니다`,
        });
        s.on('disconnect',()=>{
            console.log('chat에 접속 해제');
            s.leave(roomId);
            const currentRoom=s.adapter.rooms[roomId];
            const userCount=currentRoom?currentRoom.length:0;
            if(userCount===0){
                axios.delete(`http://localhost/room/${roomId}`)
                .then(()=>{
                    console.log('방 제거 요청 성공');
                })
                .catch(e=>{
                    console.error(e);
                });
            }
            else{
                s.to(roomId).emit('exit',{
                    user:'system',
                    chat:`${req.session.color}님이 퇴장 하셨습니다`,
                });
            }
        });

    });
};