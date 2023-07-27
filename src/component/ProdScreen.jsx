import React from 'react'

import ClientesJson from '../data/clientes.json'

import {AiOutlineCloseCircle, AiOutlineEdit} from 'react-icons/ai'
import {RiDeleteBinLine} from 'react-icons/ri'

import '../style/components/ProdScreen.css'

const ProdScreen = ({product, onClose}) => {
    const cliente = ClientesJson.find((cli) =>  cli.id === product.cliente)
    return (
        <div className="product-screen-overlay">
            <div className="prod-screen-container">
                <div className="prod-screen-info">
                    <AiOutlineCloseCircle className='close-prod-screen' onClick={onClose} color='white'/>
                    <p>{product.id}</p>
                    <p>Item de: {cliente.nome}</p>
                    <h1>{product.titulo}</h1>
                    <h2>Status - {product.status === 0 ? 'DISPONIVEL' : (product.status === 1 ? 'VENDIDO' : 'PAGO!')}</h2>
                    <p>{product.valor}</p>
                </div>
                <div className="prod-screen-acao">
                    <button className='btn-prdscr-1'><AiOutlineEdit style={{marginRight: '5px', fontSize: '18pt'}}/>Editar</button>
                    <button className='btn-prdscr-2'><RiDeleteBinLine style={{marginRight: '5px', fontSize: '18pt'}}/>Excluir</button>
                </div>
            </div>
        </div>
    )
}
 
export default ProdScreen;