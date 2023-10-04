import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import './style/index.css'

import NavBar from './component/NavBar'

import Inicio from './Inicio'

import Produtos from './Produtos'
import AdicionarProduto from './component/function/addProd'
import EditarProduto from './component/function/editProd'

import Clientes from './Clientes'
import AdicionarCliente from './component/function/addClien'
import EditarCliente from './component/function/editClien'

import Vendas from './Vendas'
import AdicionarVenda from './component/function/addVenda'
import EditarVenda from './component/function/editVenda'

import Comissoes from './Comissoes'
import AdicionarComissao from './component/function/addCom'
import EditarComissao from './component/function/editCom'

const root = ReactDOM.createRoot(document.getElementById('root'))
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
				<Route path='/vendas/add' element={<AdicionarVenda/>}/>
				<Route path='/vendas/edit/:id' element={<EditarVenda/>}/>
			<Route path='/comissoes' element={<Comissoes/>}/>
				<Route path='/comissoes/add' element={<AdicionarComissao/>}/>
				<Route path='/comissoes/edit/:id' element={<EditarComissao/>}/>
		</Routes>
	</BrowserRouter>
)