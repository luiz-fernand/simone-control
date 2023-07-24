import React, { useState, useEffect } from 'react'
import ClientesJson from './data/clientes.json'
import {GiClothes} from 'react-icons/gi'
import './style/Produtos.css'

const Produtos = () => {
    const [np, setNp] = useState(0)
    const [pd, setPd] = useState(0)
    const [pv, setPv] = useState(0)
    const [pp, setPp] = useState(0)
    const [ProdList, setProdList] = useState([])
  
    useEffect(() => {
        let totalProdutos = 0
        let disponiveis = 0
        let vendidos = 0
        let pagos = 0
        const updateProdList = []
  
        ClientesJson.forEach((clien) => {
            clien.produtos.forEach((prod) => {
                totalProdutos++
                if (prod.status === 0) disponiveis++
                else if (prod.status === 1) vendidos++
                else if (prod.status === 2) pagos++

                const itemLista = {id: `#${clien.id}-${prod.id}`, titulo: `${prod.tipo} ${prod.descricao}`, valor: `R$ ${prod.valor}`, status: prod.status}
                updateProdList.push(itemLista)
            })
        })
  
        setNp(totalProdutos)
        setPd(disponiveis)
        setPv(vendidos)
        setPp(pagos)
        setProdList(updateProdList)
    }, [])

    return (
        <div className="produtos-container">
            <div className="informacoes-produtos">
                <h1 className='titulo-produtos'><GiClothes style={{marginRight: '10px'}}/> Produtos</h1>
                <p>Nº DE PRODUTOS: <b>{np}</b></p>
                <p>PRODUTOS DISPONIVEIS: <b>{pd}</b></p>
                <p>PRODUTOS VENDIDOS: <b>{pv}</b></p>
                <p>PRODUTOS PAGOS: <b>{pp}</b></p>
            </div>
            <div className="lista-produtos">
                {ProdList.map(prod => (
                    <div className={'cod-produto' + (prod.status === 2 ? ' indisp' : (prod.status === 1 ? ' process' : ''))} key={prod.id}>
                        <p style={{flex: '1', textAlign: 'start', marginLeft: '25px'}}>{prod.id}</p>
                        <p style={{flex: '2'}}><b>{prod.titulo}</b></p>
                        <p style={{flex: '1'}}>{prod.valor}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Produtos