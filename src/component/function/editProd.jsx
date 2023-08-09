import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'

import '../../style/components/function/editProd.css'
import { AiOutlineEdit } from 'react-icons/ai'
import { useParams } from 'react-router-dom'

const EditarProduto = () => {
    const { id } = useParams()
    const [Produto, setProduto] = useState([])
    const [Cliente, setCliente] = useState({})
    const [attProd, setAttProd] = useState(0)
    const ref = useRef()
    
    document.documentElement.style.pointerEvents = 'all'

    useEffect(() => {
        getClienteById()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const getClienteById = async () => {
        try {
            const res = await axios.get(`http://localhost:8800/clientes/${Produto[0]?.cliente}`)
            setCliente(res.data)
        } catch(error){
            console.log(error)
        }
    }
    
    const getProdutoById = async () => {
        try {
            const res = await axios.get(`http://localhost:8800/produtos/${id}`)
            setProduto(res.data)
            getClienteById()
        } catch(error){
            console.log(error)
        }
    }

    if(attProd === 0){
        getProdutoById()
        setAttProd(1)
    }

    const editarProd = async (e) => {
        e.preventDefault()
        const user = ref.current

            await axios.put(`http://localhost:8800/produtos/${id}`,{
                tipo: user.tipo.value === '' ? Produto[0].tipo : user.tipo.value,
                descricao: user.descricao.value === '' ? Produto[0].descricao : user.descricao.value,
                tamanho: user.tamanho.value === '' ? Produto[0].tamanho : user.tamanho.value,
                valor: user.valor.value === '' ? Produto[0].valor : user.valor.value,
                status: user.status.value
            })
            .then(({data}) => {
                window.alert(data)
                window.location.replace('http://localhost:3000/produtos')
            })
            .catch(({data}) => window.alert(data))
    }

    return (
        <div className="editar-produto-container">
            <form className='form-editar-container' ref={ref} onSubmit={editarProd}>
                <h1>Editar Produto</h1>
                <div className="conteudo-form-edit-prod">
                    <div className="ladoE-edit-prod">
                        <div className="input-area-edit">
                            <label>ID</label>
                            <input type="text" name='id' value={Produto[0]?.id || ''} disabled  style={{textAlign: 'center'}}/>
                        </div>
                        <div className="input-area-edit">
                            <label>Tipo</label>
                            <input type="text" name='tipo' placeholder={Produto[0]?.tipo || ''}/>
                        </div>
                        <div className="input-area-edit">
                            <label>Tamanho</label>
                            <input type="text" name='tamanho' placeholder={Produto[0]?.tamanho || ''}/>
                        </div>
                    <div className="input-area-edit">
                        <label>Status</label>
                        <select name="status" id='select-edit-prod' value={Produto[0]?.status} onChange={(e) => {
                            const newArray = [...Produto]
                            newArray[0].status = parseInt(e.target.value)
                            setProduto(newArray)
                        }}>
                            <option value="0">Disponivel</option>
                            <option value="1">Vendido</option>
                            <option value="2">Pago!</option>
                        </select>
                    </div>
                    </div>
                    <div className="ladoD-edit-prod">
                        <div className="input-area-edit">
                            <label>Cliente</label>
                            <input type="text" name='cliente' value={`#${Produto[0]?.cliente} - ${Cliente[0]?.nome}` || ''} disabled/>
                        </div>
                        <div className="input-area-edit">
                            <label>Descrição</label>
                            <textarea name='descricao' rows={5} placeholder={Produto[0]?.descricao || ''}/>
                        </div>
                        <div className="input-area-edit">
                            <label>Valor</label>
                            <input type="number" step='0.01' name='valor' placeholder={Produto[0]?.valor || 0}/>
                        </div>
                    </div>
                </div>
                <button type='submit'><AiOutlineEdit style={{fontSize: '15pt', marginRight: '5px'}}/>EDITAR</button>
            </form>
        </div>
    )
}
 
export default EditarProduto