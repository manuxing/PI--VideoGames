//ver como hacer que si me ponen cualquier otra ruta este mal o lleve a home, o a 404?;
import './App.css';
import React from 'react';
import { Route, Routes } from "react-router-dom";
import Home from "./components/Smarts/Home/Home";
import Door from "./components/Smarts/Door/Door";
import DetailVG from "./components/Smarts/DetailVG/DetailVG";
import Form from './components/Smarts/Form/Form';

let data1 = {name:'elGame', back: 'https://st.depositphotos.com/2398521/2608/i/600/depositphotos_26089317-stock-photo-cute-small-dog.jpg',description:'ese ya sabes', rating:4, genres:[{name:'pepe'},{name: 'argebto'}], platforms:'play'};
let data2 = [{id: 1, name:'c', rating:3 ,genres:[{name:'lindo'},{name:'capullo'},{name:'dealeli'}]}, {id: 4, name:'b', rating:2, genres:[{name:'allthe'},{name:'small'},{name:'things'}]}, {id: 2, name:'a', rating:1, genres:[{name:'allthe'},{name:'small'},{name:'things'}]}];

function App() {
  return (
    <div className="App">
     <Routes>
        <Route path="/" element = {<Door/>} />
        <Route path="/home" element = {<Home data = {data2}/>} />
        <Route path="/videogame/:id" element={<DetailVG data ={data1}/>} />
        <Route path="/create" element = {<Form/>} />
      </Routes>
    </div>
  );
};

export default App;
