import React, { useEffect } from 'react'
import {Link,useNavigate, useParams} from 'react-router-dom'
import '../App.css'

 const Nav = () => {
const params = useParams();
   const navigate=useNavigate();      //use to re-render Nav component when any changes happen in Nav component
  const auth=localStorage.getItem("user")
  console.log("paramater",params)

  const logout=()=>{
    localStorage.clear();
    navigate('/signup')
  }
 
  return (
    <div>  
          <img alt='logo' className='logo' src='https://i.pinimg.com/564x/85/85/69/858569f85aa4c2546d1007ce7351f952.jpg'></img>
           {auth? <ul className='nav-ul'>
            <li><Link to='/'>Products</Link></li>
            {params.id ?
            <li><Link to='/add'>Update product</Link></li>:<li><Link to='/add'>Add product</Link></li>}
            {/* <li><Link to='/update'>Update product</Link></li> */}
            <li><Link to='/profile'>Profile</Link></li>
            <li><Link to='/logout' onClick={logout} >Logout ({JSON.parse(auth).name})</Link></li>
            </ul>
            : <ul className='nav-ul nav-right'>
            <li><Link to='/signup'>Sign Up</Link></li>
            <li> <Link to='/login'>Login</Link></li>
            </ul>

        }
        
        
            {/* {auth?<li><Link to='/logout' onClick={logout} >Logout</Link></li> : <>
            <li><Link to='/signup'>Sign Up</Link></li>
            <li> <Link to='/login'>Login</Link></li> 
            </>} */}

        
    </div>
  )
}
export default Nav;
