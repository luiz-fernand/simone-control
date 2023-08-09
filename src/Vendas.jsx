import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { BsShop } from 'react-icons/bs'
import { MdAttachMoney } from 'react-icons/md'
import './style/Vendas.css'

const Vendas = () => {
    const [preVendList, setPreVendList] = useState([])
    const [VendList, setVendList] = useState([])

    useEffect(() => {
        getVendas()

        const tempList = []

        preVendList.forEach((vend) => {
            const prodJson = JSON.parse(vend.produtos)
            const newData = new Date(vend.data)
            console.log(vend)
            const itemListaVend = [{'id': vend.id, 'descricao': vend.descricao, 'produtos': prodJson, 'data': newData.toLocaleString('pt-BR', { timeZone: 'UTC' }), 'valortotal': vend.valortotal}]
            tempList.push(itemListaVend)
        })

        setVendList(tempList)
    }, [preVendList])

    const getVendas = async () => {
        try {
            const res = await axios.get('http://localhost:8800/vendas')
            setPreVendList(res.data)
        } catch(error) {
            console.log(error)
        }
    }
    
    return (
        <div className="vendas-container fbrc">
            <div className="informacoes-vendas fbcc">
                <h1 className="titulo-vendas fbrc"><BsShop style={{marginRight: '10px'}}/> Vendas</h1>
                <div className="vendas-acao-container fbcc">
                    <Link className="fbrc"><MdAttachMoney style={{marginRight: '5px', fontSize: '20pt'}}/>VENDER</Link>
                </div>
                <p>Nº DE VENDAS: <b>{VendList.length}</b></p>
            </div>
            <div className="lista-vendas fbcc">
                {VendList.map((vend) => (
                    <div className="item-venda fbcc" key={vend[0].id}>
                        <div className="id-box-item-venda fbrc">
                            <p>#{vend[0].id}</p>
                            <p>{vend[0].data}</p>
                        </div>
                        <div className="fbcc" style={{ width: '85%' }}>
                            <p className='desc-item-vend'><b>{vend[0].descricao}</b></p>
                            <p>TOTAL: <b>R$ {vend[0].valortotal}</b></p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
 
export default Vendas