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
app.get('/',function(req,res){
    res.send("This is the first app");
});

var userservices=require('./Services/userService');

app.post('/user/addUser',(req,res)=>{
    userservices.addUser(req);
    
    res.send("success");
});