import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../App.css'

 const Login = () => {
const navigate=useNavigate();
const [email,setEmail]=useState('')
const [password,setPassword]=useState('')

useEffect(()=>{
    const auth=localStorage.getItem("user")
    if(auth){
        navigate('/')
    }
})

const handleLogin=async()=>{
    console.warn(email,password)
    let result=await axios.post("http://localhost:9000/login",{email,password})
     result=result.data
    console.warn("result iss iss",result.user)
    
    
    if(result.auth){
        localStorage.setItem("user",JSON.stringify(result.user))
        localStorage.setItem("token",JSON.stringify(result.auth))
        navigate("/")
    }
    else{
        alert("plz enter correct detail")
    }


}

  return (
    <div className='login'>
    <h1>Login</h1>
        <input type='text' className='inputBox' placeholder='Enter Email' onChange={(e)=>setEmail(e.target.value)}
        ></input>
        <input type='password' className='inputBox' placeholder='Enter Password' onChange={(e)=>setPassword(e.target.value)}
        ></input>
        <button className='app-button' onClick={handleLogin}>Login</button>
    </div>
  )
}
export default Login
