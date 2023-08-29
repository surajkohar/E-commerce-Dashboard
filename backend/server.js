const express = require("express")
const app = express()
const cors = require("cors")
require("./db/Config")
const User = require("./db/User")
const Product = require("./db/Product")
const bcrypt=require('bcrypt')
const Jwt=require('jsonwebtoken')
const  mongoose  = require("mongoose")
const jwtkey='e-comm'

app.use(express.json())
app.use(cors())

app.post("/abc", async (req, res) => {
    res.send("api is in progress")
    console.log("hiiiiiiiiiii")
})

app.post("/register", async (req, res) => {
    const post = req.body
    post.password=bcrypt.hashSync(post.password,12)
    let user = new User(post)
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    Jwt.sign({result},jwtkey,{expiresIn:"1h"},(err,token)=>{
        if(err){
           res.send({ result: "something went wrong" })
        }
        else{
           res.send({result,auth:token})
        }
       })
   
    
})

app.post("/login", async (req, res) => {
    let post = req.body;
    if (post.email != "" && post.password != "") {
        let user = await User.findOne({email:post.email})
        if(user){
            let matchPassword=bcrypt.compareSync(post.password, user.password);
             if(matchPassword ){
                 if (user != null) {
                     Jwt.sign({user},jwtkey,{expiresIn:"1h"},(err,token)=>{
                      if(err){
                         res.send({ result: "something went wrong" })
                      }
                      else{
                         res.send({user,auth:token})
                      }
                     })
                     
                    //  console.log("user is", user)
                 }
                 else {
                     res.send({ result: "no user found" })
                 }
                } else{
                    res.send({result:"no user found"})
                }
        }
        else{
            res.send({ result: "no user found" })
        }  
        
    }
    else {
        res.send({ result: "no user found" })
    }
})


app.post("/add-product",verifyToken, async (req, res) => {
    const post = req.body;
    console.log("post is", post)
    let product = new Product(post);
    let doc = await product.save()
    res.send(doc);
})

app.post("/products",verifyToken, async (req, res) => {
    //  console.log("post is ",req.body)
    let products = await Product.find();
    if (products.length > 0) {
        res.send(products)
    }
    else {
        res.send({ result: "no products find" })
    }

})

app.post("/delete/:id",verifyToken,async(req,res)=>{
    const post=req.params.id
    const result=await Product.deleteOne({_id:req.params.id})
    res.send(result)
})

app.post("/selectedData/:id",verifyToken,async(req,res)=>{
let result=await Product.findOne({_id:req.params.id})
if(result){
    res.send(result)
}
else{
    res.send({result:"No Record Found"})
}
})

app.put("/updateProduct/:id",verifyToken,async(req,res)=>{
    let result=await Product.updateOne({_id:req.params.id},{$set:req.body})
    res.send(result)
})

app.post("/search/:key",verifyToken,async(req,res)=>{
    let result=await Product.find({
        "$or":[
            { name:{$regex:req.params.key} },
            { category:{$regex:req.params.key} },
            { company:{$regex:req.params.key} },
            { price:{$regex:req.params.key} }
        ]
    })
    
        res.send(result)
    
   
})

function verifyToken(req,res,next){
    let token=req.body.headers['authorization']
    console.log("header ",req.body.headers)
    if(token){
        token=token.split(' ')[1]
        // console.log("token is",token)
        Jwt.verify(token,jwtkey,(err,valid)=>{
            if(err){
               res.status(401).send({result:"plz provide valid token"})
            }
            else{
                next()
            }
        })
    }
    else{
        res.status(403).send({result:"plz add token with header"})
    }
     
}

app.listen(9000, () => {
    console.log("Server is running on port 9000")
})


