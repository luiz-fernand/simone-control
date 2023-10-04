import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { AiOutlineCloseCircle, AiOutlineEdit } from 'react-icons/ai'
import { RiDeleteBinLine } from 'react-icons/ri'
import '../style/components/VendScreen.css'

const ComiScreen = ({ comissao, onClose, desfazer }) => {
	const [ ProdList, setProdList ] = useState([])
	const [ Cliente, setCliente ] = useState([])

	useEffect(() => {
		getInfo()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const getInfo = async () => {
		try {
			const res = await axios.get('http://localhost:8800/produtos')
			const resC = await axios.get(`http://localhost:8800/clientes/${comissao.cliente}`)
			setCliente(resC.data[0])
			setProdList(res.data)
		} catch (error) {
			console.log(error)
		}
	}

	const openConfirmScreen = (vend) => {
		var conf = window.confirm("Tem certeza que deseja EXCLUIR?")
		if(conf === true) desfazer(vend.id)
	}

	return (
		<div className="venda-screen-overlay fbcc">
			<div className="venda-screen-container fbrc">
				<div className="fbcc" style={{ flex: 1, borderRight: '1px solid #ccc', justifyContent: 'space-around', height: '450px' }}>
					<div className="venda-screen-info fbcc">
						<AiOutlineCloseCircle className='close-venda-screen' onClick={ onClose } color='white'/>
						<div className="fbrc" style={{ width: '100%', justifyContent: 'space-between' }}>
							<p>#{comissao.id} - ({comissao.cliente}) {Cliente?.nome}</p>
							<p>{ comissao.data }</p>
						</div>
						<p className='desc-venda-screen' style={{ marginTop: '15px', whiteSpace: 'pre-line', textAlign: 'center' }}><b>{ comissao.descricao }</b></p>
					</div>
					<div className="venda-screen-acao fbrc">
						<Link to={`/comissoes/edit/${comissao.id}`} className='btn-vndscr-1 fbrc'><AiOutlineEdit style={{ marginRight: '5px', fontSize: '18pt' }}/>Editar</Link>
						<button className='btn-vndscr-2 fbrc' onClick={() => openConfirmScreen(comissao)}><RiDeleteBinLine style={{ marginRight: '5px', fontSize: '18pt' }}/>Excluir</button>
					</div>
				</div>
				<div className="fbcc" style={{ flex: 1, height: '400px', justifyContent: 'flex-start', marginTop: '35px', overflowY: 'auto' }}>
					{ comissao.produtos.map((prod) => {
						const indxPro = ProdList.findIndex((pro) => pro.id === prod.id)
						return (
						<div id='item-venda-list' className="fbrc" style={{ width: '90%', justifyContent: 'space-around' }} key={prod.id}>
							<p style={{ flex: 0.7 }}>#{ ProdList[indxPro]?.cliente }-{ ProdList[indxPro]?.id }</p>
							<p style={{ flex: 2 }}>{ ProdList[indxPro]?.tipo } { ProdList[indxPro]?.descricao }</p>
							<p style={{ flex: 0.3 }}>{ ProdList[indxPro]?.tamanho }</p>
							<p style={{ flex: 0.5 }}>R$ { ProdList[indxPro]?.valor/2 }</p>
						</div>
					)}) }
					<div className="fbcc" style={{ width: '85%', borderTop: '1px solid #ccc', marginTop: '15px' }}>
						<p style={{ marginTop: '15px' }}>TOTAL: <b>R$ { comissao.valor }</b></p>
					</div>
				</div>
			</div>
		</div>
	)
}
 
export default ComiScreen