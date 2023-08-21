import React from 'react'
import { Link } from 'react-router-dom'
import { BiMoney } from 'react-icons/bi'
import { GiPayMoney } from 'react-icons/gi'

import './style/Comissoes.css'

const Comissoes = () => {
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
                <p style={{marginTop: '15px'}}>Nº DE COMISSÕES: <b>-</b></p>
                <p>COMISSÕES PENDENTES: <b>-</b></p>
                <p>VALOR DAS COMISSÕES: <b>R$ -</b></p>
            </div>
            <div className="lista-comissoes fbcc">
                
            </div>
        </div>
    )
}
 
export default Comissoes