var Item=require('../models/Item');

//to query a database, we need a connection with it
var url = "mongodb://localhost:27017/smartshoppinglist";
var mongoose=require('mongoose');

function addItems(req){
    //console.log(req.body);
    mongoose.connect(url,(err,db)=>{
        if(err)
        {
            console.log("Not able to connect");
        }
        else
        {
            //checking for a mail
            //console.log("Received email:"+req.body.email);
            var query={
                email:req.body.email
            }
            
            var searchResult=null;
            db.collection("items").find(query).toArray(function(err, result) {
                
                // before adding items, we need to know how many items are provided with our request
                //accessing the parameters sent from body
                
                var arrayOfItems=req.body.data;
                var lengthOfItems=arrayOfItems.length;
                
                //single item to send to db
               if(result.length==0)
                    {
                        var singleItems=[];
                        
                        for(var i=0;i<arrayOfItems.length;i++)
                        {
                           
                          var itemTemp={
                              "name":arrayOfItems[i].name,
                              "purchase_date":[arrayOfItems[i].purchase_date],
                              "diff_days_purchase":[7]
                                 }
                          singleItems.push(itemTemp);
                         }
                        
                       //console.log("Here I am");
                       //creating new item
                       var newEntry=new Item({
                           email:req.body.email,
                           items:singleItems
                       });

                       //saving new entry
                       //console.log(newEntry);
                       newEntry.save((err)=>{
                            if(err)
                                console.log("Item insertion failed");
                       });
                    }
                else
                {
                    
                   //if result has entry for an user 
                  

                    var updateItem=result[0];
                    console.log("Before :"+result[0].items[0].purchase_date);
                    for(var i=0;i<arrayOfItems.length;i++)
                    {
                        //to handle new items in request
                        var flag=false;
                        for(var j=0;j<result[0].items.length;j++)
                        {


                            //this adds the item only when it is already present in list of users,
                            //this does not work when user adds new items in the list along with other present itmes
                            //ex if cheese and milk are already in DB,
                            //when we add eggs,cheese and milk, eggs wont be added 
                            
                            if(arrayOfItems[i].name==result[0].items[j].name)
                            {
                                flag=true;
                                //if name passed by user and name returned from the db for item is same
                                // that means we are refering to the same item
                                console.log("Inside DB");
                                
                                var purchaseArray=updateItem.items[j].purchase_date;
                                var prevDate=new Date(purchaseArray[purchaseArray.length-1]);
                                var currDate=new Date(arrayOfItems[i].purchase_date);
                                var diff=findDaysBetweenDates(prevDate,currDate);
                                console.log("Difference between days:"+diff);
                                if(diff!=0)
                                {
                                    var formatedDate=new Date(arrayOfItems[i].purchase_date)
                                    updateItem.items[j].purchase_date.push(formatedDate);
                                    updateItem.items[j].diff_days_purchase.push(diff);
                                }
                                console.log("This is new :"+updateItem.items);
                            }
                        }
                        
                      
                    }
                    console.log("------------After updates--------------");
                    console.log(updateItem.items);
                    var newItem=new Item();
                    newItem.email=updateItem.email;
                    newItem.items=updateItem.items;


                   Item.update(query,{items:newItem.items},(err)=>{
                        if(err)
                          console.log("Failed to update item in Item Service-106");
                   });

                }
                
              });

            
        }

    });
}
function findDaysBetweenDates( date1, date2 ) {
    console.log(date1);
    console.log(date2);
    //Get 1 day in milliseconds
    var one_day=1000*60*60*24;

    // Convert both dates to milliseconds
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();

    // Calculate the difference in milliseconds
    var difference_ms = date2_ms - date1_ms;

    // Convert back to days and return
    return Math.round(difference_ms/one_day); 
  }
module.exports={addItems};