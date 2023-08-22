import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

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
    const [searchProd, setSearchProd] = useState('')
    const [statusProd, setStatusProd] = useState(-1)
  
    useEffect(() => {
        getProdutos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [statusProd])

    const getProdutos = async () => {
        try {
            const res = await axios.get(`http://localhost:8800/produtos/${ statusProd === '-1' ? '' : ('status/' + statusProd) }`)
            let totalProdutos = 0
            let disponiveis = 0
            let vendidos = 0
            let pagos = 0
    
            res.data.forEach((prod) => {
                totalProdutos++
                (prod.status === 0 ? disponiveis++ : (prod.status === 1 ? vendidos++ : pagos++))
            })
    
            setNp(totalProdutos)
            setPd(disponiveis)
            setPv(vendidos)
            setPp(pagos)
            setProdList(res.data)
        } catch(error){
            console.log(error)
        }
    }

    const openProdScreen = (prod) => {
        setSelectedProduct(prod)
        document.documentElement.style.pointerEvents = 'none'
    }
    
    const closeProdScreen = () => {
        setSelectedProduct(null)
        document.documentElement.style.pointerEvents = 'all'
    }
    
    const delProduto = async (id) => {
        await axios.delete(`http://localhost:8800/produtos/${id}`)
            .then(({data}) => {
                const newArray = ProdList.filter((prod) => prod.id !== id)
                setProdList(newArray)
                window.alert(data)
            })
            .catch(({data}) => console.log(data))
        closeProdScreen()
    }

    return (
        <div className="produtos-container fbrc">
            <div className="informacoes-produtos fbcc">
                <h1 className='titulo-produtos fbrc'><GiClothes style={{marginRight: '10px'}}/> Produtos</h1>
                <div className="produtos-acao-container fbcc">
                    <Link className='fbrc' to={'/produtos/add'}><AiOutlinePlusCircle style={{marginRight: '5px', fontSize: '20pt'}}/>ADICIONAR PRODUTO</Link>
                </div>
                <div className="search-prod-container fbcc">
                    <input type="text" name='titulo' onChange={(e) => setSearchProd(e.target.value)} placeholder='Pesquisar nome...'/>
                    <div className="item-checkbox-prod fbrc" style={{marginTop: '15px'}}>
                        <input id='checkbox-prod-0' type="radio" name='statusCk' value={-1} defaultChecked onChange={(e) => setStatusProd(e.target.value)}/>
                        <label htmlFor='checkbox-prod-0'>Todos</label>
                    </div>
                    <div className="item-checkbox-prod fbrc">
                        <input id='checkbox-prod-1' type="radio" name='statusCk' value={0} onChange={(e) => setStatusProd(e.target.value)}/>
                        <label htmlFor='checkbox-prod-1'>Somente disponiveis</label>
                    </div>
                    <div className="item-checkbox-prod fbrc">
                        <input id='checkbox-prod-2' type="radio" name='statusCk' value={1} onChange={(e) => setStatusProd(e.target.value)}/>
                        <label htmlFor='checkbox-prod-2'>Somente vendidos</label>
                    </div>
                    <div className="item-checkbox-prod fbrc">
                        <input id='checkbox-prod-3' type="radio" name='statusCk' value={2} onChange={(e) => setStatusProd(e.target.value)}/>
                        <label htmlFor='checkbox-prod-3'>Somente pagos</label>
                    </div>
                </div>
                <p style={{paddingTop: '15px'}}>Nº DE PRODUTOS: <b>{np}</b></p>
                <p>PRODUTOS DISPONIVEIS: <b>{pd}</b></p>
                <p>PRODUTOS VENDIDOS: <b>{pv}</b></p>
                <p>PRODUTOS PAGOS: <b>{pp}</b></p>
            </div>
            <div className="lista-produtos fbcc">
                {ProdList.map(prod => (
                    (prod.tipo.toLowerCase() + ' ' + prod.descricao.toLowerCase()).includes(searchProd.toLowerCase()) ? (
                        <div className={'cod-produto fbrc' + (prod.status === 2 ? ' indisp' : (prod.status === 1 ? ' process' : ''))} onClick={() => openProdScreen(prod)} key={prod.id}>
                            <p style={{flex: '1', textAlign: 'start', marginLeft: '25px'}}>{`#${prod.cliente}-${prod.id}`}</p>
                            <p style={{flex: '2'}}><b>{`${prod.tipo} ${prod.descricao}`}</b></p>
                            <p style={{flex: '1'}}>{`R$ ${prod.valor}`}</p>
                        </div>
                    ) : null
                ))}
            </div>
            {selectedProduct && <ProdScreen product={selectedProduct} onClose={closeProdScreen} excluirProd={delProduto}/>}
        </div>
    )
}

export default Produtos