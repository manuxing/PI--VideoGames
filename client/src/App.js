//ver como hacer que si me ponen cualquier otra ruta este mal o lleve a home, o a 404?;
import './App.css';
import React from 'react';
import { Route, Routes } from "react-router-dom";
import Home from "./components/Smarts/Home/Home";
import Door from "./components/Smarts/Door/Door";
import DetailVG from "./components/Smarts/DetailVG/DetailVG";
import Form from './components/Smarts/Form/Form';

function App() {
  return (
    <div className="App">
     <Routes>
        <Route path="/" element = {<Door/>} />
        <Route path="/home" element = {<Home/>} />
        <Route path="/videogame/:id" element={<DetailVG/>} />
        <Route path="/create" element = {<Form/>} />
      </Routes>
    </div>
  );
};

export default App;
