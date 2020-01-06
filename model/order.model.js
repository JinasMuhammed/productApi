//db schema
const mongoose =require('mongoose');
const schema = mongoose.schema;

//declaring collection schema property and names 
let order = new schema(
    {
        //schema property:values
        username:{type:String},
        address:{type:String},
        mobile:{type:String},
        orderinfo:{type:Array},
        orderstatus:{type:String},
        orderdate:{type:String}
    },
    {
        collection:'order'
    }
);
module.exports= mongoose.model('Order',Order)
