import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import {AiOutlineCloseCircle, AiOutlineEdit} from 'react-icons/ai'
import {RiDeleteBinLine} from 'react-icons/ri'

import '../style/components/ClienScreen.css'

const ClienScreen = ({cliente, onClose, excluirClien}) => {
	const [Produtos, setProdutos] = useState([])
	
	useEffect(() => {
		getProdutosByCliente()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	const getProdutosByCliente = async () => {
		try {
			const res = await axios.get(`http://localhost:8800/produtos/cliente/${cliente.id}`)
			setProdutos(res.data)
		} catch(error){
			console.log(error)
		}
	}

	const confirmacaoDelete = () => {
		var conf = window.confirm("Tem certeza que deseja EXCLUIR?")
		if(conf === true) excluirClien(cliente.id)
	}

	return (
		<div className="cliente-screen-overlay">
			<div className="clien-screen-container">
				<div className="clien-screen-info">
					<AiOutlineCloseCircle className='close-clien-screen' onClick={onClose} color='white'/>
					<div className="cliente-id-nome">
						<p style={{marginRight: '10px'}}>{`#${cliente.id}`}</p>
						<h1>{cliente.nome}</h1>
					</div>
					{cliente.referencia === '' || cliente.referencia === null ? null : <p style={{fontSize: '15pt', marginBottom: '10px'}}>{`Referência: ${cliente.referencia}`}</p>}
					{cliente.telefone === null || cliente.telefone === '' || cliente.telefone === '-' ? null : <p style={{fontSize: '11pt', marginBottom: '10px'}}>{`Telefone: ${cliente.telefone}`}</p>}
				</div>
				<div className="clien-screen-acao">
					<Link to={`/clientes/edit/${cliente.id}`} className='btn-cliscr-1'><AiOutlineEdit style={{marginRight: '5px', fontSize: '18pt'}}/>Editar</Link>
					<button className='btn-cliscr-2' onClick={confirmacaoDelete}><RiDeleteBinLine style={{marginRight: '5px', fontSize: '18pt'}}/>Excluir</button>
				</div>
				<div className="lista-produtos-cliente">
					{Produtos.map((prod) => (
						<div className="produto-item-lista-clien" key={prod.id}>
							<p className={prod.status === 1 ? 'prod-cli-pend' : prod.status === 2 ? 'prod-cli-fina' : ''} style={{ marginTop: '5px' }}>{`#${prod.id} - ${prod.tipo} ${prod.descricao}${prod.status === 1 ? ` - R$ ${prod.valor/2}` : ''}`}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
 
export default ClienScreen