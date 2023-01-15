import React,{useContext,useEffect,useState} from "react";
import axios from 'axios'
import { json } from "react-router-dom";

const AppContext = React.createContext()

const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const randomMealurl='https://www.themealdb.com/api/json/v1/1/random.php'

const getFavoriteFromLocalStrogae= () => {
    let favorites = localStorage.getItem('favorites')
    if(favorites){
        favorites = JSON.parse(localStorage.getItem('favorites'))

    }else{
        favorites= []
    }

    return favorites
}



const AppProvider =({ children })=>{
    const [meals, setMeals] = useState([]) ;
    const [loading, setLoading] = useState(false);
    const[searchTerm, setSearchTerm] = useState('');
    const[showModal,setShowModal] =useState(false);
    const[selectedMeal,setSelectedMeal]=useState(null)
    const[favorites,setFavorites] = useState(getFavoriteFromLocalStrogae());
    
    const fetchRandomMeal = () =>{
        fetchMeals(randomMealurl)
    }

    const fetchMeals = async(url)=>{

        setLoading(true)
        try{
            const {data}= await axios(url)
            if(data.meals){
                setMeals(data.meals)
                console.log(data.meals)
            } else{
                setMeals([])
            }
        }catch (error){
            console.log(error.response)
        }
        setLoading(false)
        
    }
    const selectMeal = (idMeal, favoriteMeal)=>{
        console.log(idMeal)
        let meal;
        if(favoriteMeal){
            meal = favorites.find((meal)=>meal.idMeal === idMeal)
        }else{
            meal = meals.find((meal)=>meal.idMeal === idMeal)
        }
        setSelectedMeal(meal)
        setShowModal(true)
    }
    const closeModal = () =>{
        setShowModal(false)
    }

    const addToFavorites = (idMeal) =>{
        console.log(idMeal)

        
        const alreadyFavourites = favorites.find((meal)=>meal.idMeal === idMeal)
        if (alreadyFavourites) return
        const meal =meals.find((meal)=>meal.idMeal === idMeal);
        const updatedFavorites = [...favorites,meal];
        setFavorites(updatedFavorites)
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
    const removeFavorites = (idMeal) =>{
        const updatedFavorites = favorites.filter((meal)=>meal.idMeal !== idMeal);
        setFavorites(updatedFavorites)
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
    }

    useEffect(()=>{
        
        fetchMeals(allMealsUrl);
    },[]);

    useEffect(()=>{
        if(!searchTerm)return
        fetchMeals(`${allMealsUrl}${searchTerm}`);
    },[searchTerm]);
    
    
    
    return(
    <AppContext.Provider value={{closeModal,showModal,fetchRandomMeal,
    selectedMeal,selectMeal, loading, meals, setSearchTerm,addToFavorites,
    removeFavorites,favorites}}>
        { children }
    </AppContext.Provider>
    )
}

 export const useGlobalcontext = () =>{
    return(
        useContext(AppContext)
    )    
}

export  {AppContext, AppProvider }