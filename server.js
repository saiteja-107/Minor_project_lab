const express=require("express")
const app=express();
const bodyParser=require("body-parser")
const ejs=require("ejs")
const mongoose=require("mongoose")
app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine","ejs")
mongoose.connect('mongodb://localhost:27017/wikiDB',{useNewUrlParser:true});
const articleSchema=mongoose.Schema({
    title:String,
    content:String,
})
const Article=mongoose.model("Article",articleSchema)
app.route('/articles')
.get((req,res)=>{ Article.find((err,result)=>{
    res.send(result)
})})
.post((req,res)=>{const title=req.body.title;
    const content=req.body.content;
    console.log("Title = "+title)
    console.log("Content = "+content)
    const model1=new Article({
        title:title,
        content:content,
    })
    model1.save((err)=>{
        if(!err){
            res.send("No error")
        }
        else{
            res.send("Error")
        }
    })})
.delete((req,res)=>{
        Article.deleteMany((err)=>{
            if(!err){
                res.send("Deleted ")
            }
            else{
                res.send("Unable to delete Something went wrong ");
            }
        })
    });


app.route("/articles/:articletitle")
.get((req,res)=>{
    const articletitle=req.params.articletitle;
    Article.findOne({title:articletitle},(err,result)=>{
        if(result){
            res.send(result)
        }
        else{
            res.send("No articel ")
        }
    })
})
.put((req,res)=>{
    const articletitle=req.params.articletitle;

    // Use replaceOne for updating 
    Article.replaceOne({title:articletitle},{title:req.body.title,content:req.body.content} ,{overwrite:true},(err)=>{
        if(!err){
            res.send("updated sucess fuly")
        }
        else{
            res.send("Dome thoing went wrong "+err)
        }
    })
})
// app.get("/articles",(req,res)=>{
//     Article.find((err,result)=>{
//         res.send(result)
//     })
// })
// app.post("/articles",(req,res)=>{
//     const title=req.body.title;
//     const content=req.body.content;
//     console.log("Title = "+title)
//     console.log("Content = "+content)
//     const model1=new Article({
//         title:title,
//         content:content,
//     })
//     model1.save((err)=>{
//         if(!err){
//             res.send("No error")
//         }
//         else{
//             res.send("Error")
//         }
//     })

// })
// app.delete("/articles",(req,res)=>{
//     Article.deleteMany((err)=>{
//         if(!err){
//             res.send("Deleted ")
//         }
//         else{
//             res.send("Unable to delete Something went wrong ");
//         }
//     })
// })

app.listen(3000,()=>{
    console.log("Server Started")
})