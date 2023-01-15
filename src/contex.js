import React,{useContext,useEffect,useState} from "react";
import axios from 'axios'

const AppContext = React.createContext()

const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const randomMealurl='https://www.themealdb.com/api/json/v1/1/random.php'



const AppProvider =({ children })=>{
    const [meals, setMeals] = useState([]) ;
    const [loading, setLoading] = useState(false);
    const[searchTerm, setSearchTerm] = useState('');
    const[showModal,setShowModal] =useState(false);
    const[selectedMeal,setSelectedMeal]=useState(null)
    const[favorites,setFavorites] = useState([]);
    
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
        meal = meals.find((meal)=>meal.idMeal === idMeal)
        setSelectedMeal(meal)
        setShowModal(true)
    }
    const closeModal = () =>{
        setShowModal(false)
    }

    const addToFavorites = (idMeal) =>{

        const meal =meals.find((meal)=>meal.idMeal === idMeal);
        const alreadyFavourites = favorites.find((meal)=>meal.idMeal === idMeal)
        if (alreadyFavourites) return
        const updatedFavorites = [...favorites,meal];
        setFavorites(updatedFavorites)
    }
    const removeFavorites = (idMeal) =>{
        const updatedFavorites = favorites.filter((meal)=>meal.idMeal !== idMeal);
        setFavorites(updatedFavorites);
    }

    useEffect(()=>{
        
        fetchMeals(allMealsUrl);
    },[]);

    useEffect(()=>{
        if(!searchTerm)return
        fetchMeals(`${allMealsUrl}${searchTerm}`);
    },[searchTerm]);
    
    
    
    return(
    <AppContext.Provider value={{closeModal,showModal,fetchRandomMeal,selectedMeal,selectMeal, loading, meals, setSearchTerm}}>
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