import React from 'react'

import './style/Inicio.css'

const Inicio = () => {
  return (
    <div className="inicio-container">
      <div className="painel-info-inicio">

      </div>
      <div className="bem-vindo-inicio">
        <img src={process.env.PUBLIC_URL + '/logo-brecho.png'} alt="logo-brecho" width={300}/>
      </div>
      <div className="painel-acao-inicio">

      </div>
    </div>
  )
}
 
export default Inicio