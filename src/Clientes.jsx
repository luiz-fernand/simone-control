import React, { useEffect, useState } from 'react'
import axios from 'axios'

import {BsPeopleFill} from 'react-icons/bs'
import './style/Clientes.css'

const Clientes = () => {
    const [ClienList, setClienList] = useState([])

    useEffect(() => {
        getClientes()
        console.log('deu certo!')
    }, [])

    const getClientes = async () => {
        try {
            const res = await axios.get('http://localhost:8800/clientes')
            setClienList(res.data)
        } catch(error){
            window.alert(error)
        }
    }

    return (
        <div className="clientes-container">
            <div className="informacoes-clientes">
                <h1 className='titulo-clientes'><BsPeopleFill style={{marginRight: '10px'}}/> Clientes</h1>
                <p>Nº DE CLIENTES: <b>{ClienList.length}</b></p>
                <p>CLIENTES PENDENTES: <b>{ClienList.length}</b></p>
            </div>
            <div className="lista-clientes">
                {ClienList.map((clien) => (
                    <div className={'cod-cliente' + (0 > 1 ? ' cliente-pendente' : '')} key={clien.id}>
                        <p style={{flex: '1', textAlign: 'start', marginLeft: '25px'}}>#{clien.id}</p>
                        <p style={{flex: '2'}}><b>{clien.nome}</b></p>
                        <p style={{flex: '1'}}>Produtos: {0}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
 
export default Clientes;