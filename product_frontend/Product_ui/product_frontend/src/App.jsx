import { useState } from 'react'

import Navbar from './Component/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './Component/Home';
import AddProduct from './Component/AddProduct';
import EditProduct from './Component/EditProduct';

function App() {
  return (
    <>

    <Navbar />

    <Routes>
      <Route path='/' element={<Home />}> </Route>
      <Route path='/addProduct' element={<AddProduct />}> </Route>
      <Route path='/editProduct/:id' element={<EditProduct />}> </Route>
    </Routes>
   </> 
  );
}

export default App
