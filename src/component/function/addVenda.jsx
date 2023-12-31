import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'

import { GiConfirmed } from 'react-icons/gi'
import { BiRefresh } from 'react-icons/bi'
import '../../style/components/function/addVendas.css'

const AdicionarVenda = () => {
	const [ ProdList, setProdList ] = useState([])
	const [ selectedItens, setSelectedItens ] = useState([])
	const [ procurarProduto, setProcurarProduto ] = useState('')
	const [ procurarIDProduto, setProcurarIDProduto ] = useState('')
	const [ valorTotal, setValorTotal ] = useState(0.0)
	const ref = useRef()

	useEffect(() => {
		getProdutos()
	}, [])

	const getProdutos = async () => {
		try {
			const res = await axios.get('http://localhost:8800/produtos/status/0')
			setProdList(res.data)
		} catch (error) {
			console.log(error)
		}
	}

	const selecionarProduto = (p) => {
		const ver = selectedItens.some((v) => v.id === p.id)

		if (!ver) {
			setSelectedItens([...selectedItens, { id: p.id }])
			setValorTotal(valorTotal + p.valor)
		} else {
			const updatedSelectedItens = selectedItens.filter((v) => v.id !== p.id)
			setSelectedItens(updatedSelectedItens)
			setValorTotal(valorTotal - p.valor)
		}
	}

	const editarProd = async (id) => {
		const prodID = ProdList.findIndex((prod) => prod.id === id)

		await axios.put(`http://localhost:8800/produtos/${id}`,{
			tipo: ProdList[prodID].tipo,
			descricao: ProdList[prodID].descricao,
			tamanho: ProdList[prodID].tamanho,
			valor: ProdList[prodID].valor,
			status: 1
		})
		.then(({data}) => {
			console.log(data)
		})
		.catch(({data}) => window.alert(data))
	}

	const salvarVenda = async (e) => {
		e.preventDefault()
		const user = ref.current
		const parsed = JSON.stringify(selectedItens)

		if(valorTotal === 0) alert('Selecione pelo menos 1 item!')
		else {
			selectedItens.forEach((prod) => editarProd(prod.id))
			await axios.post('http://localhost:8800/vendas',{
				descricao: user.descricao.value,
				produtos: parsed,
				data: user.data.value,
				hora: user.hora.value,
				valortotal: user.valortotal.value
			})
			.then(({data}) => {
				window.alert(data)
				window.location.replace('http://localhost:3000/vendas')
			})
			.catch(({data}) => console.log(data))
		}
	}

	return (
		<div className="adicionar-venda-container fbrc">
			<div className="box-dados-add-venda fbcc">
				<h1 style={{ margin: '20px 0 10px 0' }}>Vender</h1>
				<form style={{ width: '100%' }} ref={ref} onSubmit={salvarVenda}>
					<div className="item-form-add-venda fbcc" style={{ width: '100%', marginTop: '15px' }}>
						<label htmlFor="descricao-add-vend">Descrição</label>
						<textarea name="descricao" rows='4' id="descricao-add-vend" required/>
					</div>
					<div className="fbrc">
						<div className="item-form-add-venda fbcc" style={{ marginRight: '5px' }}>
							<label htmlFor="data-add-vend">Data</label>
							<input type="date" name="data" id="data-add-vend" required/>
						</div>
						<div className="item-form-add-venda fbcc" style={{ marginLeft: '5px' }}>
							<label htmlFor="hora-add-vend">Hora</label>
							<input type="time" name="hora" id="hora-add-vend" required/>
						</div>
					</div>
					<div className="item-form-add-venda fbcc">
						<label htmlFor="total-add-vend">Valor Total</label>
						<input type="number" step='any' name="valortotal" id="total-add-vend" value={ valorTotal } disabled/>
					</div>
					<div className="fbrc" style={{ marginTop: '30px' }}>
						<button className="salvar-venda-button fbrc"><GiConfirmed style={{ marginRight: '5px', fontSize: '20px' }}/>SALVAR</button>
					</div>
				</form>
			</div>
			<div className="box-itens-venda fbcc">
				<div className="fbrc" style={{ width: '100%' }}>
					<input type="text" id='pesquisa-add-vend' placeholder='Pesquisar ID...' style={{ flex: 0.5, marginRight: '2px' }} onChange={(e) => setProcurarIDProduto(e.target.value)}/>
					<input type="text" id='pesquisa-add-vend' placeholder='Pesquisar Item...' style={{ flex: 1 }} onChange={(e) => setProcurarProduto(e.target.value)}/>
					<BiRefresh style={{ margin: '0 5px', fontSize: '25pt', cursor: 'pointer' }} onClick={() => getProdutos()}/>
				</div>
				<div className="itens-lista-add-vend fbcc" style={{ flex: 1 }}>
					{ProdList.map((pro) => (
						(`#${pro.cliente}-${pro.id}`).includes(procurarIDProduto) ? (
							(pro.tipo?.toLowerCase() + ' ' + pro.descricao?.toLowerCase()).includes(procurarProduto?.toLowerCase()) ? (
								<div className={`item-disp-add-venda fbrc ${ selectedItens.some((item) => item.id === pro.id) ? 'pro-select-add-vend' : '' }`} onClick={() => selecionarProduto(pro)} key={pro.id}>
									<p style={{ flex: 0.61, paddingLeft: '10px' }}>{`#${ pro.cliente }-${ pro.id }`}</p>
									<p style={{ flex: 2 }}>{`${ pro.tipo } ${ pro.descricao }`}</p>
									<p style={{ flex: 0.3 }}>{ pro.tamanho }</p>
									<p style={{ flex: 0.4 }}>{`R$ ${ pro.valor }`}</p>
								</div>
							) : null
						) : null
					))}
				</div>
				{selectedItens.length === 0 ? null : (
					<div className="itens-lista-add-vend fbcc" style={{ flex: 1, marginTop: '10px', borderTop: '1px solid #ccc', paddingTop: '10px' }}>
						{selectedItens.map((pro) => {
							const idxPro = ProdList.findIndex((p) => p.id === pro.id)
							return (
								<div className='item-disp-add-venda fbrc pro-select-add-vend' onClick={() => selecionarProduto(ProdList[idxPro])} key={ProdList[idxPro].id}>
									<p style={{ flex: 0.61, paddingLeft: '10px' }}>{`#${ ProdList[idxPro].cliente }-${ ProdList[idxPro].id }`}</p>
									<p style={{ flex: 2 }}>{`${ ProdList[idxPro].tipo } ${ ProdList[idxPro].descricao }`}</p>
									<p style={{ flex: 0.3 }}>{ ProdList[idxPro].tamanho }</p>
									<p style={{ flex: 0.4 }}>{`R$ ${ ProdList[idxPro].valor }`}</p>
								</div>
						)})}
					</div>
				)}
			</div>
		</div>
	)
}
 
export default AdicionarVenda