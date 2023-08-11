import React, { useEffect, useState } from 'react'
import axios from 'axios'

import '../../style/components/function/addVendas.css'

const AdicionarVenda = () => {
    const [ ProdList, setProdList ] = useState([])

    useEffect(() => {
        getProdutos()
    }, [])

    const getProdutos = async () => {
        try {
            const res = await axios.get('http://localhost:8800/produtos/status/0')
            setProdList(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="adicionar-venda-container fbrc">
            <div className="box-dados-add-venda fbcc">
                <form>
                    <div className="item-form-add-venda">
                        <label htmlFor="descricao-add-vend">Descrição</label>
                        <textarea name="descricao" id="descricao-add-vend"/>
                    </div>
                    <div className="item-form-add-venda">
                        <label htmlFor="data-add-vend">Data</label>
                        <input type="date" name="data" id="data-add-vend"/>
                    </div>
                    <div className="item-form-add-venda">
                        <label htmlFor="hora-add-vend">Hora</label>
                        <input type="time" name="hora" id="hora-add-vend"/>
                    </div>
                    <div className="item-form-add-venda">
                        <label htmlFor="total-add-vend">Descrição</label>
                        <input type="text" name="valortotal" id="total-add-vend" disabled/>
                    </div>
                </form>
            </div>
            <div className="box-itens-venda fbcc">
                {ProdList.map((pro) => (
                    <div className="item-disp-add-venda fbrc">
                        {pro.tipo}
                    </div>
                ))}
                
            </div>
        </div>
    )
}
 
export default AdicionarVenda