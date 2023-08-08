import React from 'react'
import { Link } from 'react-router-dom'

import { BsShop } from 'react-icons/bs'
import { MdAttachMoney } from 'react-icons/md'
import './style/Vendas.css'

const Vendas = () => {
    return (
        <div className="vendas-container fbrc">
            <div className="informacoes-vendas fbcc">
                <h1 className="titulo-vendas fbrc"><BsShop style={{marginRight: '10px'}}/> Vendas</h1>
                <div className="vendas-acao-container fbcc">
                    <Link className='fbrc'><MdAttachMoney style={{marginRight: '5px', fontSize: '20pt'}}/>VENDER</Link>
                </div>
            </div>
            <div className="lista-vendas fbcc">

            </div>
        </div>
    )
}
 
export default Vendas