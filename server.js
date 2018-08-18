
//cookie
const [http,fs,url,qs]=[require( 'http'),require( 'fs'),require( 'url'),require( 'querystring')];

const parseCookies=(cookie='')=>
    cookie
    .split(';')
    .map(v=>v.split('='))
    .map(([k, ... vs])=>[k,vs.join('=')])
    .reduce((acc,[k,v])=>{
        acc[k.trim()]=decodeURIComponent(v);
        return acc;
    }, {});
    
http.createServer((req, res)=>{
    const cookies=parseCookies(req.headers.cookie);
    console.log(req.url, cookies);
    res.writeHead(200, {'Set-Cookie': 'mycookie=test' });
    res.writeHead(200, {'Set-Cookie': 'mycookie=test2' });
    res.end('Hello Cookie');
})
.listen(8082,()=>{
    console.log('8082 port');
});

http.createServer((req, res)=>{
    const cookies=parseCookies(req.headers.cookie);
    if(req.url.startsWith('/login')){
        const {query}=url.parse(req.url);
        const {name}=qs.parse(query);
        const expires=new Date();
        expires.setMinutes(expires.getMinutes()+5);
        res.writeHead(302, { //redirection to the Location
            Location: '/',
            'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        });
        res.end();
    } else if(cookies.name){
        res.writeHead(200, {'Content-Type':'text/html; charset=utf-8' });
        res.end(`${cookies.name}님 안녕하세요`);        
    }else{
        fs.readFile('./server4.html', (e,d)=>{
            if(e){
                throw e;
            }
            res.end(d);
        });
    }
})
.listen(8083,()=>{
    console.log('cookie 8083 port');
});

const session = {};

http.createServer((req, res)=>{
    const cookies=parseCookies(req.headers.cookie);
    if(req.url.startsWith('/login')){
        const {query}=url.parse(req.url);
        const {name}=qs.parse(query);
        const expires=new Date();
        expires.setMinutes(expires.getMinutes()+5);
        
        const randomInt=+new Date();
        session[randomInt]={
            name,
            expires,
        };
        
        
        res.writeHead(302, {
            Location: '/',
            'Set-Cookie': `session=${randomInt}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        });
        res.end();
    } else if(cookies.session && session[cookies.session].expires> new Date() ){
        res.writeHead(200, {'Content-Type':'text/html; charset=utf-8' });
        res.end(`${session[cookies.session].name}님 안녕하세요`);        
    }else{
        fs.readFile('./server4.html', (e,d)=>{
            if(e){
                throw e;
            }
            res.end(d);
        });
    }
})
.listen(8084,()=>{
    console.log('session cookie 8084 port');
});
