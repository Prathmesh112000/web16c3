const {Router}=require("express")
const fs=require("fs")
const candidate=Router()


candidate.post("/create",(req,res)=>{
    fs.readFile("./db.json",{encoding:"utf-8"},(err,dat)=>{
       const parsed=JSON.parse(dat)
      
       parsed.users=[...parsed.users,req.body]
       console.log(parsed.todos);
      
  
       fs.writeFile("./db.json",JSON.stringify(parsed),()=>{
        res.end("candidate added in db.json")
    })
        
    })
    
  })


 