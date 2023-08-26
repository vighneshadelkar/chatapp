const mongoose=require('mongoose');

const msgSchema=new mongoose.Schema({
    msg:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

module.exports=mongoose.model("Message",msgSchema);