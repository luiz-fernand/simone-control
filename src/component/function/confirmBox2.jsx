import React from 'react'

const ConfirmBox = ({ item, desfazer, excluir, onClose }) => {
    const confirmDesfazer = () => {
        var conf = window.confirm("Tem certeza que deseja DESFAZER a venda?")
        if(conf === true) desfazer(item)
    }

    const confirmExcluir = () => {
        var conf = window.confirm("Tem certeza que deseja EXCLUIR a VENDA e TODOS os seus PRODUTOS?")
        if(conf === true) excluir(item)
    }

    const overlayCC = {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }

    const cbContainer = {
        position: 'absolute',
        zIndex: 6,
        color: 'black',
        border: '1px solid #ccc',
        padding: '16px',
        backgroundColor: 'white',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        borderRadius: '4px',
        width: '300px'
    }

    const buttonStyles = {
        padding: '8px 16px',
        margin: '0 10px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        color: 'white',
        width: 'fit-content',
        fontWeight: 'bold'
    }

    const listStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '16px'
    }

    return (
        <div className="fbcc" style={overlayCC}>
            <div className="fbcc" style={cbContainer}>
                <p>Escolha uma das opções abaixo:</p>
                <div className="fbrc" style={listStyle}>
                    <button style={{ ...buttonStyles, backgroundColor: '#3498db' }} onClick={() => confirmDesfazer()}>Desfazer</button>
                    <button style={{ ...buttonStyles, backgroundColor: '#e74c3c' }} onClick={() => confirmExcluir()}>Excluir</button>
                    <button style={{ ...buttonStyles, backgroundColor: '#ccc', color: 'black' }} onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
        
    )
}

export default ConfirmBox