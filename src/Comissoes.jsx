import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { BiMoney } from 'react-icons/bi'
import { GiPayMoney } from 'react-icons/gi'

import './style/Comissoes.css'

const Comissoes = () => {
    const [ Comissoes, setComissoes ] = useState([])
    const [ ValorTT, setValorTT ] = useState(0.0)

    useEffect(() => {
        getComissoes()
    }, [])

    const getComissoes = async () => {
        try {
            const res = await axios.get('http://localhost:8800/comissoes')
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
                        <input type="date" name="data1" id="data-venda-1" />
                    </div>
                    <div className="fbrc">
                        <p style={{ marginRight: '15px' }}>Até:</p>
                        <input type="date" name="data2" id="data-venda-2" />
                    </div>
                </div>
                <p style={{marginTop: '15px'}}>Nº DE COMISSÕES: <b>{ Comissoes.length }</b></p>
                <p>VALOR DAS COMISSÕES: <b>R$ { ValorTT }</b></p>
            </div>
            <div className="lista-comissoes fbcc">
                {Comissoes.map((com) => (
                    <div className="item-venda fbcc" key={com.id}>
                        <div className="id-box-item-venda fbrc">
                            <p>#{com.id}</p>
                            <p>{com.data}</p>
                        </div>
                        <div className="fbcc" style={{ width: '85%' }}>
                            <p className='desc-item-vend'><b>{com.descricao}</b></p>
                            <p style={{ borderTop: '1px solid #ccc', margin: 0, padding: '15px 0', width: '100%' }}>TOTAL: <b>R$ {com.valor}</b></p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
 
export default Comissoes