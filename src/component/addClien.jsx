import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'

import '../style/components/addClien.css'
import {AiOutlinePlus} from 'react-icons/ai'

const AdicionarCliente = () => {
    const [ListaCli, setListaCli] = useState([])
    const [UltimoId, setUltimoId] = useState(0)
    const ref = useRef()

    useEffect(() => {
        getClientes()
        ultimoIdCliente()
    })

    const getClientes = async () => {
        try {
            const res = await axios.get('http://localhost:8800/clientes')
            setListaCli(res.data)
        } catch(error){
            console.log(error)
        }
    }

    const ultimoIdCliente = () => {
        let ultimo = ListaCli.length
        let lastId = ListaCli[ultimo - 1]?.id
        setUltimoId(lastId)
    }

    const adicionarClien = async (e) => {
        e.preventDefault()
        const user = ref.current

        await axios.post('http://localhost:8800/clientes',{
            id: user.id.value,
            nome: user.nome.value,
            referencia: user.referencia.value,
            telefone: user.telefone.value
        })
        .then(({data}) => {
            window.alert(data)
            window.location.replace('http://localhost:3000/clientes')
        })
        .catch(({data}) => console.log(data))
    }

    return (
        <div className="adicionar-cliente-container">
            <form className='form-add-cliente-container' ref={ref} onSubmit={adicionarClien}>
                <h1>Adicionar Cliente</h1>
                <div className="input-area-add-cli">
                    <label>ID</label>
                    <input type="number" name='id' placeholder={`Ultimo ID: ${UltimoId}`} required/>
                </div>
                <div className="input-area-add-cli">
                    <label>Nome</label>
                    <input type="text" name='nome' required/>
                </div>
                <div className="input-area-add-cli">
                    <label>Referência</label>
                    <input type="text" name='referencia'/>
                </div>
                <div className="input-area-add-cli">
                    <label>Telefone</label>
                    <input type="text" name='telefone' placeholder='(xx) xxxxx-xxxx'/>
                </div>
                <button type='submit'><AiOutlinePlus style={{fontSize: '15pt', marginRight: '5px'}}/>ADICIONAR</button>
            </form>
        </div>
    )
}
 
export default AdicionarCliente