import React from 'react'
import { useGlobalcontext } from '../contex'
import App from '../App.css'
import {BsHandThumbsUp} from 'react-icons/bs'
{/*import 'bootstrap/dist/css/bootstrap.min.css';*/}

const Meals =()=>{
    const {meals,selectedMeal,selectMeal,loading,addToFavorites,removeFavorites}= useGlobalcontext() 
    
    if(loading){
        return(
            <section className='section'>
                <h4>Loading...</h4>
            </section>
        )
    }

    if(meals.length < 1){
        return(
            <h4>No meals match your search term. please try again.</h4>
        )
    }
    return(
        <section className='section-center justify-content-center text-center'>
            {meals.map((singleMeal)=>{
                const{idMeal, strMeal:title, strMealThumb:image}= singleMeal

                return <article className='single-meal' key={idMeal}>
                    <img src={image} className='img text-center' onClick={()=>selectMeal(idMeal)}/>
                    <footer>
                        <h5>{title}</h5>
                        <button onClick={()=>addToFavorites(idMeal)} className='like-btn '>
                            <BsHandThumbsUp/>
                        </button>
                    </footer>
                </article>
            })}
        </section>
    ) 
}

export default Meals