import React from 'react'

import './style/Inicio.css'

const Inicio = () => {
	return (
		<div className="inicio-container fbcc">
			<div className="painel-info-inicio fbcc">

			</div>
			<div className="bem-vindo-inicio fbcc">
				<img src={process.env.PUBLIC_URL + '/logo-brecho.png'} alt="logo-brecho" width={300}/>
			</div>
			<div className="painel-acao-inicio fbcc">

			</div>
		</div>
	)
}
 
export default Inicio