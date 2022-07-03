import React from "react";
import { NavLink } from "react-router-dom";
import "./BCreate.css"
import  formIcon  from "../../../img/form/form.png"; 


const BCreate = () => {

    return (
        <NavLink className="root" to={'/create'}>
            <div className="buttoon">
                <img src={formIcon}/>
            </div>
        </NavLink>
    );

};

export default BCreate;