import React from "react";
import { NavLink } from "react-router-dom";
import "./BHome.css"
import  homeIcon  from "../../../img/home/home.png"; 


const BHome = () => {
    return (
        <NavLink className="root" to={'/home'}>
            <div className="buttonnn">
                <img src={homeIcon} alt ="home"/>
            </div>
        </NavLink>
    );
};

export default BHome;