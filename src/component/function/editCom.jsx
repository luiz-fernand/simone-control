import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import { GiConfirmed } from 'react-icons/gi'
import '../../style/components/function/addVendas.css'

const EditarComissao = () => {
	const ref = useRef()
	const { id } = useParams()
	const [ Comissao, setComissao ] = useState([])
	const [ Produtos, setProdutos ] = useState([])
	const [ Cliente, setCliente ] = useState([])

	useEffect(() => {
		document.documentElement.style.pointerEvents = 'all'
		getComissao()
		getProdutos()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	
	const getProdutos = async () => {
		try {
			const res = await axios.get('http://localhost:8800/produtos/')
			setProdutos(res.data)
		} catch (error) {
			console.log(error)
		}
	}
	
	const getComissao = async () => {
		try {
			const res = await axios.get(`http://localhost:8800/comissoes/${id}`)
			const resC = await axios.get(`http://localhost:8800/clientes/${res.data[0]?.cliente}`)

			const newData = String(res.data[0]?.data).split('T')[0]
			const jsonProdutos = JSON.parse(res.data[0]?.produtos)
			const preCom = {...res.data[0], produtos: jsonProdutos, data: newData}

			setCliente(resC.data[0])
			setComissao(preCom)
		} catch (error) {
			console.log(error)
		}
	}

	const editarComissao = async (e) => {
		e.preventDefault()
		const parsed = JSON.stringify(Comissao?.produtos)

		await axios.put(`http://localhost:8800/comissoes/${id}`,{
			cliente: Comissao?.cliente,
			descricao: Comissao?.descricao,
			produtos: parsed,
			data: Comissao?.data,
			hora: Comissao?.hora,
			valor: Comissao?.valor
		})
		.then(({data}) => {
			window.alert(data)
			window.location.replace('http://localhost:3000/comissoes')
		})
		.catch((error) => console.log(error))
	}

	const handleDescriptionChange = (e) => {
		const newDescription = e.target.value;
		setComissao((comissao) => ({ ...comissao, descricao: newDescription }));
	}
	
	const handleDateChange = (e) => {
		const newDate = e.target.value;
		setComissao((comissao) => ({ ...comissao, data: newDate }));
	}
	
	const handleTimeChange = (e) => {
		const newTime = e.target.value;
		setComissao((comissao) => ({ ...comissao, hora: newTime }));
	}

	return (
		<div className="adicionar-venda-container fbrc">
			<div className="box-dados-add-venda fbcc">
				<h1 style={{ margin: '15px 0' }}>Comissão</h1>
				<form style={{ width: '100%' }} ref={ref} onSubmit={editarComissao}>
					<div className="fbrc">
						<div className="item-form-add-venda fbcc">
							<label htmlFor="id-add-vend">ID</label>
							<input type="text" name="id" id="id-add-vend" value={ Comissao.id || '' } disabled/>
						</div>
						<div className="item-form-add-venda fbcc">
							<label htmlFor="total-add-vend">Valor Total</label>
							<input type="number" step='any' name="valortotal" id="total-add-vend" value={ Comissao.valor || '' } disabled/>
						</div>
					</div>
					<div className="item-form-add-venda fbcc" style={{ width: '100%' }}>
						<label htmlFor="descricao-add-vend">Descrição</label>
						<textarea
							name="descricao"
							rows="4"
							id="descricao-add-vend"
							value={ Comissao.descricao || '' }
							onChange={handleDescriptionChange}
						/>
					</div>
					<div className="fbrc">
						<div className="item-form-add-venda fbcc" style={{ marginRight: '5px' }}>
							<label htmlFor="data-add-vend">Data</label>
							<input
								type="date"
								name="data"
								id="data-add-vend"
								value={ Comissao.data || '' }
								onChange={handleDateChange}
							/>
						</div>
						<div className="item-form-add-venda fbcc" style={{ marginLeft: '5px' }}>
							<label htmlFor="hora-add-vend">Hora</label>
							<input
								type="time"
								name="hora"
								id="hora-add-vend"
								value={ Comissao.hora || '' }
								onChange={handleTimeChange}
							/>
						</div>
					</div>
					<div className="fbrc" style={{ marginTop: '30px' }}>
						<button type='submit' className="salvar-venda-button fbrc"><GiConfirmed style={{ marginRight: '5px', fontSize: '20px' }}/>EDITAR</button>
					</div>
				</form>
			</div>
			<div className="box-itens-venda fbcc">
				<div className="itens-lista-add-vend fbcc">
					<div className={`item-disp-add-venda fbrc pro-select-add-vend`} style={{ marginTop: '15px' }}>
						<p style={{ flex: 0.5, marginLeft: '15px' }}>{`#${ Cliente?.id }`}</p>
						<p style={{ flex: 1 }}>{`${ Cliente?.nome }`}</p>
						<p style={{ flex: 0.5 }}>{`Produtos: ${ Comissao.produtos?.length }`}</p> 
					</div>
					{Comissao.produtos?.map((p) => {
						const idxProd = Produtos.findIndex((pro) => pro.id === p.id)
						return (
							<div className={`item-disp-add-venda fbrc pro-select-add-vend`} style={{ marginLeft: '15px', fontSize: '11pt', padding: '2px 15px' }} key={p.id}>
								<p style={{ flex: 0.7 }}>{`#${ Produtos[idxProd].cliente }-${ Produtos[idxProd].id }`}</p>
								<p style={{ flex: 2 }}>{`${ Produtos[idxProd].tipo } ${ Produtos[idxProd].descricao }`}</p>
								<p style={{ flex: 0.3 }}>{ Produtos[idxProd].tamanho }</p>
								<p style={{ flex: 0.5 }}>{`R$ ${ Produtos[idxProd].valor/2 }`}</p>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}
 
export default EditarComissao

