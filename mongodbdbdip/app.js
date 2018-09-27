// require('dotenv').config();
//http://mongodb.github.io/node-mongodb-native/3.1/quick-start/quick-start/

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const mongourl = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';
let mongodbclient;
// // Use connect method to connect to the server
// MongoClient.connect(url, function(err, client) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");

//   const db = client.db(dbName);

//   // const c=db.collection('documents');
//   //   c.insert({c:1,name:'babo'},(e,r)=>{
//   //       c.find({}).toArray((e,r)=>{
//   //           console.log(e,r);
//   //           client.close();
//   //       });
//   //   });

// //   removeDocument(db, function() {
// //     findDocuments(db, function() {
// //         client.close();
// //       });
// //   });
// });
const insertDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Insert some documents
    collection.insertMany([
      {a : 1}, {a : 2}, {a : 3}
    ], function(err, result) {
      assert.equal(err, null);
      assert.equal(3, result.result.n);
      assert.equal(3, result.ops.length);
      console.log("Inserted 3 documents into the collection");
      callback(result);
    });
}
const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs)
      callback(docs);
    });
  }
const updateDocument = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Update document where a is 2, set b equal to 1
    collection.updateOne({ a : 2 }
        , { $set: { b : 1 } }, function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("Updated the document with the field a equal to 2");
        callback(result);
    });  
}
const removeDocument = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Delete document where a is 3
    collection.deleteOne({ a : 3 }, function(err, result) {
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      console.log("Removed the document with the field a equal to 3");
      callback(result);
    });    
  }



const  http =require( 'http');
const  https =require( 'https');
const fs=require('fs');
const url=require('url');
const qs=require('querystring');

//http.createServer([requestListener])
//http.get(options[, callback]) < http.request(options[, callback])

function logs(data,e=''){
    let t=new Date();
    let t_str=`${t.getFullYear()}-${t.getMonth()}-${t.getDay()}`
    +` ${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}:${t.getMilliseconds()}`
    +` ${t.getTimezoneOffset()}`;
    console.log(t_str);
    console.log(data);
    console.error(e);
}


const express=require('express');
const app=express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/',(req,res,next)=>{
  const db = mongodbclient.db(dbName);
  findDocuments(db,(docs)=>{
    console.log(docs);
    res.send(docs);
    res.end();
  });
});

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

const mongodbclient=new MongoClient(mongourl);
mongodbclient.connect(function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to db server");
  //mongodbclient=client;
  setTimeout(()=>server.close(),5000);
  // mongodbclient.on('serverClosed',event=>{
  //   console.log('serverclosed');
  // });
});

app.set('port',80);
const server=app.listen(app.get('port'), ()=>{
  console.log(app.get('port'),'번 포트에서 대기 중');
});
server.on('close', ()=>{
  mongodbclient.close();
  logs('SERVER : bye');
});

// mongodbclient.on('serverClosed',event=>{
//   console.log('serverclosed');
// });