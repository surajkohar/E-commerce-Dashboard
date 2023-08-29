import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

 const ProductList = () => {

    const [products,setProducts]=useState([]);

    useEffect(()=>{
        getProducts()
    },[])

    const getProducts=async()=>{
        let result=await axios.post("http://localhost:9000/products",{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        let data=result.data
        console.log("product list isss",data)
        setProducts(data)
    }

    const deleteProduct=async(id)=>{
    console.warn(id)
    const result=await axios.post(`http://localhost:9000/delete/${id}`,{
        headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
    })
    if(result){
        getProducts()
    }
    }

    const searchHandle=async(event)=>{
        let key=event.target.value;
        if(key){
            let result=await axios.post("http://localhost:9000/search/"+key,{
                headers:{
                    authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
            if(result){
                result=result.data
                setProducts(result)
            }
        }
        else{
            getProducts();
        }
        
    }

  return (
    <div className='product-list'>
        <h3>ProductList</h3>
        <input type='text' placeholder='search products' className='search-box' onChange={searchHandle}/>
        <ul>
            <li className='heading-list'>S. No</li>
            <li className='heading-list'>Name</li>
            <li className='heading-list'>Price</li>
            <li className='heading-list'>Category</li>
            <li className='heading-list'>Company</li>
            <li className='heading-list'>Operation</li>
        </ul>
        {
            products.length>0 ? products.map((item,index)=>{
                return(
                    <ul>
            <li >{index+1}</li>
            <li>{item.name}</li>
            <li>$ {item.price}</li>
            <li>{item.category}</li>
            <li>{item.company}</li>
            <li><button className='deleteBtn' onClick={()=>{deleteProduct(item._id)}}>Delete</button> 
            <Link  className='updateBtn' to={"/add/"+item._id}>Update</Link>
            </li>
        </ul>
                )
            })
            :<h2>No Result Found</h2>
        }
    </div>
  )
}

export default ProductList;
