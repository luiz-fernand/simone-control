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
					<button id='btn-1' onClick={() => confirmDesfazer()}>Desfazer</button>
					<button id='btn-2' onClick={() => confirmExcluir()}>Excluir</button>
					<button id='btn-3' onClick={onClose}>Cancelar</button>
				</div>
			</div>
		</div>
		
	)
}

export default ConfirmBox