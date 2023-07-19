import React from 'react'

import './style/Login.css'

const Login = () => {
    return (
        <div className='login-container'>
            <div>
                <img src={process.env.PUBLIC_URL + '/Logo.png'} alt="SCS" width={150}/>
            </div>
            <div className='login-form'>
                <h1>Faça o Login</h1>
            </div>
        </div>
    )
}
 
export default Login