import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'

import '../../style/components/function/editProd.css'
import { AiOutlineEdit } from 'react-icons/ai'
import { useParams } from 'react-router-dom'

const EditarProduto = () => {
	const { id } = useParams()
	const [Produto, setProduto] = useState([])
	const [Cliente, setCliente] = useState({})
	const ref = useRef()
	
	document.documentElement.style.pointerEvents = 'all'

	useEffect(() => {
		getInfos()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	
	const getInfos = async () => {
		try {
			const res = await axios.get(`http://localhost:8800/produtos/${id}`)
			const resC = await axios.get(`http://localhost:8800/clientes/${res.data[0]?.cliente}`)
			setProduto(res.data[0])
			setCliente(resC.data[0])
		} catch(error){
			console.log(error)
		}
	}

	const editarProd = async (e) => {
		e.preventDefault()

		await axios.put(`http://localhost:8800/produtos/${id}`,{
			tipo: Produto.tipo,
			descricao: Produto.descricao,
			tamanho: Produto.tamanho,
			valor: Produto.valor,
			status: Produto.status
		})
		.then(({data}) => {
			window.alert(data)
			window.location.replace('http://localhost:3000/produtos')
		})
		.catch(({data}) => window.alert(data))
	}

	const handleEditTipo = (e) => {
		const newTipo = e.target.value
		setProduto((pro) => ({...pro, tipo: newTipo}))
	}

	const handleEditDescricao = (e) => {
		const newDescricao = e.target.value
		setProduto((pro) => ({...pro, descricao: newDescricao}))
	}

	const handleEditTamanho = (e) => {
		const newTamanho = e.target.value
		setProduto((pro) => ({...pro, tamanho: newTamanho}))
	}

	const handleEditStatus = (e) => {
		const newStatus = e.target.value
		setProduto((pro) => ({...pro, status: newStatus}))
	}

	const handleEditValor = (e) => {
		const newValor = e.target.value
		setProduto((pro) => ({...pro, valor: newValor}))
	}

	return (
		<div className="editar-produto-container">
			<form className='form-editar-container' ref={ref} onSubmit={editarProd}>
				<h1>Editar Produto</h1>
				<div className="conteudo-form-edit-prod">
					<div className="ladoE-edit-prod">
						<div className="input-area-edit">
							<label>ID</label>
							<input type="text" name='id' value={Produto?.id || ''} disabled  style={{textAlign: 'center'}}/>
						</div>
						<div className="input-area-edit">
							<label>Tipo</label>
							<input type="text" name='tipo' value={Produto?.tipo} onChange={(e) => handleEditTipo(e)}/>
						</div>
						<div className="input-area-edit">
							<label>Tamanho</label>
							<input type="text" name='tamanho' value={Produto?.tamanho} onChange={(e) => handleEditTamanho(e)}/>
						</div>
					<div className="input-area-edit">
						<label>Status</label>
						<select name="status" id='select-edit-prod' value={Produto?.status} onChange={(e) => handleEditStatus(e)}>
							<option value="0">Disponivel</option>
							<option value="1">Vendido</option>
							<option value="2">Pago!</option>
						</select>
					</div>
					</div>
					<div className="ladoD-edit-prod">
						<div className="input-area-edit">
							<label>Cliente</label>
							<input type="text" name='cliente' value={`#${Produto?.cliente} - ${Cliente?.nome}` || ''} disabled/>
						</div>
						<div className="input-area-edit">
							<label>Descrição</label>
							<textarea name='descricao' rows={5} value={Produto?.descricao} onChange={(e) => handleEditDescricao(e)}/>
						</div>
						<div className="input-area-edit">
							<label>Valor</label>
							<input type="number" step='0.01' name='valor' value={Produto?.valor} onChange={(e) => handleEditValor(e)}/>
						</div>
					</div>
				</div>
				<button type='submit'><AiOutlineEdit style={{fontSize: '15pt', marginRight: '5px'}}/>EDITAR</button>
			</form>
		</div>
	)
}
 
export default EditarProduto