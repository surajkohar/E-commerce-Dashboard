
import React, { useEffect, useState } from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import SignUp from './components/SignUp'
import Login from './components/Login'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import AddProducts from './components/AddProducts'
import ProductList from './components/ProductList'
import PrivateComponent from './components/PrivateComponents'
import UpdateProduct from './components/UpdateProduct'

const App=()=>{
// const navigate=useNavigate();

  return(
    <>
     <div className='App'>
     <BrowserRouter>
     <Nav/>
      <Routes>

      <Route element={ <PrivateComponent/> }>
        <Route path='/' element={<ProductList/>}/>
        <Route path='/add' element={ <AddProducts/> }/>
        <Route path='/add/:id' element={<UpdateProduct/>}/>
        <Route path='/logout' element={<SignUp />}/>
        <Route path='/profile' element={<h1>Profile component</h1>}/>
      </Route>

      <Route path='/signup' element={ <SignUp /> }/>
      <Route path='/login' element={<Login/>}></Route>
      </Routes>
      </BrowserRouter>
      <Footer/>
     </div>
    </>
  )
}
export default App;