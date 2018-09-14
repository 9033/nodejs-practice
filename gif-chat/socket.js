const WebSocket=require('ws');

module.exports=(server)=>{
    const wss=new WebSocket.Server({server});

    wss.on('connection',(ws,req)=>{
        const ip=req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log(`${new Date()} 새로운 클라이언트 접속 ${ip}`);
        ws.on('message',msg=>{//when the msg received from client
            console.log(`${new Date()} ${msg}`);
        });
        ws.on('error',e=>{
            console.error(`${new Date()} ${e}`);
        });
        ws.on('close',()=>{
            console.log(`${new Date()} 클라이언트 접속 해제 ${ip}`);
            clearInterval(ws.interval)
        });
        const interval=setInterval(()=>{
            if(ws.readyState===ws.OPEN){
                console.log(`${new Date()} send msg`);
                ws.send('서버에서 클라이언트로 메시지를 보냅니다.');
            }
        },3000);
        ws.interval=interval;
    });
};