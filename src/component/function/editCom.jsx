import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import { GiConfirmed } from 'react-icons/gi'
import '../../style/components/function/addVendas.css'

const EditarComissao = () => {
    const ref = useRef()
    const { id } = useParams()
    const [ Comissao, setComissao ] = useState([])
    const [ Produtos, setProdutos ] = useState([])

    useEffect(() => {
        document.documentElement.style.pointerEvents = 'all'
        getComissao()
        getProdutos()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    console.log(Comissao)
    const getProdutos = async () => {
        try {
            const res = await axios.get('http://localhost:8800/produtos/')
            setProdutos(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    
    const getComissao = async () => {
        try {
            const res = await axios.get(`http://localhost:8800/comissoes/${id}`)

            const newData = String(res.data[0]?.data).split('T')[0]
            const jsonProdutos = JSON.parse(res.data[0]?.produtos)
            const preCom = {...res.data[0], produtos: jsonProdutos, data: newData}

            setComissao(preCom)
        } catch (error) {
            console.log(error)
        }
    }

    const editarComissao = async (e) => {
        e.preventDefault()
        // const parsed = JSON.stringify(Venda?.produtos)

        // await axios.put(`http://localhost:8800/vendas/${id}`,{
        //     descricao: Venda?.descricao,
        //     produtos: parsed,
        //     data: Venda?.data,
        //     hora: Venda?.hora,
        //     valortotal: Venda?.valortotal
        // })
        // .then(({data}) => {
        //     window.alert(data)
        //     window.location.replace('http://localhost:3000/vendas')
        // })
        // .catch((error) => console.log(error))
    }

    const handleDescriptionChange = (e) => {
        const newDescription = e.target.value;
        setComissao((comissao) => ({ ...comissao, descricao: newDescription }));
    }
    
    const handleDateChange = (e) => {
        const newDate = e.target.value;
        setComissao((comissao) => ({ ...comissao, data: newDate }));
    }
    
    const handleTimeChange = (e) => {
        const newTime = e.target.value;
        setComissao((comissao) => ({ ...comissao, hora: newTime }));
    }

    return (
        <div className="adicionar-venda-container fbrc">
            <div className="box-dados-add-venda fbcc">
                <h1 style={{ margin: '15px 0' }}>Comissão</h1>
                <form style={{ width: '100%' }} ref={ref} onSubmit={editarComissao}>
                    <div className="fbrc">
                        <div className="item-form-add-venda fbcc">
                            <label htmlFor="id-add-vend">ID</label>
                            <input type="text" name="id" id="id-add-vend" value={ Comissao.id || '' } disabled/>
                        </div>
                        <div className="item-form-add-venda fbcc">
                            <label htmlFor="total-add-vend">Valor Total</label>
                            <input type="number" step='any' name="valortotal" id="total-add-vend" value={ Comissao.valor || '' } disabled/>
                        </div>
                    </div>
                    <div className="item-form-add-venda fbcc" style={{ width: '100%' }}>
                        <label htmlFor="descricao-add-vend">Descrição</label>
                        <textarea
                            name="descricao"
                            rows="4"
                            id="descricao-add-vend"
                            value={ Comissao.descricao || '' }
                            onChange={handleDescriptionChange}
                        />
                    </div>
                    <div className="fbrc">
                        <div className="item-form-add-venda fbcc" style={{ marginRight: '5px' }}>
                            <label htmlFor="data-add-vend">Data</label>
                            <input
                                type="date"
                                name="data"
                                id="data-add-vend"
                                value={ Comissao.data || '' }
                                onChange={handleDateChange}
                            />
                        </div>
                        <div className="item-form-add-venda fbcc" style={{ marginLeft: '5px' }}>
                            <label htmlFor="hora-add-vend">Hora</label>
                            <input
                                type="time"
                                name="hora"
                                id="hora-add-vend"
                                value={ Comissao.hora || '' }
                                onChange={handleTimeChange}
                            />
                        </div>
                    </div>
                    <div className="fbrc" style={{ marginTop: '30px' }}>
                        <button type='submit' className="salvar-venda-button fbrc"><GiConfirmed style={{ marginRight: '5px', fontSize: '20px' }}/>EDITAR</button>
                    </div>
                </form>
            </div>
            <div className="box-itens-venda fbcc">
                <div className="itens-lista-add-vend fbcc">
                    {/* {Venda.produtos !== undefined ? Venda.produtos.map((p) => {
                        const idxProd = ProdList.findIndex((pro) => pro.id === p.id)
                        return (
                            (ProdList[idxProd].tipo.toLowerCase() + ' ' + ProdList[idxProd].descricao.toLowerCase()).includes(procurarProduto.toLowerCase()) ? (
                                <div className={`item-disp-add-venda fbrc pro-select-add-vend`} key={p.id}>
                                    <p>{`#${ ProdList[idxProd].cliente }-${ ProdList[idxProd].id }`}</p>
                                    <p>{`${ ProdList[idxProd].tipo } ${ ProdList[idxProd].descricao }`}</p>
                                    <p>{ ProdList[idxProd].tamanho }</p>
                                    <p>{`R$ ${ ProdList[idxProd].valor }`}</p>
                                </div>
                            ) : null
                        )
                    }) : null} */}
                </div>
            </div>
        </div>
    )
}
 
export default EditarComissao

