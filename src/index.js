import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import './style/index.css'

import NavBar from './component/NavBar';
import Home from './Home';
import Clientes from './Clientes';
import Produtos from './Produtos';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/produtos' element={<Produtos/>}/>
      <Route path='/clientes' element={<Clientes/>}/>
    </Routes>
  </BrowserRouter>
)