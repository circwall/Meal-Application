import logo from './logo.svg';
import './App.css';
import React from 'react';
import Search from './Components/Search';
import Meals from './Components/Meals';
import Modal from './Components/Modal';
import Favorites from './Components/Favorites';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './Components/Header';
import { useGlobalcontext } from './contex';




function App() {

  const {showModal,favorites} =useGlobalcontext()
  return (
    <main className='container '>
      <Header/>
      <Search/>
      {favorites.length > 0 && <Favorites/>}
      <Meals/>
      {showModal && <Modal/>}
    </main>
  );
}

export default App;
