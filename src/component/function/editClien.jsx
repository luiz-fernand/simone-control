import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'

import '../../style/components/function/editProd.css'
import { AiOutlineEdit } from 'react-icons/ai'
import { useParams } from 'react-router-dom'

const EditarCliente = () => {
    const { id } = useParams()
    const [ Cliente, setCliente ] = useState([])
    const ref = useRef()

    document.documentElement.style.pointerEvents = 'all'

    useEffect(() => {
        getClienteById()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const getClienteById = async () => {
        try {
            const res = await axios.get(`http://localhost:8800/clientes/${id}`)
            setCliente(res.data[0])
        } catch(error){
            console.log(error)
        }
    }

    const editarProd = async (e) => {
        e.preventDefault()
        const user = ref.current

        await axios.put(`http://localhost:8800/clientes/${id}`,{
            nome: user.nome.value === '' ? Cliente.nome : user.nome.value,
            referencia: user.referencia.value === '' ? Cliente.referencia : user.referencia.value,
            telefone: user.telefone.value === '' ? Cliente.telefone : user.telefone.value
        })
        .then(({data}) => {
            window.alert(data)
            window.location.replace('http://localhost:3000/clientes')
        })
        .catch(({data}) => window.alert(data))
    }



    return (
        <div className="editar-produto-container">
            <form className='form-editar-container' ref={ref} onSubmit={editarProd}>
                <h1>Editar Cliente</h1>
                <div className="input-area-add-cli">
                    <label>ID</label>
                    <input type="text" name='id' value={Cliente.id || ''} disabled/>
                </div>
                <div className="input-area-add-cli">
                    <label>Nome</label>
                    <input type="text" name='nome' placeholder={Cliente.nome}/>
                </div>
                <div className="input-area-add-cli">
                    <label>Referência</label>
                    <input type="text" name='referencia' placeholder={Cliente.referencia}/>
                </div>
                <div className="input-area-add-cli">
                    <label>Telefone</label>
                    <input type="text" name='telefone' placeholder={Cliente?.telefone}/>
                </div>
                <button type='submit'><AiOutlineEdit style={{fontSize: '15pt', marginRight: '5px'}}/>EDITAR</button>
            </form>
        </div>
    )
}
 
export default EditarCliente