const {Router}=require("express")
const fs=require("fs")
const voter=Router()

voter.post("/create",(req,res)=>{
  fs.readFile("./db.json",{encoding:"utf-8"},(err,dat)=>{
     const parsed=JSON.parse(dat)
    
     parsed.users=[...parsed.users,req.body]
     
    

     fs.writeFile("./db.json",JSON.stringify(parsed),()=>{
       var pay={status:"user created",id:req.body.id}
      res.status(201).end(JSON.stringify(pay))
  })
      
  })
  
})

voter.post("/login",(req,res)=>{
  fs.readFile("./db.json",{encoding:"utf-8"},(err,dat)=>{
    const parsed=JSON.parse(dat)
    var flag=false
   var dat;
   var token=Math.random().toString();
    parsed.users.map(elem=>{
      if(elem.username==req.body.username){
        flag=true
        elem.token=token
      }
    })
    if(!flag){
      var payload={
        "status":"Invalid Credentials",
        

      }

      res.status(401).end(JSON.stringify(payload))
    }

 

    // console.log(JSON.stringify(dat))


    fs.writeFile("./db.json",JSON.stringify(parsed),()=>{
      var payload={
        "status":"Login Successfull",
        "token":token

      }
      res.end(JSON.stringify(payload))
      })
    // res.end("username added")
     
 })
  
})


voter.post("/logout",(req,res)=>{

 fs.readFile("./db.json",{encoding:"utf-8"},(err,dat)=>{
  const parsed=JSON.parse(dat)
  var new_data;
  parsed.users.map(elem=>{
    if(elem.token){
      delete elem["token"]; 
      new_data=parsed.users
     
    }

    res.write("data is on screen")

    res.end("data deleted")
   

    // fs.writeFile("./db.json",new_data,()=>{
    //   res.end(JSON.stringify({ status: "user logged out successfully" }))
    // })
    
  })



  // res.end(JSON.stringify(parsed.users))

 })

})


module.exports=voter