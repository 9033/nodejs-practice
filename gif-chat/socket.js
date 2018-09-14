const SocketIO=require('socket.io');

module.exports=(server)=>{
    const io=SocketIO(server,{path:'/socket.io'});

    io.on('connection',(socket)=>{
        const req=socket.request;
        const ip=req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log(`${new Date()} 새로운 클라이언트 접속 ${ip} ${socket.id} ${req.ip}`);
        socket.on('reply',d=>{
            console.log(`${new Date()} ${d}`);
        });
        socket.on('error',e=>{
            console.error(`${new Date()} ${e}`);
        });
        socket.on('disconnect',()=>{
            console.log(`${new Date()} 클라이언트 접속 해제 ${ip} ${socket.id}`);
            clearInterval(socket.interval);
        });
        socket.interval=setInterval(()=>{
            socket.emit('news','hello socketio');
        },3000);
    });
};