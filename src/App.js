import logo from './logo.svg';
import './App.css';
import React from 'react';
import Search from './Components/Search';
import Meals from './Components/Meals';
import Modal from './Components/Modal';
import Favorites from './Components/Favorites';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './Components/Header';



function App() {
  return (
    <main className='container '>
      <Header/>
      <Search/>
      {/*<Favorites/>*/}
      <Meals/>
      {/*<Modal/>*/}
    </main>
  );
}

export default App;
