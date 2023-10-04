import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import {AiOutlineCloseCircle, AiOutlineEdit} from 'react-icons/ai'
import {RiDeleteBinLine} from 'react-icons/ri'

import '../style/components/ProdScreen.css'

const ProdScreen = ({product, onClose, excluirProd}) => {
	const [Cliente, setCliente] = useState([])
	
	useEffect(() => {
		getClienteById()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const getClienteById = async () => {
		try {
			const res = await axios.get(`http://localhost:8800/clientes/${product.cliente}`)
			setCliente(res.data)
		} catch(error){
			console.log(error)
		}
	}

	const confirmacaoDelete = () => {
		var conf = window.confirm("Tem certeza que deseja EXCLUIR?")
		if(conf === true) excluirProd(product.id)
	}

	return (
		<div className="product-screen-overlay">
			<div className="prod-screen-container">
				<div className="prod-screen-info">
					<AiOutlineCloseCircle className='close-prod-screen' onClick={onClose} color='white'/>
					<p>{`#${product.cliente}-${product.id}`}</p>
					{Cliente.length > 0 && <p>Item de: {Cliente[0].nome}</p>}
					<h1>{`${product.tipo} ${product.descricao}`}</h1>
					<p>{product.tamanho !== ('', null) ? `Tamanho: ${product.tamanho}` : null}</p>
					<h2>Status - {product.status === 0 ? 'DISPONIVEL' : (product.status === 1 ? 'VENDIDO' : 'PAGO!')}</h2>
					<p>{`R$ ${product.valor}`}</p>
				</div>
				<div className="prod-screen-acao">
					<Link to={`/produtos/edit/${product.id}`} className='btn-prdscr-1'><AiOutlineEdit style={{marginRight: '5px', fontSize: '18pt'}}/>Editar</Link>
					<button className='btn-prdscr-2' onClick={confirmacaoDelete}><RiDeleteBinLine style={{marginRight: '5px', fontSize: '18pt'}}/>Excluir</button>
				</div>
			</div>
		</div>
	)
}
 
export default ProdScreen;