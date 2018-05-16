var express=require('express');
var app=express();
var port=4000;

//for database
var mongoose=require('mongoose');
var bodyParser=require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//starts listening
var dbService=require('./DBService/createDatabase');
app.listen(port,function(){
    console.log("Call started");
    dbService.createDB();
});


//default method

var userservices=require('./Services/userService');
var itemservices=require('./Services/itemService');

app.post('/user/addUser',(req,res)=>{
    userservices.addUser(req);
    
    res.send("success");
});

app.post('/user/addItems',(req,res)=>{
    itemservices.addItems(req);
    
    res.send("success");
});