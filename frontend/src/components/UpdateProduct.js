import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

 const UpdateProduct = () => {
    const navigate=useNavigate()
    const[name,setName]=useState('')
    const[price,setPrice]=useState('')
    const[category,setCategory]=useState('')
    const[company,setCompany]=useState('')
    const[err,setErr]=useState(false)
    const params=useParams();

    useEffect(()=>{
     
      console.warn(params)
      getProductDetails();
    },[])

    const getProductDetails=async()=>{
   let result=await axios.post("http://localhost:9000/selectedData/"+params.id,{
    headers:{
      authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
  }
   })
  //  let result=await axios.post(`http://localhost:9000/selectedData/${params.id}`)
     const selectedData=result.data
  //  console.log("result data :",selectedData)
   setName(selectedData.name)
   setCategory(selectedData.category)
   setCompany(selectedData.company)
   setPrice(selectedData.price)
  
    }
   
   
    const UpdateProduct=async()=>{
      // console.warn(!name)
      if(!name || !price || !category || !company){
        setErr(true)
        return false;
      }
        
        let result=await axios.put(`http://localhost:9000/updateProduct/${params.id}`,{name,price,category,company,
        headers:{
          authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      }})
        console.log("result is ",result.data)  
        navigate('/')
    }

  return (
    <>
    <div className='product'>
        <h1>Update Products</h1>
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

        <button className='app-button' onClick={UpdateProduct}>Update Product</button>
    </div>
    </>
  )
}

export default UpdateProduct;
