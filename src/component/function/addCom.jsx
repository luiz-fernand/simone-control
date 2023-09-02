import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'

import { GiConfirmed } from 'react-icons/gi'
import '../../style/components/function/addVendas.css'

const AdicionarComissao = () => {
    const [ Clientes, setClientes ] = useState([])
    const [ Produtos, setProdutos ] = useState([])
    const [ selectedItem, setSelectedItem ] = useState([])
    const [ procurarCliente, setProcurarCliente ] = useState('')
    const ref = useRef()

    useEffect(() => {
        getClientes()
    }, [])

    const getClientes = async () => {
        try {
            const res = await axios.get('http://localhost:8800/produtos/status/1')
            const resC = await axios.get('http://localhost:8800/clientes')
            setProdutos(res.data)

            const cli = []
            res.data.forEach((p) => {
                const idx = resC.data.findIndex((c) => c.id === p.cliente)
                cli.push(resC.data[idx])
            })
            const unique = [...new Set(cli)]

            setClientes(unique)
        } catch (error) {
            console.log(error)
        }
    }

    
    const calcularValor = (id) => {
        let valor = 0.0
        Produtos.forEach((p) => {
            if(p.cliente === id) valor += p.valor
        })
        return valor / 2
    }

    const editarProd = async (id) => {
        const prodID = Produtos.findIndex((prod) => prod.id === id)

        await axios.put(`http://localhost:8800/produtos/${id}`,{
            tipo: Produtos[prodID].tipo,
            descricao: Produtos[prodID].descricao,
            tamanho: Produtos[prodID].tamanho,
            valor: Produtos[prodID].valor,
            status: 2
        })
        .then(({data}) => {
            console.log(data)
        })
        .catch(({data}) => window.alert(data))
    }

    const registrarComissao = async (e) => {
        e.preventDefault()
        const user = ref.current
        const prods = []

        Produtos.forEach((p) => {
            if(p.cliente === selectedItem.id) prods.push(p)
        })
        
        const parsed = JSON.stringify(prods)

        if(calcularValor(selectedItem.id) === 0) alert('Selecione um Cliente!')
        else {
            prods.forEach((p) => editarProd(p.id))
            await axios.post('http://localhost:8800/comissoes',{
                cliente: selectedItem.id,
                descricao: user.descricao.value,
                produtos: parsed,
                data: user.data.value,
                hora: user.hora.value,
                valor: user.valortotal.value
            })
            .then(({data}) => {
                window.alert(data)
                window.location.replace('http://localhost:3000/comissoes')
            })
            .catch(({data}) => console.log(data))
        }
    }

    return (
        <div className="adicionar-venda-container fbrc">
            <div className="box-dados-add-venda fbcc">
                <h1 style={{ margin: '20px 0 10px 0' }}>Comissão</h1>
                <form style={{ width: '100%' }} ref={ref} onSubmit={ registrarComissao }>
                    <div className="item-form-add-venda fbcc" style={{ width: '100%', marginTop: '15px' }}>
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
                        <label htmlFor="total-add-vend">A Acertar</label>
                        <input type="number" step='any' name="valortotal" id="total-add-vend" value={ calcularValor(selectedItem.id) } disabled/>
                    </div>
                    <div className="fbrc" style={{ marginTop: '30px' }}>
                        <button className="salvar-venda-button fbrc"><GiConfirmed style={{ marginRight: '5px', fontSize: '20px' }}/>REGISTRAR</button>
                    </div>
                </form>
            </div>
            <div className="box-itens-venda fbcc">
                <input type="text" id='pesquisa-add-vend' placeholder='Pesquisar Cliente...' onChange={(e) => setProcurarCliente(e.target.value)}/>
                <div className="itens-lista-add-vend fbcc" style={{ flex: 1 }}>
                    {Clientes.map((cli) => (
                        cli.nome?.toLowerCase().includes(procurarCliente?.toLowerCase()) ? (
                            <div className={`item-disp-add-venda fbrc ${ selectedItem.id === cli.id ? 'pro-select-add-vend' : '' }`} onClick={() => setSelectedItem(cli)} key={cli.id}>
                                <p style={{ paddingLeft: '10px', flex: 0.5 }}>{`#${ cli.id }`}</p>
                                <p style={{ flex: 2 }}>{ cli.nome }</p>
                                <p style={{ flex: 0.5 }}>{`R$ ${calcularValor(cli.id)}`}</p>
                            </div>
                        ) : null
                    ))}
                </div>
            </div>
        </div>
    )
}
 
export default AdicionarComissao