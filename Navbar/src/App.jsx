import { useState } from 'react'
import './App.css'
// import Navbar from './Component/Navbar';
import { menuItems } from '../menuData';
import Header from './Component/Header';

function App() {

  return ( 
    <>
      {/* <Navbar data={menuItems} /> */}
      <Header />
    </>
  )
}

export default App
