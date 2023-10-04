import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import { GiConfirmed } from 'react-icons/gi'
import { AiOutlineSend } from 'react-icons/ai'
import '../../style/components/function/addVendas.css'

const EditarVenda = () => {
	const ref = useRef()
	const { id } = useParams()
	const [ Venda, setVenda ] = useState([])
	const [ ProdList, setProdList ] = useState([])
	const [ ProdRem, setProdRem ] = useState([])

	useEffect(() => {
		document.documentElement.style.pointerEvents = 'all'
		getProdutos()
		getVenda()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	
	const getProdutos = async () => {
		try {
			const res = await axios.get('http://localhost:8800/produtos/')
			setProdList(res.data)
		} catch (error) {
			console.log(error)
		}
	}
	
	const getVenda = async () => {
		try {
			const res = await axios.get(`http://localhost:8800/vendas/${id}`)

			const newData = String(res.data[0]?.data).split('T')[0]
			const jsonProdutos = JSON.parse(res.data[0]?.produtos)
			const preVenda = {id: res.data[0].id, descricao: res.data[0].descricao, data: newData, hora: res.data[0].hora, produtos: jsonProdutos, valortotal: res.data[0].valortotal}

			setVenda(preVenda)
		} catch (error) {
			console.log(error)
		}
	}

	const handleDescriptionChange = (e) => {
		const newDescription = e.target.value;
		setVenda((prevVenda) => ({ ...prevVenda, descricao: newDescription }));
	}
	
	const handleDateChange = (e) => {
		const newDate = e.target.value;
		setVenda((prevVenda) => ({ ...prevVenda, data: newDate }));
	}
	
	const handleTimeChange = (e) => {
		const newTime = e.target.value;
		setVenda((prevVenda) => ({ ...prevVenda, hora: newTime }));
	}

	const editarProd = async (id, stt) => {
		const prodID = ProdList.findIndex((prod) => prod.id === id)

		await axios.put(`http://localhost:8800/produtos/${id}`,{
			tipo: ProdList[prodID].tipo,
			descricao: ProdList[prodID].descricao,
			tamanho: ProdList[prodID].tamanho,
			valor: ProdList[prodID].valor,
			status: stt
		})
		.then(({data}) => {
			console.log(data)
		})
		.catch(({data}) => window.alert(data))
	}

	const removerProduto = (id) => {
		const prods = Venda.produtos
		const idx = prods.findIndex((p) => p.id === id)
		const idxR = ProdRem.findIndex((p) => p.id === id)
		let valor = 0

		prods.splice(idx, 1)

		prods.forEach((p) => {
			const idxP = ProdList.findIndex((pro) => pro.id === p.id)
			valor += ProdList[idxP].valor
		})

		if(window.confirm(`Deseja realmente excluir o produto ${id} da venda?`)){
			if(idxR < 0){
				const pds = ProdRem
				pds.push({ id: id })
				setProdRem(pds)
			}
			setVenda((vend) => ({ ...vend, produtos: prods, valortotal: valor }))
		}
	}

	const adicionarProduto = (id) => {
		const prods = Venda.produtos
		const idx = ProdList.findIndex((p) => p.id === id)
		const idxR = ProdRem.findIndex((p) => p.id === id)
		const ver = prods.find((p) => p.id === id)
		let valor = 0
		
		if(!ver){
			if(idx < 0) window.alert('O produto NÃO existe!')
			else {
				if(ProdList[idx].status !== 0) window.alert('O produto NÃO está disponivel!')
				else {
					prods.push({ id: id })
					prods.forEach((p) => {
						const idxP = ProdList.findIndex((pro) => pro.id === p.id)
						valor += ProdList[idxP].valor
					})
					if(window.confirm(`Deseja adicionar o produto ${id} na venda?`)){
						if(idxR !== -1){
							const pds = ProdRem
							pds.splice(idxR, 1)
							setProdRem(pds)
						}
						setVenda((vend) => ({ ...vend, produtos: prods, valortotal: valor }))
					}
				}
			}
		}
		else window.alert('O produto já está incluso!')
		console.log(prods)
	}

	const editarVenda = async (e) => {
		e.preventDefault()

		Venda.produtos.forEach((p) => editarProd(p.id, 1))
		const parsed = JSON.stringify(Venda?.produtos)

		ProdRem?.forEach((p) => editarProd(p.id, 0))

		await axios.put(`http://localhost:8800/vendas/${id}`,{
			descricao: Venda?.descricao,
			produtos: parsed,
			data: Venda?.data,
			hora: Venda?.hora,
			valortotal: Venda?.valortotal
		})
		.then(({data}) => {
			window.alert(data)
			window.location.replace('http://localhost:3000/vendas')
		})
		.catch((error) => console.log(error))
	}

	return (
		<div className="adicionar-venda-container fbrc">
			<div className="box-dados-add-venda fbcc">
				<h1 style={{ margin: '20px 0 10px 0' }}>Venda</h1>
				<form style={{ width: '100%' }} ref={ref} onSubmit={editarVenda}>
					<div className="fbrc">
						<div className="item-form-add-venda fbcc">
							<label htmlFor="id-add-vend">ID</label>
							<input type="text" name="id" id="id-add-vend" value={ Venda.id || '' } disabled/>
						</div>
						<div className="item-form-add-venda fbcc">
							<label htmlFor="total-add-vend">Valor Total</label>
							<input type="number" step='any' name="valortotal" id="total-add-vend" value={ Venda.valortotal || '' } disabled/>
						</div>
					</div>
					<div className="item-form-add-venda fbcc" style={{ width: '100%' }}>
						<label htmlFor="descricao-add-vend">Descrição</label>
						<textarea
							name="descricao"
							rows="4"
							id="descricao-add-vend"
							value={ Venda.descricao || '' }
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
								value={ Venda.data || '' }
								onChange={handleDateChange}
							/>
						</div>
						<div className="item-form-add-venda fbcc" style={{ marginLeft: '5px' }}>
							<label htmlFor="hora-add-vend">Hora</label>
							<input
								type="time"
								name="hora"
								id="hora-add-vend"
								value={ Venda.hora || '' }
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
				<div className="fbrc">
					<input type="number" id='pesquisa-add-vend' placeholder='Adicionar item por ID...'/>
					<AiOutlineSend  style={{ margin: '0 5px', fontSize: '25pt', cursor: 'pointer' }} onClick={() => adicionarProduto(parseInt(document.getElementById('pesquisa-add-vend').value))}/>
				</div>
				<div className="itens-lista-add-vend fbcc">
					{Venda.produtos !== undefined ? Venda.produtos.map((p) => {
						const idxProd = ProdList.findIndex((pro) => pro.id === p.id)
						return (
							<div className={`item-disp-add-venda fbrc pro-select-add-vend`} key={p.id} onClick={() => removerProduto(p.id)}>
								<p style={{ flex: 0.61, paddingLeft: '10px' }}>{`#${ ProdList[idxProd]?.cliente }-${ ProdList[idxProd]?.id }`}</p>
								<p style={{ flex: 2 }}>{`${ ProdList[idxProd]?.tipo } ${ ProdList[idxProd]?.descricao }`}</p>
								<p style={{ flex: 0.3 }}>{ ProdList[idxProd]?.tamanho}</p>
								<p style={{ flex: 0.4 }}>{`R$ ${ ProdList[idxProd]?.valor }`}</p>
							</div>
						)
					}) : null}
				</div>
			</div>
		</div>
	)
}
 
export default EditarVenda

