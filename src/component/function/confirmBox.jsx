import React from 'react'

import '../../style/components/function/confirmBox.css'

const ConfirmBox = ({ item, desfazer, excluir, onClose }) => {
    const confirmDesfazer = () => {
        var conf = window.confirm("Tem certeza que deseja DESFAZER?")
        if(conf === true) desfazer(item)
    }

    const confirmExcluir = () => {
        var conf = window.confirm("Tem certeza que deseja EXCLUIR, incluindo TODOS os seus PRODUTOS?")
        if(conf === true) excluir(item)
    }

    return (
        <div className="overlayCC fbcc">
            <div className="cbContainer fbcc">
                <p>Escolha uma das opções abaixo:</p>
                <div className="button-list-confirm fbrc">
                    <button style={{ backgroundColor: '#3498db' }} onClick={() => confirmDesfazer()}>Desfazer</button>
                    <button style={{ backgroundColor: '#e74c3c' }} onClick={() => confirmExcluir()}>Excluir</button>
                    <button style={{ backgroundColor: '#ccc', color: 'black' }} onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
        
    )
}

export default ConfirmBox