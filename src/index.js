import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import './style/index.css'

import NavBar from './component/NavBar';
import Inicio from './Inicio';
import Produtos from './Produtos';
import AdicionarProduto from './component/addProd';
import Clientes from './Clientes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route path='/' element={<Inicio/>}/>
      <Route path='/produtos' element={<Produtos/>}/>
        <Route path='/produtos/add' element={<AdicionarProduto/>}/>
      <Route path='/clientes' element={<Clientes/>}/>
    </Routes>
  </BrowserRouter>
)