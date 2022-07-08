import React from "react";
import './Card.css';
import { NavLink } from "react-router-dom";
import tools from "../../../Tools";
import  icon  from "../../../img/star.png"; 

const Card = ({id, back, name, rating, genres})=> { 
    
    return (
  
        <div className="card"> 
                <NavLink className="link" to={`/videogame/${id}`}>
                    <div className="container">
                        <img src={back} alt='New Game Icon'/>
                    </div>
                <div className="info"> 
                    <h2> {name}</h2>
                    <div className="ratin">
                        <h4> {rating} </h4>
                        <img src={icon}/>
                    </div>
                    <h3> {tools.display(genres)} </h3>
                </div>
            
                </NavLink>
        </div>
        
    )
};

export default Card; 