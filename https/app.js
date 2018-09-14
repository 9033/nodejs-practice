const express=require('express');
const path=require('path');

const app=express();
// app.set('port', 80);

app.use(express.static(path.join(__dirname,'public')));

app.use((req,res,next)=>{
    const err=new Error('Not found');
    err.status=404;
    next(err);
});
app.use((err,req,res)=>{
    res.locals.message=err.message;
    res.locals.error=req.app.get('env') === 'development'?err:{};
    res.status(err.status || 500);
    res.render('error');
});

// app.listen(app.get('port'), ()=>{
//     console.log(app.get('port'),'번 포트에서 대기 중');
// });
require('dotenv').config();
console.log(process.env);

require('greenlock-express').create({

    // Let's Encrypt v2 is ACME draft 11
    version: 'draft-11'
  
    // Note: If at first you don't succeed, switch to staging to debug
    // https://acme-staging-v02.api.letsencrypt.org/directory
//   , server: 'https://acme-v02.api.letsencrypt.org/directory'
  , server: 'https://acme-staging-v02.api.letsencrypt.org/directory'
  
    // Where the certs will be saved, MUST have write access
//   , configDir: '~/.config/acme/'
  , configDir: '.config/acme/'
  
    // You MUST change this to a valid email address
  , email: process.env.EmailAdr
  
    // You MUST change these to valid domains
    // NOTE: all domains will validated and listed on the certificate
  , approveDomains: [ 'localhost', 'www.localhost' ]
  
    // You MUST NOT build clients that accept the ToS without asking the user
  , agreeTos: true
  
  , app: require('express')().use('/', function (req, res) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      res.end('Hello, World!\n\n💚 🔒.js');
    })
//   , app
    // Join the community to get notified of important updates
  , communityMember: true
  
    // Contribute telemetry data to the project
  , telemetry: true
  
  //, debug: true
  
  }).listen(80, 443);