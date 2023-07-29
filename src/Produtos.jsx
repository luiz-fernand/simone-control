import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

import ProdutosJson from './data/produtos.json'

import {GiClothes} from 'react-icons/gi'
import {AiOutlinePlusCircle} from 'react-icons/ai'
import ProdScreen from './component/ProdScreen'

import './style/Produtos.css'

const Produtos = () => {
    const [np, setNp] = useState(0)
    const [pd, setPd] = useState(0)
    const [pv, setPv] = useState(0)
    const [pp, setPp] = useState(0)
    const [ProdList, setProdList] = useState([])
    const [selectedProduct, setSelectedProduct] = useState(null)
  
    useEffect(() => {
        let totalProdutos = 0
        let disponiveis = 0
        let vendidos = 0
        let pagos = 0
        const updateProdList = []
  
        ProdutosJson.forEach((prod) => {
            totalProdutos++
            (prod.status === 0 ? disponiveis++ : (prod.status === 1 ? vendidos++ : pagos++))

            const itemLista = {cliente: prod.cliente, id: `#${prod.cliente}-${prod.id}`, tipo: prod.tipo, titulo: `${prod.tipo} ${prod.descricao}`, valor: `R$ ${prod.valor}`, status: prod.status}
            updateProdList.push(itemLista)
        })
  
        setNp(totalProdutos)
        setPd(disponiveis)
        setPv(vendidos)
        setPp(pagos)
        setProdList(updateProdList)
    }, [])

    const openProdScreen = (prod) => {
        setSelectedProduct(prod)
        document.documentElement.style.pointerEvents = 'none'
    }
    
    const closeProdScreen = () => {
        setSelectedProduct(null)
        document.documentElement.style.pointerEvents = 'all'
    }
    
    const excluirProduto = () => {
        ProdList.splice(ProdList.findIndex((pro) => selectedProduct.cliente ===  pro.cliente && selectedProduct.id === pro.id), 1)
        closeProdScreen()
    }

    return (
        <div className="produtos-container">
            <div className="informacoes-produtos">
                <h1 className='titulo-produtos'><GiClothes style={{marginRight: '10px'}}/> Produtos</h1>
                <div className="produtos-acao-container">
                    <Link><AiOutlinePlusCircle style={{marginRight: '5px', fontSize: '20pt'}}/>ADICIONAR PRODUTO</Link>
                </div>
                <p style={{paddingTop: '1px'}}>Nº DE PRODUTOS: <b>{np}</b></p>
                <p>PRODUTOS DISPONIVEIS: <b>{pd}</b></p>
                <p>PRODUTOS VENDIDOS: <b>{pv}</b></p>
                <p>PRODUTOS PAGOS: <b>{pp}</b></p>
            </div>
            <div className="lista-produtos">
                {ProdList.map(prod => (
                    <div className={'cod-produto' + (prod.status === 2 ? ' indisp' : (prod.status === 1 ? ' process' : ''))} onClick={() => openProdScreen(prod)} key={prod.id}>
                        <p style={{flex: '1', textAlign: 'start', marginLeft: '25px'}}>{prod.id}</p>
                        <p style={{flex: '2'}}><b>{prod.titulo}</b></p>
                        <p style={{flex: '1'}}>{prod.valor}</p>
                    </div>
                ))}
            </div>
            {selectedProduct && <ProdScreen product={selectedProduct} onClose={closeProdScreen} excluirProd={excluirProduto}/>}
        </div>
    )
}

export default Produtos