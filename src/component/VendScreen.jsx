import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { AiOutlineCloseCircle, AiOutlineEdit } from 'react-icons/ai'
import { RiDeleteBinLine } from 'react-icons/ri'
import '../style/components/VendScreen.css'
import ConfirmBox from './function/confirmBox2'

const VendScreen = ({ venda, onClose, excluirVenda, desfazerVenda }) => {
    const [ ProdList, setProdList ] = useState([])
    const [ VendaSelected, setVendaSelected ] = useState(null)

    const getProdutos = async () => {
        try {
            const res = await axios.get('http://localhost:8800/produtos')
            setProdList(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const openConfirmScreen = (vend) => {
        setVendaSelected(vend)
    }
    
    const closeConfirmScreen = () => {
        setVendaSelected(null)
    }

    getProdutos()

    return (
        <div className="venda-screen-overlay fbcc">
            <div className="venda-screen-container fbrc">
                <div className="fbcc" style={{ flex: 1, borderRight: '1px solid #ccc', justifyContent: 'space-around', height: '450px' }}>
                    <div className="venda-screen-info fbcc">
                        <AiOutlineCloseCircle className='close-venda-screen' onClick={ onClose } color='white'/>
                        <div className="fbrc" style={{ width: '100%', justifyContent: 'space-between' }}>
                            <p><b><u>#{ venda.id }</u></b></p>
                            <p>{ venda.data }</p>
                        </div>
                        <p className='desc-venda-screen' style={{ marginTop: '15px', whiteSpace: 'pre-line', textAlign: 'center' }}><b>{venda.descricao}</b></p>
                    </div>
                    <div className="venda-screen-acao fbrc">
                        <Link className='btn-vndscr-1 fbrc'><AiOutlineEdit style={{ marginRight: '5px', fontSize: '18pt' }}/>Editar</Link>
                        <button className='btn-vndscr-2 fbrc' onClick={() => openConfirmScreen(venda)}><RiDeleteBinLine style={{ marginRight: '5px', fontSize: '18pt' }}/>Excluir</button>
                    </div>
                </div>
                <div className="fbcc" style={{ flex: 1, height: '400px', justifyContent: 'flex-start', marginTop: '35px', overflowY: 'auto' }}>
                    { venda.produtos.map((prod) => (
                        <div id='item-venda-list' className="fbrc" style={{ width: '100%', justifyContent: 'space-around' }} key={prod.id}>
                            <p>#{ ProdList[prod.id - 1]?.cliente }-{ ProdList[prod.id - 1]?.id }</p>
                            <p>{ ProdList[prod.id - 1]?.tipo } { ProdList[prod.id - 1]?.descricao }</p>
                            <p>{ ProdList[prod.id - 1]?.tamanho }</p>
                            <p>R$ { ProdList[prod.id - 1]?.valor }</p>
                        </div>
                    )) }
                    <div className="fbcc" style={{ width: '85%', borderTop: '1px solid #ccc', marginTop: '15px' }}>
                        <p style={{ marginBottom: '5px' }}>TOTAL: <b>R$ { venda.valortotal }</b></p>
                    </div>
                </div>
                {VendaSelected && <ConfirmBox item={venda} excluir={excluirVenda} desfazer={desfazerVenda} onClose={closeConfirmScreen} />}
            </div>
        </div>
    )
}
 
export default VendScreen