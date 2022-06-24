import React from "react";
import style from './Card.css';
import { NavLink } from "react-router-dom";
import tools from "../../../Tools";

const Card = ({id, back, name, genres})=> { 

    return (
  
        <div className={style.root}> 
            
                <div className={style.containerImg}> 
                    <NavLink to={`/videogame/${id}`}>
                        <img src={back} alt='New Game Icon'/>
                    </NavLink>
                </div>
                <div className={style.containerInfo}> 
                    <h1> {name}</h1>
                    <h3> {tools.display(genres)} </h3>
                </div>
            
        </div>
        
    )
};

export default Card; 