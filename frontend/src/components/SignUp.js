import React,{useEffect, useState} from 'react'
import '../App.css'
import {json, useNavigate} from 'react-router-dom'


 const SignUp = () => {
     const navigate=useNavigate();
    const[name,setName]=useState("")
    const[lname,setLName]=useState("")
    const[password,setPassword]=useState("")
    const[email,setEmail]=useState("")

    useEffect(()=>{
      const auth=localStorage.getItem("user")
      if(auth){
        navigate("/")
      }
    })
    
    const collectData=async()=>{
        console.log(name,email,password)
         let result=await fetch("http://localhost:9000/register",{
          method:"post",
          body:JSON.stringify({name,lname,email,password}),
          headers:{ 'content-type':'application/json ' }
        })
        result=await result.json();
        console.warn(result)
        localStorage.setItem("user",JSON.stringify(result.result))
        localStorage.setItem("token",JSON.stringify(result.auth))
        if(result){
          navigate("/")
        }
    }
  return (
    <div className='Register'>
        <h1>Register</h1>
        <input className='inputBox' type='text' placeholder='Enter Name' value={name}
        onChange={(e)=>{setName(e.target.value)}}></input>
        <input className='inputBox' type='text' placeholder='Enter Last Name' value={lname}
        onChange={(e)=>{setLName(e.target.value)}}></input>
        <input className='inputBox' type='text' placeholder='Enter Email' value={email}
        onChange={(e)=>{setEmail(e.target.value)}}></input>
        <input className='inputBox' type='password' placeholder='Enter Password' value={password}
        onChange={(e)=>{setPassword(e.target.value)}}></input>
        <button  className='app-button' type='button' onClick={collectData}>Sign Up</button>
    </div>
  )
}

export default SignUp;
