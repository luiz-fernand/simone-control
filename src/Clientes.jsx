import React from 'react'

import ClientesJson from './data/clientes.json'

import {BsPeopleFill} from 'react-icons/bs'
import './style/Clientes.css'

const Clientes = () => {
    return (
        <div className="clientes-container">
            <div className="informacoes-clientes">
                <h1 className='titulo-clientes'><BsPeopleFill style={{marginRight: '10px'}}/> Clientes</h1>
                <p>Nº DE CLIENTES: <b>{ClientesJson.length}</b></p>
            </div>
            <div className="lista-clientes">
                {ClientesJson.map(clien => (
                    <div className='cod-cliente'>
                        <p style={{flex: '1', textAlign: 'start', marginLeft: '25px'}}>#{clien.id}</p>
                        <p style={{flex: '2'}}><b>{clien.nome}</b></p>
                        <p style={{flex: '1'}}>Produtos: {clien.produtos.length}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
 
export default Clientes;