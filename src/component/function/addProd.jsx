import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'

import '../../style/components/function/addProd.css'
import {AiOutlinePlus} from 'react-icons/ai'

const AdicionarProduto = () => {
	const [ListaCli, setListaCli] = useState([])
	const [Produtos, setProdutos] = useState([])
	const ref = useRef()

	useEffect(() => {
		getClientes()
		getProdutos()
	}, [])

	const getClientes = async () => {
		try {
			const res = await axios.get('http://localhost:8800/clientes')
			setListaCli(res.data)
		} catch(error){
			console.log(error)
		}
	}
	
	console.log(Produtos)

	const getProdutos = async () => {
		try {
			const res = await axios.get('http://localhost:8800/produtos')
			setProdutos(res.data.sort())
		} catch(error){
			console.log(error)
		}
	}

	const adicionarProd = async (e) => {
		e.preventDefault()
		const user = ref.current

		await axios.post('http://localhost:8800/produtos',{
			cliente: user.cliente.value,
			tipo: user.tipo.value,
			descricao: user.descricao.value,
			tamanho: user.tamanho.value,
			valor: user.valor.value
		})
		.then(({data}) => {
			window.alert(`${data} ID: #${user.cliente.value}-${Produtos[Produtos.length - 1].id + 1}`)
			getProdutos()
			const clienID = document.getElementById('form-add-prod').cliente.value
			document.getElementById('form-add-prod').reset()
			document.getElementById('form-add-prod').cliente.value = clienID
			document.getElementById('form-add-prod').tipo.focus()
		})
		.catch(({data}) => console.log(data))
	}

	return (
		<div className="adicionar-produto-container">
			<form id='form-add-prod' className='form-adicionar-container' ref={ref} onSubmit={adicionarProd}>
				<h1>Adicionar Produto</h1>
				<div className="input-area-add">
					<label>Cliente</label>
					<select name="cliente" required>
						<option value="">Selecione um cliente...</option>
						{ListaCli.map((cli) => (
							<option value={cli.id} key={cli.id}>{`${cli.id} - ${cli.nome}`}</option>
						))}
					</select>
				</div>
				<div className="input-area-add">
					<label>Tipo</label>
					<input type="text" name='tipo' required/>
				</div>
				<div className="input-area-add">
					<label>Descrição</label>
					<textarea name='descricao' required/>
				</div>
				<div className="input-area-add">
					<label>Tamanho</label>
					<input type="text" name='tamanho'/>
				</div>
				<div className="input-area-add">
					<label>Valor</label>
					<input type="number" step='0.01' name='valor' required/>
				</div>
				<button type='submit'><AiOutlinePlus style={{fontSize: '15pt', marginRight: '5px'}}/>ADICIONAR</button>
			</form>
		</div>
	)
}
 
export default AdicionarProduto