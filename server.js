const express=require("express");
const bodyParser=require("body-parser")
const app=express();
app.use(bodyParser.urlencoded({extended:true}))
const mongoose=require("mongoose");
const { urlencoded, json } = require("body-parser");

const db="mongodb+srv://saiteja107:rsbWEZoph8fwRszv@cluster0.pupwcw8.mongodb.net/Users?retryWrites=true&w=majority"
mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log("Connectiojn success ")
}).catch((err)=>{
    console.log(err);})

const userSchema=new mongoose.Schema({
    email:String,
    password:String,
})
const user=mongoose.model("details",userSchema);
app.get("/home",(req,res)=>{
res.sendFile(__dirname+"/index.html")
})

app.post("/update",(req,res)=>{
    const user1=new user({email:req.body.email,password:req.body.password}).save().then(()=>{
        console.log("SAVED")
        res.sendFile(__dirname+"/sucess.html");
    }).catch((err)=>{
        console.log(err);
    })

})

app.get("/details",(req,res)=>{
    const d= user.findOne().then((data)=>{
        res.send(data)
    });
    // res.send(` Email is  : ${d.email}  password : ${d.password}`);
})

app.listen(3000,()=>{
    console.log("Connected To Server")
})