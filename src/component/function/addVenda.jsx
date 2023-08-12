import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'

import { GiConfirmed } from 'react-icons/gi'
import '../../style/components/function/addVendas.css'

const AdicionarVenda = () => {
    const [ ProdList, setProdList ] = useState([])
    const [ selectedItens, setSelectedItens ] = useState([])
    const [ procurarProduto, setProcurarProduto ] = useState('')
    const [ valorTotal, setValorTotal ] = useState(0.0)
    const ref = useRef()

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

    const selecionarProduto = (p) => {
        const ver = selectedItens.some((v) => v.id === p.id)

        if (!ver) {
            setSelectedItens([...selectedItens, { id: p.id }])
            setValorTotal(valorTotal + p.valor)
        } else {
            const updatedSelectedItens = selectedItens.filter((v) => v.id !== p.id)
            setSelectedItens(updatedSelectedItens)
            setValorTotal(valorTotal - p.valor)
        }
    }

    const salvarVenda = async (e) => {
        e.preventDefault()
        const user = ref.current
        const parsed = JSON.stringify(selectedItens)

        if(valorTotal === 0) alert('Selecione pelo menos 1 item!')
        else {
            await axios.post('http://localhost:8800/vendas',{
                descricao: user.descricao.value,
                produtos: parsed,
                data: user.data.value,
                hora: user.hora.value,
                valortotal: user.valortotal.value
            })
            .then(({data}) => {
                window.alert(data)
                window.location.replace('http://localhost:3000/vendas')
            })
            .catch(({data}) => console.log(data))
        }
    }

    return (
        <div className="adicionar-venda-container fbrc">
            <div className="box-dados-add-venda fbcc">
                <h1>Vender</h1>
                <form style={{ width: '100%' }} ref={ref} onSubmit={salvarVenda}>
                    <div className="item-form-add-venda fbcc" style={{ width: '100%' }}>
                        <label htmlFor="descricao-add-vend">Descrição</label>
                        <textarea name="descricao" rows='4' id="descricao-add-vend" required/>
                    </div>
                    <div className="fbrc">
                        <div className="item-form-add-venda fbcc" style={{ marginRight: '5px' }}>
                            <label htmlFor="data-add-vend">Data</label>
                            <input type="date" name="data" id="data-add-vend" required/>
                        </div>
                        <div className="item-form-add-venda fbcc" style={{ marginLeft: '5px' }}>
                            <label htmlFor="hora-add-vend">Hora</label>
                            <input type="time" name="hora" id="hora-add-vend" required/>
                        </div>
                    </div>
                    <div className="item-form-add-venda fbcc">
                        <label htmlFor="total-add-vend">Valor Total</label>
                        <input type="number" step='any' name="valortotal" id="total-add-vend" value={ valorTotal } disabled/>
                    </div>
                    <div className="fbrc" style={{ marginTop: '30px' }}>
                        <button className="salvar-venda-button fbrc"><GiConfirmed style={{ marginRight: '5px', fontSize: '20px' }}/>SALVAR</button>
                    </div>
                </form>
            </div>
            <div className="box-itens-venda fbcc">
                <input type="text" id='pesquisa-add-vend' placeholder='Pesquisar Item...' onChange={(e) => setProcurarProduto(e.target.value)}/>
                <div className="itens-lista-add-vend fbcc">
                    {ProdList.map((pro) => (
                        (pro.tipo.toLowerCase() + ' ' + pro.descricao.toLowerCase()).includes(procurarProduto.toLowerCase()) ? (
                            <div className={`item-disp-add-venda fbrc ${ selectedItens.some((item) => item.id === pro.id) ? 'pro-select-add-vend' : '' }`} onClick={() => selecionarProduto(pro)} key={pro.id}>
                                <p>{`#${ pro.cliente }-${ pro.id }`}</p>
                                <p>{`${ pro.tipo } ${ pro.descricao }`}</p>
                                <p>{ pro.tamanho }</p>
                                <p>{`R$ ${ pro.valor }`}</p>
                            </div>
                        ) : null
                    ))}
                </div>
            </div>
        </div>
    )
}
 
export default AdicionarVenda