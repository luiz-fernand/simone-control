import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'

import '../style/components/addProd.css'
import {AiOutlinePlus} from 'react-icons/ai'

const AdicionarProduto = () => {
    const [ListaCli, setListaCli] = useState([])
    const ref = useRef()

    useEffect(() => {
        getClientes()
    })

    const getClientes = async () => {
        try {
            const res = await axios.get('http://localhost:8800/clientes')
            setListaCli(res.data)
        } catch(error){
            console.log(error)
        }
    }

    const adicionarProd = async (e) => {
        e.preventDefault()
        const user = ref.current

        await axios.post('http://localhost:8800/produtos',{
            cliente: user.cliente.value,
            tipo: user.tipo.value,
            descricao: user.descricao.value,
            tamanho: user.tamanho.value,
            valor: user.valor.value
        })
        .then(({data}) => {
            window.alert(data)
            window.location.replace('http://localhost:3000/produtos')
        })
        .catch(({data}) => console.log(data))
    }

    return (
        <div className="adicionar-produto-container">
            <form className='form-adicionar-container' ref={ref} onSubmit={adicionarProd}>
                <h1>Adicionar Produto</h1>
                <div className="input-area-add">
                    <label>Cliente</label>
                    <select name="cliente" required>
                        <option value="">Selecione um cliente...</option>
                        {ListaCli.map((cli) => (
                            <option value={cli.id} key={cli.id}>{`${cli.nome} - #${cli.id}`}</option>
                        ))}
                    </select>
                </div>
                <div className="input-area-add">
                    <label>Tipo</label>
                    <input type="text" name='tipo' required/>
                </div>
                <div className="input-area-add">
                    <label>Descrição</label>
                    <textarea name='descricao' required/>
                </div>
                <div className="input-area-add">
                    <label>Tamanho</label>
                    <input type="text" name='tamanho'/>
                </div>
                <div className="input-area-add">
                    <label>Valor</label>
                    <input type="number" step='0.01' name='valor' required/>
                </div>
                <button type='submit'><AiOutlinePlus style={{fontSize: '15pt', marginRight: '5px'}}/>ADICIONAR</button>
            </form>
        </div>
    )
}
 
export default AdicionarProduto