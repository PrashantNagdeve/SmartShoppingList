var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var userSchema=new Schema({
    email: { type: String, required: true, unique: true },
    firstName:String,
    lastName:String,
    password: { type: String, required: true }
});

//User table will be created in your database
var User=mongoose.model('User',userSchema);

module.exports=User;



