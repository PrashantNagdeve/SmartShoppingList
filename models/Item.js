var mongoose=require('mongoose');
var Schema=mongoose.Schema;



var itemSchema=new Schema({
    email:{ type: String, required: true, unique: true },
    items:[ {
        name:String,
        purchase_date: [Date],
        diff_days_purchase:[Number] 

    }]
});

var Item=mongoose.model('Item',itemSchema);

module.exports=Item;
