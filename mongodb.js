const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/Employee")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("error");
})

const regschema=new mongoose.Schema({
    email:{
    type:String,
    required:true
    },
    password:{
    type:String,
    required:true  
    },

})
const collection=new mongoose.model("Users",regschema)
module.exports=collection;