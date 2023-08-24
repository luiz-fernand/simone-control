import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { BiMoney } from 'react-icons/bi'
import { GiPayMoney } from 'react-icons/gi'

import './style/Comissoes.css'
import ComiScreen from './component/ComiScreen'

const Comissoes = () => {
    const [ Comissoes, setComissoes ] = useState([])
    const [ Produtos, setProdutos ] = useState([])
    const [ Clientes, setClientes ] = useState([])
    const [ ValorTT, setValorTT ] = useState(0.0)
    const [selectedComissao, setSelectedComissao] = useState(null)

    useEffect(() => {
        getComissoes()
        getProdutos()
        getClientes()
    }, [])

    const getComissoes = async () => {
        const data1 = document.getElementById('data-venda-1').value
        const data2 = document.getElementById('data-venda-2').value

        try {
            const res = await axios.get(`http://localhost:8800/comissoes/data/${(data1 === '' ? '20230101' : data1.replace(/-/g, '')) + (data2 === '' ? '' : ('-'+data2.replace(/-/g, '')))}`)
            const preLista = []
            let vtt = 0.0

            res.data.forEach((com) => {
                vtt += com.valor
                const jsonTo = JSON.parse(com.produtos)
                const newData = new Date(com.data)
                const attNewData = `${ newData.getDate().toString().padStart(2,'0') }/${ String(newData.getMonth() + 1).padStart(2,'0') }/${ newData.getFullYear() } - ${ com.hora }`
                const itemLista = { ...com, produtos: jsonTo, data: attNewData }
                preLista.push(itemLista)
            })

            setValorTT(vtt)
            setComissoes(preLista)
        } catch(error){
            console.log(error)
        }
    }

    const getProdutos = async () => {
        try {
            const res = await axios.get(`http://localhost:8800/produtos`)
            setProdutos(res.data)
        } catch(error){
            console.log(error)
        }
    }

    const getClientes = async () => {
        try {
            const res = await axios.get(`http://localhost:8800/clientes`)
            setClientes(res.data)
        } catch(error){
            console.log(error)
        }
    }

    const desfazerComissao = async (com) => {
        com.produtos.forEach(async (c) => {
            const prodID = Produtos.findIndex((prod) => prod.id === c.id)

            await axios.put(`http://localhost:8800/produtos/${c.id}`,{
                tipo: Produtos[prodID].tipo,
                descricao: Produtos[prodID].descricao,
                tamanho: Produtos[prodID].tamanho,
                valor: Produtos[prodID].valor,
                status: 1
            })
            .then(({data}) => {
                console.log(data)
            })
            .catch(({data}) => window.alert(data))
        })

        await axios.delete(`http://localhost:8800/comissoes/${com.id}`)
        .then(({data}) => {
            console.log(data)
        })
        .catch(({data}) => window.alert(data))
        closeComiScreen()
        getComissoes()
    }

    const excluirComissao = async (com) => {
        
    }
    
    const openComiScreen = (comiss) => {
        setSelectedComissao(comiss)
        document.documentElement.style.pointerEvents = 'none'
    }
    
    const closeComiScreen = () => {
        setSelectedComissao(null)
        document.documentElement.style.pointerEvents = 'all'
    }

    return (
        <div className="comissoes-container fbrc">
            <div className="menu-comissoes fbcc">
                <h1 className='titulo-clientes fbrc'><BiMoney style={{marginRight: '10px'}}/>Comissões</h1>
                <div className="clientes-acao-container fbcc">
                    <Link className='fbrc' to={'/comissoes/add'}><GiPayMoney style={{marginRight: '5px', fontSize: '20pt'}}/>REGISTRAR COMISSÃO</Link>
                </div>
                <div className="date-search-vendas fbcc">
                    <p>Buscar por data:</p>
                    <div className="fbrc">
                        <p style={{ marginRight: '15px' }}>De:</p>
                        <input type="date" name="data1" id="data-venda-1"  onChange={() => getComissoes()}/>
                    </div>
                    <div className="fbrc">
                        <p style={{ marginRight: '15px' }}>Até:</p>
                        <input type="date" name="data2" id="data-venda-2"  onChange={() => getComissoes()}/>
                    </div>
                </div>
                <p style={{marginTop: '15px', marginBottom: '10px'}}>Nº DE COMISSÕES: <b>{ Comissoes.length }</b></p>
                <p>VALOR DAS COMISSÕES: <b>R$ { ValorTT }</b></p>
            </div>
            <div className="lista-comissoes fbcc">
                {Comissoes.map((com) => {
                    const cliIDX = Clientes.findIndex((cli) => cli.id === com.cliente)

                    return (
                    <div className="item-venda fbcc" onClick={() => openComiScreen(com)} key={com.id}>
                        <div className="id-box-item-venda fbrc">
                            <p>#{com.id} - ({com.cliente}) {Clientes[cliIDX]?.nome}</p>
                            <p>{com.data}</p>
                        </div>
                        <div className="fbcc" style={{ width: '85%' }}>
                            <p className='desc-item-vend'><b>{com.descricao}</b></p>
                            <p style={{ borderTop: '1px solid #ccc', margin: 0, padding: '15px 0', width: '100%' }}>TOTAL: <b>R$ {com.valor}</b></p>
                        </div>
                    </div>
                )})}
            </div>
            {selectedComissao && <ComiScreen comissao={selectedComissao} onClose={closeComiScreen} desfazer={desfazerComissao} excluir={excluirComissao}/>}
        </div>
    )
}
 
export default Comissoes