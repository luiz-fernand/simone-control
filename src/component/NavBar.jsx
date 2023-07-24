import React from 'react'
import {NavLink} from 'react-router-dom'

import '../style/components/NavBar.css'

const NavBar = () => {
    return (
        <header>
            <img src={process.env.PUBLIC_URL + '/Logo.png'} alt="SCS" width={50}/>
            <nav className='nav-container'>
                <NavLink className='nav-item' activeClassName='active' to='/'>Inicio</NavLink>
                <NavLink className='nav-item' activeClassName='active' to='/produtos'>Produtos</NavLink>
                <NavLink className='nav-item' activeClassName='active' to='/clientes'>Clientes</NavLink>
                <NavLink className='nav-item' activeClassName='active' to='/vendas'>Vendas</NavLink>
            </nav>
            <p style={{color: 'lightgray', fontSize: '10pt'}}>V0.1 - by: LZ TI</p>
        </header>
    )
}
 
export default NavBar