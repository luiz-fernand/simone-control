import React, {useState} from 'react'
import {toast, ToastContainer} from 'react-toastify'
import axios from 'axios'

import {AiOutlineCloseCircle, AiOutlineEdit} from 'react-icons/ai'
import {RiDeleteBinLine} from 'react-icons/ri'

import '../style/components/ProdScreen.css'

const ProdScreen = ({product, onClose, excluirProd}) => {
    const [Cliente, setCliente] = useState([])
    
    const getClienteById = async () => {
        try {
            const res = await axios.get(`http://localhost:8800/clientes/${product.cliente}`)
            setCliente(res.data)
        } catch(error){
            toast.error(error)
        }
    }

    getClienteById()

    return (
        <div className="product-screen-overlay">
            <div className="prod-screen-container">
                <div className="prod-screen-info">
                    <AiOutlineCloseCircle className='close-prod-screen' onClick={onClose} color='white'/>
                    <p>{`#${product.cliente}-${product.id}`}</p>
                    {Cliente.length > 0 && <p>Item de: {Cliente[0].nome}</p>}
                    <h1>{`${product.tipo} ${product.descricao}`}</h1>
                    <h2>Status - {product.status === 0 ? 'DISPONIVEL' : (product.status === 1 ? 'VENDIDO' : 'PAGO!')}</h2>
                    <p>{`R$ ${product.valor}`}</p>
                </div>
                <div className="prod-screen-acao">
                    <button className='btn-prdscr-1'><AiOutlineEdit style={{marginRight: '5px', fontSize: '18pt'}}/>Editar</button>
                    <button className='btn-prdscr-2' onClick={excluirProd}><RiDeleteBinLine style={{marginRight: '5px', fontSize: '18pt'}}/>Excluir</button>
                </div>
            </div>
            <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_CENTER}/>
        </div>
    )
}
 
export default ProdScreen;