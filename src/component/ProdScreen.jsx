import React from 'react'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import '../style/components/ProdScreen.css'

const ProdScreen = ({product, onClose}) => {
    return (
        <div className="prod-screen-container">
            <AiOutlineCloseCircle className='close-prod-screen' onClick={onClose} color='white'/>
            <h1>{product.titulo}</h1>
        </div>
    )
}
 
export default ProdScreen;