import React from 'react'
import {NavLink} from 'react-router-dom'

import '../style/components/NavBar.css'

const NavBar = () => {
	return (
		<header className='fbrc'>
			<img src={process.env.PUBLIC_URL + '/Logo.png'} alt="SCS" height={75}/>
			<nav className='fbrc'>
				<NavLink className='nav-item fbrc' to='/'>Inicio</NavLink>
				<NavLink className='nav-item fbrc' to='/produtos'>Produtos</NavLink>
				<NavLink className='nav-item fbrc' to='/clientes'>Clientes</NavLink>
				<NavLink className='nav-item fbrc' to='/vendas'>Vendas</NavLink>
				<NavLink className='nav-item fbrc' to='/comissoes'>Comissões</NavLink>
			</nav>
			<p style={{color: 'lightgray', fontSize: '10pt'}}>V1.0 - by: LZ TI</p>
		</header>
	)
}
 
export default NavBar