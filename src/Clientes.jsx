import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import {BsPeopleFill} from 'react-icons/bs'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import './style/Clientes.css'

import ClienScreen from './component/ClienScreen'

const Clientes = () => {
    const [ClienList, setClienList] = useState([])
    const [ProdList, setProdList] = useState([])
    const [ClienPen, setClienPen] = useState(0)
    const [selectedCliente, setSelectedCliente] = useState(null)
    const [searchClien, setSearchClien] = useState('')
    const [Checked, setChecked] = useState(false)

    useEffect(() => {
        getClientes()
        getProdutos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Checked])

    const getClientes = async () => {
        try {
            const res = await axios.get('http://localhost:8800/clientes')
            setClienList(res.data)
        } catch(error){
            console.log(error)
        }
    }

    const getProdutos = async () => {
        try {
            const res = await axios.get('http://localhost:8800/produtos')
            const pen = []

            res.data.forEach((prod) => {
                if(prod.status === 1) pen.push(prod.cliente)
            })

            const unique = [...new Set(pen)]

            setClienPen(unique.length)
            setProdList(res.data)
        } catch(error){
            console.log(error)
        }
    }

    const handleClickChecked = () => {
        setChecked(document.getElementById('pendentes-clien').checked)
    }

    const ProdCli = (id) => {
        let cont = [0, 0]
        ProdList.forEach((pro) => {
            if(pro.cliente === id){
                cont[0]++
                if(pro.status === 1) cont[1]++
            }
        })
        return cont
    }

    const openClienScreen = (cli) => {
        setSelectedCliente(cli)
        document.documentElement.style.pointerEvents = 'none'
    }
    
    const closeClienScreen = () => {
        setSelectedCliente(null)
        document.documentElement.style.pointerEvents = 'all'
    }
    
    const delCliente = async (id) => {
        await axios.delete(`http://localhost:8800/clientes/${id}`)
            .then(({data}) => {
                const newArray = ClienList.filter((cli) => cli.id !== id)
                setClienList(newArray)
                window.alert(data)
            })
            .catch(({data}) => console.log(data))
        closeClienScreen()
    }

    return (
        <div className="clientes-container fbrc">
            <div className="informacoes-clientes fbcc">
                <h1 className='titulo-clientes fbrc'><BsPeopleFill style={{marginRight: '10px'}}/> Clientes</h1>
                <div className="clientes-acao-container fbcc">
                    <Link className='fbrc' to={'/clientes/add'}><AiOutlinePlusCircle style={{marginRight: '5px', fontSize: '20pt'}}/>ADICIONAR CLIENTE</Link>
                </div>
                <div className="search-clie-container fbcc">
                    <input type="text" name='titulo' onChange={(e) => setSearchClien(e.target.value)} placeholder='Pesquisar nome...'/>
                    <div className="item-checkbox-clien fbrc">
                        <input id='pendentes-clien' type="checkbox" name='pendentes' onChange={() => handleClickChecked()}/>
                        <label htmlFor='pendentes-clien'>Somente pendentes</label>
                    </div>
                </div>
                <p style={{marginTop: '15px'}}>Nº DE CLIENTES: <b>{ClienList.length}</b></p>
                <p>CLIENTES PENDENTES: <b>{ClienPen}</b></p>
            </div>
            <div className="lista-clientes fbcc">
                {ClienList.map((clien) => (
                    clien.nome.toLowerCase().includes(searchClien.toLowerCase()) ? (
                        Checked === true ? (
                            ProdCli(clien.id)[1] > 0 ? (
                                <div className={'cod-cliente fbrc' + (ProdCli(clien.id)[1] > 0 ? ' cliente-pendente' : '')} onClick={() => openClienScreen(clien)} key={clien.id}>
                                    <p style={{flex: '1', textAlign: 'start', marginLeft: '25px'}}>#{clien.id}</p>
                                    <p style={{flex: '2'}}><b>{clien.nome}</b></p>
                                    <p style={{flex: '1'}}>Produtos: {ProdCli(clien.id)[0]}</p>
                                </div>
                            ) : null
                        ) : (
                            <div className={'cod-cliente fbrc' + (ProdCli(clien.id)[1] > 0 ? ' cliente-pendente' : '')} onClick={() => openClienScreen(clien)} key={clien.id}>
                                <p style={{flex: '1', textAlign: 'start', marginLeft: '25px'}}>#{clien.id}</p>
                                <p style={{flex: '2'}}><b>{clien.nome}</b></p>
                                <p style={{flex: '1'}}>Produtos: {ProdCli(clien.id)[0]}</p>
                            </div>
                        )
                    ) : null
                ))}
            </div>
            {selectedCliente && <ClienScreen cliente={selectedCliente} onClose={closeClienScreen} excluirClien={delCliente}/>}
        </div>
    )
}
 
export default Clientes;