import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { BsShop } from 'react-icons/bs'
import { MdAttachMoney } from 'react-icons/md'
import './style/Vendas.css'

import VendScreen from './component/VendScreen'

const Vendas = () => {
	const [VendList, setVendList] = useState([])
	const [ProdList, setProdList] = useState([])
	const [selectedVenda, setSelectedVenda] = useState(null)
	const [vendasTotais, setVendasTotais] = useState(0.0)
	const [totalProd, setTotalProd] = useState(0)

	useEffect(() => {
		getVendas()
		getProdutos()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const getVendas = async () => {
		const data1 = document.getElementById('data-venda-1').value
		const data2 = document.getElementById('data-venda-2').value

		try {
			const res = await axios.get(`http://localhost:8800/vendas/data/${(data1 === '' ? '20230101' : data1.replace(/-/g, '')) + (data2 === '' ? '' : ('-'+data2.replace(/-/g, '')))}`)
			const tempList = []
			let vt = 0
			let cont = 0

			res.data.forEach((vend) => {
				const prodJson = JSON.parse(vend.produtos)

				const newData = new Date(vend.data)
				const attNewData = `${ newData.getDate().toString().padStart(2,'0') }/${ String(newData.getMonth() + 1).padStart(2,'0') }/${ newData.getFullYear() } - ${vend.hora}`
				
				vt += vend.valortotal
				cont += prodJson.length

				const itemListaVend = [{'id': vend.id, 'descricao': vend.descricao, 'produtos': prodJson, 'data': attNewData, 'valortotal': vend.valortotal}]
				tempList.push(itemListaVend)
			})

			setVendasTotais(vt)
			setTotalProd(cont)
			setVendList(tempList.reverse())
		} catch(error) {
			console.log(error)
		}
	}

	const getProdutos = async () => {
		try {
			const res = await axios.get(`http://localhost:8800/produtos`)
			setProdList(res.data)
		} catch(error) {
			console.log(error)
		}
	}

	const openVendScreen = (prod) => {
		setSelectedVenda(prod)
		document.documentElement.style.pointerEvents = 'none'
	}
	
	const closeVendScreen = () => {
		setSelectedVenda(null)
		document.documentElement.style.pointerEvents = 'all'
	}

	const excluirVenda = async (venda) => {
		venda?.produtos.forEach(async (pro) => {
			await axios.delete(`http://localhost:8800/produtos/${pro.id}`)
			.then(({data}) => {
				console.log(data)
			})
			.catch(({data}) => window.alert(data))
		})

		await axios.delete(`http://localhost:8800/vendas/${venda.id}`)
			.then(({data}) => {
				const newArray = VendList.filter((vend) => vend.id !== venda.id)
				setVendList(newArray)
				window.alert(data)
			})
			.catch(({data}) => console.log(data))
		closeVendScreen()
		getVendas()
	}

	const desfazerVenda = async (venda) => {
		venda?.produtos.forEach(async (pro) => {
			const prodID = ProdList.findIndex((prod) => prod.id === pro.id)

			await axios.put(`http://localhost:8800/produtos/${pro.id}`,{
				tipo: ProdList[prodID].tipo,
				descricao: ProdList[prodID].descricao,
				tamanho: ProdList[prodID].tamanho,
				valor: ProdList[prodID].valor,
				status: 0
			})
			.then(({data}) => {
				console.log(data)
			})
			.catch(({data}) => window.alert(data))
		})

		await axios.delete(`http://localhost:8800/vendas/${venda?.id}`)
			.then(({data}) => {
				const newArray = VendList.filter((vend) => vend.id !== venda.id)
				setVendList(newArray)
				window.alert(data)
			})
			.catch(({data}) => console.log(data))
		closeVendScreen()
		getVendas()
	}
	
	return (
		<div className="vendas-container fbrc">
			<div className="informacoes-vendas fbcc">
				<h1 className="titulo-vendas fbrc"><BsShop style={{marginRight: '10px'}}/> Vendas</h1>
				<div className="vendas-acao-container fbcc">
					<Link to={'/vendas/add'} className="fbrc"><MdAttachMoney style={{marginRight: '5px', fontSize: '20pt'}}/>VENDER</Link>
				</div>
				<div className="date-search-vendas fbcc">
					<p style={{ fontWeight: 'bold', marginBottom: '10px' }}>Buscar por data:</p>
					<div className="fbrc">
						<p style={{ marginRight: '15px' }}>De:</p>
						<input type="date" name="data1" id="data-venda-1" onChange={() => getVendas()}/>
					</div>
					<div className="fbrc">
						<p style={{ marginRight: '15px' }}>Até:</p>
						<input type="date" name="data2" id="data-venda-2" onChange={() => getVendas()}/>
					</div>
				</div>
				<p style={{ margin: '20px 0 5px 0', }}>Nº DE VENDAS: <b>{VendList.length}</b></p>
				<p style={{ margin: '5px 0', }}>TOTAL DAS VENDAS: <b>R$ {vendasTotais}</b></p>
				<p style={{ margin: '5px 0', }}>PRODUTOS MOVIMENTADOS: <b>{totalProd}</b></p>
			</div>
			<div id='lista-vendas' className="lista-vendas fbcc">
				{VendList.map((vend) => (
					<div className="item-venda fbcc" onClick={() => openVendScreen(vend[0])} key={vend[0].id}>
						<div className="id-box-item-venda fbrc">
							<p>#{vend[0].id}</p>
							<p>{vend[0].data}</p>
						</div>
						<div className="fbcc" style={{ width: '85%' }}>
							<p className='desc-item-vend'><b>{vend[0].descricao}</b></p>
							<p style={{ borderTop: '1px solid #ccc', margin: 0, padding: '15px 0', width: '100%' }}>TOTAL: <b>R$ {vend[0].valortotal}</b></p>
						</div>
					</div>
				))}
			</div>
			{selectedVenda && <VendScreen venda={selectedVenda} onClose={closeVendScreen} excluirVenda={excluirVenda} desfazerVenda={desfazerVenda}/>}
		</div>
	)
}
 
export default Vendas