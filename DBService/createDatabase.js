
var url = "mongodb://localhost:27017/smartshoppinglist";

var mongoose=require('mongoose');


function createDB(){
    
    mongoose.connect(url,(err,res)=>{
        if(err)
            console.log("Unable to connect to db");
        else console.log("Connected to DB");
    });

      
}

module.exports={createDB};