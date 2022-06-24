import './App.css';
import React from 'react';
import { Route, Routes } from "react-router-dom";
import Home from "./components/Smarts/Home/Home";
import Door from "./components/Smarts/Door/Door";
import DetailVG from "./components/Smarts/DetailVG/DetailVG";
import Form from './components/Smarts/Form/Form';

let data1 = {name:'elGame', back: 'https://st.depositphotos.com/2398521/2608/i/600/depositphotos_26089317-stock-photo-cute-small-dog.jpg',description:'ese ya sabes', rating:4, genres:[{name:'pepe'},{name: 'argebto'}], platforms:'play'};
let data2 = [{id: 1, name:'eseeees', genres:[{name:'lindo'},{name:'capullo'},{name:'dealeli'}]}, {id: 2, name:'gatoculiado', genres:[{name:'allthe'},{name:'small'},{name:'things'}]}];

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
