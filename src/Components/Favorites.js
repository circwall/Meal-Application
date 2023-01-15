import React from 'react'
import App from '../App.css'
import { useGlobalcontext } from '../contex'

const Favorites =()=>{
    const {selectMeal,removeFavorites, favorites} = useGlobalcontext();

    return(
        <section className='favorites'>
            <div className='favorites-content'>
                <h5>Favorites</h5>
                <div className='favorites-container'>
                    {favorites.map((item)=>{
                    const {idMeal, strMealThumb:image} = item
                    return <div className='favorite-item' key={idMeal}>
                                    <img src={image} className='favorites-img img' onClick={()=>selectMeal(idMeal,true)}/>
                                <button onClick={()=>removeFavorites(idMeal)} className='remove-btn'>remove</button>
                            </div>
                    })}
                </div>
            </div>
        </section>
        
    )
}

export default Favorites