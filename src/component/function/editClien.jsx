import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'

import { AiOutlineEdit } from 'react-icons/ai'
import { useParams } from 'react-router-dom'

const EditarCliente = () => {
	const { id } = useParams()
	const [ Cliente, setCliente ] = useState([])
	const ref = useRef()

	document.documentElement.style.pointerEvents = 'all'

	useEffect(() => {
		getClienteById()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	
	const getClienteById = async () => {
		try {
			const res = await axios.get(`http://localhost:8800/clientes/${id}`)
			setCliente(res.data[0])
		} catch(error){
			console.log(error)
		}
	}

	const editarProd = async (e) => {
		e.preventDefault()

		await axios.put(`http://localhost:8800/clientes/${id}`,{
			nome: Cliente.nome,
			referencia: Cliente.referencia,
			telefone: Cliente.telefone
		})
		.then(({data}) => {
			window.alert(data)
			window.location.replace('http://localhost:3000/clientes')
		})
		.catch(({data}) => window.alert(data))
	}

	const handleEditNome = (e) => {
		const newNome = e.target.value
		setCliente((cli) => ({ ...cli, nome: newNome }))
	}

	const handleEditReferencia = (e) => {
		const newReferencia = e.target.value
		setCliente((cli) => ({ ...cli, referencia: newReferencia }))
	}

	const handleEditTelefone = (e) => {
		const newTelefone = e.target.value
		setCliente((cli) => ({ ...cli, telefone: newTelefone }))
	}

	return (
		<div className="editar-produto-container">
			<form className='form-editar-container' ref={ref} onSubmit={editarProd}>
				<h1>Editar Cliente</h1>
				<div className="input-area-add-cli">
					<label>ID</label>
					<input type="text" name='id' value={Cliente.id || ''} disabled/>
				</div>
				<div className="input-area-add-cli">
					<label>Nome</label>
					<input type="text" name='nome' value={Cliente.nome || ''} onChange={(e) => handleEditNome(e)}/>
				</div>
				<div className="input-area-add-cli">
					<label>Referência</label>
					<input type="text" name='referencia' value={Cliente.referencia || ''} onChange={(e) => handleEditReferencia(e)}/>
				</div>
				<div className="input-area-add-cli">
					<label>Telefone</label>
					<input type="text" name='telefone' value={Cliente.telefone || ''} onChange={(e) => handleEditTelefone(e)}/>
				</div>
				<button type='submit'><AiOutlineEdit style={{fontSize: '15pt', marginRight: '5px'}}/>EDITAR</button>
			</form>
		</div>
	)
}
 
export default EditarCliente