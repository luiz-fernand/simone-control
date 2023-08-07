import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import './style/index.css'

import NavBar from './component/NavBar';
import Inicio from './Inicio';
import Produtos from './Produtos';
import AdicionarProduto from './component/addProd';
import EditarProduto from './component/editProd';
import Clientes from './Clientes';
import AdicionarCliente from './component/addClien';
import EditarCliente from './component/editClien';
import Vendas from './Vendas';
import Comissoes from './Comissoes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route path='/' element={<Inicio/>}/>
      <Route path='/produtos' element={<Produtos/>}/>
        <Route path='/produtos/add' element={<AdicionarProduto/>}/>
        <Route path='/produtos/edit/:id' element={<EditarProduto/>}/>
      <Route path='/clientes' element={<Clientes/>}/>
        <Route path='/clientes/add' element={<AdicionarCliente/>}/>
        <Route path='/clientes/edit/:id' element={<EditarCliente/>}/>
      <Route path='/vendas' element={<Vendas/>}/>
      <Route path='/comissoes' element={<Comissoes/>}/>
    </Routes>
  </BrowserRouter>
)