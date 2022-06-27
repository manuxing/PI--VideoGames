import React from "react";
import style from "./BHome.css"
import { NavLink } from "react-router-dom";


const BHome = () => {
    return (
        <NavLink to={'/'}>
            <div className={{/*imgcont*/}}>
                <img src={{/*logo*/}} alt ="Home"/>
            </div>
        </NavLink>
    );
};

export default BHome;