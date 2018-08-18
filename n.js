/*
a=(x,y)=>{ return x+y; };
b=(x,y)=>x+y;
c=c=>c+1;

e=(1)?9:8;
console.dir(a(1,2));
console.dir(b(1,2));
console.dir(c(1));
console.dir(e);

console.dir(this==global);

try{
    throw "a";
}
catch (e){
    console.error(e);
}
finally{
    console.log('c');
}
*/
/*
//var f1=function(){};
//var f2=()=>{};

var f={f1:function(){},f2:()=>{}};
//var f={f1:1,f2:2};

const {f1,f2} = f;

//console.dir(f1,{colors:true,depth:10});
//console.dir(f2,{colors:true,depth:10});
const util = require('util');
console.log( util.inspect(f1,{colors:true,depth:null,showHidden:true,showProxy:true}) );
console.log( util.inspect(f2,{colors:true,depth:null,showHidden:true,showProxy:true}) );

//console.log( f2() );
*/
/*
//promise

const condition = true;
const promise = new Promise((resolve, reject) =>{
    if(condition){
        resolve('성공');
    } else {
        reject('실패');
    }
});

promise
.then((message)=>{
    console.log(message);
    return new Promise((resolve,reject)=>{
        resolve(message);
    });
})
.then((message2)=>{
    console.log(message2);
    return new Promise((resolve,reject)=>{
        resolve(message2);
    });
})
.then((message3)=>{
    console.log(message3);
})
.catch((error)=>{
    console.error(error);
});


const promise1 = Promise.resolve('성공1');
const promise2 = Promise.resolve('성공2');
Promise
.all([promise1, promise2])
.then((result)=>{
    console.log(result);
})
.catch((error)=>{
    console.error(error);
});
*/
/*
const c=require('crypto');

//const hashes = c.getHashes();
//for (h in hashes){
//    console.log( hashes[h],c.createHash(hashes[h]).update('비밀번호').digest('base64'));
//    //console.log(d);
//}
const d=c.createHash('sha512').update('비밀번호').digest('base64');
console.log(d);
//console.log( c.getHashes() );
//console.log( c.getCiphers() );

const ciphers = c.getCiphers();
for (cc in ciphers){
    try{
        const cipher = c.createCipher(ciphers[cc], '열쇠');
        let result = cipher.update('문장','utf8','base64');
        result+=cipher.final('base64');
        //console.log(ciphers[cc],result);
        
        const decipher = c.createDecipher(ciphers[cc], '열쇠');
        let result2 = decipher.update(result,'base64','utf8');
        result2+=decipher.final('utf8');
        console.log(ciphers[cc],result,result2);
    }
    catch(e){
        console.error(e);
    }
}

//const cipher = c.createCipher('aes-256-cbc', '열쇠');
//let result = cipher.update('문장','utf8','base64');
//result+=cipher.final('base64');
//console.log(result);
*/
/*
const crypto = require('crypto');
const assert = require('assert');

// Generate Alice's keys...
const alice = crypto.createECDH('secp521r1');
const aliceKey = alice.generateKeys();

// Generate Bob's keys...
const bob = crypto.createECDH('secp521r1');
const bobKey = bob.generateKeys();

// Exchange and generate the secret...
const aliceSecret = alice.computeSecret(bobKey);
const bobSecret = bob.computeSecret(aliceKey);

//console.log( aliceKey.toString('base64') );
//console.log( aliceSecret );
//console.log( bobKey );
//console.log( bobSecret );
console.log( alice.getPrivateKey().toString('base64') );
console.log( alice.getPublicKey().toString('base64') );
//console.log( crypto.getCurves() );
//assert.strictEqual(aliceSecret.toString('hex'), bobSecret.toString('hex'));
// OK
*/
/*
const crypto = require('crypto');
const util = require('util');
const randomBytesPromise = util.promisify(crypto.randomBytes);
randomBytesPromise(64)
.then((buf)=>{
    console.log(buf.toString('base64'));
})
.catch((error)=>{
    console.error(error);
});

crypto.randomBytes(64, (err,buf)=>{
    console.log(buf.toString('base64'));
});

async function rb(){
    const rbp=await randomBytesPromise(64);
    console.log(rbp.toString('base64'));    
}
rb();
*/
/*
const fs=require('fs');
const rS=fs.createReadStream('./localhost-cert.pem',{highWaterMark:16});
const data=[];

rS.on('data',(c)=>{
    data.push(c);
    console.log('data :',c,c.length);
});

rS.on('end',()=>{    
    console.log('end :', Buffer.concat(data).toString());
});

rS.on('error',(e)=>{    
    console.error('error :', err);
});
*/
/*
const EventEmitter=require('events');

const myEvent=new EventEmitter();
myEvent.addListener('event1', ()=>{
    console.log('이벤트 1');
});
myEvent.on('event2', ()=>{
    console.log('이벤트 2');
});
myEvent.on('event2', ()=>{
    console.log('이벤트 2 추가');
});
myEvent.emit('event1');
myEvent.emit('event2');

myEvent.once('event3', ()=>{
    console.log('이벤트 3');
});

myEvent.emit('event3');
myEvent.emit('event3');


myEvent.on('event4', ()=>{
    console.log('이벤트 4');
});
myEvent.removeAllListeners('event4');
myEvent.emit('event4');

const listener=()=>{
    console.log('event5');
};
myEvent.removeListener('event5', listener);
myEvent.on('event5', listener);
myEvent.removeListener('event5', listener);
myEvent.emit('event5');

console.log(myEvent.listenerCount('event2'));

console.log(myEvent.listenerCount('error'));

myEvent.on('error', (e)=>{    
    console.error('error :', e);
});

myEvent.emit('error');
console.log(myEvent.listenerCount('error'));
*/

/*
setInterval( ()=>{
    console.log('시작');
    try{
        throw new Error('error error');
    } catch (e){
        console.error(e);
    }
}, 1000);
*//*
const fs=require('fs');

setInterval( ()=>{
    fs.unlink('./asdfdsaf', (e)=>{
        if(e){
            console.error(e);
        }
    });
}, 1000);*/

/*
process.on('uncaughtException', (e)=>{
    console.log('예기치 못한 에러', e);
});

setInterval(()=>{
    throw new Error('error 2');
}, 1000);

setTimeout(()=>{
    console.log('running');
}, 2000);
*/
