import React from 'react'
import {Link} from 'react-router-dom'

import '../style/components/NavBar.css'

const NavBar = () => {
    return (
        <header>
            <img src={process.env.PUBLIC_URL + '/Logo.png'} alt="SCS" width={50}/>
            <nav className='nav-container'>
                <Link className='nav-item' to='/'>Inicio</Link>
                <Link className='nav-item' to='/'>Vendas</Link>
                <Link className='nav-item' to='/'>Peças</Link>
                <Link className='nav-item' to='/clientes'>Clientes</Link>
            </nav>
            <p style={{color: 'lightgray', fontSize: '10pt'}}>V0.1 - by: LZ TI</p>
        </header>
    )
}
 
export default NavBar