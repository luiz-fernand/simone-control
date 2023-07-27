import React from 'react'

import ClientesJson from './data/clientes.json'
import ProdutosJson from './data/produtos.json'

import {BsPeopleFill} from 'react-icons/bs'
import './style/Clientes.css'

const Clientes = () => {
    
    const QtdProdCliente = (cliente) => {
        let n = [0, 0]
        ProdutosJson.forEach((prod) => {
            if(cliente.id === prod.cliente){
                n[0]++
                if(prod.status === 1) n[1]++
            }
        })
        return n
    }

    return (
        <div className="clientes-container">
            <div className="informacoes-clientes">
                <h1 className='titulo-clientes'><BsPeopleFill style={{marginRight: '10px'}}/> Clientes</h1>
                <p>Nº DE CLIENTES: <b>{ClientesJson.length}</b></p>
            </div>
            <div className="lista-clientes">
                {ClientesJson.map(clien => (
                    <div className={'cod-cliente' + (QtdProdCliente(clien)[1] > 0 ? ' cliente-pendente' : '')} key={clien.id}>
                        <p style={{flex: '1', textAlign: 'start', marginLeft: '25px'}}>#{clien.id}</p>
                        <p style={{flex: '2'}}><b>{clien.nome}</b></p>
                        <p style={{flex: '1'}}>Produtos: {QtdProdCliente(clien)[0]}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
 
export default Clientes;