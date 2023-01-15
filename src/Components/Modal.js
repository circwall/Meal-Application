import React from 'react'
import App from '../App.css'
import { useGlobalcontext } from '../contex';


const Modal =()=>{

    const {selectedMeal,closeModal} = useGlobalcontext();

    const {strMealThumb:image, strMeal:title, strInstructions:text, strSource:source} = selectedMeal

    return(
        <aside className='modal-overlay'>
            <div className='modal-container'>
                <img src={image} alt={title} className="img modal-img"/>
                <div className='modal-content'>
                    <h4>{title}</h4>
                    <p>cooking Instructions</p>
                    <p>{text}</p>
                    <a href={source} target='_blank'>Original source</a>
                    <button id='btn-close' className='btn close-btn' onClick={closeModal}>close</button>
                </div>
            </div>
        </aside>
    )
}

export default Modal