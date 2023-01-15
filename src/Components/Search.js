import React from 'react'
import App from '../App.css'
import { useState } from 'react'
import { useGlobalcontext } from '../contex'

const Search =()=>{
    const[text, setText] =useState('');
    const {setSearchTerm, fetchRandomMeal} = useGlobalcontext()
    const handleChange=(e)=>{
        setText(e.target.value)
    }
    const hanRandomMeal=()=>{
        setSearchTerm('')
        setText('')
        fetchRandomMeal()
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        if(text){
            setSearchTerm(text)
            setText(text)
        }
    }
    return(
        <header className='search-container'>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='type favourite meal' value={text} onChange={handleChange} className='form-input'/>
                <button type='submit' className='btn'>Search</button>
                <button type='button' onClick={hanRandomMeal} className='btn btn-hipster'>Surprise me!</button>

            </form>
        </header>
    )
}

export default Search