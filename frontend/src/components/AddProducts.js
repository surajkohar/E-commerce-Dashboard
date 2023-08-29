import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

 const AddProducts = () => {
    const navigate=useNavigate()
    const[name,setName]=useState('')
    const[price,setPrice]=useState('')
    const[category,setCategory]=useState('')
    const[company,setCompany]=useState('')
    const[err,setErr]=useState(false)
    const[heading,setHeading]=useState(true)
     
    const params=useParams()
   
    if(params.id)
    {
      setHeading(false)
    }
   
    const addProduct=async()=>{
      // console.warn(!name)
      if(!name || !price || !category || !company){
        setErr(true)
        return false;
      }
        
        let userId=JSON.parse(localStorage.getItem("user"))._id;
        let result=await axios.post("http://localhost:9000/add-product",{name,price,category,company,userId,
        headers:{
          authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      }})
        console.log("result is ",result.data)
        
         navigate('/')
    }

  

  return (
    <>
    <div className='product'>
        <h1>Add Products</h1>
        <input type='text' placeholder='Enter Product name' className='inputBox' value={name}
          onChange={(e)=>{setName(e.target.value)}}/>
          {err && !name && <span className='invalid-input'>Enter valid name</span>}

        <input type='text' placeholder='Enter Product price'className='inputBox' value={price}
        onChange={(e)=>setPrice(e.target.value)}/>
         {err && !price && <span className='invalid-input'>Enter valid price</span>}

        <input type='text' placeholder='Enter Product category' className='inputBox' value={category}
        onChange={(e)=>setCategory(e.target.value)}/>
         {err && !category && <span className='invalid-input'>Enter valid category</span>}

        <input type='text' placeholder='Enter Product company' className='inputBox' value={company}
        onChange={(e)=>setCompany(e.target.value)}/>
         {err && !company && <span className='invalid-input'>Enter valid company</span>}

       { heading? <button className='app-button' onClick={addProduct}>Add Product</button>:
       <button className='app-button' onClick={addProduct}>Add Product</button> }
        </div>
    </>
  )
}

export default AddProducts;
