const express=require("express")
const app=express()
const voter=require("./users/voter")
// const candidate=require("./users/candidate")
const fs=require("fs")
console.log();
// app.use()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use("/users",voter)

const PORT=process.env.PORT || 8080;

app.get(['/db',"/"], function(req, res){
    fs.readFile("./db.json","utf8",function(err, data){
        res.setHeader("content-type", "application/json");
        res.end(data);
    })
})



app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`)
})