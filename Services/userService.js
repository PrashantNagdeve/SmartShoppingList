
var User=require('../models/User');
function addUser(req)
{
    
   // console.log(userSchema.User.schema);
    var newUser=new User({
        email:req.body.email,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        password:req.body.password
    });
    //console.log(newUser);
    newUser.save((err)=>{
        if(err)
            console.log("Error is");
            console.log(err);
    })
}

module.exports={addUser};